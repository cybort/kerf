import { createId } from "./quote";
import type { FilterNode } from "./types";

export interface FilterField {
  key: string;
  label: string;
  kind: "text" | "select" | "toggle" | "range";
  default: string;
  help?: string;
  min?: string;
  max?: string;
  step?: string;
  options?: { value: string; label: string }[];
}

export interface FilterDef {
  kind: string;
  label: string;
  stream: "video" | "audio" | "both";
  group: "画面" | "声音" | "复合";
  summary: string;
  fields: FilterField[];
  compile: (params: Record<string, string>) => string | null;
}

function num(value: string | undefined, fallback = ""): string {
  return (value ?? "").trim() || fallback;
}

function fgQuote(value: string): string {
  const cleaned = value.replace(/'/g, "’");
  if (/^[\w./+\-]+$/.test(cleaned)) return cleaned;
  return `'${cleaned.replace(/\\/g, "\\\\")}'`;
}

function fgExpr(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/:/g, "\\:").replace(/'/g, "’");
}

function atempoChain(raw: string): string | null {
  const speed = Number(raw);
  if (!Number.isFinite(speed) || speed <= 0) return null;
  const parts: string[] = [];
  let rest = speed;
  while (rest < 0.5 - 1e-6) {
    parts.push("atempo=0.5");
    rest /= 0.5;
  }
  while (rest > 2 + 1e-6) {
    parts.push("atempo=2.0");
    rest /= 2;
  }
  const shown = Math.round(rest * 1000) / 1000;
  parts.push(`atempo=${shown}`);
  return parts.join(",");
}

const onOff = [
  { value: "0", label: "关" },
  { value: "1", label: "开" },
];

export const FILTERS: FilterDef[] = [
  {
    kind: "scale",
    label: "缩放",
    stream: "video",
    group: "画面",
    summary: "改变宽高。-2 表示按比例取偶数，利于 yuv420。",
    fields: [
      { key: "w", label: "宽", kind: "text", default: "", help: "如 1920 或 -2" },
      { key: "h", label: "高", kind: "text", default: "", help: "如 -2 或 1080" },
      {
        key: "flags",
        label: "算法",
        kind: "select",
        default: "lanczos",
        options: ["fast_bilinear", "bilinear", "bicubic", "lanczos", "spline", "neighbor"].map((value) => ({
          value,
          label: value,
        })),
      },
      {
        key: "force",
        label: "保持比例",
        kind: "select",
        default: "decrease",
        options: [
          { value: "", label: "不强制" },
          { value: "decrease", label: "只缩小" },
          { value: "increase", label: "只放大" },
        ],
      },
    ],
    compile: (p) => {
      if (!num(p.w) && !num(p.h)) return null;
      const force = num(p.force) ? `:force_original_aspect_ratio=${p.force}` : "";
      const flags = num(p.flags) ? `:flags=${p.flags}` : "";
      return `scale=${num(p.w, "-2")}:${num(p.h, "-2")}${flags}${force}`;
    },
  },
  {
    kind: "crop",
    label: "裁切",
    stream: "video",
    group: "画面",
    summary: "从画面中取出一块。x/y 可用表达式，如 (in_w-out_w)/2。",
    fields: [
      { key: "w", label: "宽", kind: "text", default: "in_w" },
      { key: "h", label: "高", kind: "text", default: "in_h" },
      { key: "x", label: "X", kind: "text", default: "(in_w-out_w)/2" },
      { key: "y", label: "Y", kind: "text", default: "(in_h-out_h)/2" },
    ],
    compile: (p) => `crop=${fgExpr(num(p.w, "in_w"))}:${fgExpr(num(p.h, "in_h"))}:${fgExpr(num(p.x, "0"))}:${fgExpr(num(p.y, "0"))}`,
  },
  {
    kind: "pad",
    label: "补边",
    stream: "video",
    group: "画面",
    summary: "把画面垫到更大画布，常用来做信箱或正方形。",
    fields: [
      { key: "w", label: "宽", kind: "text", default: "1920" },
      { key: "h", label: "高", kind: "text", default: "1080" },
      { key: "x", label: "X", kind: "text", default: "(ow-iw)/2" },
      { key: "y", label: "Y", kind: "text", default: "(oh-ih)/2" },
      { key: "color", label: "颜色", kind: "text", default: "black" },
    ],
    compile: (p) =>
      `pad=${fgExpr(num(p.w, "1920"))}:${fgExpr(num(p.h, "1080"))}:${fgExpr(num(p.x, "0"))}:${fgExpr(num(p.y, "0"))}:color=${fgQuote(num(p.color, "black"))}`,
  },
  {
    kind: "fps",
    label: "帧率",
    stream: "video",
    group: "画面",
    summary: "重定时到固定帧率。和输出 -r 不要同时乱设。",
    fields: [{ key: "fps", label: "帧率", kind: "text", default: "30" }],
    compile: (p) => (num(p.fps) ? `fps=${p.fps}` : null),
  },
  {
    kind: "eq",
    label: "影调",
    stream: "video",
    group: "画面",
    summary: "亮度、对比、饱和与伽马。浏览器预览只做近似，不以它为准。",
    fields: [
      { key: "brightness", label: "亮度", kind: "range", default: "0", min: "-1", max: "1", step: "0.01" },
      { key: "contrast", label: "对比", kind: "range", default: "1", min: "0", max: "2", step: "0.01" },
      { key: "saturation", label: "饱和", kind: "range", default: "1", min: "0", max: "3", step: "0.01" },
      { key: "gamma", label: "伽马", kind: "range", default: "1", min: "0.1", max: "3", step: "0.01" },
    ],
    compile: (p) => {
      const parts: string[] = [];
      if (num(p.brightness) && p.brightness !== "0") parts.push(`brightness=${p.brightness}`);
      if (num(p.contrast) && p.contrast !== "1") parts.push(`contrast=${p.contrast}`);
      if (num(p.saturation) && p.saturation !== "1") parts.push(`saturation=${p.saturation}`);
      if (num(p.gamma) && p.gamma !== "1") parts.push(`gamma=${p.gamma}`);
      return parts.length ? `eq=${parts.join(":")}` : null;
    },
  },
  {
    kind: "hue",
    label: "色相",
    stream: "video",
    group: "画面",
    summary: "旋转色相，饱和用倍数。",
    fields: [
      { key: "h", label: "色相角度", kind: "range", default: "0", min: "-180", max: "180", step: "1" },
      { key: "s", label: "饱和倍数", kind: "range", default: "1", min: "0", max: "3", step: "0.01" },
    ],
    compile: (p) => {
      if ((!num(p.h) || p.h === "0") && (!num(p.s) || p.s === "1")) return null;
      return `hue=h=${num(p.h, "0")}:s=${num(p.s, "1")}`;
    },
  },
  {
    kind: "unsharp",
    label: "锐化",
    stream: "video",
    group: "画面",
    summary: "反锐化遮罩。强度 0.5 到 1.5 通常够用。",
    fields: [
      { key: "ms", label: "矩阵", kind: "select", default: "5", options: ["3", "5", "7"].map((v) => ({ value: v, label: v })) },
      { key: "amount", label: "强度", kind: "range", default: "0.8", min: "0", max: "3", step: "0.1" },
    ],
    compile: (p) => `unsharp=lx=${num(p.ms, "5")}:ly=${num(p.ms, "5")}:la=${num(p.amount, "0.8")}`,
  },
  {
    kind: "transpose",
    label: "旋转 90°",
    stream: "video",
    group: "画面",
    summary: "按 90 度方向翻转画面。",
    fields: [
      {
        key: "dir",
        label: "方向",
        kind: "select",
        default: "1",
        options: [
          { value: "1", label: "顺时针 90°" },
          { value: "2", label: "逆时针 90°" },
          { value: "0", label: "逆时针 90° 并镜像" },
          { value: "3", label: "顺时针 90° 并镜像" },
        ],
      },
    ],
    compile: (p) => `transpose=${num(p.dir, "1")}`,
  },
  {
    kind: "hflip",
    label: "水平翻转",
    stream: "video",
    group: "画面",
    summary: "左右镜像。",
    fields: [],
    compile: () => "hflip",
  },
  {
    kind: "vflip",
    label: "垂直翻转",
    stream: "video",
    group: "画面",
    summary: "上下颠倒。",
    fields: [],
    compile: () => "vflip",
  },
  {
    kind: "rotate",
    label: "任意旋转",
    stream: "video",
    group: "画面",
    summary: "按角度旋转并填充空隙。大角度会改变有效画幅。",
    fields: [
      { key: "deg", label: "角度", kind: "text", default: "0" },
      { key: "fill", label: "填充色", kind: "text", default: "black" },
    ],
    compile: (p) => (num(p.deg) && p.deg !== "0" ? `rotate=${p.deg}*PI/180:fillcolor=${fgQuote(num(p.fill, "black"))}` : null),
  },
  {
    kind: "fade",
    label: "画面淡入淡出",
    stream: "video",
    group: "画面",
    summary: "按时间淡入或淡出。时间单位是秒。",
    fields: [
      {
        key: "dir",
        label: "方向",
        kind: "select",
        default: "in",
        options: [
          { value: "in", label: "淡入" },
          { value: "out", label: "淡出" },
        ],
      },
      { key: "st", label: "起点（秒）", kind: "text", default: "0" },
      { key: "d", label: "时长（秒）", kind: "text", default: "1" },
    ],
    compile: (p) => `fade=t=${num(p.dir, "in")}:st=${num(p.st, "0")}:d=${num(p.d, "1")}`,
  },
  {
    kind: "yadif",
    label: "反交错 yadif",
    stream: "video",
    group: "画面",
    summary: "把隔行扫描拉成逐行。素材不是隔行就不要开。",
    fields: [
      {
        key: "mode",
        label: "模式",
        kind: "select",
        default: "0",
        options: [
          { value: "0", label: "每帧一场" },
          { value: "1", label: "每场一帧" },
        ],
      },
      {
        key: "parity",
        label: "场序",
        kind: "select",
        default: "-1",
        options: [
          { value: "-1", label: "自动" },
          { value: "0", label: "上场优先" },
          { value: "1", label: "下场优先" },
        ],
      },
    ],
    compile: (p) => `yadif=mode=${num(p.mode, "0")}:parity=${num(p.parity, "-1")}`,
  },
  {
    kind: "bwdif",
    label: "反交错 bwdif",
    stream: "video",
    group: "画面",
    summary: "比 yadif 更锐的运动自适应反交错。",
    fields: [],
    compile: () => "bwdif",
  },
  {
    kind: "hqdn3d",
    label: "降噪 hqdn3d",
    stream: "video",
    group: "画面",
    summary: "轻量时空降噪，适合轻度噪点。",
    fields: [
      { key: "luma", label: "亮度", kind: "text", default: "4" },
      { key: "chroma", label: "色度", kind: "text", default: "3" },
    ],
    compile: (p) => `hqdn3d=${num(p.luma, "4")}:${num(p.chroma, "3")}`,
  },
  {
    kind: "gblur",
    label: "高斯模糊",
    stream: "video",
    group: "画面",
    summary: "整幅柔化。sigma 越大越糊。",
    fields: [{ key: "sigma", label: "Sigma", kind: "range", default: "1", min: "0.1", max: "20", step: "0.1" }],
    compile: (p) => `gblur=sigma=${num(p.sigma, "1")}`,
  },
  {
    kind: "boxblur",
    label: "方框模糊",
    stream: "video",
    group: "画面",
    summary: "更快的模糊，边缘更硬。",
    fields: [{ key: "radius", label: "半径", kind: "text", default: "2" }],
    compile: (p) => `boxblur=${num(p.radius, "2")}`,
  },
  {
    kind: "vignette",
    label: "暗角",
    stream: "video",
    group: "画面",
    summary: "四角压暗。分母越小暗角越重。",
    fields: [{ key: "denom", label: "分母", kind: "text", default: "5" }],
    compile: (p) => `vignette=angle=PI/${num(p.denom, "5")}`,
  },
  {
    kind: "format",
    label: "像素格式",
    stream: "video",
    group: "画面",
    summary: "在滤镜链中转换像素格式，例如给叠加准备 rgba。",
    fields: [{ key: "pix", label: "格式", kind: "text", default: "yuv420p" }],
    compile: (p) => (num(p.pix) ? `format=${p.pix}` : null),
  },
  {
    kind: "colorspace",
    label: "色彩空间",
    stream: "video",
    group: "画面",
    summary: "转换矩阵与范围。网页成片常见 bt709 + tv。",
    fields: [
      {
        key: "all",
        label: "矩阵",
        kind: "select",
        default: "bt709",
        options: ["bt709", "bt601-6-625", "bt601-6-525", "bt2020"].map((value) => ({ value, label: value })),
      },
      {
        key: "range",
        label: "范围",
        kind: "select",
        default: "tv",
        options: [
          { value: "tv", label: "tv · limited" },
          { value: "pc", label: "pc · full" },
        ],
      },
    ],
    compile: (p) => `colorspace=all=${num(p.all, "bt709")}:range=${num(p.range, "tv")}`,
  },
  {
    kind: "drawtext",
    label: "绘制文字",
    stream: "video",
    group: "画面",
    summary: "烧进画面的字。系统需能找到字体，必要时写 fontfile。",
    fields: [
      { key: "text", label: "文字", kind: "text", default: "KERF" },
      { key: "size", label: "字号", kind: "text", default: "36" },
      { key: "color", label: "颜色", kind: "text", default: "white" },
      { key: "x", label: "X", kind: "text", default: "(w-text_w)/2" },
      { key: "y", label: "Y", kind: "text", default: "h-th-48" },
      { key: "fontfile", label: "字体文件", kind: "text", default: "" },
    ],
    compile: (p) => {
      if (!num(p.text)) return null;
      const font = num(p.fontfile) ? `:fontfile=${fgQuote(p.fontfile)}` : "";
      return `drawtext=text=${fgQuote(p.text)}:fontsize=${num(p.size, "36")}:fontcolor=${fgQuote(num(p.color, "white"))}:x=${fgExpr(num(p.x, "0"))}:y=${fgExpr(num(p.y, "0"))}${font}`;
    },
  },
  {
    kind: "subtitles",
    label: "烧录字幕",
    stream: "video",
    group: "画面",
    summary: "把 SRT/ASS 烧进画面。这是重新编码，不是软字幕。",
    fields: [
      { key: "path", label: "字幕路径", kind: "text", default: "subs/dialogue.ass" },
      { key: "charenc", label: "字符集", kind: "text", default: "" },
      { key: "style", label: "force_style", kind: "text", default: "" },
    ],
    compile: (p) => {
      if (!num(p.path)) return null;
      const enc = num(p.charenc) ? `:charenc=${fgQuote(p.charenc)}` : "";
      const style = num(p.style) ? `:force_style=${fgQuote(p.style)}` : "";
      return `subtitles=${fgQuote(p.path)}${enc}${style}`;
    },
  },
  {
    kind: "delogo",
    label: "去台标",
    stream: "video",
    group: "画面",
    summary: "用周围像素糊掉一块矩形。坐标相对原始画面。",
    fields: [
      { key: "x", label: "X", kind: "text", default: "10" },
      { key: "y", label: "Y", kind: "text", default: "10" },
      { key: "w", label: "宽", kind: "text", default: "120" },
      { key: "h", label: "高", kind: "text", default: "48" },
    ],
    compile: (p) => `delogo=x=${num(p.x, "0")}:y=${num(p.y, "0")}:w=${num(p.w, "1")}:h=${num(p.h, "1")}`,
  },
  {
    kind: "zoompan",
    label: "推拉",
    stream: "video",
    group: "画面",
    summary: "缓慢推近。非常吃 CPU，短镜头再用。",
    fields: [
      { key: "z", label: "缩放表达式", kind: "text", default: "min(zoom+0.0015,1.4)" },
      { key: "d", label: "每帧停留", kind: "text", default: "125" },
      { key: "s", label: "输出尺寸", kind: "text", default: "1280x720" },
      { key: "fps", label: "帧率", kind: "text", default: "25" },
    ],
    compile: (p) =>
      `zoompan=z='${num(p.z, "1").replace(/'/g, "")}':d=${num(p.d, "125")}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${num(p.s, "1280x720")}:fps=${num(p.fps, "25")}`,
  },
  {
    kind: "setpts",
    label: "时间戳",
    stream: "video",
    group: "画面",
    summary: "改写 PTS。2*PTS 是半速，PTS/2 是两倍速（声音要另外处理）。",
    fields: [{ key: "expr", label: "表达式", kind: "text", default: "PTS-STARTPTS" }],
    compile: (p) => (num(p.expr) ? `setpts=${fgExpr(p.expr)}` : null),
  },
  {
    kind: "trim",
    label: "滤镜内裁剪",
    stream: "video",
    group: "画面",
    summary: "在滤镜里按秒裁掉画面，并重置时间戳。精确裁切也可以用输入 -ss。",
    fields: [
      { key: "start", label: "起点（秒）", kind: "text", default: "0" },
      { key: "end", label: "终点（秒）", kind: "text", default: "" },
    ],
    compile: (p) => {
      const bits = [];
      if (num(p.start)) bits.push(`start=${p.start}`);
      if (num(p.end)) bits.push(`end=${p.end}`);
      if (!bits.length) return null;
      return `trim=${bits.join(":")},setpts=PTS-STARTPTS`;
    },
  },
  {
    kind: "tpad",
    label: "尾帧停留",
    stream: "video",
    group: "画面",
    summary: "在结尾克隆或冻结若干秒。",
    fields: [
      { key: "d", label: "秒数", kind: "text", default: "2" },
      {
        key: "mode",
        label: "方式",
        kind: "select",
        default: "clone",
        options: [
          { value: "clone", label: "克隆最后一帧" },
          { value: "add", label: "补黑" },
        ],
      },
    ],
    compile: (p) => (num(p.d) ? `tpad=stop_mode=${num(p.mode, "clone")}:stop_duration=${p.d}` : null),
  },
  {
    kind: "reverse",
    label: "倒放",
    stream: "video",
    group: "画面",
    summary: "倒放整段视频。帧会全部进内存，只适合短片。",
    fields: [],
    compile: () => "reverse",
  },
  {
    kind: "speed",
    label: "变速",
    stream: "both",
    group: "画面",
    summary: "同时改画面时间戳和音频 atempo。2 表示两倍速，0.5 表示半速。",
    fields: [{ key: "factor", label: "倍率", kind: "text", default: "1" }],
    compile: () => null,
  },
  {
    kind: "volume",
    label: "音量",
    stream: "audio",
    group: "声音",
    summary: "线性倍数或分贝。浏览器预览只反映线性倍数。",
    fields: [
      { key: "amount", label: "数值", kind: "text", default: "1" },
      {
        key: "unit",
        label: "单位",
        kind: "select",
        default: "linear",
        options: [
          { value: "linear", label: "倍数" },
          { value: "db", label: "分贝" },
        ],
      },
    ],
    compile: (p) => {
      if (!num(p.amount)) return null;
      return p.unit === "db" ? `volume=${p.amount}dB` : `volume=${p.amount}`;
    },
  },
  {
    kind: "loudnorm",
    label: "响度标准化",
    stream: "audio",
    group: "声音",
    summary: "EBU R128 单遍。广播/播客常用 I=-16，电影常用 I=-24。",
    fields: [
      { key: "I", label: "目标 LUFS", kind: "text", default: "-16" },
      { key: "TP", label: "真峰值", kind: "text", default: "-1.5" },
      { key: "LRA", label: "响度范围", kind: "text", default: "11" },
    ],
    compile: (p) => `loudnorm=I=${num(p.I, "-16")}:TP=${num(p.TP, "-1.5")}:LRA=${num(p.LRA, "11")}`,
  },
  {
    kind: "acompressor",
    label: "压缩",
    stream: "audio",
    group: "声音",
    summary: "压低动态。阈值是 dBFS，比例 3 表示 3:1。",
    fields: [
      { key: "threshold", label: "阈值", kind: "text", default: "-18" },
      { key: "ratio", label: "比例", kind: "text", default: "3" },
      { key: "attack", label: "启动 ms", kind: "text", default: "20" },
      { key: "release", label: "释放 ms", kind: "text", default: "250" },
    ],
    compile: (p) =>
      `acompressor=threshold=${num(p.threshold, "-18")}dB:ratio=${num(p.ratio, "3")}:attack=${num(p.attack, "20")}:release=${num(p.release, "250")}`,
  },
  {
    kind: "alimiter",
    label: "限制器",
    stream: "audio",
    group: "声音",
    summary: "防止削波。0.95 大约是 -0.4 dBFS。",
    fields: [{ key: "limit", label: "上限", kind: "text", default: "0.95" }],
    compile: (p) => `alimiter=limit=${num(p.limit, "0.95")}`,
  },
  {
    kind: "highpass",
    label: "高通",
    stream: "audio",
    group: "声音",
    summary: "切掉低频隆隆声。对白常用 80Hz。",
    fields: [{ key: "f", label: "频率 Hz", kind: "text", default: "80" }],
    compile: (p) => (num(p.f) ? `highpass=f=${p.f}` : null),
  },
  {
    kind: "lowpass",
    label: "低通",
    stream: "audio",
    group: "声音",
    summary: "切掉高频嘶声。",
    fields: [{ key: "f", label: "频率 Hz", kind: "text", default: "14000" }],
    compile: (p) => (num(p.f) ? `lowpass=f=${p.f}` : null),
  },
  {
    kind: "equalizer",
    label: "三段均衡",
    stream: "audio",
    group: "声音",
    summary: "80Hz / 1kHz / 8kHz，单位是 dB，0 表示不动。",
    fields: [
      { key: "low", label: "低频 dB", kind: "range", default: "0", min: "-12", max: "12", step: "0.5" },
      { key: "mid", label: "中频 dB", kind: "range", default: "0", min: "-12", max: "12", step: "0.5" },
      { key: "high", label: "高频 dB", kind: "range", default: "0", min: "-12", max: "12", step: "0.5" },
    ],
    compile: (p) => {
      const bands: [string, string][] = [
        ["80", num(p.low, "0")],
        ["1000", num(p.mid, "0")],
        ["8000", num(p.high, "0")],
      ];
      const active = bands.filter(([, gain]) => gain !== "0" && gain !== "");
      if (!active.length) return null;
      return active.map(([freq, gain]) => `equalizer=f=${freq}:t=q:w=1:g=${gain}`).join(",");
    },
  },
  {
    kind: "atempo",
    label: "音频变速",
    stream: "audio",
    group: "声音",
    summary: "只改声音速度。超出 0.5–2 会自动串成多级 atempo。",
    fields: [{ key: "factor", label: "倍率", kind: "text", default: "1" }],
    compile: (p) => atempoChain(num(p.factor, "1")),
  },
  {
    kind: "aresample",
    label: "重采样",
    stream: "audio",
    group: "声音",
    summary: "改变采样率。也可以只用输出 -ar。",
    fields: [{ key: "rate", label: "采样率", kind: "text", default: "48000" }],
    compile: (p) => (num(p.rate) ? `aresample=${p.rate}` : null),
  },
  {
    kind: "afade",
    label: "音频淡入淡出",
    stream: "audio",
    group: "声音",
    summary: "按秒淡入或淡出音量。",
    fields: [
      {
        key: "dir",
        label: "方向",
        kind: "select",
        default: "in",
        options: [
          { value: "in", label: "淡入" },
          { value: "out", label: "淡出" },
        ],
      },
      { key: "st", label: "起点", kind: "text", default: "0" },
      { key: "d", label: "时长", kind: "text", default: "0.5" },
    ],
    compile: (p) => `afade=t=${num(p.dir, "in")}:st=${num(p.st, "0")}:d=${num(p.d, "0.5")}`,
  },
  {
    kind: "silenceremove",
    label: "去开头静音",
    stream: "audio",
    group: "声音",
    summary: "去掉起始低于阈值的部分。阈值越接近 0 越严格。",
    fields: [
      { key: "periods", label: "段数", kind: "text", default: "1" },
      { key: "threshold", label: "阈值 dB", kind: "text", default: "-50" },
    ],
    compile: (p) =>
      `silenceremove=start_periods=${num(p.periods, "1")}:start_threshold=${num(p.threshold, "-50")}dB:detection=peak`,
  },
  {
    kind: "adelay",
    label: "音频延迟",
    stream: "audio",
    group: "声音",
    summary: "所有声道延迟若干毫秒，用来对齐口型。",
    fields: [{ key: "ms", label: "毫秒", kind: "text", default: "0" }],
    compile: (p) => (num(p.ms) && p.ms !== "0" ? `adelay=${p.ms}:all=1` : null),
  },
  {
    kind: "dynaudnorm",
    label: "动态响度",
    stream: "audio",
    group: "声音",
    summary: "滑动窗口把响度拉齐，比 loudnorm 更紧，播客慎用。",
    fields: [
      { key: "frame", label: "帧长", kind: "text", default: "500" },
      { key: "g", label: "高斯", kind: "text", default: "31" },
    ],
    compile: (p) => `dynaudnorm=f=${num(p.frame, "500")}:g=${num(p.g, "31")}`,
  },
  {
    kind: "afftdn",
    label: "频谱降噪",
    stream: "audio",
    group: "声音",
    summary: "FFT 降噪。nr 是抑制强度，过大会出金属声。",
    fields: [
      { key: "nr", label: "强度", kind: "text", default: "12" },
      { key: "nf", label: "噪底", kind: "text", default: "-50" },
    ],
    compile: (p) => `afftdn=nr=${num(p.nr, "12")}:nf=${num(p.nf, "-50")}`,
  },
  {
    kind: "aecho",
    label: "回声",
    stream: "audio",
    group: "声音",
    summary: "简单回声。延迟单位是毫秒。",
    fields: [
      { key: "inGain", label: "输入增益", kind: "text", default: "0.8" },
      { key: "outGain", label: "输出增益", kind: "text", default: "0.9" },
      { key: "delays", label: "延迟", kind: "text", default: "60" },
      { key: "decays", label: "衰减", kind: "text", default: "0.4" },
    ],
    compile: (p) =>
      `aecho=in_gain=${num(p.inGain, "0.8")}:out_gain=${num(p.outGain, "0.9")}:delays=${num(p.delays, "60")}:decays=${num(p.decays, "0.4")}`,
  },
  {
    kind: "pan",
    label: "声道映射",
    stream: "audio",
    group: "声音",
    summary: "重新摆放声道。例如把立体声收成单声道。",
    fields: [
      {
        key: "layout",
        label: "布局",
        kind: "select",
        default: "mono",
        options: [
          { value: "mono", label: "mono" },
          { value: "stereo", label: "stereo" },
          { value: "5.1", label: "5.1" },
        ],
      },
      { key: "map", label: "映射", kind: "text", default: "c0=0.5*c0+0.5*c1" },
    ],
    compile: (p) => `pan=${num(p.layout, "stereo")}|${fgExpr(num(p.map, "c0=c0"))}`,
  },
  {
    kind: "overlay",
    label: "叠加",
    stream: "video",
    group: "复合",
    summary: "把第二路画面叠到第一路上。需要两路输入。",
    fields: [
      { key: "x", label: "X", kind: "text", default: "16" },
      { key: "y", label: "Y", kind: "text", default: "16" },
      { key: "ow", label: "上层宽", kind: "text", default: "" },
      { key: "oh", label: "上层高", kind: "text", default: "" },
      {
        key: "format",
        label: "格式",
        kind: "select",
        default: "auto",
        options: ["auto", "yuv420", "rgb"].map((value) => ({ value, label: value })),
      },
      { key: "shortest", label: "以短的为准", kind: "select", default: "0", options: onOff },
    ],
    compile: () => null,
  },
  {
    kind: "amix",
    label: "混音",
    stream: "audio",
    group: "复合",
    summary: "把每一路输入的音频混成一条。",
    fields: [
      {
        key: "duration",
        label: "时长",
        kind: "select",
        default: "longest",
        options: [
          { value: "longest", label: "最长" },
          { value: "shortest", label: "最短" },
          { value: "first", label: "第一路" },
        ],
      },
      { key: "dropout", label: "淡出秒", kind: "text", default: "2" },
    ],
    compile: () => null,
  },
  {
    kind: "concat",
    label: "拼接",
    stream: "both",
    group: "复合",
    summary: "按输入顺序首尾相接。各路的分辨率和采样率最好先统一。",
    fields: [
      { key: "withAudio", label: "包含音频", kind: "select", default: "1", options: onOff },
    ],
    compile: () => null,
  },
  {
    kind: "acrossfade",
    label: "音频交叉淡化",
    stream: "audio",
    group: "复合",
    summary: "两段音频交叉过渡。只使用前两路。",
    fields: [
      { key: "duration", label: "秒", kind: "text", default: "3" },
      {
        key: "c1",
        label: "曲线 1",
        kind: "select",
        default: "tri",
        options: ["tri", "qsin", "esin", "hsin", "log", "par", "qua", "cub", "squ", "exp"].map((value) => ({
          value,
          label: value,
        })),
      },
      {
        key: "c2",
        label: "曲线 2",
        kind: "select",
        default: "tri",
        options: ["tri", "qsin", "esin", "hsin", "log"].map((value) => ({ value, label: value })),
      },
    ],
    compile: () => null,
  },
  {
    kind: "palette",
    label: "调色板 GIF",
    stream: "video",
    group: "复合",
    summary: "palettegen + paletteuse。前面先放 fps 和 scale，成品用 GIF 封装。",
    fields: [
      {
        key: "stats",
        label: "统计",
        kind: "select",
        default: "diff",
        options: [
          { value: "full", label: "full" },
          { value: "diff", label: "diff" },
          { value: "single", label: "single" },
        ],
      },
      {
        key: "dither",
        label: "抖动",
        kind: "select",
        default: "bayer",
        options: ["bayer", "floyd_steinberg", "sierra2", "none"].map((value) => ({ value, label: value })),
      },
    ],
    compile: () => null,
  },
];

const BY_KIND = new Map(FILTERS.map((item) => [item.kind, item]));

export function getFilter(kind: string): FilterDef {
  const found = BY_KIND.get(kind);
  if (!found) throw new Error(`未知滤镜 ${kind}`);
  return found;
}

export function makeFilter(kind: string, params: Record<string, string> = {}): FilterNode {
  const def = getFilter(kind);
  const base: Record<string, string> = {};
  for (const field of def.fields) base[field.key] = field.default;
  return { id: createId(), kind, enabled: true, params: { ...base, ...params } };
}

export interface Graph {
  vf?: string;
  af?: string;
  complex?: string;
  maps: string[];
  notes: string[];
  errors: string[];
}

function chainOf(nodes: FilterNode[]): string[] {
  const parts: string[] = [];
  for (const node of nodes) {
    const compiled = getFilter(node.kind).compile(node.params);
    if (!compiled) continue;
    for (const piece of compiled.split(",")) {
      if (piece) parts.push(piece);
    }
  }
  return parts;
}

function isComplexKind(kind: string): boolean {
  return kind === "overlay" || kind === "amix" || kind === "concat" || kind === "acrossfade" || kind === "palette";
}

export function compileGraph(inputCount: number, nodes: FilterNode[], raw: string): Graph {
  if (raw.trim()) {
    return {
      complex: raw.trim(),
      maps: [],
      notes: ["手写 filter_complex 会取代自动滤镜链。输出映射改由「映射」决定，自动模式此时不再插入标签。"],
      errors: [],
    };
  }

  const enabled = nodes.filter((node) => node.enabled);
  const speeds = enabled.filter((node) => node.kind === "speed");
  const specials = enabled.filter((node) => isComplexKind(node.kind));
  const plain = enabled.filter((node) => node.kind !== "speed" && !isComplexKind(node.kind));

  const videos = plain.filter((node) => getFilter(node.kind).stream === "video");
  const audios = plain.filter((node) => getFilter(node.kind).stream === "audio");
  const vchain = chainOf(videos);
  const achain = chainOf(audios);

  for (const speed of speeds) {
    const factor = Number(speed.params.factor || "1");
    if (!Number.isFinite(factor) || factor <= 0 || factor === 1) continue;
    const shown = Math.round((1 / factor) * 1000) / 1000;
    vchain.push(`setpts=${shown}*PTS`);
    const tempo = atempoChain(String(factor));
    if (tempo) {
      for (const piece of tempo.split(",")) achain.push(piece);
    }
  }

  const notes: string[] = [];
  const errors: string[] = [];
  if (speeds.length > 1) notes.push("多段变速会叠乘，通常只留一段。");

  if (specials.length === 0) {
    return {
      vf: vchain.join(",") || undefined,
      af: achain.join(",") || undefined,
      maps: [],
      notes,
      errors,
    };
  }

  const kinds = specials.map((node) => node.kind);
  const picture = kinds.filter((kind) => kind === "overlay" || kind === "concat" || kind === "palette");
  if (picture.length > 1) errors.push("叠加、拼接、调色板 GIF 一次只能留一个。");
  if (kinds.includes("amix") && kinds.includes("acrossfade")) errors.push("混音和交叉淡化不要一起用。");
  if (kinds.includes("overlay") && inputCount < 2) errors.push("叠加需要至少两路输入。");
  if (kinds.includes("concat") && inputCount < 2) errors.push("拼接需要至少两路输入。");
  if (kinds.includes("acrossfade") && inputCount < 2) errors.push("交叉淡化需要两路输入。");
  if (kinds.includes("amix") && inputCount < 2) errors.push("混音需要至少两路输入。");

  const parts: string[] = [];
  const maps: string[] = [];
  const palette = specials.find((node) => node.kind === "palette");
  const overlay = specials.find((node) => node.kind === "overlay");
  const concat = specials.find((node) => node.kind === "concat");
  const amix = specials.find((node) => node.kind === "amix");
  const across = specials.find((node) => node.kind === "acrossfade");

  if (errors.length) {
    return { maps, notes, errors };
  }

  if (palette) {
    const pre = vchain.length ? `${vchain.join(",")},` : "";
    parts.push(`[0:v]${pre}split[s0][s1]`);
    parts.push(`[s0]palettegen=stats_mode=${palette.params.stats || "diff"}[p]`);
    parts.push(`[s1][p]paletteuse=dither=${palette.params.dither || "bayer"}[v]`);
    maps.push("[v]");
    notes.push("调色板 GIF 默认不带音频。");
  } else if (overlay) {
    if (vchain.length) parts.push(`[0:v]${vchain.join(",")}[base]`);
    const ow = num(overlay.params.ow);
    const oh = num(overlay.params.oh);
    const prep = ow || oh ? `scale=${ow || "-1"}:${oh || "-1"}` : "";
    if (prep) parts.push(`[1:v]${prep}[ov]`);
    const left = vchain.length ? "[base]" : "[0:v]";
    const right = prep ? "[ov]" : "[1:v]";
    const format = overlay.params.format && overlay.params.format !== "auto" ? `:format=${overlay.params.format}` : "";
    const shortest = overlay.params.shortest === "1" ? ":shortest=1" : "";
    parts.push(`${left}${right}overlay=${fgExpr(num(overlay.params.x, "0"))}:${fgExpr(num(overlay.params.y, "0"))}${format}${shortest}[v]`);
    maps.push("[v]");
  } else if (concat) {
    const withAudio = concat.params.withAudio !== "0";
    const pads = Array.from({ length: inputCount }, (_, index) =>
      withAudio ? `[${index}:v][${index}:a]` : `[${index}:v]`,
    ).join("");
    const outputs = withAudio ? "[cv][ca]" : "[cv]";
    parts.push(`${pads}concat=n=${inputCount}:v=1:a=${withAudio ? 1 : 0}${outputs}`);
    if (vchain.length) parts.push(`[cv]${vchain.join(",")}[v]`);
    maps.push(vchain.length ? "[v]" : "[cv]");
    if (withAudio) {
      if (achain.length) parts.push(`[ca]${achain.join(",")}[a]`);
      maps.push(achain.length ? "[a]" : "[ca]");
    }
  }

  if (!concat && !palette) {
    if (amix) {
      const pads = Array.from({ length: inputCount }, (_, index) => `[${index}:a]`).join("");
      const out = achain.length ? "[mix]" : "[a]";
      parts.push(
        `${pads}amix=inputs=${inputCount}:duration=${amix.params.duration || "longest"}:dropout_transition=${amix.params.dropout || "2"}${out}`,
      );
      if (achain.length) parts.push(`[mix]${achain.join(",")}[a]`);
      maps.push("[a]");
    } else if (across) {
      const out = achain.length ? "[xf]" : "[a]";
      parts.push(
        `[0:a][1:a]acrossfade=d=${across.params.duration || "3"}:c1=${across.params.c1 || "tri"}:c2=${across.params.c2 || "tri"}${out}`,
      );
      if (achain.length) parts.push(`[xf]${achain.join(",")}[a]`);
      maps.push("[a]");
    } else if (achain.length) {
      parts.push(`[0:a]${achain.join(",")}[a]`);
      maps.push("[a]");
    } else if (overlay) {
      maps.push("0:a?");
    }
  } else if (palette && achain.length) {
    notes.push("调色板 GIF 忽略了音频滤镜。");
  }

  return {
    complex: parts.join(";"),
    maps,
    notes,
    errors,
  };
}
