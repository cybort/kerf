import { useState } from "react";
import {
  AUDIO_CODECS,
  CONTAINERS,
  HWACCELS,
  LOGLEVELS,
  SUBTITLE_CODECS,
  VIDEO_CODECS,
  codecAvailability,
  defaultPix,
  defaultPreset,
  presetOptions,
} from "@/lib/kutora/codecs";
import { parseProbe } from "@/lib/kutora/probe";
import { useStudio } from "@/lib/kutora/store";
import type { ProbeAvailability } from "@/lib/kutora/codecs";
import { Button, Field, SectionTitle, SelectInput, TextInput, Toggle } from "./controls";

const PIX = ["", "yuv420p", "yuv422p", "yuv444p", "yuv422p10le", "yuv444p10le", "nv12", "p010le", "rgb24", "rgba", "gray"].map(
  (value) => ({ value, label: value || "不指定" }),
);

function availabilityLabel(state: ProbeAvailability): string {
  if (state === "builtin") return "内置编码器";
  if (state === "yes") return "这次探测里有对应开关";
  if (state === "no") return "这次探测里没有对应开关";
  return "还没贴探测输出，无法判断";
}

export function ParamsPanel() {
  const [query, setQuery] = useState("");
  const [inputId, setInputId] = useState<string | null>(null);
  const data = useStudio();
  const input = data.inputs.find((item) => item.id === inputId) ?? data.inputs[0];
  const probe = parseProbe(data.engine.probeText);
  const videoState = codecAvailability(data.video.codec, probe.flags, VIDEO_CODECS);
  const audioState = codecAvailability(data.audio.codec, probe.flags, AUDIO_CODECS);
  const presets = presetOptions(data.video.codec);

  if (!input) return null;

  return (
    <section>
      <SectionTitle
        index="03"
        title="参数"
        body="这些是会写进命令的开关，不是说明书摘抄。搜索看的是名字、旗标和说明。空着的文本项不会出现在命令里。"
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索，例如 crf、loudnorm、-map、nvenc"
        aria-label="搜索参数"
      />
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {[
          ["global", "全局"],
          ["input", "输入"],
          ["video", "视频"],
          ["audio", "音频"],
          ["mux", "封装"],
        ].map(([id, label]) => (
          <a key={id} href={`#param-${id}`} className="shrink-0 border border-line px-3 py-2 text-sm text-bone">
            {label}
          </a>
        ))}
      </div>

      <h3 id="param-global" className="mt-8 font-mono text-xs text-brass">
        全局
      </h3>
      <Field query={query} flag="-y / -n" label="覆盖输出" help="yes 加 -y，no 加 -n，询问则让 ffmpeg 自己停下来。">
        <SelectInput
          value={data.global.overwrite}
          onChange={(overwrite) => data.patchGlobal({ overwrite: overwrite as "yes" | "no" | "prompt" })}
          options={[
            { value: "yes", label: "覆盖" },
            { value: "no", label: "不覆盖" },
            { value: "prompt", label: "询问" },
          ]}
        />
      </Field>
      <Field query={query} flag="-loglevel" label="日志级别" help="info 是默认，不写进命令。排查滤镜图时再用 debug。">
        <SelectInput
          value={data.global.loglevel}
          onChange={(loglevel) => data.patchGlobal({ loglevel })}
          options={LOGLEVELS.map((value) => ({ value, label: value }))}
        />
      </Field>
      <Field query={query} flag="-hide_banner" label="隐藏版本横幅" help="少一行版权声明，日志更干净。">
        <Toggle checked={data.global.hideBanner} onChange={(hideBanner) => data.patchGlobal({ hideBanner })} label="隐藏" />
      </Field>
      <Field query={query} flag="-nostdin" label="不要读标准输入" help="Kotlin 进程调用时应该打开，避免 ffmpeg 吃掉别的输入。">
        <Toggle checked={data.global.nostdin} onChange={(nostdin) => data.patchGlobal({ nostdin })} label="打开" />
      </Field>
      <Field query={query} flag="-progress" label="机器可读进度" help="写到 pipe:1。Kotlin 运行器会把 out_time 打出来。打开后不再加 -stats。">
        <Toggle checked={data.global.progress} onChange={(progress) => data.patchGlobal({ progress })} label="pipe:1" />
      </Field>
      <Field query={query} flag="-stats" label="统计行" help="只在关掉进度管道时使用。">
        <Toggle checked={data.global.stats} onChange={(stats) => data.patchGlobal({ stats })} label="显示统计" />
      </Field>
      <Field query={query} flag="-benchmark" label="结束时打印耗时" help="看滤镜和编码各花了多少时间。">
        <Toggle checked={data.global.benchmark} onChange={(benchmark) => data.patchGlobal({ benchmark })} label="基准" />
      </Field>
      <Field query={query} flag="-threads" label="线程数" help="留空让 ffmpeg 自己决定。">
        <TextInput value={data.global.threads} placeholder="0" onChange={(threads) => data.patchGlobal({ threads })} />
      </Field>
      <Field query={query} flag="-filter_complex_threads" label="滤镜线程" help="复杂滤镜图才有意义。">
        <TextInput value={data.global.filterThreads} onChange={(filterThreads) => data.patchGlobal({ filterThreads })} />
      </Field>
      <Field query={query} flag="-max_muxing_queue_size" label="封装队列" help="音画时间戳差太多、报队列溢出时再加大，例如 1024。">
        <TextInput value={data.global.maxMuxingQueue} onChange={(maxMuxingQueue) => data.patchGlobal({ maxMuxingQueue })} />
      </Field>
      <Field query={query} flag="-fps_mode" label="帧率模式" help="passthrough 保留原时间戳，cfr 固定帧率，vfr 可变。">
        <SelectInput
          value={data.global.fpsMode}
          onChange={(fpsMode) => data.patchGlobal({ fpsMode })}
          options={[
            { value: "", label: "默认" },
            { value: "passthrough", label: "passthrough" },
            { value: "cfr", label: "cfr" },
            { value: "vfr", label: "vfr" },
            { value: "drop", label: "drop" },
          ]}
        />
      </Field>
      <Field query={query} flag="-copyts / -start_at_zero" label="时间戳" help="复制原始时间戳，或把起点归零。一般转码不用动。">
        <div className="flex flex-col gap-2">
          <Toggle checked={data.global.copyts} onChange={(copyts) => data.patchGlobal({ copyts })} label="copyts" />
          <Toggle
            checked={data.global.startAtZero}
            onChange={(startAtZero) => data.patchGlobal({ startAtZero })}
            label="start_at_zero"
          />
        </div>
      </Field>
      <Field query={query} flag="-avoid_negative_ts" label="负时间戳" help="封装阶段怎么处理小于零的时间戳。auto 适合大多数 MP4。">
        <SelectInput
          value={data.global.avoidNegativeTs}
          onChange={(avoidNegativeTs) => data.patchGlobal({ avoidNegativeTs })}
          options={["auto", "disabled", "make_zero", "make_non_negative"].map((value) => ({ value, label: value }))}
        />
      </Field>
      <Field query={query} flag="-noaccurate_seek" label="关闭精确寻址" help="只在你明确要落在关键帧上时打开。">
        <Toggle
          checked={data.global.noAccurateSeek}
          onChange={(noAccurateSeek) => data.patchGlobal({ noAccurateSeek })}
          label="不精确寻址"
        />
      </Field>
      <Field query={query} flag="-timelimit" label="最长运行秒数" help="超时后 ffmpeg 自己退出。留空表示不限制。">
        <TextInput value={data.global.timelimit} onChange={(timelimit) => data.patchGlobal({ timelimit })} />
      </Field>

      <h3 id="param-input" className="mt-8 font-mono text-xs text-brass">
        输入
      </h3>
      <label className="mt-3 block">
        <span className="mb-2 block text-sm text-mist">正在配置</span>
        <select value={input.id} onChange={(event) => setInputId(event.target.value)}>
          {data.inputs.map((item, index) => (
            <option key={item.id} value={item.id}>
              输入 {index + 1} · {item.kind === "lavfi" ? item.lavfi : item.location || "未命名"}
            </option>
          ))}
        </select>
      </label>
      <Field query={query} flag="-ss" label="起点" help="输入侧先跳再解码，快。输出侧从开头解到那个点，慢但最稳。流复制时输入侧可能停在前一个关键帧。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput mono value={input.seek} placeholder="00:01:12.5" onChange={(seek) => data.patchInput(input.id, { seek })} />
          <SelectInput
            value={input.seekPlace}
            onChange={(seekPlace) => data.patchInput(input.id, { seekPlace: seekPlace as "input" | "output" })}
            options={[
              { value: "input", label: "输入侧，快" },
              { value: "output", label: "输出侧，精确" },
            ]}
          />
        </div>
      </Field>
      <Field query={query} flag="-t / -to" label="读到哪里" help="-t 是时长，-to 是终点时间。都写在 -i 前面，限制这一路读入。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={input.duration} placeholder="时长 00:00:30" onChange={(duration) => data.patchInput(input.id, { duration })} />
          <TextInput value={input.to} placeholder="终点 00:02:00" onChange={(to) => data.patchInput(input.id, { to })} />
        </div>
      </Field>
      <Field query={query} flag="-stream_loop" label="循环" help="-1 表示无限循环。做背景循环或短片垫长时再用。">
        <TextInput value={input.streamLoop} placeholder="-1" onChange={(streamLoop) => data.patchInput(input.id, { streamLoop })} />
      </Field>
      <Field query={query} flag="-re" label="按原速读取" help="推流或直播时打开。普通转码打开只会变慢。">
        <Toggle checked={input.realtime} onChange={(realtime) => data.patchInput(input.id, { realtime })} label="实时读取" />
      </Field>
      <Field query={query} flag="-f" label="输入格式" help="留空则探测。虚拟源会强制 lavfi。">
        <TextInput mono value={input.format} placeholder="mov, mpegts, image2" onChange={(format) => data.patchInput(input.id, { format })} />
      </Field>
      <Field query={query} flag="-hwaccel" label="硬件解码" help="解码器加速。编码器用参数页里的 NVENC / QSV / VideoToolbox，两套不是一回事。">
        <SelectInput
          value={input.hwaccel}
          onChange={(hwaccel) => data.patchInput(input.id, { hwaccel })}
          options={HWACCELS.map((value) => ({ value, label: value || "关闭" }))}
        />
      </Field>
      <Field query={query} flag="-hwaccel_device" label="硬件设备" help="例如 /dev/dri/renderD128 或 cuda 设备号。">
        <TextInput mono value={input.hwaccelDevice} onChange={(hwaccelDevice) => data.patchInput(input.id, { hwaccelDevice })} />
      </Field>
      <Field query={query} flag="-hwaccel_output_format" label="硬件输出格式" help="想让帧留在显存里时填写，例如 cuda 或 nv12。">
        <TextInput
          mono
          value={input.hwaccelOutputFormat}
          onChange={(hwaccelOutputFormat) => data.patchInput(input.id, { hwaccelOutputFormat })}
        />
      </Field>
      <Field query={query} flag="-itsoffset" label="时间偏移" help="这一路整体平移。正数表示推迟。单位秒。">
        <TextInput value={input.itsoffset} placeholder="0.2" onChange={(itsoffset) => data.patchInput(input.id, { itsoffset })} />
      </Field>
      <Field query={query} flag="-thread_queue_size" label="输入队列" help="多路实时输入丢帧时再加大，例如 1024。">
        <TextInput value={input.threadQueueSize} onChange={(threadQueueSize) => data.patchInput(input.id, { threadQueueSize })} />
      </Field>
      <Field query={query} flag="-probesize / -analyzeduration" label="探测预算" help="有些传输流头很长，探测不够会认错编码。单位分别是字节和微秒。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={input.probesize} placeholder="5000000" onChange={(probesize) => data.patchInput(input.id, { probesize })} />
          <TextInput
            value={input.analyzeduration}
            placeholder="5000000"
            onChange={(analyzeduration) => data.patchInput(input.id, { analyzeduration })}
          />
        </div>
      </Field>
      <Field query={query} flag="-fflags" label="格式标志" help="例如 +genpts、+discardcorrupt、+igndts。懂含义再写。">
        <TextInput mono value={input.fflags} onChange={(fflags) => data.patchInput(input.id, { fflags })} />
      </Field>
      <Field query={query} flag="额外输入参数" label="原始输入参数" help="原样拆成参数，加在 -i 前面。用引号包住含空格的值。">
        <TextInput mono value={input.extra} onChange={(extra) => data.patchInput(input.id, { extra })} />
      </Field>

      <h3 id="param-video" className="mt-8 font-mono text-xs text-brass">
        视频
      </h3>
      <Field query={query} flag="-c:v" label="视频编码器" help="复制流不能再加画面滤镜。硬件编码器要这个构建真的编进去。">
        <SelectInput
          value={data.video.codec}
          onChange={(codec) =>
            data.patchVideo({
              codec,
              preset: defaultPreset(codec),
              pixFmt: defaultPix(codec),
            })
          }
          options={VIDEO_CODECS.map((codec) => ({ value: codec.value, label: codec.label }))}
        />
        <p className="mt-2 text-sm text-mist">{availabilityLabel(videoState)}</p>
      </Field>
      <Field query={query} flag="-preset / -quality" label="预设" help="x264 用速度档，NVENC 用 p1–p7，AMF 用 quality。编码器不支持时不会写入。">
        {presets.length ? (
          <SelectInput
            value={data.video.codec === "libsvtav1" ? data.video.svtPreset : data.video.preset}
            onChange={(preset) =>
              data.video.codec === "libsvtav1" ? data.patchVideo({ svtPreset: preset, preset }) : data.patchVideo({ preset })
            }
            options={presets}
          />
        ) : (
          <TextInput value={data.video.preset} placeholder="此编码器无预设" onChange={(preset) => data.patchVideo({ preset })} />
        )}
      </Field>
      <Field query={query} flag="-tune" label="调优" help="只用于 libx264 / libx265。film 偏电影，animation 偏平涂，zerolatency 偏直播。">
        <SelectInput
          value={data.video.tune}
          onChange={(tune) => data.patchVideo({ tune })}
          options={["", "film", "animation", "grain", "stillimage", "fastdecode", "zerolatency"].map((value) => ({
            value,
            label: value || "不指定",
          }))}
        />
      </Field>
      <Field query={query} flag="-crf / -b:v" label="码率控制" help="CRF 看质量，ABR 平均码率，CBR 锁死码率。VP9/AV1 的 CRF 仍会带 -b:v 0。">
        <SelectInput
          value={data.video.rateMode}
          onChange={(rateMode) => data.patchVideo({ rateMode: rateMode as "crf" | "abr" | "cbr" })}
          options={[
            { value: "crf", label: "CRF / CQ" },
            { value: "abr", label: "平均码率" },
            { value: "cbr", label: "恒定码率" },
          ]}
        />
      </Field>
      <Field query={query} flag="-crf" label="CRF" help="x264 常用 18–23，x265 再加 2 到 4。越小越清楚、越大文件越小。">
        <TextInput value={data.video.crf} onChange={(crf) => data.patchVideo({ crf })} />
      </Field>
      <Field query={query} flag="-cq" label="NVENC CQ" help="NVENC 不认 CRF，用 -cq。没填就回退到 CRF 那一栏。">
        <TextInput value={data.video.cq} onChange={(cq) => data.patchVideo({ cq })} />
      </Field>
      <Field query={query} flag="-b:v / -maxrate / -minrate / -bufsize" label="码率" help="带单位，如 2500k 或 8M。纯数字会被当成比特。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.video.bitrate} placeholder="目标" onChange={(bitrate) => data.patchVideo({ bitrate })} />
          <TextInput value={data.video.maxrate} placeholder="上限" onChange={(maxrate) => data.patchVideo({ maxrate })} />
          <TextInput value={data.video.minrate} placeholder="下限" onChange={(minrate) => data.patchVideo({ minrate })} />
          <TextInput value={data.video.bufsize} placeholder="缓冲" onChange={(bufsize) => data.patchVideo({ bufsize })} />
        </div>
      </Field>
      <Field query={query} flag="-g / -keyint_min / -bf / -refs" label="GOP 与参考帧" help="关键帧间隔、最小间隔、B 帧数、参考帧。直播常把 -g 设成帧率的两倍。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.video.gop} placeholder="GOP" onChange={(gop) => data.patchVideo({ gop })} />
          <TextInput value={data.video.keyintMin} placeholder="keyint_min" onChange={(keyintMin) => data.patchVideo({ keyintMin })} />
          <TextInput value={data.video.bf} placeholder="B 帧" onChange={(bf) => data.patchVideo({ bf })} />
          <TextInput value={data.video.refs} placeholder="参考帧" onChange={(refs) => data.patchVideo({ refs })} />
        </div>
      </Field>
      <Field query={query} flag="-profile:v / -level" label="档次与级别" help="网页 H.264 常用 high / 4.1。ProRes 用数字：0 proxy，1 LT，2 标准，3 HQ，4 4444，5 XQ。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.video.profile} placeholder="high" onChange={(profile) => data.patchVideo({ profile })} />
          <TextInput value={data.video.level} placeholder="4.1" onChange={(level) => data.patchVideo({ level })} />
        </div>
      </Field>
      <Field query={query} flag="-pix_fmt" label="像素格式" help="网页播放用 yuv420p。十位母带再用 yuv422p10le。">
        <SelectInput value={data.video.pixFmt} onChange={(pixFmt) => data.patchVideo({ pixFmt })} options={PIX} />
      </Field>
      <Field query={query} flag="-r" label="输出帧率" help="强制输出帧率。已经在滤镜里用了 fps 就不要两边打架。">
        <TextInput value={data.video.fps} placeholder="30" onChange={(fps) => data.patchVideo({ fps })} />
      </Field>
      <Field query={query} flag="-tag:v" label="视频标签" help="例如 hvc1，让苹果播放器认 HEVC。">
        <TextInput mono value={data.video.tag} onChange={(tag) => data.patchVideo({ tag })} />
      </Field>
      <Field query={query} flag="-color_primaries / -color_trc / -colorspace / -color_range" label="色彩标记" help="只写标记，不转换像素。要转换用滤镜里的色彩空间。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.video.colorPrimaries} placeholder="bt709" onChange={(colorPrimaries) => data.patchVideo({ colorPrimaries })} />
          <TextInput value={data.video.colorTrc} placeholder="bt709" onChange={(colorTrc) => data.patchVideo({ colorTrc })} />
          <TextInput value={data.video.colorspace} placeholder="bt709" onChange={(colorspace) => data.patchVideo({ colorspace })} />
          <SelectInput
            value={data.video.colorRange}
            onChange={(colorRange) => data.patchVideo({ colorRange })}
            options={[
              { value: "", label: "不指定" },
              { value: "tv", label: "tv" },
              { value: "pc", label: "pc" },
            ]}
          />
        </div>
      </Field>
      <Field query={query} flag="-cpu-used / -deadline" label="VP9 / AOM 速度" help="cpu-used 越大越快越松。deadline 用 good，别用 best，除非你愿意等。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.video.cpuUsed} placeholder="cpu-used" onChange={(cpuUsed) => data.patchVideo({ cpuUsed })} />
          <SelectInput
            value={data.video.deadline}
            onChange={(deadline) => data.patchVideo({ deadline })}
            options={["good", "realtime", "best"].map((value) => ({ value, label: value }))}
          />
        </div>
      </Field>
      <Field query={query} flag="-spatial-aq / -temporal-aq" label="NVENC 自适应量化" help="只对 NVENC 写入。空间 AQ 通常值得开。">
        <div className="flex flex-col gap-2">
          <Toggle checked={data.video.spatialAq} onChange={(spatialAq) => data.patchVideo({ spatialAq })} label="spatial-aq" />
          <Toggle checked={data.video.temporalAq} onChange={(temporalAq) => data.patchVideo({ temporalAq })} label="temporal-aq" />
        </div>
      </Field>
      <Field query={query} flag="-pass" label="两遍编码" help="libx264、libx265、VP9、AOM 会生成两条命令。第一遍输出到空设备。">
        <Toggle checked={data.video.twoPass} onChange={(twoPass) => data.patchVideo({ twoPass })} label="两遍" />
      </Field>
      <Field query={query} flag="-force_key_frames" label="强制关键帧" help="表达式，例如 expr:gte(t,n_forced*2)。">
        <TextInput mono value={data.video.forceKeyFrames} onChange={(forceKeyFrames) => data.patchVideo({ forceKeyFrames })} />
      </Field>
      <Field query={query} flag="额外视频参数" label="原始视频参数" help="例如 -x264-params aq-mode=3。整段按空格拆开。">
        <TextInput mono value={data.video.extra} onChange={(extra) => data.patchVideo({ extra })} />
      </Field>

      <h3 id="param-audio" className="mt-8 font-mono text-xs text-brass">
        音频
      </h3>
      <Field query={query} flag="-c:a" label="音频编码器" help="FLAC 和 PCM 不写码率。MP3/Vorbis 若填了质量系数，就用 -q:a。">
        <SelectInput
          value={data.audio.codec}
          onChange={(codec) => data.patchAudio({ codec })}
          options={AUDIO_CODECS.map((codec) => ({ value: codec.value, label: codec.label }))}
        />
        <p className="mt-2 text-sm text-mist">{availabilityLabel(audioState)}</p>
      </Field>
      <Field query={query} flag="-b:a" label="音频码率" help="AAC 对白 160k–192k 通常够。Opus 128k 已经很满。">
        <TextInput value={data.audio.bitrate} placeholder="192k" onChange={(bitrate) => data.patchAudio({ bitrate })} />
      </Field>
      <Field query={query} flag="-q:a" label="质量系数" help="LAME 里 0 最好、9 最小，常用 2–5。留空则用码率。">
        <TextInput value={data.audio.quality} onChange={(quality) => data.patchAudio({ quality })} />
      </Field>
      <Field query={query} flag="-ar / -ac" label="采样率与声道" help="视频成片 48000 / 2。播客有时用 44100 / 1。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.audio.sampleRate} placeholder="48000" onChange={(sampleRate) => data.patchAudio({ sampleRate })} />
          <TextInput value={data.audio.channels} placeholder="2" onChange={(channels) => data.patchAudio({ channels })} />
        </div>
      </Field>
      <Field query={query} flag="-sample_fmt" label="采样格式" help="例如 fltp、s16、s32。不确定就留空。">
        <TextInput mono value={data.audio.sampleFmt} onChange={(sampleFmt) => data.patchAudio({ sampleFmt })} />
      </Field>
      <Field query={query} flag="-profile:a" label="AAC 档次" help="aac_low 最通用。留空用编码器默认。">
        <TextInput value={data.audio.profile} placeholder="aac_low" onChange={(profile) => data.patchAudio({ profile })} />
      </Field>
      <Field query={query} flag="-application / -vbr" label="Opus" help="audio 适合音乐和混音，voip 适合语音。只在 libopus 时写入。">
        <div className="grid gap-3 md:grid-cols-2">
          <SelectInput
            value={data.audio.application}
            onChange={(application) => data.patchAudio({ application })}
            options={["audio", "voip", "lowdelay"].map((value) => ({ value, label: value }))}
          />
          <SelectInput
            value={data.audio.vbr}
            onChange={(vbr) => data.patchAudio({ vbr })}
            options={[
              { value: "on", label: "vbr on" },
              { value: "off", label: "vbr off" },
              { value: "constrained", label: "constrained" },
            ]}
          />
        </div>
      </Field>
      <Field query={query} flag="-cutoff" label="截止频率" help="低码率 AAC 有时手动收到 18000 左右。">
        <TextInput value={data.audio.cutoff} onChange={(cutoff) => data.patchAudio({ cutoff })} />
      </Field>
      <Field query={query} flag="额外音频参数" label="原始音频参数" help="原样追加到音频选项后面。">
        <TextInput mono value={data.audio.extra} onChange={(extra) => data.patchAudio({ extra })} />
      </Field>

      <h3 id="param-mux" className="mt-8 font-mono text-xs text-brass">
        封装
      </h3>
      <Field query={query} flag="-f" label="封装格式" help="选「按扩展名」时不写 -f，由文件名决定。">
        <SelectInput
          value={data.output.container}
          onChange={(container) => data.patchOutput({ container })}
          options={CONTAINERS.map((item) => ({ value: item.value, label: item.label }))}
        />
      </Field>
      <Field query={query} flag="-ss / -t" label="输出区间" help="这是输出选项，在全部输入之后生效。和某一路输入上的起点不是同一个开关。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.output.start} placeholder="起点" onChange={(start) => data.patchOutput({ start })} />
          <TextInput value={data.output.duration} placeholder="时长" onChange={(duration) => data.patchOutput({ duration })} />
        </div>
      </Field>
      <Field query={query} flag="-vn / -an / -sn / -dn" label="丢掉哪类流" help="做 GIF 或播客时把不需要的流关掉。">
        <div className="flex flex-col gap-2">
          <Toggle
            checked={data.output.videoDisabled}
            onChange={(videoDisabled) => data.patchOutput({ videoDisabled })}
            label="去掉视频"
          />
          <Toggle
            checked={data.output.audioDisabled}
            onChange={(audioDisabled) => data.patchOutput({ audioDisabled })}
            label="去掉音频"
          />
          <Toggle
            checked={data.output.subtitleDisabled}
            onChange={(subtitleDisabled) => data.patchOutput({ subtitleDisabled })}
            label="去掉字幕"
          />
          <Toggle
            checked={data.output.dataDisabled}
            onChange={(dataDisabled) => data.patchOutput({ dataDisabled })}
            label="去掉数据流"
          />
        </div>
      </Field>
      <Field query={query} flag="-c:s" label="字幕编码器" help="MP4 软字幕用 mov_text。烧进画面请用滤镜，而不是这里。">
        <SelectInput
          value={data.output.subtitleCodec}
          onChange={(subtitleCodec) => data.patchOutput({ subtitleCodec })}
          options={SUBTITLE_CODECS}
        />
      </Field>
      <Field query={query} flag="-map" label="流映射" help="自动：简单链用 ffmpeg 默认，复合滤镜改映射到滤镜标签。第一路会强行 -map 0。">
        <SelectInput
          value={data.output.mapMode}
          onChange={(mapMode) => data.patchOutput({ mapMode: mapMode as "auto" | "all-first" | "custom" })}
          options={[
            { value: "auto", label: "自动" },
            { value: "all-first", label: "第一路全部流" },
            { value: "custom", label: "自定义" },
          ]}
        />
      </Field>
      <Field query={query} flag="-map" label="自定义映射" help="一行一个，不要自己写 -map。例如 0:v:0 或 [v]。">
        <textarea value={data.output.customMaps} onChange={(event) => data.patchOutput({ customMaps: event.target.value })} />
      </Field>
      <Field query={query} flag="-map_metadata / -map_chapters" label="元数据与章节" help="-1 表示丢掉。0 表示从第一路复制。留空则沿用 ffmpeg 默认。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.output.mapMetadata} placeholder="元数据" onChange={(mapMetadata) => data.patchOutput({ mapMetadata })} />
          <TextInput value={data.output.mapChapters} placeholder="章节" onChange={(mapChapters) => data.patchOutput({ mapChapters })} />
        </div>
      </Field>
      <Field query={query} flag="-disposition" label="流倾向" help="写成 流=值，例如 v:0=default 或 v:1=attached_pic。">
        <TextInput mono value={data.output.disposition} onChange={(disposition) => data.patchOutput({ disposition })} />
      </Field>
      <Field query={query} flag="-shortest" label="以最短的流为准" help="配音比画面短、又不想留黑尾时打开。">
        <Toggle checked={data.output.shortest} onChange={(shortest) => data.patchOutput({ shortest })} label="shortest" />
      </Field>
      <Field query={query} flag="-movflags +faststart" label="快速开始" help="把 moov 挪到文件头，网页边下边播。只对 MP4/MOV 写入。">
        <Toggle checked={data.output.faststart} onChange={(faststart) => data.patchOutput({ faststart })} label="faststart" />
      </Field>
      <Field query={query} flag="-fs" label="文件大小上限" help="到达字节数就停。例如 25000000。">
        <TextInput value={data.output.fileSizeLimit} onChange={(fileSizeLimit) => data.patchOutput({ fileSizeLimit })} />
      </Field>
      <Field query={query} flag="-muxdelay / -muxpreload" label="封装延迟" help="单位秒。传输流里有时要压到 0。">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput value={data.output.muxdelay} placeholder="muxdelay" onChange={(muxdelay) => data.patchOutput({ muxdelay })} />
          <TextInput value={data.output.muxpreload} placeholder="muxpreload" onChange={(muxpreload) => data.patchOutput({ muxpreload })} />
        </div>
      </Field>
      <Field query={query} flag="-target" label="旧式目标" help="vcd、svcd、dvd、dv。现代成片几乎不用。">
        <SelectInput
          value={data.output.target}
          onChange={(target) => data.patchOutput({ target })}
          options={[
            { value: "", label: "无" },
            { value: "vcd", label: "vcd" },
            { value: "svcd", label: "svcd" },
            { value: "dvd", label: "dvd" },
            { value: "dv", label: "dv" },
          ]}
        />
      </Field>
      <Field query={query} flag="-metadata" label="元数据" help="空值不会写入。键用 title、artist、comment、album 这类 ffmpeg 认得的名字。">
        <div className="flex flex-col gap-3">
          {data.output.metadata.map((row) => (
            <div key={row.id} className="grid gap-2 md:grid-cols-[8rem_minmax(0,1fr)_auto]">
              <TextInput mono value={row.key} placeholder="title" onChange={(key) => data.patchMetadata(row.id, { key })} />
              <TextInput value={row.value} placeholder="值" onChange={(value) => data.patchMetadata(row.id, { value })} />
              <Button tone="danger" onClick={() => data.removeMetadata(row.id)}>
                删除
              </Button>
            </div>
          ))}
          <Button onClick={data.addMetadata}>添加一条</Button>
        </div>
      </Field>
      <Field query={query} flag="额外输出参数" label="原始输出参数" help="加在输出文件名之前。">
        <TextInput mono value={data.output.extra} onChange={(extra) => data.patchOutput({ extra })} />
      </Field>
    </section>
  );
}
