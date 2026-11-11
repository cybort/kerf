import { useState } from "react";
import { FILTERS, getFilter } from "@/lib/kutora/filters";
import { useStudio } from "@/lib/kutora/store";
import { Button, SectionTitle, SelectInput, TextInput, cx } from "./controls";

export function FiltersPanel() {
  const filters = useStudio((state) => state.filters);
  const raw = useStudio((state) => state.rawFilter);
  const addFilter = useStudio((state) => state.addFilter);
  const patchFilter = useStudio((state) => state.patchFilter);
  const toggleFilter = useStudio((state) => state.toggleFilter);
  const removeFilter = useStudio((state) => state.removeFilter);
  const moveFilter = useStudio((state) => state.moveFilter);
  const setRawFilter = useStudio((state) => state.setRawFilter);
  const [kind, setKind] = useState(FILTERS[0]?.kind ?? "scale");
  const groups = ["画面", "声音", "复合"] as const;

  return (
    <section>
      <SectionTitle
        index="04"
        title="滤镜"
        body="从上到下就是处理顺序。简单的画面和声音会写成 -vf / -af。叠加、拼接、混音、交叉淡化和调色板 GIF 会收成一张 filter_complex。"
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <select value={kind} onChange={(event) => setKind(event.target.value)} aria-label="选择滤镜">
          {groups.map((group) => (
            <optgroup key={group} label={group}>
              {FILTERS.filter((item) => item.group === group).map((item) => (
                <option key={item.kind} value={item.kind}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <Button tone="primary" onClick={() => addFilter(kind)}>
          加到链尾
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {filters.length === 0 ? (
          <p className="border border-dashed border-line px-4 py-8 text-sm text-mist">链是空的。可以从缩放或响度标准化开始。</p>
        ) : null}
        {filters.map((filter, index) => {
          const def = getFilter(filter.kind);
          const compiled = def.compile(filter.params);
          const complex = def.group === "复合" || filter.kind === "speed";
          return (
            <article key={filter.id} className={cx("border border-line bg-panel p-4", !filter.enabled && "opacity-50")}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs text-brass">
                    {String(index + 1).padStart(2, "0")} · {def.group}
                  </div>
                  <h3 className="text-lg font-semibold text-bone">{def.label}</h3>
                  <p className="mt-1 max-w-xl text-sm text-pretty text-mist">{def.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => moveFilter(filter.id, -1)} disabled={index === 0}>
                    上移
                  </Button>
                  <Button onClick={() => moveFilter(filter.id, 1)} disabled={index === filters.length - 1}>
                    下移
                  </Button>
                  <Button onClick={() => toggleFilter(filter.id)}>{filter.enabled ? "停用" : "启用"}</Button>
                  <Button tone="danger" onClick={() => removeFilter(filter.id)}>
                    删除
                  </Button>
                </div>
              </div>
              {def.fields.length ? (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {def.fields.map((field) => (
                    <label key={field.key} className="block">
                      <span className="mb-2 block text-sm text-mist">
                        {field.label}
                        {field.help ? ` · ${field.help}` : ""}
                      </span>
                      {field.kind === "select" ? (
                        <SelectInput
                          value={filter.params[field.key] ?? field.default}
                          options={field.options ?? []}
                          onChange={(value) => patchFilter(filter.id, { [field.key]: value })}
                        />
                      ) : field.kind === "range" ? (
                        <div className="flex items-center gap-3">
                          <input
                            className="w-auto min-w-0 flex-1"
                            type="range"
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={filter.params[field.key] ?? field.default}
                            onChange={(event) => patchFilter(filter.id, { [field.key]: event.target.value })}
                          />
                          <span className="w-16 shrink-0 text-right font-mono text-sm tabular-nums text-bone">
                            {filter.params[field.key] ?? field.default}
                          </span>
                        </div>
                      ) : (
                        <TextInput
                          mono
                          value={filter.params[field.key] ?? ""}
                          onChange={(value) => patchFilter(filter.id, { [field.key]: value })}
                        />
                      )}
                    </label>
                  ))}
                </div>
              ) : null}
              <p className="mt-4 overflow-x-auto font-mono text-xs text-brass">
                {complex ? "由复合滤镜图写入" : compiled || "当前数值等于直通，不写入命令"}
              </p>
            </article>
          );
        })}
      </div>

      <label className="mt-8 block">
        <span className="mb-2 block text-sm text-mist">手写 filter_complex</span>
        <textarea
          className="font-mono text-sm"
          value={raw}
          placeholder="[0:v]scale=1280:-2[v];[0:a]loudnorm[a]"
          onChange={(event) => setRawFilter(event.target.value)}
        />
        <p className="mt-2 text-sm text-mist">一旦这里有内容，上面的链就不进命令。清空后恢复自动图。</p>
      </label>
    </section>
  );
}
