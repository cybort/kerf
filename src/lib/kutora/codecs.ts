export interface CodecOption {
  value: string;
  label: string;
  /** OR-list of `--enable-*` names from `ffmpeg -buildconf`. Empty means built-in. */
  needs?: string[];
}

export const VIDEO_CODECS: CodecOption[] = [
  { value: "libx264", label: "H.264 · libx264", needs: ["libx264"] },
  { value: "libx265", label: "H.265 · libx265", needs: ["libx265"] },
  { value: "libvpx-vp9", label: "VP9 · libvpx", needs: ["libvpx"] },
  { value: "libaom-av1", label: "AV1 · libaom", needs: ["libaom"] },
  { value: "libsvtav1", label: "AV1 · SVT", needs: ["libsvtav1"] },
  { value: "h264_nvenc", label: "H.264 · NVENC", needs: ["nvenc", "ffnvcodec", "cuda"] },
  { value: "hevc_nvenc", label: "H.265 · NVENC", needs: ["nvenc", "ffnvcodec", "cuda"] },
  { value: "av1_nvenc", label: "AV1 · NVENC", needs: ["nvenc", "ffnvcodec", "cuda"] },
  { value: "h264_qsv", label: "H.264 · QSV", needs: ["libvpl", "libmfx"] },
  { value: "hevc_qsv", label: "H.265 · QSV", needs: ["libvpl", "libmfx"] },
  { value: "h264_amf", label: "H.264 · AMF", needs: ["amf"] },
  { value: "hevc_amf", label: "H.265 · AMF", needs: ["amf"] },
  { value: "h264_videotoolbox", label: "H.264 · VideoToolbox", needs: ["videotoolbox"] },
  { value: "hevc_videotoolbox", label: "H.265 · VideoToolbox", needs: ["videotoolbox"] },
  { value: "prores_ks", label: "ProRes · prores_ks" },
  { value: "ffv1", label: "FFV1 · 无损" },
  { value: "mpeg4", label: "MPEG-4 Part 2" },
  { value: "libxvid", label: "Xvid", needs: ["libxvid"] },
  { value: "mjpeg", label: "MJPEG" },
  { value: "png", label: "PNG" },
  { value: "gif", label: "GIF" },
  { value: "rawvideo", label: "原始视频" },
  { value: "copy", label: "复制流 · copy" },
];

export const AUDIO_CODECS: CodecOption[] = [
  { value: "aac", label: "AAC · 内置" },
  { value: "libmp3lame", label: "MP3 · LAME", needs: ["libmp3lame"] },
  { value: "libopus", label: "Opus", needs: ["libopus"] },
  { value: "libvorbis", label: "Vorbis", needs: ["libvorbis"] },
  { value: "flac", label: "FLAC" },
  { value: "alac", label: "ALAC" },
  { value: "ac3", label: "AC-3" },
  { value: "eac3", label: "E-AC-3" },
  { value: "pcm_s16le", label: "PCM 16-bit" },
  { value: "pcm_s24le", label: "PCM 24-bit" },
  { value: "libfdk_aac", label: "AAC · fdk", needs: ["libfdk-aac", "libfdk_aac"] },
  { value: "copy", label: "复制流 · copy" },
];

export const SUBTITLE_CODECS = [
  { value: "copy", label: "复制 · copy" },
  { value: "mov_text", label: "mov_text（MP4）" },
  { value: "srt", label: "SRT" },
  { value: "ass", label: "ASS" },
  { value: "webvtt", label: "WebVTT" },
  { value: "dvdsub", label: "DVD 位图字幕" },
];

export const CONTAINERS = [
  { value: "auto", label: "按扩展名" },
  { value: "mp4", label: "MP4" },
  { value: "mov", label: "MOV" },
  { value: "matroska", label: "Matroska · MKV" },
  { value: "webm", label: "WebM" },
  { value: "mpegts", label: "MPEG-TS" },
  { value: "avi", label: "AVI" },
  { value: "nut", label: "NUT" },
  { value: "gif", label: "GIF" },
  { value: "apng", label: "APNG" },
  { value: "mp3", label: "MP3" },
  { value: "ogg", label: "Ogg" },
  { value: "opus", label: "Opus" },
  { value: "flac", label: "FLAC" },
  { value: "wav", label: "WAV" },
  { value: "adts", label: "ADTS · AAC" },
];

export const LOGLEVELS = ["quiet", "panic", "fatal", "error", "warning", "info", "verbose", "debug", "trace"];

export const HWACCELS = [
  "",
  "auto",
  "cuda",
  "vaapi",
  "qsv",
  "d3d11va",
  "dxva2",
  "videotoolbox",
  "amf",
  "vulkan",
  "vdpau",
  "opencl",
];

export function defaultPreset(codec: string): string {
  if (codec.endsWith("_nvenc")) return "p4";
  if (codec === "libx264" || codec === "libx265" || codec.endsWith("_qsv")) return "medium";
  if (codec === "libsvtav1") return "8";
  if (codec.endsWith("_amf")) return "balanced";
  return "";
}

export function defaultPix(codec: string): string {
  if (codec === "prores_ks" || codec === "ffv1") return "yuv422p10le";
  if (codec === "copy" || codec === "png" || codec === "gif" || codec === "rawvideo") return "";
  return "yuv420p";
}

export function presetOptions(codec: string): { value: string; label: string }[] {
  if (codec.endsWith("_nvenc")) {
    return ["p1", "p2", "p3", "p4", "p5", "p6", "p7"].map((value) => ({
      value,
      label: value === "p1" ? "p1 · 最快" : value === "p7" ? "p7 · 最慢" : value,
    }));
  }
  if (codec.endsWith("_amf")) {
    return [
      { value: "speed", label: "speed" },
      { value: "balanced", label: "balanced" },
      { value: "quality", label: "quality" },
    ];
  }
  if (codec === "libsvtav1") {
    return Array.from({ length: 14 }, (_, i) => ({
      value: String(i),
      label: i === 8 ? "8 · 默认" : String(i),
    }));
  }
  if (codec === "libx264" || codec === "libx265" || codec.endsWith("_qsv")) {
    return ["ultrafast", "superfast", "veryfast", "faster", "fast", "medium", "slow", "slower", "veryslow"].map(
      (value) => ({ value, label: value }),
    );
  }
  return [];
}

export type ProbeAvailability = "builtin" | "unknown" | "yes" | "no";

export function codecAvailability(codec: string, flags: Set<string>, list: CodecOption[]): ProbeAvailability {
  const found = list.find((item) => item.value === codec);
  if (!found?.needs?.length) return "builtin";
  if (flags.size === 0) return "unknown";
  return found.needs.some((flag) => flags.has(flag)) ? "yes" : "no";
}
