import { useEffect, useMemo, useState } from "react";
import { FILTERS } from "@/lib/kutora/filters";
import { PRESETS } from "@/lib/kutora/presets";
import { useStudio } from "@/lib/kutora/store";
import { Button, SectionTitle, TextInput } from "./controls";

export function JobPanel() {
  const inputs = useStudio((state) => state.inputs);
  const output = useStudio((state) => state.output);
  const filters = useStudio((state) => state.filters);
  const patchOutput = useStudio((state) => state.patchOutput);
  const patchInput = useStudio((state) => state.patchInput);
  const addInput = useStudio((state) => state.addInput);
  const removeInput = useStudio((state) => state.removeInput);
  const applyPreset = useStudio((state) => state.applyPreset);
  const reset = useStudio((state) => state.reset);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const preview = useMemo(() => {
    const eq = filters.find((filter) => filter.enabled && filter.kind === "eq");
    const hue = filters.find((filter) => filter.enabled && filter.kind === "hue");
    const volume = filters.find((filter) => filter.enabled && filter.kind === "volume");
    const brightness = Number(eq?.params.brightness ?? 0);
    const contrast = Number(eq?.params.contrast ?? 1);
    const saturation = Number(eq?.params.saturation ?? 1);
    const gamma = Number(eq?.params.gamma ?? 1);
    const degrees = Number(hue?.params.h ?? 0);
    const linear = volume && volume.params.unit !== "db" ? Number(volume.params.amount ?? 1) : 1;
    const safe = (value: number, fallback: number) => (Number.isFinite(value) ? value : fallback);
    return {
      filter: `brightness(${safe(1 + brightness, 1) * safe(gamma, 1)}) contrast(${safe(contrast, 1)}) saturate(${safe(saturation, 1)}) hue-rotate(${safe(degrees, 0)}deg)`,
      volume: Math.min(1, Math.max(0, safe(linear, 1))),
    };
  }, [filters]);

  return (
    <section>
      <SectionTitle
        index="02"
        title="作业"
        body="先放进要处理的文件，再选一个起点。细项都在参数和滤镜里，改动会立刻反映到底部命令。"
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="min-h-11 shrink-0 border border-line bg-ink-2 px-3 py-2 text-left"
          >
            <div className="text-sm font-medium text-bone">{preset.name}</div>
            <div className="text-xs text-mist">{preset.detail}</div>
          </button>
        ))}
        <Button onClick={reset}>恢复示例</Button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {inputs.map((input, index) => (
          <div key={input.id} className="border border-line bg-panel p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium text-bone">输入 {index + 1}</h3>
              <Button tone="danger" onClick={() => removeInput(input.id)} disabled={inputs.length === 1}>
                移除
              </Button>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-mist">类型</span>
                <select
                  value={input.kind}
                  onChange={(event) => patchInput(input.id, { kind: event.target.value as "file" | "lavfi" })}
                >
                  <option value="file">文件或 URL</option>
                  <option value="lavfi">虚拟源 lavfi</option>
                </select>
              </label>
              {input.kind === "file" ? (
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm text-mist">命令里使用的路径或 URL</span>
                  <TextInput
                    mono
                    value={input.location}
                    placeholder="footage/interview.mov"
                    onChange={(location) => patchInput(input.id, { location })}
                  />
                </label>
              ) : (
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm text-mist">lavfi 表达式</span>
                  <TextInput mono value={input.lavfi} onChange={(lavfi) => patchInput(input.id, { lavfi })} />
                </label>
              )}
            </div>
          </div>
        ))}
        <Button onClick={addInput}>添加输入</Button>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm text-mist">输出路径</span>
        <TextInput mono value={output.path} onChange={(path) => patchOutput({ path })} />
      </label>

      <div className="mt-8 border border-line p-4">
        <h3 className="font-medium text-bone">浏览器近似预览</h3>
        <p className="mt-2 text-sm text-pretty text-mist">
          选择一个本地文件，只在这台浏览器里看影调和音量。它不会上传，也不会变成命令里的路径。缩放、降噪、响度标准化这些看不出来。
        </p>
        <input
          className="mt-3"
          type="file"
          accept="video/*,audio/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (fileUrl) URL.revokeObjectURL(fileUrl);
            setFileUrl(URL.createObjectURL(file));
          }}
        />
        {fileUrl ? (
          <video
            className="mt-3 aspect-video w-full bg-ink"
            src={fileUrl}
            controls
            style={{ filter: preview.filter }}
            onVolumeChange={(event) => {
              event.currentTarget.volume = preview.volume;
            }}
            onLoadedMetadata={(event) => {
              event.currentTarget.volume = preview.volume;
            }}
          />
        ) : (
          <div className="mt-3 flex aspect-video items-center justify-center border border-dashed border-line text-sm text-mist">
            未选择预览素材
          </div>
        )}
        <p className="mt-2 font-mono text-xs text-mist">启用的滤镜 {filters.filter((filter) => filter.enabled).length} / {FILTERS.length} 种可加</p>
      </div>
    </section>
  );
}
