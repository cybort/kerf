import { FEATURE_FLAGS, parseProbe } from "@/lib/kutora/probe";
import { useStudio } from "@/lib/kutora/store";
import type { EngineMode } from "@/lib/kutora/types";
import { Button, SectionTitle, TextInput, cx } from "./controls";

const MODES: { id: EngineMode; label: string; hint: string }[] = [
  { id: "path", label: "本地路径", hint: "本机已经有 ffmpeg" },
  { id: "url", label: "远程 URL", hint: "下载单个可执行文件" },
  { id: "source", label: "源码构建", hint: "git clone 后 configure" },
];

export function EnginePanel() {
  const engine = useStudio((state) => state.engine);
  const patch = useStudio((state) => state.patchEngine);
  const probe = parseProbe(engine.probeText);

  return (
    <section>
      <SectionTitle
        index="01"
        title="引擎"
        body="指定 FFmpeg 从哪里来。刃帧只负责把这个选择写进 Kotlin：本地路径直接用，URL 会下载并校验，源码会在你的机器上编译。这里不会执行你的二进制。"
      />
      <div className="grid gap-2 sm:grid-cols-3">
        {MODES.map((mode) => {
          const active = engine.mode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => patch({ mode: mode.id })}
              className={cx(
                "min-h-11 border px-3 py-3 text-left",
                active ? "border-brass bg-brass text-ink" : "border-line bg-ink-2 text-bone",
              )}
            >
              <div className="font-medium">{mode.label}</div>
              <div className={cx("text-sm", active ? "text-ink" : "text-mist")}>{mode.hint}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {engine.mode === "path" ? (
          <label className="block">
            <span className="mb-2 block text-sm text-mist">可执行文件路径</span>
            <TextInput
              mono
              value={engine.binaryPath}
              placeholder="/usr/local/bin/ffmpeg 或 C:\\ffmpeg\\bin\\ffmpeg.exe"
              onChange={(binaryPath) => patch({ binaryPath })}
            />
          </label>
        ) : null}

        {engine.mode === "url" ? (
          <>
            <label className="block">
              <span className="mb-2 block text-sm text-mist">二进制 URL</span>
              <TextInput
                mono
                value={engine.binaryUrl}
                placeholder="https://example.com/ffmpeg"
                onChange={(binaryUrl) => patch({ binaryUrl })}
              />
              <p className="mt-2 text-sm text-mist">
                只接受单个可执行文件。zip、7z、dmg 请在本机解开后改用本地路径。Windows 构建可以找 BtbN FFmpeg-Builds 或 gyan.dev，把直链贴进来。
              </p>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-mist">SHA-256，可留空</span>
              <TextInput mono value={engine.sha256} placeholder="64 位十六进制" onChange={(sha256) => patch({ sha256 })} />
            </label>
          </>
        ) : null}

        {engine.mode === "source" ? (
          <>
            <label className="block">
              <span className="mb-2 block text-sm text-mist">Git 仓库</span>
              <TextInput
                mono
                value={engine.sourceUrl}
                placeholder="https://git.ffmpeg.org/ffmpeg.git"
                onChange={(sourceUrl) => patch({ sourceUrl })}
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-mist">分支、标签或提交</span>
                <TextInput mono value={engine.sourceRef} onChange={(sourceRef) => patch({ sourceRef })} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-mist">并行数，0 表示用满 CPU</span>
                <TextInput value={engine.jobs} onChange={(jobs) => patch({ jobs })} />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm text-mist">configure 参数</span>
              <textarea value={engine.configureFlags} onChange={(event) => patch({ configureFlags: event.target.value })} />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  patch({
                    configureFlags:
                      "--disable-debug --disable-doc --enable-gpl --enable-version3 --enable-libx264 --enable-libx265 --enable-libvpx --enable-libopus --enable-libmp3lame --enable-libaom",
                  })
                }
              >
                填入常用第三方库
              </Button>
              <Button
                onClick={() => patch({ configureFlags: "--disable-debug --disable-doc --enable-gpl --enable-version3" })}
              >
                只留 GPL 基础项
              </Button>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm text-mist">安装前缀</span>
              <TextInput mono value={engine.prefix} onChange={(prefix) => patch({ prefix })} />
            </label>
            <p className="text-sm text-mist">
              源码模式面向 Linux / macOS，需要编译器、make、pkg-config，以及你打开的那些库的头文件。Windows 请改用远程二进制。
            </p>
          </>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm text-mist">Kotlin 工作目录</span>
          <TextInput mono value={engine.workDir} onChange={(workDir) => patch({ workDir })} />
          <p className="mt-2 text-sm text-mist">相对你运行程序时的当前目录。下载缓存和源码树都放在这里。</p>
        </label>
      </div>

      <div className="mt-8 border border-line bg-ink-2 p-4">
        <h3 className="font-medium text-bone">构建探测</h3>
        <p className="mt-2 text-sm text-pretty text-mist">
          在终端运行 ffmpeg -version 和 ffmpeg -buildconf，把输出贴进来。刃帧会按 --enable-* 判断这个构建到底有没有 libx264、NVENC 这些开关。
        </p>
        <textarea
          className="mt-3 font-mono text-sm"
          value={engine.probeText}
          placeholder={"ffmpeg version 7.1 ...\nconfiguration: --enable-gpl --enable-libx264"}
          onChange={(event) => patch({ probeText: event.target.value })}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {probe.version ? <span className="border border-brass px-2 py-1 font-mono text-xs text-brass">{probe.version}</span> : null}
          {FEATURE_FLAGS.map((feature) => {
            const on = probe.flags.has(feature.flag);
            if (!probe.flags.size) return null;
            return (
              <span
                key={feature.flag}
                className={cx("px-2 py-1 font-mono text-xs", on ? "bg-brass text-ink" : "border border-line text-mist")}
              >
                {feature.label}
              </span>
            );
          })}
          {!probe.flags.size ? <span className="text-sm text-mist">还没有可识别的编译开关。</span> : null}
        </div>
      </div>
    </section>
  );
}
