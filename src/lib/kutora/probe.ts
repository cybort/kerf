export interface ProbeInfo {
  version: string | null;
  flags: Set<string>;
}

export function parseProbe(text: string): ProbeInfo {
  const version = text.match(/ffmpeg version\s+(\S+)/i)?.[1] ?? null;
  const flags = new Set<string>();
  const re = /--enable-([A-Za-z0-9_-]+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    flags.add(match[1].toLowerCase());
  }
  return { version, flags };
}

export const FEATURE_FLAGS: { flag: string; label: string }[] = [
  { flag: "gpl", label: "GPL" },
  { flag: "libx264", label: "libx264" },
  { flag: "libx265", label: "libx265" },
  { flag: "libvpx", label: "libvpx" },
  { flag: "libaom", label: "libaom" },
  { flag: "libsvtav1", label: "SVT-AV1" },
  { flag: "libopus", label: "libopus" },
  { flag: "libmp3lame", label: "LAME" },
  { flag: "libvorbis", label: "Vorbis" },
  { flag: "nvenc", label: "NVENC" },
  { flag: "ffnvcodec", label: "ffnvcodec" },
  { flag: "videotoolbox", label: "VideoToolbox" },
  { flag: "libvpl", label: "QSV/libvpl" },
  { flag: "amf", label: "AMF" },
  { flag: "vaapi", label: "VAAPI" },
  { flag: "libass", label: "libass" },
  { flag: "libfreetype", label: "freetype" },
];
