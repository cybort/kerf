import { AUDIO_CODECS, VIDEO_CODECS, codecAvailability } from "./codecs";
import { compileGraph } from "./filters";
import { parseProbe } from "./probe";
import { shellJoin, tokenize } from "./quote";
import type { AudioEncode, BuiltJob, Issue, PlanStep, StudioData, VideoEncode } from "./types";

const RATE = /^\d+(\.\d+)?([kKmM])?$/;

function pushRate(issues: Issue[], label: string, value: string) {
  if (!value.trim()) return;
  if (!RATE.test(value.trim())) {
    issues.push({ level: "warn", message: `${label}「${value}」不像码率。示例：192k、8M。` });
  } else if (/^\d+(\.\d+)?$/.test(value.trim())) {
    issues.push({ level: "warn", message: `${label}没有单位，ffmpeg 会按比特理解。多半你想写 ${value.trim()}k。` });
  }
}

function extOf(path: string): string {
  const base = path.split(/[/\\]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  return dot >= 0 ? base.slice(dot + 1).toLowerCase() : "";
}

function binaryOf(data: StudioData): string {
  if (data.engine.mode === "path") return data.engine.binaryPath.trim() || "ffmpeg";
  if (data.engine.mode === "url") return "ffmpeg";
  const prefix = data.engine.prefix.trim().replace(/\/$/, "") || "build/ffmpeg";
  return `${prefix}/bin/ffmpeg`;
}

function isAudioMap(map: string): boolean {
  return map === "[a]" || map === "[ca]" || map === "[mix]" || map === "[xf]" || /:a/.test(map);
}

function supportsCrf(codec: string): boolean {
  return codec === "libx264" || codec === "libx265";
}

function usesQuantizer(codec: string): boolean {
  return codec === "mpeg4" || codec === "mjpeg" || codec === "libxvid";
}

function pushVideo(args: string[], video: VideoEncode, issues: Issue[]) {
  const codec = video.codec;
  args.push("-c:v", codec);
  if (codec === "copy") {
    if (video.bitrate || video.fps || video.pixFmt || video.crf || video.preset) {
      issues.push({ level: "warn", message: "视频是流复制，帧率、像素格式、预设和码率不会生效。" });
    }
    return;
  }

  if ((codec === "libx264" || codec === "libx265" || codec.endsWith("_qsv")) && video.preset) {
    args.push("-preset", video.preset);
  }
  if (codec.endsWith("_nvenc") && video.preset) args.push("-preset", video.preset);
  if (codec.endsWith("_amf") && video.preset) args.push("-quality", video.preset);
  if (codec === "libsvtav1") args.push("-preset", video.svtPreset || video.preset || "8");
  if ((codec === "libx264" || codec === "libx265") && video.tune) args.push("-tune", video.tune);

  if (codec === "prores_ks") {
    args.push("-profile:v", video.profile || "3");
    if (video.pixFmt) args.push("-pix_fmt", video.pixFmt);
    return;
  }

  if (codec === "ffv1") {
    args.push("-level", video.level || "3");
    if (video.pixFmt) args.push("-pix_fmt", video.pixFmt);
    if (video.gop) args.push("-g", video.gop);
    return;
  }

  if (codec === "libvpx-vp9" || codec === "libaom-av1") {
    if (video.cpuUsed) args.push("-cpu-used", video.cpuUsed);
    if (codec === "libvpx-vp9" && video.deadline) args.push("-deadline", video.deadline);
    if (video.rateMode === "crf") {
      args.push("-crf", video.crf || "32", "-b:v", video.bitrate || "0");
    } else if (video.bitrate) {
      args.push("-b:v", video.bitrate);
      pushRate(issues, "视频码率", video.bitrate);
    }
  } else if (codec.endsWith("_nvenc")) {
    const rc = video.rateMode === "cbr" ? "cbr" : "vbr";
    args.push("-rc", rc);
    if (video.rateMode === "crf") args.push("-cq", video.cq || video.crf || "23");
    if (video.bitrate && video.rateMode !== "crf") {
      args.push("-b:v", video.bitrate);
      pushRate(issues, "视频码率", video.bitrate);
    }
    if (video.maxrate) args.push("-maxrate", video.maxrate);
    if (video.bufsize) args.push("-bufsize", video.bufsize);
    if (video.spatialAq) args.push("-spatial-aq", "1");
    if (video.temporalAq) args.push("-temporal-aq", "1");
  } else if (codec.endsWith("_qsv") || codec.endsWith("_amf")) {
    if (video.rateMode === "crf") args.push("-global_quality", video.crf || "23");
    else if (video.bitrate) args.push("-b:v", video.bitrate);
  } else if (codec.includes("videotoolbox")) {
    if (video.bitrate) args.push("-b:v", video.bitrate);
    else if (video.crf) args.push("-q:v", video.crf);
    if (video.profile) args.push("-profile:v", video.profile);
  } else if (usesQuantizer(codec)) {
    if (video.rateMode === "crf") args.push("-q:v", video.crf || "4");
    else if (video.bitrate) args.push("-b:v", video.bitrate);
  } else if (supportsCrf(codec)) {
    if (video.rateMode === "crf") args.push("-crf", video.crf || "20");
    if (video.rateMode !== "crf" && video.bitrate) {
      args.push("-b:v", video.bitrate);
      pushRate(issues, "视频码率", video.bitrate);
    }
    if (video.rateMode === "cbr" && video.bitrate) {
      args.push("-minrate", video.minrate || video.bitrate);
      args.push("-maxrate", video.maxrate || video.bitrate);
    } else {
      if (video.maxrate) args.push("-maxrate", video.maxrate);
      if (video.minrate) args.push("-minrate", video.minrate);
    }
    if (video.bufsize) args.push("-bufsize", video.bufsize);
    if (video.profile) args.push("-profile:v", video.profile);
    if (video.level) args.push("-level", video.level);
    if (video.refs) args.push("-refs", video.refs);
  } else if (codec === "libsvtav1") {
    if (video.rateMode === "crf") args.push("-crf", video.crf || "28");
    else if (video.bitrate) {
      args.push("-b:v", video.bitrate);
      pushRate(issues, "视频码率", video.bitrate);
    }
  } else if (video.bitrate) {
    args.push("-b:v", video.bitrate);
  }

  if (codec.endsWith("_nvenc") || codec.endsWith("_qsv")) {
    if (video.profile) args.push("-profile:v", video.profile);
    if (video.level) args.push("-level", video.level);
  }

  if (video.pixFmt && codec !== "gif" && codec !== "png") args.push("-pix_fmt", video.pixFmt);
  if (video.fps) args.push("-r", video.fps);
  if (video.gop && codec !== "ffv1") args.push("-g", video.gop);
  if (video.keyintMin) args.push("-keyint_min", video.keyintMin);
  if (video.bf) args.push("-bf", video.bf);
  if (video.tag) args.push("-tag:v", video.tag);
  if (video.colorPrimaries) args.push("-color_primaries", video.colorPrimaries);
  if (video.colorTrc) args.push("-color_trc", video.colorTrc);
  if (video.colorspace) args.push("-colorspace", video.colorspace);
  if (video.colorRange) args.push("-color_range", video.colorRange);
  if (video.forceKeyFrames) args.push("-force_key_frames", video.forceKeyFrames);
  if (video.extra.trim()) args.push(...tokenize(video.extra));
}

const LOSSLESS_AUDIO = new Set(["flac", "alac", "pcm_s16le", "pcm_s24le", "copy"]);

function pushAudio(args: string[], audio: AudioEncode, issues: Issue[]) {
  args.push("-c:a", audio.codec);
  if (audio.codec === "copy") return;
  const qualityCodec = audio.codec === "libmp3lame" || audio.codec === "libvorbis";
  if (qualityCodec && audio.quality.trim()) {
    args.push("-q:a", audio.quality.trim());
    if (audio.bitrate.trim()) {
      issues.push({ level: "warn", message: "音频同时写了质量系数和码率，已采用 -q:a。" });
    }
  } else if (audio.bitrate.trim() && !LOSSLESS_AUDIO.has(audio.codec)) {
    args.push("-b:a", audio.bitrate.trim());
    pushRate(issues, "音频码率", audio.bitrate);
  }
  if (audio.sampleRate.trim()) args.push("-ar", audio.sampleRate.trim());
  if (audio.channels.trim()) args.push("-ac", audio.channels.trim());
  if (audio.sampleFmt.trim()) args.push("-sample_fmt", audio.sampleFmt.trim());
  if (audio.codec === "aac" && audio.profile.trim()) args.push("-profile:a", audio.profile.trim());
  if (audio.codec === "libopus") {
    if (audio.application) args.push("-application", audio.application);
    if (audio.vbr) args.push("-vbr", audio.vbr);
  }
  if (audio.cutoff.trim()) args.push("-cutoff", audio.cutoff.trim());
  if (audio.extra.trim()) args.push(...tokenize(audio.extra));
}

function containerOf(data: StudioData): string {
  if (data.output.container !== "auto") return data.output.container;
  const ext = extOf(data.output.path);
  const map: Record<string, string> = {
    mp4: "mp4",
    m4a: "mp4",
    mov: "mov",
    mkv: "matroska",
    webm: "webm",
    ts: "mpegts",
    avi: "avi",
    gif: "gif",
    mp3: "mp3",
    ogg: "ogg",
    opus: "opus",
    flac: "flac",
    wav: "wav",
    aac: "adts",
  };
  return map[ext] ?? "";
}

function faststartOk(container: string): boolean {
  return container === "mp4" || container === "mov" || container === "auto";
}

export function buildJob(data: StudioData): BuiltJob {
  const issues: Issue[] = [];
  const engine = data.engine;
  if (engine.mode === "path") {
    const path = engine.binaryPath.trim();
    if (!path) issues.push({ level: "error", message: "还没有填写 FFmpeg 本地路径。" });
    else if (/^https?:\/\//i.test(path)) issues.push({ level: "error", message: "这是 URL。请改到「远程 URL」模式。" });
    else if (!/[\\/]/.test(path) && !/^ffmpeg(\.exe)?$/i.test(path)) {
      issues.push({ level: "warn", message: "路径里没有目录分隔符。如果它不在 PATH 上，请写绝对路径。" });
    }
  } else if (engine.mode === "url") {
    const url = engine.binaryUrl.trim();
    if (!url) issues.push({ level: "error", message: "还没有填写 FFmpeg 下载 URL。" });
    else {
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
          issues.push({ level: "error", message: "远程地址只接受 http 或 https。" });
        }
        if (/\.(zip|7z|tar|gz|tgz|dmg|exe\.zip)$/i.test(parsed.pathname)) {
          issues.push({
            level: "warn",
            message: "下载器只保存单个可执行文件，不会解压压缩包。压缩包请在本机解开后改用本地路径。",
          });
        }
      } catch {
        issues.push({ level: "error", message: "远程地址不是合法 URL。" });
      }
    }
    if (engine.sha256.trim() && !/^[a-f0-9]{64}$/i.test(engine.sha256.trim())) {
      issues.push({ level: "warn", message: "SHA-256 应该是 64 位十六进制。留空则跳过校验。" });
    }
  } else {
    const source = engine.sourceUrl.trim();
    if (!source) issues.push({ level: "error", message: "还没有填写 FFmpeg 源码地址。" });
    else if (!/^(https?:\/\/|git@)/.test(source)) {
      issues.push({ level: "error", message: "源码地址应为 https:// 或 git@ 开头的 Git 仓库。" });
    }
    if (!engine.sourceRef.trim()) issues.push({ level: "error", message: "源码需要一个分支、标签或提交。" });
    issues.push({
      level: "warn",
      message: "源码构建面向 Linux / macOS 的 configure && make。Windows 请改用远程二进制。",
    });
  }

  data.inputs.forEach((input, index) => {
    const label = `输入 ${index + 1}`;
    if (input.kind === "file" && !input.location.trim()) {
      issues.push({ level: "error", message: `${label}没有路径或 URL。` });
    }
    if (input.kind === "lavfi" && !input.lavfi.trim()) {
      issues.push({ level: "error", message: `${label}没有 lavfi 表达式。` });
    }
  });

  if (!data.output.path.trim()) issues.push({ level: "error", message: "没有输出路径。" });

  const graph = compileGraph(data.inputs.length, data.filters, data.rawFilter);
  for (const message of graph.errors) issues.push({ level: "error", message });
  for (const message of graph.notes) issues.push({ level: "warn", message });

  if (data.video.codec === "copy" && (graph.vf || (graph.complex && !data.output.videoDisabled))) {
    issues.push({ level: "error", message: "画面滤镜不能搭配 -c:v copy。换成编码器，或清空画面滤镜。" });
  }
  if (data.audio.codec === "copy" && graph.af) {
    issues.push({ level: "error", message: "声音滤镜不能搭配 -c:a copy。" });
  }
  if (data.output.videoDisabled && graph.vf) {
    issues.push({ level: "error", message: "已关闭视频，但简单滤镜链仍有画面处理。" });
  }
  if (data.output.audioDisabled && graph.af) {
    issues.push({ level: "error", message: "已关闭音频，但简单滤镜链仍有声音处理。" });
  }

  const container = containerOf(data);
  const ext = extOf(data.output.path);
  if (data.output.container !== "auto" && ext) {
    const expect: Record<string, string[]> = {
      mp4: ["mp4", "m4a"],
      mov: ["mov"],
      matroska: ["mkv"],
      webm: ["webm"],
      mpegts: ["ts", "m2ts"],
      gif: ["gif"],
      mp3: ["mp3"],
      wav: ["wav"],
      flac: ["flac"],
    };
    const ok = expect[data.output.container];
    if (ok && !ok.includes(ext)) {
      issues.push({
        level: "warn",
        message: `封装是 ${data.output.container}，但文件名以 .${ext} 结尾。`,
      });
    }
  }

  if (container === "webm" && !["libvpx-vp9", "libvpx", "libaom-av1", "libsvtav1", "copy", "av1_nvenc"].includes(data.video.codec) && !data.output.videoDisabled) {
    issues.push({ level: "error", message: "WebM 只适合 VP8/VP9/AV1。当前视频编码器放不进去。" });
  }
  if (container === "webm" && !["libopus", "libvorbis", "copy"].includes(data.audio.codec) && !data.output.audioDisabled) {
    issues.push({ level: "error", message: "WebM 音频请用 Opus 或 Vorbis。" });
  }
  if ((container === "mp4" || container === "mov") && data.audio.codec === "libvorbis") {
    issues.push({ level: "warn", message: "Vorbis 放进 MP4/MOV 兼容性很差，建议 AAC 或 Opus。" });
  }
  if (data.video.codec === "prores_ks" && container !== "mov" && container !== "") {
    issues.push({ level: "warn", message: "ProRes 建议用 MOV。" });
  }
  if ((container === "gif" || data.video.codec === "gif") && !data.filters.some((node) => node.enabled && node.kind === "palette") && !data.rawFilter.trim()) {
    issues.push({ level: "warn", message: "GIF 没有调色板滤镜，颜色会很脏。加上「调色板 GIF」。" });
  }
  if (data.video.twoPass && !["libx264", "libx265", "libvpx-vp9", "libaom-av1"].includes(data.video.codec)) {
    issues.push({ level: "warn", message: "当前编码器不会生成两遍命令。" });
  }
  if (data.video.rateMode === "crf" && data.video.bitrate.trim() && supportsCrf(data.video.codec)) {
    issues.push({ level: "warn", message: "CRF 和视频码率同时存在。x264/x265 在有 -b:v 时可能不再按 CRF 工作，这里在 CRF 模式下不写 -b:v。" });
  }

  const probe = parseProbe(engine.probeText);
  if (probe.flags.size) {
    const videoState = codecAvailability(data.video.codec, probe.flags, VIDEO_CODECS);
    const audioState = codecAvailability(data.audio.codec, probe.flags, AUDIO_CODECS);
    if (videoState === "no") issues.push({ level: "warn", message: `探测结果里没有 ${data.video.codec} 所需的编译开关。` });
    if (audioState === "no") issues.push({ level: "warn", message: `探测结果里没有 ${data.audio.codec} 所需的编译开关。` });
    if (data.filters.some((node) => node.enabled && node.kind === "drawtext") && !probe.flags.has("libfreetype")) {
      issues.push({ level: "warn", message: "drawtext 通常需要 --enable-libfreetype，这次探测里没有。" });
    }
  }

  const binary = binaryOf(data);
  const args: string[] = [binary];
  const global = data.global;
  if (global.overwrite === "yes") args.push("-y");
  if (global.overwrite === "no") args.push("-n");
  if (global.hideBanner) args.push("-hide_banner");
  if (global.nostdin) args.push("-nostdin");
  if (global.loglevel && global.loglevel !== "info") args.push("-loglevel", global.loglevel);
  if (global.progress) args.push("-progress", "pipe:1");
  else if (global.stats) args.push("-stats");
  if (global.benchmark) args.push("-benchmark");
  if (global.threads.trim()) args.push("-threads", global.threads.trim());
  if (global.filterThreads.trim()) args.push("-filter_complex_threads", global.filterThreads.trim());
  if (global.maxMuxingQueue.trim()) args.push("-max_muxing_queue_size", global.maxMuxingQueue.trim());
  if (global.timelimit.trim()) args.push("-timelimit", global.timelimit.trim());
  if (global.noAccurateSeek) args.push("-noaccurate_seek");

  const outputSeeks: string[] = [];
  for (const input of data.inputs) {
    if (input.realtime) args.push("-re");
    if (input.seek.trim() && input.seekPlace === "input") args.push("-ss", input.seek.trim());
    if (input.seek.trim() && input.seekPlace === "output") outputSeeks.push(input.seek.trim());
    if (input.duration.trim()) args.push("-t", input.duration.trim());
    if (input.to.trim()) args.push("-to", input.to.trim());
    if (input.streamLoop.trim()) args.push("-stream_loop", input.streamLoop.trim());
    if (input.itsoffset.trim()) args.push("-itsoffset", input.itsoffset.trim());
    if (input.hwaccel) args.push("-hwaccel", input.hwaccel);
    if (input.hwaccelDevice.trim()) args.push("-hwaccel_device", input.hwaccelDevice.trim());
    if (input.hwaccelOutputFormat.trim()) args.push("-hwaccel_output_format", input.hwaccelOutputFormat.trim());
    if (input.threadQueueSize.trim()) args.push("-thread_queue_size", input.threadQueueSize.trim());
    if (input.probesize.trim()) args.push("-probesize", input.probesize.trim());
    if (input.analyzeduration.trim()) args.push("-analyzeduration", input.analyzeduration.trim());
    if (input.fflags.trim()) args.push("-fflags", input.fflags.trim());
    if (input.extra.trim()) args.push(...tokenize(input.extra));
    if (input.kind === "lavfi") {
      args.push("-f", "lavfi", "-i", input.lavfi.trim());
    } else {
      if (input.format.trim()) args.push("-f", input.format.trim());
      args.push("-i", input.location.trim());
    }
  }

  if (global.fpsMode) args.push("-fps_mode", global.fpsMode);
  if (global.copyts) args.push("-copyts");
  if (global.startAtZero) args.push("-start_at_zero");
  if (global.avoidNegativeTs) args.push("-avoid_negative_ts", global.avoidNegativeTs);
  if (data.output.start.trim()) args.push("-ss", data.output.start.trim());
  else if (outputSeeks[0]) args.push("-ss", outputSeeks[0]);
  if (outputSeeks.length > 1) {
    issues.push({ level: "warn", message: "多路输入都写了输出侧 -ss，只会采用第一路。输出页的起点优先生效。" });
  }
  if (data.output.duration.trim()) args.push("-t", data.output.duration.trim());

  const useComplex = Boolean(graph.complex);
  if (useComplex && graph.complex) args.push("-filter_complex", graph.complex);
  else {
    if (graph.vf && !data.output.videoDisabled) args.push("-vf", graph.vf);
    if (graph.af && !data.output.audioDisabled) args.push("-af", graph.af);
  }

  if (data.output.mapMode === "custom") {
    const maps = data.output.customMaps
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (!maps.length) issues.push({ level: "error", message: "自定义映射是空的。" });
    for (const map of maps) args.push("-map", map);
  } else if (data.output.mapMode === "all-first") {
    if (useComplex && !data.rawFilter.trim()) {
      issues.push({ level: "warn", message: "滤镜图会生成新的流。已忽略「只映射第一路」，改用滤镜标签。" });
      for (const map of graph.maps) {
        if (data.output.videoDisabled && !isAudioMap(map)) continue;
        if (data.output.audioDisabled && isAudioMap(map)) continue;
        args.push("-map", map);
      }
    } else {
      args.push("-map", "0");
    }
  } else if (useComplex && !data.rawFilter.trim()) {
    for (const map of graph.maps) {
      if (data.output.videoDisabled && !isAudioMap(map)) continue;
      if (data.output.audioDisabled && isAudioMap(map)) continue;
      args.push("-map", map);
    }
  }

  if (data.output.videoDisabled) args.push("-vn");
  else pushVideo(args, data.video, issues);

  if (data.output.audioDisabled) args.push("-an");
  else pushAudio(args, data.audio, issues);

  if (data.output.subtitleDisabled) args.push("-sn");
  else if (data.output.subtitleCodec) args.push("-c:s", data.output.subtitleCodec);
  if (data.output.dataDisabled) args.push("-dn");

  if (data.output.shortest) args.push("-shortest");
  if (data.output.mapMetadata.trim()) args.push("-map_metadata", data.output.mapMetadata.trim());
  if (data.output.mapChapters.trim()) args.push("-map_chapters", data.output.mapChapters.trim());
  if (data.output.disposition.trim()) {
    const [stream, value] = data.output.disposition.split("=");
    if (stream && value) args.push(`-disposition:${stream.trim()}`, value.trim());
    else issues.push({ level: "warn", message: "倾向标记请写成 0=default 或 v:0=attached_pic。" });
  }
  if (data.output.faststart && faststartOk(container || data.output.container)) {
    args.push("-movflags", "+faststart");
  } else if (data.output.faststart && container && container !== "mp4" && container !== "mov") {
    issues.push({ level: "warn", message: "faststart 只对 MP4/MOV 有意义，已忽略。" });
  }
  if (data.output.fileSizeLimit.trim()) args.push("-fs", data.output.fileSizeLimit.trim());
  if (data.output.muxdelay.trim()) args.push("-muxdelay", data.output.muxdelay.trim());
  if (data.output.muxpreload.trim()) args.push("-muxpreload", data.output.muxpreload.trim());
  if (data.output.target) args.push("-target", data.output.target);
  for (const row of data.output.metadata) {
    if (row.key.trim() && row.value.trim()) args.push("-metadata", `${row.key.trim()}=${row.value.trim()}`);
  }
  if (data.output.extra.trim()) args.push(...tokenize(data.output.extra));
  if (data.output.container !== "auto") args.push("-f", data.output.container);

  const outputPath = data.output.path.trim();
  const twoPass =
    data.video.twoPass &&
    ["libx264", "libx265", "libvpx-vp9", "libaom-av1"].includes(data.video.codec) &&
    !data.output.videoDisabled;

  const commands: string[][] = twoPass
    ? [
        [...args, "-pass", "1", "-passlogfile", "kerf-pass", "-an", "-f", "null", "/dev/null"],
        [...args, "-pass", "2", "-passlogfile", "kerf-pass", outputPath],
      ]
    : [[...args, outputPath]];

  const header = [
    "#!/bin/sh",
    "# 刃帧 KERF 生成。在你自己的机器上运行。",
    engine.mode === "url" ? `# 二进制将由 Kotlin 工程从 ${engine.binaryUrl.trim() || "(未填 URL)"} 取回；此脚本假定 ffmpeg 已在 PATH。` : `# 二进制：${binary}`,
    engine.mode === "source" ? "# 源码模式请先跑 Kotlin 里的构建，再执行下面的命令。" : "",
    twoPass ? "# Windows 把 /dev/null 换成 NUL。" : "",
  ].filter((line) => line !== "");

  const shell = `${header.join("\n")}\n${commands.map((argv) => shellJoin(argv)).join(" &&\n")}\n`;

  const plan: PlanStep[] = [
    {
      title: "定位引擎",
      body:
        engine.mode === "path"
          ? `使用本地文件 ${binaryOf(data) || "（未填）"}，不复制、不下载。`
          : engine.mode === "url"
            ? `下载 ${engine.binaryUrl.trim() || "（未填）"} 到工作目录缓存，可选校验 SHA-256，并标记为可执行。`
            : `克隆 ${engine.sourceUrl.trim() || "（未填）"} @ ${engine.sourceRef || "master"}，configure 后安装到 ${engine.prefix || "build/ffmpeg"}。`,
    },
    {
      title: "打开输入",
      body: data.inputs
        .map((input, index) =>
          input.kind === "lavfi" ? `${index + 1}. lavfi ${input.lavfi}` : `${index + 1}. ${input.location || "（空）"}`,
        )
        .join("\n"),
    },
    {
      title: "滤镜图",
      body: graph.complex || [graph.vf && `-vf ${graph.vf}`, graph.af && `-af ${graph.af}`].filter(Boolean).join("\n") || "无滤镜，直接送编码器。",
    },
    {
      title: "编码",
      body: [
        data.output.videoDisabled ? "视频：丢弃" : `视频：${data.video.codec} · ${data.video.rateMode}`,
        data.output.audioDisabled ? "音频：丢弃" : `音频：${data.audio.codec}`,
        twoPass ? "两遍编码，第一遍写 kerf-pass 日志。" : "单遍编码。",
      ].join("\n"),
    },
    {
      title: "封装",
      body: `写出 ${outputPath || "（空）"}，封装 ${data.output.container}。`,
    },
  ];

  return {
    binary,
    commands,
    shell,
    issues,
    plan,
    graphText: graph.complex || graph.vf || graph.af || "",
  };
}
