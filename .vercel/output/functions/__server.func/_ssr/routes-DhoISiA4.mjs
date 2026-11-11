import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useShallow, n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DhoISiA4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIDEO_CODECS = [
	{
		value: "libx264",
		label: "H.264 · libx264",
		needs: ["libx264"]
	},
	{
		value: "libx265",
		label: "H.265 · libx265",
		needs: ["libx265"]
	},
	{
		value: "libvpx-vp9",
		label: "VP9 · libvpx",
		needs: ["libvpx"]
	},
	{
		value: "libaom-av1",
		label: "AV1 · libaom",
		needs: ["libaom"]
	},
	{
		value: "libsvtav1",
		label: "AV1 · SVT",
		needs: ["libsvtav1"]
	},
	{
		value: "h264_nvenc",
		label: "H.264 · NVENC",
		needs: [
			"nvenc",
			"ffnvcodec",
			"cuda"
		]
	},
	{
		value: "hevc_nvenc",
		label: "H.265 · NVENC",
		needs: [
			"nvenc",
			"ffnvcodec",
			"cuda"
		]
	},
	{
		value: "av1_nvenc",
		label: "AV1 · NVENC",
		needs: [
			"nvenc",
			"ffnvcodec",
			"cuda"
		]
	},
	{
		value: "h264_qsv",
		label: "H.264 · QSV",
		needs: ["libvpl", "libmfx"]
	},
	{
		value: "hevc_qsv",
		label: "H.265 · QSV",
		needs: ["libvpl", "libmfx"]
	},
	{
		value: "h264_amf",
		label: "H.264 · AMF",
		needs: ["amf"]
	},
	{
		value: "hevc_amf",
		label: "H.265 · AMF",
		needs: ["amf"]
	},
	{
		value: "h264_videotoolbox",
		label: "H.264 · VideoToolbox",
		needs: ["videotoolbox"]
	},
	{
		value: "hevc_videotoolbox",
		label: "H.265 · VideoToolbox",
		needs: ["videotoolbox"]
	},
	{
		value: "prores_ks",
		label: "ProRes · prores_ks"
	},
	{
		value: "ffv1",
		label: "FFV1 · 无损"
	},
	{
		value: "mpeg4",
		label: "MPEG-4 Part 2"
	},
	{
		value: "libxvid",
		label: "Xvid",
		needs: ["libxvid"]
	},
	{
		value: "mjpeg",
		label: "MJPEG"
	},
	{
		value: "png",
		label: "PNG"
	},
	{
		value: "gif",
		label: "GIF"
	},
	{
		value: "rawvideo",
		label: "原始视频"
	},
	{
		value: "copy",
		label: "复制流 · copy"
	}
];
var AUDIO_CODECS = [
	{
		value: "aac",
		label: "AAC · 内置"
	},
	{
		value: "libmp3lame",
		label: "MP3 · LAME",
		needs: ["libmp3lame"]
	},
	{
		value: "libopus",
		label: "Opus",
		needs: ["libopus"]
	},
	{
		value: "libvorbis",
		label: "Vorbis",
		needs: ["libvorbis"]
	},
	{
		value: "flac",
		label: "FLAC"
	},
	{
		value: "alac",
		label: "ALAC"
	},
	{
		value: "ac3",
		label: "AC-3"
	},
	{
		value: "eac3",
		label: "E-AC-3"
	},
	{
		value: "pcm_s16le",
		label: "PCM 16-bit"
	},
	{
		value: "pcm_s24le",
		label: "PCM 24-bit"
	},
	{
		value: "libfdk_aac",
		label: "AAC · fdk",
		needs: ["libfdk-aac", "libfdk_aac"]
	},
	{
		value: "copy",
		label: "复制流 · copy"
	}
];
var SUBTITLE_CODECS = [
	{
		value: "copy",
		label: "复制 · copy"
	},
	{
		value: "mov_text",
		label: "mov_text（MP4）"
	},
	{
		value: "srt",
		label: "SRT"
	},
	{
		value: "ass",
		label: "ASS"
	},
	{
		value: "webvtt",
		label: "WebVTT"
	},
	{
		value: "dvdsub",
		label: "DVD 位图字幕"
	}
];
var CONTAINERS = [
	{
		value: "auto",
		label: "按扩展名"
	},
	{
		value: "mp4",
		label: "MP4"
	},
	{
		value: "mov",
		label: "MOV"
	},
	{
		value: "matroska",
		label: "Matroska · MKV"
	},
	{
		value: "webm",
		label: "WebM"
	},
	{
		value: "mpegts",
		label: "MPEG-TS"
	},
	{
		value: "avi",
		label: "AVI"
	},
	{
		value: "nut",
		label: "NUT"
	},
	{
		value: "gif",
		label: "GIF"
	},
	{
		value: "apng",
		label: "APNG"
	},
	{
		value: "mp3",
		label: "MP3"
	},
	{
		value: "ogg",
		label: "Ogg"
	},
	{
		value: "opus",
		label: "Opus"
	},
	{
		value: "flac",
		label: "FLAC"
	},
	{
		value: "wav",
		label: "WAV"
	},
	{
		value: "adts",
		label: "ADTS · AAC"
	}
];
var LOGLEVELS = [
	"quiet",
	"panic",
	"fatal",
	"error",
	"warning",
	"info",
	"verbose",
	"debug",
	"trace"
];
var HWACCELS = [
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
	"opencl"
];
function defaultPreset(codec) {
	if (codec.endsWith("_nvenc")) return "p4";
	if (codec === "libx264" || codec === "libx265" || codec.endsWith("_qsv")) return "medium";
	if (codec === "libsvtav1") return "8";
	if (codec.endsWith("_amf")) return "balanced";
	return "";
}
function defaultPix(codec) {
	if (codec === "prores_ks" || codec === "ffv1") return "yuv422p10le";
	if (codec === "copy" || codec === "png" || codec === "gif" || codec === "rawvideo") return "";
	return "yuv420p";
}
function presetOptions(codec) {
	if (codec.endsWith("_nvenc")) return [
		"p1",
		"p2",
		"p3",
		"p4",
		"p5",
		"p6",
		"p7"
	].map((value) => ({
		value,
		label: value === "p1" ? "p1 · 最快" : value === "p7" ? "p7 · 最慢" : value
	}));
	if (codec.endsWith("_amf")) return [
		{
			value: "speed",
			label: "speed"
		},
		{
			value: "balanced",
			label: "balanced"
		},
		{
			value: "quality",
			label: "quality"
		}
	];
	if (codec === "libsvtav1") return Array.from({ length: 14 }, (_, i) => ({
		value: String(i),
		label: i === 8 ? "8 · 默认" : String(i)
	}));
	if (codec === "libx264" || codec === "libx265" || codec.endsWith("_qsv")) return [
		"ultrafast",
		"superfast",
		"veryfast",
		"faster",
		"fast",
		"medium",
		"slow",
		"slower",
		"veryslow"
	].map((value) => ({
		value,
		label: value
	}));
	return [];
}
function codecAvailability(codec, flags, list) {
	const found = list.find((item) => item.value === codec);
	if (!found?.needs?.length) return "builtin";
	if (flags.size === 0) return "unknown";
	return found.needs.some((flag) => flags.has(flag)) ? "yes" : "no";
}
function shellQuote(value) {
	if (value.length === 0) return "''";
	if (/^[\w./:@%+=,~-]+$/.test(value)) return value;
	return `'${value.replace(/'/g, `'\\''`)}'`;
}
function ktString(value) {
	return `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\$/g, "\\$").replace(/\r/g, "\\r").replace(/\n/g, "\\n")}"`;
}
function tokenize(input) {
	const out = [];
	const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
	let match;
	while (match = re.exec(input)) out.push(match[1] ?? match[2] ?? match[3] ?? "");
	return out;
}
function shellJoin(argv) {
	return argv.map(shellQuote).join(" ");
}
function createId() {
	return Math.random().toString(36).slice(2, 10);
}
function num(value, fallback = "") {
	return (value ?? "").trim() || fallback;
}
function fgQuote(value) {
	const cleaned = value.replace(/'/g, "’");
	if (/^[\w./+\-]+$/.test(cleaned)) return cleaned;
	return `'${cleaned.replace(/\\/g, "\\\\")}'`;
}
function fgExpr(value) {
	return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/:/g, "\\:").replace(/'/g, "’");
}
function atempoChain(raw) {
	const speed = Number(raw);
	if (!Number.isFinite(speed) || speed <= 0) return null;
	const parts = [];
	let rest = speed;
	while (rest < .499999) {
		parts.push("atempo=0.5");
		rest /= .5;
	}
	while (rest > 2 + 1e-6) {
		parts.push("atempo=2.0");
		rest /= 2;
	}
	const shown = Math.round(rest * 1e3) / 1e3;
	parts.push(`atempo=${shown}`);
	return parts.join(",");
}
var onOff = [{
	value: "0",
	label: "关"
}, {
	value: "1",
	label: "开"
}];
var FILTERS = [
	{
		kind: "scale",
		label: "缩放",
		stream: "video",
		group: "画面",
		summary: "改变宽高。-2 表示按比例取偶数，利于 yuv420。",
		fields: [
			{
				key: "w",
				label: "宽",
				kind: "text",
				default: "",
				help: "如 1920 或 -2"
			},
			{
				key: "h",
				label: "高",
				kind: "text",
				default: "",
				help: "如 -2 或 1080"
			},
			{
				key: "flags",
				label: "算法",
				kind: "select",
				default: "lanczos",
				options: [
					"fast_bilinear",
					"bilinear",
					"bicubic",
					"lanczos",
					"spline",
					"neighbor"
				].map((value) => ({
					value,
					label: value
				}))
			},
			{
				key: "force",
				label: "保持比例",
				kind: "select",
				default: "decrease",
				options: [
					{
						value: "",
						label: "不强制"
					},
					{
						value: "decrease",
						label: "只缩小"
					},
					{
						value: "increase",
						label: "只放大"
					}
				]
			}
		],
		compile: (p) => {
			if (!num(p.w) && !num(p.h)) return null;
			const force = num(p.force) ? `:force_original_aspect_ratio=${p.force}` : "";
			const flags = num(p.flags) ? `:flags=${p.flags}` : "";
			return `scale=${num(p.w, "-2")}:${num(p.h, "-2")}${flags}${force}`;
		}
	},
	{
		kind: "crop",
		label: "裁切",
		stream: "video",
		group: "画面",
		summary: "从画面中取出一块。x/y 可用表达式，如 (in_w-out_w)/2。",
		fields: [
			{
				key: "w",
				label: "宽",
				kind: "text",
				default: "in_w"
			},
			{
				key: "h",
				label: "高",
				kind: "text",
				default: "in_h"
			},
			{
				key: "x",
				label: "X",
				kind: "text",
				default: "(in_w-out_w)/2"
			},
			{
				key: "y",
				label: "Y",
				kind: "text",
				default: "(in_h-out_h)/2"
			}
		],
		compile: (p) => `crop=${fgExpr(num(p.w, "in_w"))}:${fgExpr(num(p.h, "in_h"))}:${fgExpr(num(p.x, "0"))}:${fgExpr(num(p.y, "0"))}`
	},
	{
		kind: "pad",
		label: "补边",
		stream: "video",
		group: "画面",
		summary: "把画面垫到更大画布，常用来做信箱或正方形。",
		fields: [
			{
				key: "w",
				label: "宽",
				kind: "text",
				default: "1920"
			},
			{
				key: "h",
				label: "高",
				kind: "text",
				default: "1080"
			},
			{
				key: "x",
				label: "X",
				kind: "text",
				default: "(ow-iw)/2"
			},
			{
				key: "y",
				label: "Y",
				kind: "text",
				default: "(oh-ih)/2"
			},
			{
				key: "color",
				label: "颜色",
				kind: "text",
				default: "black"
			}
		],
		compile: (p) => `pad=${fgExpr(num(p.w, "1920"))}:${fgExpr(num(p.h, "1080"))}:${fgExpr(num(p.x, "0"))}:${fgExpr(num(p.y, "0"))}:color=${fgQuote(num(p.color, "black"))}`
	},
	{
		kind: "fps",
		label: "帧率",
		stream: "video",
		group: "画面",
		summary: "重定时到固定帧率。和输出 -r 不要同时乱设。",
		fields: [{
			key: "fps",
			label: "帧率",
			kind: "text",
			default: "30"
		}],
		compile: (p) => num(p.fps) ? `fps=${p.fps}` : null
	},
	{
		kind: "eq",
		label: "影调",
		stream: "video",
		group: "画面",
		summary: "亮度、对比、饱和与伽马。浏览器预览只做近似，不以它为准。",
		fields: [
			{
				key: "brightness",
				label: "亮度",
				kind: "range",
				default: "0",
				min: "-1",
				max: "1",
				step: "0.01"
			},
			{
				key: "contrast",
				label: "对比",
				kind: "range",
				default: "1",
				min: "0",
				max: "2",
				step: "0.01"
			},
			{
				key: "saturation",
				label: "饱和",
				kind: "range",
				default: "1",
				min: "0",
				max: "3",
				step: "0.01"
			},
			{
				key: "gamma",
				label: "伽马",
				kind: "range",
				default: "1",
				min: "0.1",
				max: "3",
				step: "0.01"
			}
		],
		compile: (p) => {
			const parts = [];
			if (num(p.brightness) && p.brightness !== "0") parts.push(`brightness=${p.brightness}`);
			if (num(p.contrast) && p.contrast !== "1") parts.push(`contrast=${p.contrast}`);
			if (num(p.saturation) && p.saturation !== "1") parts.push(`saturation=${p.saturation}`);
			if (num(p.gamma) && p.gamma !== "1") parts.push(`gamma=${p.gamma}`);
			return parts.length ? `eq=${parts.join(":")}` : null;
		}
	},
	{
		kind: "hue",
		label: "色相",
		stream: "video",
		group: "画面",
		summary: "旋转色相，饱和用倍数。",
		fields: [{
			key: "h",
			label: "色相角度",
			kind: "range",
			default: "0",
			min: "-180",
			max: "180",
			step: "1"
		}, {
			key: "s",
			label: "饱和倍数",
			kind: "range",
			default: "1",
			min: "0",
			max: "3",
			step: "0.01"
		}],
		compile: (p) => {
			if ((!num(p.h) || p.h === "0") && (!num(p.s) || p.s === "1")) return null;
			return `hue=h=${num(p.h, "0")}:s=${num(p.s, "1")}`;
		}
	},
	{
		kind: "unsharp",
		label: "锐化",
		stream: "video",
		group: "画面",
		summary: "反锐化遮罩。强度 0.5 到 1.5 通常够用。",
		fields: [{
			key: "ms",
			label: "矩阵",
			kind: "select",
			default: "5",
			options: [
				"3",
				"5",
				"7"
			].map((v) => ({
				value: v,
				label: v
			}))
		}, {
			key: "amount",
			label: "强度",
			kind: "range",
			default: "0.8",
			min: "0",
			max: "3",
			step: "0.1"
		}],
		compile: (p) => `unsharp=lx=${num(p.ms, "5")}:ly=${num(p.ms, "5")}:la=${num(p.amount, "0.8")}`
	},
	{
		kind: "transpose",
		label: "旋转 90°",
		stream: "video",
		group: "画面",
		summary: "按 90 度方向翻转画面。",
		fields: [{
			key: "dir",
			label: "方向",
			kind: "select",
			default: "1",
			options: [
				{
					value: "1",
					label: "顺时针 90°"
				},
				{
					value: "2",
					label: "逆时针 90°"
				},
				{
					value: "0",
					label: "逆时针 90° 并镜像"
				},
				{
					value: "3",
					label: "顺时针 90° 并镜像"
				}
			]
		}],
		compile: (p) => `transpose=${num(p.dir, "1")}`
	},
	{
		kind: "hflip",
		label: "水平翻转",
		stream: "video",
		group: "画面",
		summary: "左右镜像。",
		fields: [],
		compile: () => "hflip"
	},
	{
		kind: "vflip",
		label: "垂直翻转",
		stream: "video",
		group: "画面",
		summary: "上下颠倒。",
		fields: [],
		compile: () => "vflip"
	},
	{
		kind: "rotate",
		label: "任意旋转",
		stream: "video",
		group: "画面",
		summary: "按角度旋转并填充空隙。大角度会改变有效画幅。",
		fields: [{
			key: "deg",
			label: "角度",
			kind: "text",
			default: "0"
		}, {
			key: "fill",
			label: "填充色",
			kind: "text",
			default: "black"
		}],
		compile: (p) => num(p.deg) && p.deg !== "0" ? `rotate=${p.deg}*PI/180:fillcolor=${fgQuote(num(p.fill, "black"))}` : null
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
				options: [{
					value: "in",
					label: "淡入"
				}, {
					value: "out",
					label: "淡出"
				}]
			},
			{
				key: "st",
				label: "起点（秒）",
				kind: "text",
				default: "0"
			},
			{
				key: "d",
				label: "时长（秒）",
				kind: "text",
				default: "1"
			}
		],
		compile: (p) => `fade=t=${num(p.dir, "in")}:st=${num(p.st, "0")}:d=${num(p.d, "1")}`
	},
	{
		kind: "yadif",
		label: "反交错 yadif",
		stream: "video",
		group: "画面",
		summary: "把隔行扫描拉成逐行。素材不是隔行就不要开。",
		fields: [{
			key: "mode",
			label: "模式",
			kind: "select",
			default: "0",
			options: [{
				value: "0",
				label: "每帧一场"
			}, {
				value: "1",
				label: "每场一帧"
			}]
		}, {
			key: "parity",
			label: "场序",
			kind: "select",
			default: "-1",
			options: [
				{
					value: "-1",
					label: "自动"
				},
				{
					value: "0",
					label: "上场优先"
				},
				{
					value: "1",
					label: "下场优先"
				}
			]
		}],
		compile: (p) => `yadif=mode=${num(p.mode, "0")}:parity=${num(p.parity, "-1")}`
	},
	{
		kind: "bwdif",
		label: "反交错 bwdif",
		stream: "video",
		group: "画面",
		summary: "比 yadif 更锐的运动自适应反交错。",
		fields: [],
		compile: () => "bwdif"
	},
	{
		kind: "hqdn3d",
		label: "降噪 hqdn3d",
		stream: "video",
		group: "画面",
		summary: "轻量时空降噪，适合轻度噪点。",
		fields: [{
			key: "luma",
			label: "亮度",
			kind: "text",
			default: "4"
		}, {
			key: "chroma",
			label: "色度",
			kind: "text",
			default: "3"
		}],
		compile: (p) => `hqdn3d=${num(p.luma, "4")}:${num(p.chroma, "3")}`
	},
	{
		kind: "gblur",
		label: "高斯模糊",
		stream: "video",
		group: "画面",
		summary: "整幅柔化。sigma 越大越糊。",
		fields: [{
			key: "sigma",
			label: "Sigma",
			kind: "range",
			default: "1",
			min: "0.1",
			max: "20",
			step: "0.1"
		}],
		compile: (p) => `gblur=sigma=${num(p.sigma, "1")}`
	},
	{
		kind: "boxblur",
		label: "方框模糊",
		stream: "video",
		group: "画面",
		summary: "更快的模糊，边缘更硬。",
		fields: [{
			key: "radius",
			label: "半径",
			kind: "text",
			default: "2"
		}],
		compile: (p) => `boxblur=${num(p.radius, "2")}`
	},
	{
		kind: "vignette",
		label: "暗角",
		stream: "video",
		group: "画面",
		summary: "四角压暗。分母越小暗角越重。",
		fields: [{
			key: "denom",
			label: "分母",
			kind: "text",
			default: "5"
		}],
		compile: (p) => `vignette=angle=PI/${num(p.denom, "5")}`
	},
	{
		kind: "format",
		label: "像素格式",
		stream: "video",
		group: "画面",
		summary: "在滤镜链中转换像素格式，例如给叠加准备 rgba。",
		fields: [{
			key: "pix",
			label: "格式",
			kind: "text",
			default: "yuv420p"
		}],
		compile: (p) => num(p.pix) ? `format=${p.pix}` : null
	},
	{
		kind: "colorspace",
		label: "色彩空间",
		stream: "video",
		group: "画面",
		summary: "转换矩阵与范围。网页成片常见 bt709 + tv。",
		fields: [{
			key: "all",
			label: "矩阵",
			kind: "select",
			default: "bt709",
			options: [
				"bt709",
				"bt601-6-625",
				"bt601-6-525",
				"bt2020"
			].map((value) => ({
				value,
				label: value
			}))
		}, {
			key: "range",
			label: "范围",
			kind: "select",
			default: "tv",
			options: [{
				value: "tv",
				label: "tv · limited"
			}, {
				value: "pc",
				label: "pc · full"
			}]
		}],
		compile: (p) => `colorspace=all=${num(p.all, "bt709")}:range=${num(p.range, "tv")}`
	},
	{
		kind: "drawtext",
		label: "绘制文字",
		stream: "video",
		group: "画面",
		summary: "烧进画面的字。系统需能找到字体，必要时写 fontfile。",
		fields: [
			{
				key: "text",
				label: "文字",
				kind: "text",
				default: "KERF"
			},
			{
				key: "size",
				label: "字号",
				kind: "text",
				default: "36"
			},
			{
				key: "color",
				label: "颜色",
				kind: "text",
				default: "white"
			},
			{
				key: "x",
				label: "X",
				kind: "text",
				default: "(w-text_w)/2"
			},
			{
				key: "y",
				label: "Y",
				kind: "text",
				default: "h-th-48"
			},
			{
				key: "fontfile",
				label: "字体文件",
				kind: "text",
				default: ""
			}
		],
		compile: (p) => {
			if (!num(p.text)) return null;
			const font = num(p.fontfile) ? `:fontfile=${fgQuote(p.fontfile)}` : "";
			return `drawtext=text=${fgQuote(p.text)}:fontsize=${num(p.size, "36")}:fontcolor=${fgQuote(num(p.color, "white"))}:x=${fgExpr(num(p.x, "0"))}:y=${fgExpr(num(p.y, "0"))}${font}`;
		}
	},
	{
		kind: "subtitles",
		label: "烧录字幕",
		stream: "video",
		group: "画面",
		summary: "把 SRT/ASS 烧进画面。这是重新编码，不是软字幕。",
		fields: [
			{
				key: "path",
				label: "字幕路径",
				kind: "text",
				default: "subs/dialogue.ass"
			},
			{
				key: "charenc",
				label: "字符集",
				kind: "text",
				default: ""
			},
			{
				key: "style",
				label: "force_style",
				kind: "text",
				default: ""
			}
		],
		compile: (p) => {
			if (!num(p.path)) return null;
			const enc = num(p.charenc) ? `:charenc=${fgQuote(p.charenc)}` : "";
			const style = num(p.style) ? `:force_style=${fgQuote(p.style)}` : "";
			return `subtitles=${fgQuote(p.path)}${enc}${style}`;
		}
	},
	{
		kind: "delogo",
		label: "去台标",
		stream: "video",
		group: "画面",
		summary: "用周围像素糊掉一块矩形。坐标相对原始画面。",
		fields: [
			{
				key: "x",
				label: "X",
				kind: "text",
				default: "10"
			},
			{
				key: "y",
				label: "Y",
				kind: "text",
				default: "10"
			},
			{
				key: "w",
				label: "宽",
				kind: "text",
				default: "120"
			},
			{
				key: "h",
				label: "高",
				kind: "text",
				default: "48"
			}
		],
		compile: (p) => `delogo=x=${num(p.x, "0")}:y=${num(p.y, "0")}:w=${num(p.w, "1")}:h=${num(p.h, "1")}`
	},
	{
		kind: "zoompan",
		label: "推拉",
		stream: "video",
		group: "画面",
		summary: "缓慢推近。非常吃 CPU，短镜头再用。",
		fields: [
			{
				key: "z",
				label: "缩放表达式",
				kind: "text",
				default: "min(zoom+0.0015,1.4)"
			},
			{
				key: "d",
				label: "每帧停留",
				kind: "text",
				default: "125"
			},
			{
				key: "s",
				label: "输出尺寸",
				kind: "text",
				default: "1280x720"
			},
			{
				key: "fps",
				label: "帧率",
				kind: "text",
				default: "25"
			}
		],
		compile: (p) => `zoompan=z='${num(p.z, "1").replace(/'/g, "")}':d=${num(p.d, "125")}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${num(p.s, "1280x720")}:fps=${num(p.fps, "25")}`
	},
	{
		kind: "setpts",
		label: "时间戳",
		stream: "video",
		group: "画面",
		summary: "改写 PTS。2*PTS 是半速，PTS/2 是两倍速（声音要另外处理）。",
		fields: [{
			key: "expr",
			label: "表达式",
			kind: "text",
			default: "PTS-STARTPTS"
		}],
		compile: (p) => num(p.expr) ? `setpts=${fgExpr(p.expr)}` : null
	},
	{
		kind: "trim",
		label: "滤镜内裁剪",
		stream: "video",
		group: "画面",
		summary: "在滤镜里按秒裁掉画面，并重置时间戳。精确裁切也可以用输入 -ss。",
		fields: [{
			key: "start",
			label: "起点（秒）",
			kind: "text",
			default: "0"
		}, {
			key: "end",
			label: "终点（秒）",
			kind: "text",
			default: ""
		}],
		compile: (p) => {
			const bits = [];
			if (num(p.start)) bits.push(`start=${p.start}`);
			if (num(p.end)) bits.push(`end=${p.end}`);
			if (!bits.length) return null;
			return `trim=${bits.join(":")},setpts=PTS-STARTPTS`;
		}
	},
	{
		kind: "tpad",
		label: "尾帧停留",
		stream: "video",
		group: "画面",
		summary: "在结尾克隆或冻结若干秒。",
		fields: [{
			key: "d",
			label: "秒数",
			kind: "text",
			default: "2"
		}, {
			key: "mode",
			label: "方式",
			kind: "select",
			default: "clone",
			options: [{
				value: "clone",
				label: "克隆最后一帧"
			}, {
				value: "add",
				label: "补黑"
			}]
		}],
		compile: (p) => num(p.d) ? `tpad=stop_mode=${num(p.mode, "clone")}:stop_duration=${p.d}` : null
	},
	{
		kind: "reverse",
		label: "倒放",
		stream: "video",
		group: "画面",
		summary: "倒放整段视频。帧会全部进内存，只适合短片。",
		fields: [],
		compile: () => "reverse"
	},
	{
		kind: "speed",
		label: "变速",
		stream: "both",
		group: "画面",
		summary: "同时改画面时间戳和音频 atempo。2 表示两倍速，0.5 表示半速。",
		fields: [{
			key: "factor",
			label: "倍率",
			kind: "text",
			default: "1"
		}],
		compile: () => null
	},
	{
		kind: "volume",
		label: "音量",
		stream: "audio",
		group: "声音",
		summary: "线性倍数或分贝。浏览器预览只反映线性倍数。",
		fields: [{
			key: "amount",
			label: "数值",
			kind: "text",
			default: "1"
		}, {
			key: "unit",
			label: "单位",
			kind: "select",
			default: "linear",
			options: [{
				value: "linear",
				label: "倍数"
			}, {
				value: "db",
				label: "分贝"
			}]
		}],
		compile: (p) => {
			if (!num(p.amount)) return null;
			return p.unit === "db" ? `volume=${p.amount}dB` : `volume=${p.amount}`;
		}
	},
	{
		kind: "loudnorm",
		label: "响度标准化",
		stream: "audio",
		group: "声音",
		summary: "EBU R128 单遍。广播/播客常用 I=-16，电影常用 I=-24。",
		fields: [
			{
				key: "I",
				label: "目标 LUFS",
				kind: "text",
				default: "-16"
			},
			{
				key: "TP",
				label: "真峰值",
				kind: "text",
				default: "-1.5"
			},
			{
				key: "LRA",
				label: "响度范围",
				kind: "text",
				default: "11"
			}
		],
		compile: (p) => `loudnorm=I=${num(p.I, "-16")}:TP=${num(p.TP, "-1.5")}:LRA=${num(p.LRA, "11")}`
	},
	{
		kind: "acompressor",
		label: "压缩",
		stream: "audio",
		group: "声音",
		summary: "压低动态。阈值是 dBFS，比例 3 表示 3:1。",
		fields: [
			{
				key: "threshold",
				label: "阈值",
				kind: "text",
				default: "-18"
			},
			{
				key: "ratio",
				label: "比例",
				kind: "text",
				default: "3"
			},
			{
				key: "attack",
				label: "启动 ms",
				kind: "text",
				default: "20"
			},
			{
				key: "release",
				label: "释放 ms",
				kind: "text",
				default: "250"
			}
		],
		compile: (p) => `acompressor=threshold=${num(p.threshold, "-18")}dB:ratio=${num(p.ratio, "3")}:attack=${num(p.attack, "20")}:release=${num(p.release, "250")}`
	},
	{
		kind: "alimiter",
		label: "限制器",
		stream: "audio",
		group: "声音",
		summary: "防止削波。0.95 大约是 -0.4 dBFS。",
		fields: [{
			key: "limit",
			label: "上限",
			kind: "text",
			default: "0.95"
		}],
		compile: (p) => `alimiter=limit=${num(p.limit, "0.95")}`
	},
	{
		kind: "highpass",
		label: "高通",
		stream: "audio",
		group: "声音",
		summary: "切掉低频隆隆声。对白常用 80Hz。",
		fields: [{
			key: "f",
			label: "频率 Hz",
			kind: "text",
			default: "80"
		}],
		compile: (p) => num(p.f) ? `highpass=f=${p.f}` : null
	},
	{
		kind: "lowpass",
		label: "低通",
		stream: "audio",
		group: "声音",
		summary: "切掉高频嘶声。",
		fields: [{
			key: "f",
			label: "频率 Hz",
			kind: "text",
			default: "14000"
		}],
		compile: (p) => num(p.f) ? `lowpass=f=${p.f}` : null
	},
	{
		kind: "equalizer",
		label: "三段均衡",
		stream: "audio",
		group: "声音",
		summary: "80Hz / 1kHz / 8kHz，单位是 dB，0 表示不动。",
		fields: [
			{
				key: "low",
				label: "低频 dB",
				kind: "range",
				default: "0",
				min: "-12",
				max: "12",
				step: "0.5"
			},
			{
				key: "mid",
				label: "中频 dB",
				kind: "range",
				default: "0",
				min: "-12",
				max: "12",
				step: "0.5"
			},
			{
				key: "high",
				label: "高频 dB",
				kind: "range",
				default: "0",
				min: "-12",
				max: "12",
				step: "0.5"
			}
		],
		compile: (p) => {
			const active = [
				["80", num(p.low, "0")],
				["1000", num(p.mid, "0")],
				["8000", num(p.high, "0")]
			].filter(([, gain]) => gain !== "0" && gain !== "");
			if (!active.length) return null;
			return active.map(([freq, gain]) => `equalizer=f=${freq}:t=q:w=1:g=${gain}`).join(",");
		}
	},
	{
		kind: "atempo",
		label: "音频变速",
		stream: "audio",
		group: "声音",
		summary: "只改声音速度。超出 0.5–2 会自动串成多级 atempo。",
		fields: [{
			key: "factor",
			label: "倍率",
			kind: "text",
			default: "1"
		}],
		compile: (p) => atempoChain(num(p.factor, "1"))
	},
	{
		kind: "aresample",
		label: "重采样",
		stream: "audio",
		group: "声音",
		summary: "改变采样率。也可以只用输出 -ar。",
		fields: [{
			key: "rate",
			label: "采样率",
			kind: "text",
			default: "48000"
		}],
		compile: (p) => num(p.rate) ? `aresample=${p.rate}` : null
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
				options: [{
					value: "in",
					label: "淡入"
				}, {
					value: "out",
					label: "淡出"
				}]
			},
			{
				key: "st",
				label: "起点",
				kind: "text",
				default: "0"
			},
			{
				key: "d",
				label: "时长",
				kind: "text",
				default: "0.5"
			}
		],
		compile: (p) => `afade=t=${num(p.dir, "in")}:st=${num(p.st, "0")}:d=${num(p.d, "0.5")}`
	},
	{
		kind: "silenceremove",
		label: "去开头静音",
		stream: "audio",
		group: "声音",
		summary: "去掉起始低于阈值的部分。阈值越接近 0 越严格。",
		fields: [{
			key: "periods",
			label: "段数",
			kind: "text",
			default: "1"
		}, {
			key: "threshold",
			label: "阈值 dB",
			kind: "text",
			default: "-50"
		}],
		compile: (p) => `silenceremove=start_periods=${num(p.periods, "1")}:start_threshold=${num(p.threshold, "-50")}dB:detection=peak`
	},
	{
		kind: "adelay",
		label: "音频延迟",
		stream: "audio",
		group: "声音",
		summary: "所有声道延迟若干毫秒，用来对齐口型。",
		fields: [{
			key: "ms",
			label: "毫秒",
			kind: "text",
			default: "0"
		}],
		compile: (p) => num(p.ms) && p.ms !== "0" ? `adelay=${p.ms}:all=1` : null
	},
	{
		kind: "dynaudnorm",
		label: "动态响度",
		stream: "audio",
		group: "声音",
		summary: "滑动窗口把响度拉齐，比 loudnorm 更紧，播客慎用。",
		fields: [{
			key: "frame",
			label: "帧长",
			kind: "text",
			default: "500"
		}, {
			key: "g",
			label: "高斯",
			kind: "text",
			default: "31"
		}],
		compile: (p) => `dynaudnorm=f=${num(p.frame, "500")}:g=${num(p.g, "31")}`
	},
	{
		kind: "afftdn",
		label: "频谱降噪",
		stream: "audio",
		group: "声音",
		summary: "FFT 降噪。nr 是抑制强度，过大会出金属声。",
		fields: [{
			key: "nr",
			label: "强度",
			kind: "text",
			default: "12"
		}, {
			key: "nf",
			label: "噪底",
			kind: "text",
			default: "-50"
		}],
		compile: (p) => `afftdn=nr=${num(p.nr, "12")}:nf=${num(p.nf, "-50")}`
	},
	{
		kind: "aecho",
		label: "回声",
		stream: "audio",
		group: "声音",
		summary: "简单回声。延迟单位是毫秒。",
		fields: [
			{
				key: "inGain",
				label: "输入增益",
				kind: "text",
				default: "0.8"
			},
			{
				key: "outGain",
				label: "输出增益",
				kind: "text",
				default: "0.9"
			},
			{
				key: "delays",
				label: "延迟",
				kind: "text",
				default: "60"
			},
			{
				key: "decays",
				label: "衰减",
				kind: "text",
				default: "0.4"
			}
		],
		compile: (p) => `aecho=in_gain=${num(p.inGain, "0.8")}:out_gain=${num(p.outGain, "0.9")}:delays=${num(p.delays, "60")}:decays=${num(p.decays, "0.4")}`
	},
	{
		kind: "pan",
		label: "声道映射",
		stream: "audio",
		group: "声音",
		summary: "重新摆放声道。例如把立体声收成单声道。",
		fields: [{
			key: "layout",
			label: "布局",
			kind: "select",
			default: "mono",
			options: [
				{
					value: "mono",
					label: "mono"
				},
				{
					value: "stereo",
					label: "stereo"
				},
				{
					value: "5.1",
					label: "5.1"
				}
			]
		}, {
			key: "map",
			label: "映射",
			kind: "text",
			default: "c0=0.5*c0+0.5*c1"
		}],
		compile: (p) => `pan=${num(p.layout, "stereo")}|${fgExpr(num(p.map, "c0=c0"))}`
	},
	{
		kind: "overlay",
		label: "叠加",
		stream: "video",
		group: "复合",
		summary: "把第二路画面叠到第一路上。需要两路输入。",
		fields: [
			{
				key: "x",
				label: "X",
				kind: "text",
				default: "16"
			},
			{
				key: "y",
				label: "Y",
				kind: "text",
				default: "16"
			},
			{
				key: "ow",
				label: "上层宽",
				kind: "text",
				default: ""
			},
			{
				key: "oh",
				label: "上层高",
				kind: "text",
				default: ""
			},
			{
				key: "format",
				label: "格式",
				kind: "select",
				default: "auto",
				options: [
					"auto",
					"yuv420",
					"rgb"
				].map((value) => ({
					value,
					label: value
				}))
			},
			{
				key: "shortest",
				label: "以短的为准",
				kind: "select",
				default: "0",
				options: onOff
			}
		],
		compile: () => null
	},
	{
		kind: "amix",
		label: "混音",
		stream: "audio",
		group: "复合",
		summary: "把每一路输入的音频混成一条。",
		fields: [{
			key: "duration",
			label: "时长",
			kind: "select",
			default: "longest",
			options: [
				{
					value: "longest",
					label: "最长"
				},
				{
					value: "shortest",
					label: "最短"
				},
				{
					value: "first",
					label: "第一路"
				}
			]
		}, {
			key: "dropout",
			label: "淡出秒",
			kind: "text",
			default: "2"
		}],
		compile: () => null
	},
	{
		kind: "concat",
		label: "拼接",
		stream: "both",
		group: "复合",
		summary: "按输入顺序首尾相接。各路的分辨率和采样率最好先统一。",
		fields: [{
			key: "withAudio",
			label: "包含音频",
			kind: "select",
			default: "1",
			options: onOff
		}],
		compile: () => null
	},
	{
		kind: "acrossfade",
		label: "音频交叉淡化",
		stream: "audio",
		group: "复合",
		summary: "两段音频交叉过渡。只使用前两路。",
		fields: [
			{
				key: "duration",
				label: "秒",
				kind: "text",
				default: "3"
			},
			{
				key: "c1",
				label: "曲线 1",
				kind: "select",
				default: "tri",
				options: [
					"tri",
					"qsin",
					"esin",
					"hsin",
					"log",
					"par",
					"qua",
					"cub",
					"squ",
					"exp"
				].map((value) => ({
					value,
					label: value
				}))
			},
			{
				key: "c2",
				label: "曲线 2",
				kind: "select",
				default: "tri",
				options: [
					"tri",
					"qsin",
					"esin",
					"hsin",
					"log"
				].map((value) => ({
					value,
					label: value
				}))
			}
		],
		compile: () => null
	},
	{
		kind: "palette",
		label: "调色板 GIF",
		stream: "video",
		group: "复合",
		summary: "palettegen + paletteuse。前面先放 fps 和 scale，成品用 GIF 封装。",
		fields: [{
			key: "stats",
			label: "统计",
			kind: "select",
			default: "diff",
			options: [
				{
					value: "full",
					label: "full"
				},
				{
					value: "diff",
					label: "diff"
				},
				{
					value: "single",
					label: "single"
				}
			]
		}, {
			key: "dither",
			label: "抖动",
			kind: "select",
			default: "bayer",
			options: [
				"bayer",
				"floyd_steinberg",
				"sierra2",
				"none"
			].map((value) => ({
				value,
				label: value
			}))
		}],
		compile: () => null
	}
];
var BY_KIND = new Map(FILTERS.map((item) => [item.kind, item]));
function getFilter(kind) {
	const found = BY_KIND.get(kind);
	if (!found) throw new Error(`未知滤镜 ${kind}`);
	return found;
}
function makeFilter(kind, params = {}) {
	const def = getFilter(kind);
	const base = {};
	for (const field of def.fields) base[field.key] = field.default;
	return {
		id: createId(),
		kind,
		enabled: true,
		params: {
			...base,
			...params
		}
	};
}
function chainOf(nodes) {
	const parts = [];
	for (const node of nodes) {
		const compiled = getFilter(node.kind).compile(node.params);
		if (!compiled) continue;
		for (const piece of compiled.split(",")) if (piece) parts.push(piece);
	}
	return parts;
}
function isComplexKind(kind) {
	return kind === "overlay" || kind === "amix" || kind === "concat" || kind === "acrossfade" || kind === "palette";
}
function compileGraph(inputCount, nodes, raw) {
	if (raw.trim()) return {
		complex: raw.trim(),
		maps: [],
		notes: ["手写 filter_complex 会取代自动滤镜链。输出映射改由「映射」决定，自动模式此时不再插入标签。"],
		errors: []
	};
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
		const shown = Math.round(1 / factor * 1e3) / 1e3;
		vchain.push(`setpts=${shown}*PTS`);
		const tempo = atempoChain(String(factor));
		if (tempo) for (const piece of tempo.split(",")) achain.push(piece);
	}
	const notes = [];
	const errors = [];
	if (speeds.length > 1) notes.push("多段变速会叠乘，通常只留一段。");
	if (specials.length === 0) return {
		vf: vchain.join(",") || void 0,
		af: achain.join(",") || void 0,
		maps: [],
		notes,
		errors
	};
	const kinds = specials.map((node) => node.kind);
	if (kinds.filter((kind) => kind === "overlay" || kind === "concat" || kind === "palette").length > 1) errors.push("叠加、拼接、调色板 GIF 一次只能留一个。");
	if (kinds.includes("amix") && kinds.includes("acrossfade")) errors.push("混音和交叉淡化不要一起用。");
	if (kinds.includes("overlay") && inputCount < 2) errors.push("叠加需要至少两路输入。");
	if (kinds.includes("concat") && inputCount < 2) errors.push("拼接需要至少两路输入。");
	if (kinds.includes("acrossfade") && inputCount < 2) errors.push("交叉淡化需要两路输入。");
	if (kinds.includes("amix") && inputCount < 2) errors.push("混音需要至少两路输入。");
	const parts = [];
	const maps = [];
	const palette = specials.find((node) => node.kind === "palette");
	const overlay = specials.find((node) => node.kind === "overlay");
	const concat = specials.find((node) => node.kind === "concat");
	const amix = specials.find((node) => node.kind === "amix");
	const across = specials.find((node) => node.kind === "acrossfade");
	if (errors.length) return {
		maps,
		notes,
		errors
	};
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
		const pads = Array.from({ length: inputCount }, (_, index) => withAudio ? `[${index}:v][${index}:a]` : `[${index}:v]`).join("");
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
			parts.push(`${pads}amix=inputs=${inputCount}:duration=${amix.params.duration || "longest"}:dropout_transition=${amix.params.dropout || "2"}${out}`);
			if (achain.length) parts.push(`[mix]${achain.join(",")}[a]`);
			maps.push("[a]");
		} else if (across) {
			const out = achain.length ? "[xf]" : "[a]";
			parts.push(`[0:a][1:a]acrossfade=d=${across.params.duration || "3"}:c1=${across.params.c1 || "tri"}:c2=${across.params.c2 || "tri"}${out}`);
			if (achain.length) parts.push(`[xf]${achain.join(",")}[a]`);
			maps.push("[a]");
		} else if (achain.length) {
			parts.push(`[0:a]${achain.join(",")}[a]`);
			maps.push("[a]");
		} else if (overlay) maps.push("0:a?");
	} else if (palette && achain.length) notes.push("调色板 GIF 忽略了音频滤镜。");
	return {
		complex: parts.join(";"),
		maps,
		notes,
		errors
	};
}
function parseProbe(text) {
	const version = text.match(/ffmpeg version\s+(\S+)/i)?.[1] ?? null;
	const flags = /* @__PURE__ */ new Set();
	const re = /--enable-([A-Za-z0-9_-]+)/g;
	let match;
	while (match = re.exec(text)) flags.add(match[1].toLowerCase());
	return {
		version,
		flags
	};
}
var FEATURE_FLAGS = [
	{
		flag: "gpl",
		label: "GPL"
	},
	{
		flag: "libx264",
		label: "libx264"
	},
	{
		flag: "libx265",
		label: "libx265"
	},
	{
		flag: "libvpx",
		label: "libvpx"
	},
	{
		flag: "libaom",
		label: "libaom"
	},
	{
		flag: "libsvtav1",
		label: "SVT-AV1"
	},
	{
		flag: "libopus",
		label: "libopus"
	},
	{
		flag: "libmp3lame",
		label: "LAME"
	},
	{
		flag: "libvorbis",
		label: "Vorbis"
	},
	{
		flag: "nvenc",
		label: "NVENC"
	},
	{
		flag: "ffnvcodec",
		label: "ffnvcodec"
	},
	{
		flag: "videotoolbox",
		label: "VideoToolbox"
	},
	{
		flag: "libvpl",
		label: "QSV/libvpl"
	},
	{
		flag: "amf",
		label: "AMF"
	},
	{
		flag: "vaapi",
		label: "VAAPI"
	},
	{
		flag: "libass",
		label: "libass"
	},
	{
		flag: "libfreetype",
		label: "freetype"
	}
];
var RATE = /^\d+(\.\d+)?([kKmM])?$/;
function pushRate(issues, label, value) {
	if (!value.trim()) return;
	if (!RATE.test(value.trim())) issues.push({
		level: "warn",
		message: `${label}「${value}」不像码率。示例：192k、8M。`
	});
	else if (/^\d+(\.\d+)?$/.test(value.trim())) issues.push({
		level: "warn",
		message: `${label}没有单位，ffmpeg 会按比特理解。多半你想写 ${value.trim()}k。`
	});
}
function extOf(path) {
	const base = path.split(/[/\\]/).pop() ?? "";
	const dot = base.lastIndexOf(".");
	return dot >= 0 ? base.slice(dot + 1).toLowerCase() : "";
}
function binaryOf(data) {
	if (data.engine.mode === "path") return data.engine.binaryPath.trim() || "ffmpeg";
	if (data.engine.mode === "url") return "ffmpeg";
	return `${data.engine.prefix.trim().replace(/\/$/, "") || "build/ffmpeg"}/bin/ffmpeg`;
}
function isAudioMap(map) {
	return map === "[a]" || map === "[ca]" || map === "[mix]" || map === "[xf]" || /:a/.test(map);
}
function supportsCrf(codec) {
	return codec === "libx264" || codec === "libx265";
}
function usesQuantizer(codec) {
	return codec === "mpeg4" || codec === "mjpeg" || codec === "libxvid";
}
function pushVideo(args, video, issues) {
	const codec = video.codec;
	args.push("-c:v", codec);
	if (codec === "copy") {
		if (video.bitrate || video.fps || video.pixFmt || video.crf || video.preset) issues.push({
			level: "warn",
			message: "视频是流复制，帧率、像素格式、预设和码率不会生效。"
		});
		return;
	}
	if ((codec === "libx264" || codec === "libx265" || codec.endsWith("_qsv")) && video.preset) args.push("-preset", video.preset);
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
		if (video.rateMode === "crf") args.push("-crf", video.crf || "32", "-b:v", video.bitrate || "0");
		else if (video.bitrate) {
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
	} else if (video.bitrate) args.push("-b:v", video.bitrate);
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
var LOSSLESS_AUDIO = /* @__PURE__ */ new Set([
	"flac",
	"alac",
	"pcm_s16le",
	"pcm_s24le",
	"copy"
]);
function pushAudio(args, audio, issues) {
	args.push("-c:a", audio.codec);
	if (audio.codec === "copy") return;
	if ((audio.codec === "libmp3lame" || audio.codec === "libvorbis") && audio.quality.trim()) {
		args.push("-q:a", audio.quality.trim());
		if (audio.bitrate.trim()) issues.push({
			level: "warn",
			message: "音频同时写了质量系数和码率，已采用 -q:a。"
		});
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
function containerOf(data) {
	if (data.output.container !== "auto") return data.output.container;
	return {
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
		aac: "adts"
	}[extOf(data.output.path)] ?? "";
}
function faststartOk(container) {
	return container === "mp4" || container === "mov" || container === "auto";
}
function buildJob(data) {
	const issues = [];
	const engine = data.engine;
	if (engine.mode === "path") {
		const path = engine.binaryPath.trim();
		if (!path) issues.push({
			level: "error",
			message: "还没有填写 FFmpeg 本地路径。"
		});
		else if (/^https?:\/\//i.test(path)) issues.push({
			level: "error",
			message: "这是 URL。请改到「远程 URL」模式。"
		});
		else if (!/[\\/]/.test(path) && !/^ffmpeg(\.exe)?$/i.test(path)) issues.push({
			level: "warn",
			message: "路径里没有目录分隔符。如果它不在 PATH 上，请写绝对路径。"
		});
	} else if (engine.mode === "url") {
		const url = engine.binaryUrl.trim();
		if (!url) issues.push({
			level: "error",
			message: "还没有填写 FFmpeg 下载 URL。"
		});
		else try {
			const parsed = new URL(url);
			if (parsed.protocol !== "https:" && parsed.protocol !== "http:") issues.push({
				level: "error",
				message: "远程地址只接受 http 或 https。"
			});
			if (/\.(zip|7z|tar|gz|tgz|dmg|exe\.zip)$/i.test(parsed.pathname)) issues.push({
				level: "warn",
				message: "下载器只保存单个可执行文件，不会解压压缩包。压缩包请在本机解开后改用本地路径。"
			});
		} catch {
			issues.push({
				level: "error",
				message: "远程地址不是合法 URL。"
			});
		}
		if (engine.sha256.trim() && !/^[a-f0-9]{64}$/i.test(engine.sha256.trim())) issues.push({
			level: "warn",
			message: "SHA-256 应该是 64 位十六进制。留空则跳过校验。"
		});
	} else {
		const source = engine.sourceUrl.trim();
		if (!source) issues.push({
			level: "error",
			message: "还没有填写 FFmpeg 源码地址。"
		});
		else if (!/^(https?:\/\/|git@)/.test(source)) issues.push({
			level: "error",
			message: "源码地址应为 https:// 或 git@ 开头的 Git 仓库。"
		});
		if (!engine.sourceRef.trim()) issues.push({
			level: "error",
			message: "源码需要一个分支、标签或提交。"
		});
		issues.push({
			level: "warn",
			message: "源码构建面向 Linux / macOS 的 configure && make。Windows 请改用远程二进制。"
		});
	}
	data.inputs.forEach((input, index) => {
		const label = `输入 ${index + 1}`;
		if (input.kind === "file" && !input.location.trim()) issues.push({
			level: "error",
			message: `${label}没有路径或 URL。`
		});
		if (input.kind === "lavfi" && !input.lavfi.trim()) issues.push({
			level: "error",
			message: `${label}没有 lavfi 表达式。`
		});
	});
	if (!data.output.path.trim()) issues.push({
		level: "error",
		message: "没有输出路径。"
	});
	const graph = compileGraph(data.inputs.length, data.filters, data.rawFilter);
	for (const message of graph.errors) issues.push({
		level: "error",
		message
	});
	for (const message of graph.notes) issues.push({
		level: "warn",
		message
	});
	if (data.video.codec === "copy" && (graph.vf || graph.complex && !data.output.videoDisabled)) issues.push({
		level: "error",
		message: "画面滤镜不能搭配 -c:v copy。换成编码器，或清空画面滤镜。"
	});
	if (data.audio.codec === "copy" && graph.af) issues.push({
		level: "error",
		message: "声音滤镜不能搭配 -c:a copy。"
	});
	if (data.output.videoDisabled && graph.vf) issues.push({
		level: "error",
		message: "已关闭视频，但简单滤镜链仍有画面处理。"
	});
	if (data.output.audioDisabled && graph.af) issues.push({
		level: "error",
		message: "已关闭音频，但简单滤镜链仍有声音处理。"
	});
	const container = containerOf(data);
	const ext = extOf(data.output.path);
	if (data.output.container !== "auto" && ext) {
		const ok = {
			mp4: ["mp4", "m4a"],
			mov: ["mov"],
			matroska: ["mkv"],
			webm: ["webm"],
			mpegts: ["ts", "m2ts"],
			gif: ["gif"],
			mp3: ["mp3"],
			wav: ["wav"],
			flac: ["flac"]
		}[data.output.container];
		if (ok && !ok.includes(ext)) issues.push({
			level: "warn",
			message: `封装是 ${data.output.container}，但文件名以 .${ext} 结尾。`
		});
	}
	if (container === "webm" && ![
		"libvpx-vp9",
		"libvpx",
		"libaom-av1",
		"libsvtav1",
		"copy",
		"av1_nvenc"
	].includes(data.video.codec) && !data.output.videoDisabled) issues.push({
		level: "error",
		message: "WebM 只适合 VP8/VP9/AV1。当前视频编码器放不进去。"
	});
	if (container === "webm" && ![
		"libopus",
		"libvorbis",
		"copy"
	].includes(data.audio.codec) && !data.output.audioDisabled) issues.push({
		level: "error",
		message: "WebM 音频请用 Opus 或 Vorbis。"
	});
	if ((container === "mp4" || container === "mov") && data.audio.codec === "libvorbis") issues.push({
		level: "warn",
		message: "Vorbis 放进 MP4/MOV 兼容性很差，建议 AAC 或 Opus。"
	});
	if (data.video.codec === "prores_ks" && container !== "mov" && container !== "") issues.push({
		level: "warn",
		message: "ProRes 建议用 MOV。"
	});
	if ((container === "gif" || data.video.codec === "gif") && !data.filters.some((node) => node.enabled && node.kind === "palette") && !data.rawFilter.trim()) issues.push({
		level: "warn",
		message: "GIF 没有调色板滤镜，颜色会很脏。加上「调色板 GIF」。"
	});
	if (data.video.twoPass && ![
		"libx264",
		"libx265",
		"libvpx-vp9",
		"libaom-av1"
	].includes(data.video.codec)) issues.push({
		level: "warn",
		message: "当前编码器不会生成两遍命令。"
	});
	if (data.video.rateMode === "crf" && data.video.bitrate.trim() && supportsCrf(data.video.codec)) issues.push({
		level: "warn",
		message: "CRF 和视频码率同时存在。x264/x265 在有 -b:v 时可能不再按 CRF 工作，这里在 CRF 模式下不写 -b:v。"
	});
	const probe = parseProbe(engine.probeText);
	if (probe.flags.size) {
		const videoState = codecAvailability(data.video.codec, probe.flags, VIDEO_CODECS);
		const audioState = codecAvailability(data.audio.codec, probe.flags, AUDIO_CODECS);
		if (videoState === "no") issues.push({
			level: "warn",
			message: `探测结果里没有 ${data.video.codec} 所需的编译开关。`
		});
		if (audioState === "no") issues.push({
			level: "warn",
			message: `探测结果里没有 ${data.audio.codec} 所需的编译开关。`
		});
		if (data.filters.some((node) => node.enabled && node.kind === "drawtext") && !probe.flags.has("libfreetype")) issues.push({
			level: "warn",
			message: "drawtext 通常需要 --enable-libfreetype，这次探测里没有。"
		});
	}
	const binary = binaryOf(data);
	const args = [binary];
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
	const outputSeeks = [];
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
		if (input.kind === "lavfi") args.push("-f", "lavfi", "-i", input.lavfi.trim());
		else {
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
	if (outputSeeks.length > 1) issues.push({
		level: "warn",
		message: "多路输入都写了输出侧 -ss，只会采用第一路。输出页的起点优先生效。"
	});
	if (data.output.duration.trim()) args.push("-t", data.output.duration.trim());
	const useComplex = Boolean(graph.complex);
	if (useComplex && graph.complex) args.push("-filter_complex", graph.complex);
	else {
		if (graph.vf && !data.output.videoDisabled) args.push("-vf", graph.vf);
		if (graph.af && !data.output.audioDisabled) args.push("-af", graph.af);
	}
	if (data.output.mapMode === "custom") {
		const maps = data.output.customMaps.split(/\n+/).map((line) => line.trim()).filter(Boolean);
		if (!maps.length) issues.push({
			level: "error",
			message: "自定义映射是空的。"
		});
		for (const map of maps) args.push("-map", map);
	} else if (data.output.mapMode === "all-first") {
		if (useComplex && !data.rawFilter.trim()) {
			issues.push({
				level: "warn",
				message: "滤镜图会生成新的流。已忽略「只映射第一路」，改用滤镜标签。"
			});
			for (const map of graph.maps) {
				if (data.output.videoDisabled && !isAudioMap(map)) continue;
				if (data.output.audioDisabled && isAudioMap(map)) continue;
				args.push("-map", map);
			}
		} else args.push("-map", "0");
	} else if (useComplex && !data.rawFilter.trim()) for (const map of graph.maps) {
		if (data.output.videoDisabled && !isAudioMap(map)) continue;
		if (data.output.audioDisabled && isAudioMap(map)) continue;
		args.push("-map", map);
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
		else issues.push({
			level: "warn",
			message: "倾向标记请写成 0=default 或 v:0=attached_pic。"
		});
	}
	if (data.output.faststart && faststartOk(container || data.output.container)) args.push("-movflags", "+faststart");
	else if (data.output.faststart && container && container !== "mp4" && container !== "mov") issues.push({
		level: "warn",
		message: "faststart 只对 MP4/MOV 有意义，已忽略。"
	});
	if (data.output.fileSizeLimit.trim()) args.push("-fs", data.output.fileSizeLimit.trim());
	if (data.output.muxdelay.trim()) args.push("-muxdelay", data.output.muxdelay.trim());
	if (data.output.muxpreload.trim()) args.push("-muxpreload", data.output.muxpreload.trim());
	if (data.output.target) args.push("-target", data.output.target);
	for (const row of data.output.metadata) if (row.key.trim() && row.value.trim()) args.push("-metadata", `${row.key.trim()}=${row.value.trim()}`);
	if (data.output.extra.trim()) args.push(...tokenize(data.output.extra));
	if (data.output.container !== "auto") args.push("-f", data.output.container);
	const outputPath = data.output.path.trim();
	const twoPass = data.video.twoPass && [
		"libx264",
		"libx265",
		"libvpx-vp9",
		"libaom-av1"
	].includes(data.video.codec) && !data.output.videoDisabled;
	const commands = twoPass ? [[
		...args,
		"-pass",
		"1",
		"-passlogfile",
		"kerf-pass",
		"-an",
		"-f",
		"null",
		"/dev/null"
	], [
		...args,
		"-pass",
		"2",
		"-passlogfile",
		"kerf-pass",
		outputPath
	]] : [[...args, outputPath]];
	return {
		binary,
		commands,
		shell: `${[
			"#!/bin/sh",
			"# 刃帧 KERF 生成。在你自己的机器上运行。",
			engine.mode === "url" ? `# 二进制将由 Kotlin 工程从 ${engine.binaryUrl.trim() || "(未填 URL)"} 取回；此脚本假定 ffmpeg 已在 PATH。` : `# 二进制：${binary}`,
			engine.mode === "source" ? "# 源码模式请先跑 Kotlin 里的构建，再执行下面的命令。" : "",
			twoPass ? "# Windows 把 /dev/null 换成 NUL。" : ""
		].filter((line) => line !== "").join("\n")}\n${commands.map((argv) => shellJoin(argv)).join(" &&\n")}\n`,
		issues,
		plan: [
			{
				title: "定位引擎",
				body: engine.mode === "path" ? `使用本地文件 ${binaryOf(data) || "（未填）"}，不复制、不下载。` : engine.mode === "url" ? `下载 ${engine.binaryUrl.trim() || "（未填）"} 到工作目录缓存，可选校验 SHA-256，并标记为可执行。` : `克隆 ${engine.sourceUrl.trim() || "（未填）"} @ ${engine.sourceRef || "master"}，configure 后安装到 ${engine.prefix || "build/ffmpeg"}。`
			},
			{
				title: "打开输入",
				body: data.inputs.map((input, index) => input.kind === "lavfi" ? `${index + 1}. lavfi ${input.lavfi}` : `${index + 1}. ${input.location || "（空）"}`).join("\n")
			},
			{
				title: "滤镜图",
				body: graph.complex || [graph.vf && `-vf ${graph.vf}`, graph.af && `-af ${graph.af}`].filter(Boolean).join("\n") || "无滤镜，直接送编码器。"
			},
			{
				title: "编码",
				body: [
					data.output.videoDisabled ? "视频：丢弃" : `视频：${data.video.codec} · ${data.video.rateMode}`,
					data.output.audioDisabled ? "音频：丢弃" : `音频：${data.audio.codec}`,
					twoPass ? "两遍编码，第一遍写 kerf-pass 日志。" : "单遍编码。"
				].join("\n")
			},
			{
				title: "封装",
				body: `写出 ${outputPath || "（空）"}，封装 ${data.output.container}。`
			}
		],
		graphText: graph.complex || graph.vf || graph.af || ""
	};
}
function defaultEngine() {
	return {
		mode: "path",
		binaryPath: "ffmpeg",
		binaryUrl: "",
		sha256: "",
		sourceUrl: "",
		sourceRef: "master",
		configureFlags: "--disable-debug --disable-doc --enable-gpl --enable-version3",
		prefix: "build/ffmpeg",
		jobs: "0",
		workDir: ".",
		probeText: ""
	};
}
function defaultGlobal() {
	return {
		overwrite: "yes",
		loglevel: "info",
		hideBanner: true,
		stats: true,
		progress: true,
		nostdin: true,
		benchmark: false,
		threads: "",
		filterThreads: "",
		maxMuxingQueue: "",
		fpsMode: "",
		copyts: false,
		startAtZero: false,
		avoidNegativeTs: "auto",
		noAccurateSeek: false,
		timelimit: ""
	};
}
function defaultInput(partial) {
	return {
		id: createId(),
		kind: "file",
		location: "",
		lavfi: "testsrc2=size=1280x720:rate=30",
		seek: "",
		seekPlace: "input",
		duration: "",
		to: "",
		streamLoop: "",
		realtime: false,
		format: "",
		hwaccel: "",
		hwaccelDevice: "",
		hwaccelOutputFormat: "",
		itsoffset: "",
		threadQueueSize: "",
		probesize: "",
		analyzeduration: "",
		fflags: "",
		extra: "",
		...partial
	};
}
function defaultVideo() {
	return {
		codec: "libx264",
		preset: "slow",
		tune: "film",
		rateMode: "crf",
		crf: "20",
		cq: "23",
		bitrate: "",
		maxrate: "",
		minrate: "",
		bufsize: "",
		gop: "",
		keyintMin: "",
		bf: "",
		refs: "",
		profile: "high",
		level: "",
		pixFmt: "yuv420p",
		fps: "",
		tag: "",
		colorPrimaries: "",
		colorTrc: "",
		colorspace: "",
		colorRange: "",
		spatialAq: false,
		temporalAq: false,
		cpuUsed: "",
		deadline: "good",
		svtPreset: "8",
		twoPass: false,
		forceKeyFrames: "",
		extra: ""
	};
}
function defaultAudio() {
	return {
		codec: "aac",
		bitrate: "192k",
		sampleRate: "48000",
		channels: "2",
		quality: "",
		profile: "",
		sampleFmt: "",
		application: "audio",
		vbr: "on",
		cutoff: "",
		extra: ""
	};
}
function defaultOutput() {
	return {
		path: "out/interview.mp4",
		container: "mp4",
		duration: "",
		start: "",
		fileSizeLimit: "",
		videoDisabled: false,
		audioDisabled: false,
		subtitleDisabled: false,
		dataDisabled: true,
		subtitleCodec: "copy",
		mapMode: "auto",
		customMaps: "0:v:0\n0:a:0",
		mapMetadata: "",
		mapChapters: "",
		disposition: "",
		shortest: false,
		faststart: true,
		muxdelay: "",
		muxpreload: "",
		target: "",
		extra: "",
		metadata: [{
			id: createId(),
			key: "title",
			value: ""
		}]
	};
}
function defaultStudio() {
	return {
		engine: defaultEngine(),
		global: defaultGlobal(),
		inputs: [defaultInput({ location: "footage/interview.mov" })],
		filters: [],
		output: defaultOutput(),
		video: defaultVideo(),
		audio: defaultAudio(),
		rawFilter: ""
	};
}
var PRESETS = [
	{
		id: "web-h264",
		name: "网页成片",
		detail: "H.264 · CRF 20 · AAC · 1080p · faststart",
		video: {
			...defaultVideo(),
			codec: "libx264",
			preset: "slow",
			tune: "film",
			rateMode: "crf",
			crf: "20",
			profile: "high",
			pixFmt: "yuv420p"
		},
		audio: {
			...defaultAudio(),
			codec: "aac",
			bitrate: "192k",
			sampleRate: "48000",
			channels: "2"
		},
		output: {
			container: "mp4",
			faststart: true,
			videoDisabled: false,
			audioDisabled: false
		},
		filters: [makeFilter("scale", {
			w: "1920",
			h: "-2",
			flags: "lanczos",
			force: "decrease"
		}), makeFilter("loudnorm", {
			I: "-16",
			TP: "-1.5",
			LRA: "11"
		})]
	},
	{
		id: "archive-prores",
		name: "母带归档",
		detail: "ProRes 422 HQ · PCM · MOV",
		video: {
			...defaultVideo(),
			codec: "prores_ks",
			preset: "",
			tune: "",
			profile: "3",
			pixFmt: "yuv422p10le",
			rateMode: "abr",
			crf: ""
		},
		audio: {
			...defaultAudio(),
			codec: "pcm_s16le",
			bitrate: "",
			sampleRate: "48000",
			channels: "2"
		},
		output: {
			container: "mov",
			faststart: false,
			videoDisabled: false,
			audioDisabled: false
		},
		filters: []
	},
	{
		id: "podcast",
		name: "播客母带",
		detail: "单声道 · loudnorm −16 · MP3",
		video: {
			...defaultVideo(),
			codec: "copy"
		},
		audio: {
			...defaultAudio(),
			codec: "libmp3lame",
			bitrate: "",
			quality: "4",
			sampleRate: "44100",
			channels: "1"
		},
		output: {
			container: "mp3",
			faststart: false,
			videoDisabled: true,
			audioDisabled: false,
			subtitleDisabled: true
		},
		filters: [
			makeFilter("highpass", { f: "80" }),
			makeFilter("acompressor", {
				threshold: "-18",
				ratio: "3",
				attack: "20",
				release: "250"
			}),
			makeFilter("loudnorm", {
				I: "-16",
				TP: "-1.5",
				LRA: "11"
			})
		]
	},
	{
		id: "gif",
		name: "短循环 GIF",
		detail: "12 fps · 480 宽 · 调色板",
		video: {
			...defaultVideo(),
			codec: "gif",
			preset: "",
			tune: "",
			profile: "",
			pixFmt: "",
			rateMode: "crf"
		},
		audio: {
			...defaultAudio(),
			codec: "copy"
		},
		output: {
			container: "gif",
			faststart: false,
			videoDisabled: false,
			audioDisabled: true,
			subtitleDisabled: true
		},
		filters: [
			makeFilter("fps", { fps: "12" }),
			makeFilter("scale", {
				w: "480",
				h: "-2",
				flags: "lanczos",
				force: "decrease"
			}),
			makeFilter("palette", {
				stats: "diff",
				dither: "bayer"
			})
		]
	},
	{
		id: "nvenc",
		name: "NVENC 快转",
		detail: "h264_nvenc · CQ 23 · p4",
		video: {
			...defaultVideo(),
			codec: "h264_nvenc",
			preset: "p4",
			tune: "",
			rateMode: "crf",
			cq: "23",
			crf: "23",
			profile: "high",
			pixFmt: "yuv420p",
			spatialAq: true
		},
		audio: {
			...defaultAudio(),
			codec: "aac",
			bitrate: "192k"
		},
		output: {
			container: "mp4",
			faststart: true
		},
		filters: [makeFilter("scale", {
			w: "1920",
			h: "-2",
			flags: "lanczos",
			force: "decrease"
		})]
	},
	{
		id: "webm",
		name: "WebM VP9",
		detail: "libvpx-vp9 · CRF 32 · Opus",
		video: {
			...defaultVideo(),
			codec: "libvpx-vp9",
			preset: "",
			tune: "",
			rateMode: "crf",
			crf: "32",
			bitrate: "0",
			cpuUsed: "2",
			deadline: "good",
			profile: "",
			pixFmt: "yuv420p"
		},
		audio: {
			...defaultAudio(),
			codec: "libopus",
			bitrate: "128k",
			application: "audio",
			vbr: "on",
			sampleRate: "48000",
			channels: "2"
		},
		output: {
			container: "webm",
			faststart: false
		},
		filters: [makeFilter("scale", {
			w: "1280",
			h: "-2",
			flags: "lanczos",
			force: "decrease"
		})]
	},
	{
		id: "voice",
		name: "对白清理",
		detail: "高通 · 频谱降噪 · 压缩 · 复制视频",
		video: {
			...defaultVideo(),
			codec: "copy",
			preset: "",
			tune: "",
			profile: "",
			pixFmt: ""
		},
		audio: {
			...defaultAudio(),
			codec: "aac",
			bitrate: "160k",
			sampleRate: "48000",
			channels: "2"
		},
		output: {
			container: "matroska",
			faststart: false
		},
		filters: [
			makeFilter("highpass", { f: "80" }),
			makeFilter("afftdn", {
				nr: "10",
				nf: "-45"
			}),
			makeFilter("acompressor", {
				threshold: "-20",
				ratio: "2.5",
				attack: "15",
				release: "180"
			}),
			makeFilter("alimiter", { limit: "0.95" })
		]
	}
];
var memoryStorage = {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0
};
function sampleData() {
	const data = defaultStudio();
	data.filters = [makeFilter("scale", {
		w: "1920",
		h: "-2",
		flags: "lanczos",
		force: "decrease"
	}), makeFilter("loudnorm", {
		I: "-16",
		TP: "-1.5",
		LRA: "11"
	})];
	return data;
}
var initial = sampleData();
var useStudio = create()(persist((set) => ({
	...initial,
	hydrated: false,
	markHydrated: () => set({ hydrated: true }),
	patchEngine: (partial) => set((state) => ({ engine: {
		...state.engine,
		...partial
	} })),
	patchGlobal: (partial) => set((state) => ({ global: {
		...state.global,
		...partial
	} })),
	patchVideo: (partial) => set((state) => ({ video: {
		...state.video,
		...partial
	} })),
	patchAudio: (partial) => set((state) => ({ audio: {
		...state.audio,
		...partial
	} })),
	patchOutput: (partial) => set((state) => ({ output: {
		...state.output,
		...partial
	} })),
	patchInput: (id, partial) => set((state) => ({ inputs: state.inputs.map((input) => input.id === id ? {
		...input,
		...partial
	} : input) })),
	addInput: () => set((state) => ({ inputs: [...state.inputs, defaultInput()] })),
	removeInput: (id) => set((state) => ({ inputs: state.inputs.length === 1 ? state.inputs : state.inputs.filter((input) => input.id !== id) })),
	addFilter: (kind) => set((state) => ({ filters: [...state.filters, makeFilter(kind)] })),
	patchFilter: (id, params) => set((state) => ({ filters: state.filters.map((filter) => filter.id === id ? {
		...filter,
		params: {
			...filter.params,
			...params
		}
	} : filter) })),
	toggleFilter: (id) => set((state) => ({ filters: state.filters.map((filter) => filter.id === id ? {
		...filter,
		enabled: !filter.enabled
	} : filter) })),
	removeFilter: (id) => set((state) => ({ filters: state.filters.filter((filter) => filter.id !== id) })),
	moveFilter: (id, direction) => set((state) => {
		const index = state.filters.findIndex((filter) => filter.id === id);
		const next = index + direction;
		if (index < 0 || next < 0 || next >= state.filters.length) return state;
		const filters = state.filters.slice();
		const [item] = filters.splice(index, 1);
		filters.splice(next, 0, item);
		return { filters };
	}),
	setRawFilter: (value) => set({ rawFilter: value }),
	addMetadata: () => set((state) => ({ output: {
		...state.output,
		metadata: [...state.output.metadata, {
			id: createId(),
			key: "",
			value: ""
		}]
	} })),
	patchMetadata: (id, partial) => set((state) => ({ output: {
		...state.output,
		metadata: state.output.metadata.map((row) => row.id === id ? {
			...row,
			...partial
		} : row)
	} })),
	removeMetadata: (id) => set((state) => ({ output: {
		...state.output,
		metadata: state.output.metadata.filter((row) => row.id !== id)
	} })),
	applyPreset: (id) => set((state) => {
		const preset = PRESETS.find((item) => item.id === id);
		if (!preset) return state;
		return {
			video: {
				...defaultVideo(),
				...preset.video
			},
			audio: {
				...defaultAudio(),
				...preset.audio
			},
			output: {
				...state.output,
				...preset.output
			},
			global: {
				...defaultGlobal(),
				...state.global,
				hideBanner: true,
				nostdin: true,
				progress: true
			},
			filters: preset.filters.map((filter) => ({
				...filter,
				id: createId(),
				params: { ...filter.params }
			})),
			rawFilter: ""
		};
	}),
	reset: () => set(sampleData())
}), {
	name: "kerf-studio-v1",
	skipHydration: true,
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : localStorage),
	partialize: (state) => ({
		engine: state.engine,
		global: state.global,
		inputs: state.inputs,
		filters: state.filters,
		output: state.output,
		video: state.video,
		audio: state.audio,
		rawFilter: state.rawFilter
	}),
	onRehydrateStorage: () => (state) => {
		state?.markHydrated();
	}
}));
function selectData(state) {
	return {
		engine: state.engine,
		global: state.global,
		inputs: state.inputs,
		filters: state.filters,
		output: state.output,
		video: state.video,
		audio: state.audio,
		rawFilter: state.rawFilter
	};
}
function cx(...parts) {
	return parts.filter(Boolean).join(" ");
}
function matchesQuery(query, text) {
	const needle = query.trim().toLowerCase();
	return !needle || text.toLowerCase().includes(needle);
}
function Field({ query, flag, label, help, children }) {
	if (!matchesQuery(query, `${flag} ${label} ${help}`)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 border-b border-line py-4 md:flex-row md:gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:w-64 md:shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-bone",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-mono text-xs text-brass",
					children: flag
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-pretty text-mist",
					children: help
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children
		})]
	});
}
function TextInput({ value, onChange, placeholder, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value,
		placeholder,
		onChange: (event) => onChange(event.target.value),
		className: cx(mono && "font-mono text-sm")
	});
}
function SelectInput({ value, onChange, options }) {
	const list = options.some((option) => option.value === value) || value === "" ? options : [{
		value,
		label: value
	}, ...options];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (event) => onChange(event.target.value),
		children: list.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: option.value,
			children: option.label
		}, option.value || "empty"))
	});
}
function Toggle({ checked, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		onClick: () => onChange(!checked),
		className: "flex min-h-11 items-center gap-3 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cx("relative h-6 w-11 shrink-0 rounded-full border border-line", checked ? "bg-brass" : "bg-ink"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cx("absolute top-0.5 size-5 rounded-full", checked ? "left-5 bg-ink" : "left-0.5 bg-mist") })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-bone",
			children: label
		})]
	});
}
function Button({ children, onClick, tone = "ghost", disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		className: cx("min-h-11 px-3 text-sm font-medium disabled:opacity-40", tone === "primary" && "bg-brass text-ink", tone === "ghost" && "border border-line text-bone", tone === "danger" && "border border-line text-ember"),
		children
	});
}
function IssueList({ issues }) {
	if (!issues.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-brass",
		children: "检查通过，没有阻塞项。"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2",
		children: issues.map((issue, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "border border-line bg-ink-2 px-3 py-2 text-sm text-bone",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-2 font-mono text-xs text-ember",
				children: issue.level === "error" ? "错误" : "注意"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "break-words",
				children: issue.message
			})]
		}, `${issue.level}-${index}`))
	});
}
function SectionTitle({ index, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-xs text-brass",
				children: index
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 text-2xl font-semibold text-bone",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-pretty text-mist",
				children: body
			})
		]
	});
}
async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		const area = document.createElement("textarea");
		area.value = text;
		document.body.appendChild(area);
		area.select();
		document.execCommand("copy");
		area.remove();
	}
}
function downloadText(filename, text) {
	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	URL.revokeObjectURL(url);
}
var MODES = [
	{
		id: "path",
		label: "本地路径",
		hint: "本机已经有 ffmpeg"
	},
	{
		id: "url",
		label: "远程 URL",
		hint: "下载单个可执行文件"
	},
	{
		id: "source",
		label: "源码构建",
		hint: "git clone 后 configure"
	}
];
function EnginePanel() {
	const engine = useStudio((state) => state.engine);
	const patch = useStudio((state) => state.patchEngine);
	const probe = parseProbe(engine.probeText);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			index: "01",
			title: "引擎",
			body: "指定 FFmpeg 从哪里来。刃帧只负责把这个选择写进 Kotlin：本地路径直接用，URL 会下载并校验，源码会在你的机器上编译。这里不会执行你的二进制。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-2 sm:grid-cols-3",
			children: MODES.map((mode) => {
				const active = engine.mode === mode.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => patch({ mode: mode.id }),
					className: cx("min-h-11 border px-3 py-3 text-left", active ? "border-brass bg-brass text-ink" : "border-line bg-ink-2 text-bone"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: mode.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cx("text-sm", active ? "text-ink" : "text-mist"),
						children: mode.hint
					})]
				}, mode.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-4",
			children: [
				engine.mode === "path" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-sm text-mist",
						children: "可执行文件路径"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						mono: true,
						value: engine.binaryPath,
						placeholder: "/usr/local/bin/ffmpeg 或 C:\\\\ffmpeg\\\\bin\\\\ffmpeg.exe",
						onChange: (binaryPath) => patch({ binaryPath })
					})]
				}) : null,
				engine.mode === "url" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "二进制 URL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							mono: true,
							value: engine.binaryUrl,
							placeholder: "https://example.com/ffmpeg",
							onChange: (binaryUrl) => patch({ binaryUrl })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-mist",
							children: "只接受单个可执行文件。zip、7z、dmg 请在本机解开后改用本地路径。Windows 构建可以找 BtbN FFmpeg-Builds 或 gyan.dev，把直链贴进来。"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-sm text-mist",
						children: "SHA-256，可留空"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						mono: true,
						value: engine.sha256,
						placeholder: "64 位十六进制",
						onChange: (sha256) => patch({ sha256 })
					})]
				})] }) : null,
				engine.mode === "source" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "Git 仓库"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							mono: true,
							value: engine.sourceUrl,
							placeholder: "https://git.ffmpeg.org/ffmpeg.git",
							onChange: (sourceUrl) => patch({ sourceUrl })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-sm text-mist",
								children: "分支、标签或提交"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								mono: true,
								value: engine.sourceRef,
								onChange: (sourceRef) => patch({ sourceRef })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-sm text-mist",
								children: "并行数，0 表示用满 CPU"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: engine.jobs,
								onChange: (jobs) => patch({ jobs })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "configure 参数"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: engine.configureFlags,
							onChange: (event) => patch({ configureFlags: event.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => patch({ configureFlags: "--disable-debug --disable-doc --enable-gpl --enable-version3 --enable-libx264 --enable-libx265 --enable-libvpx --enable-libopus --enable-libmp3lame --enable-libaom" }),
							children: "填入常用第三方库"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => patch({ configureFlags: "--disable-debug --disable-doc --enable-gpl --enable-version3" }),
							children: "只留 GPL 基础项"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "安装前缀"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							mono: true,
							value: engine.prefix,
							onChange: (prefix) => patch({ prefix })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "源码模式面向 Linux / macOS，需要编译器、make、pkg-config，以及你打开的那些库的头文件。Windows 请改用远程二进制。"
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "Kotlin 工作目录"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							mono: true,
							value: engine.workDir,
							onChange: (workDir) => patch({ workDir })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-mist",
							children: "相对你运行程序时的当前目录。下载缓存和源码树都放在这里。"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 border border-line bg-ink-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium text-bone",
					children: "构建探测"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-pretty text-mist",
					children: "在终端运行 ffmpeg -version 和 ffmpeg -buildconf，把输出贴进来。刃帧会按 --enable-* 判断这个构建到底有没有 libx264、NVENC 这些开关。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "mt-3 font-mono text-sm",
					value: engine.probeText,
					placeholder: "ffmpeg version 7.1 ...\nconfiguration: --enable-gpl --enable-libx264",
					onChange: (event) => patch({ probeText: event.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						probe.version ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "border border-brass px-2 py-1 font-mono text-xs text-brass",
							children: probe.version
						}) : null,
						FEATURE_FLAGS.map((feature) => {
							const on = probe.flags.has(feature.flag);
							if (!probe.flags.size) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cx("px-2 py-1 font-mono text-xs", on ? "bg-brass text-ink" : "border border-line text-mist"),
								children: feature.label
							}, feature.flag);
						}),
						!probe.flags.size ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-mist",
							children: "还没有可识别的编译开关。"
						}) : null
					]
				})
			]
		})
	] });
}
function FiltersPanel() {
	const filters = useStudio((state) => state.filters);
	const raw = useStudio((state) => state.rawFilter);
	const addFilter = useStudio((state) => state.addFilter);
	const patchFilter = useStudio((state) => state.patchFilter);
	const toggleFilter = useStudio((state) => state.toggleFilter);
	const removeFilter = useStudio((state) => state.removeFilter);
	const moveFilter = useStudio((state) => state.moveFilter);
	const setRawFilter = useStudio((state) => state.setRawFilter);
	const [kind, setKind] = (0, import_react.useState)(FILTERS[0]?.kind ?? "scale");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			index: "04",
			title: "滤镜",
			body: "从上到下就是处理顺序。简单的画面和声音会写成 -vf / -af。叠加、拼接、混音、交叉淡化和调色板 GIF 会收成一张 filter_complex。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: kind,
				onChange: (event) => setKind(event.target.value),
				"aria-label": "选择滤镜",
				children: [
					"画面",
					"声音",
					"复合"
				].map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
					label: group,
					children: FILTERS.filter((item) => item.group === group).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item.kind,
						children: item.label
					}, item.kind))
				}, group))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				tone: "primary",
				onClick: () => addFilter(kind),
				children: "加到链尾"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-4",
			children: [filters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border border-dashed border-line px-4 py-8 text-sm text-mist",
				children: "链是空的。可以从缩放或响度标准化开始。"
			}) : null, filters.map((filter, index) => {
				const def = getFilter(filter.kind);
				const compiled = def.compile(filter.params);
				const complex = def.group === "复合" || filter.kind === "speed";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cx("border border-line bg-panel p-4", !filter.enabled && "opacity-50"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-xs text-brass",
									children: [
										String(index + 1).padStart(2, "0"),
										" · ",
										def.group
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold text-bone",
									children: def.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 max-w-xl text-sm text-pretty text-mist",
									children: def.summary
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => moveFilter(filter.id, -1),
										disabled: index === 0,
										children: "上移"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => moveFilter(filter.id, 1),
										disabled: index === filters.length - 1,
										children: "下移"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => toggleFilter(filter.id),
										children: filter.enabled ? "停用" : "启用"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										tone: "danger",
										onClick: () => removeFilter(filter.id),
										children: "删除"
									})
								]
							})]
						}),
						def.fields.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-4 md:grid-cols-2",
							children: def.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mb-2 block text-sm text-mist",
									children: [field.label, field.help ? ` · ${field.help}` : ""]
								}), field.kind === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
									value: filter.params[field.key] ?? field.default,
									options: field.options ?? [],
									onChange: (value) => patchFilter(filter.id, { [field.key]: value })
								}) : field.kind === "range" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-auto min-w-0 flex-1",
										type: "range",
										min: field.min,
										max: field.max,
										step: field.step,
										value: filter.params[field.key] ?? field.default,
										onChange: (event) => patchFilter(filter.id, { [field.key]: event.target.value })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-16 shrink-0 text-right font-mono text-sm tabular-nums text-bone",
										children: filter.params[field.key] ?? field.default
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									mono: true,
									value: filter.params[field.key] ?? "",
									onChange: (value) => patchFilter(filter.id, { [field.key]: value })
								})]
							}, field.key))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 overflow-x-auto font-mono text-xs text-brass",
							children: complex ? "由复合滤镜图写入" : compiled || "当前数值等于直通，不写入命令"
						})
					]
				}, filter.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-8 block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-2 block text-sm text-mist",
					children: "手写 filter_complex"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "font-mono text-sm",
					value: raw,
					placeholder: "[0:v]scale=1280:-2[v];[0:a]loudnorm[a]",
					onChange: (event) => setRawFilter(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: "一旦这里有内容，上面的链就不进命令。清空后恢复自动图。"
				})
			]
		})
	] });
}
function JobPanel() {
	const inputs = useStudio((state) => state.inputs);
	const output = useStudio((state) => state.output);
	const filters = useStudio((state) => state.filters);
	const patchOutput = useStudio((state) => state.patchOutput);
	const patchInput = useStudio((state) => state.patchInput);
	const addInput = useStudio((state) => state.addInput);
	const removeInput = useStudio((state) => state.removeInput);
	const applyPreset = useStudio((state) => state.applyPreset);
	const reset = useStudio((state) => state.reset);
	const [fileUrl, setFileUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (fileUrl) URL.revokeObjectURL(fileUrl);
		};
	}, [fileUrl]);
	const preview = (0, import_react.useMemo)(() => {
		const eq = filters.find((filter) => filter.enabled && filter.kind === "eq");
		const hue = filters.find((filter) => filter.enabled && filter.kind === "hue");
		const volume = filters.find((filter) => filter.enabled && filter.kind === "volume");
		const brightness = Number(eq?.params.brightness ?? 0);
		const contrast = Number(eq?.params.contrast ?? 1);
		const saturation = Number(eq?.params.saturation ?? 1);
		const gamma = Number(eq?.params.gamma ?? 1);
		const degrees = Number(hue?.params.h ?? 0);
		const linear = volume && volume.params.unit !== "db" ? Number(volume.params.amount ?? 1) : 1;
		const safe = (value, fallback) => Number.isFinite(value) ? value : fallback;
		return {
			filter: `brightness(${safe(1 + brightness, 1) * safe(gamma, 1)}) contrast(${safe(contrast, 1)}) saturate(${safe(saturation, 1)}) hue-rotate(${safe(degrees, 0)}deg)`,
			volume: Math.min(1, Math.max(0, safe(linear, 1)))
		};
	}, [filters]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			index: "02",
			title: "作业",
			body: "先放进要处理的文件，再选一个起点。细项都在参数和滤镜里，改动会立刻反映到底部命令。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2 overflow-x-auto pb-2",
			children: [PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => applyPreset(preset.id),
				className: "min-h-11 shrink-0 border border-line bg-ink-2 px-3 py-2 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium text-bone",
					children: preset.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-mist",
					children: preset.detail
				})]
			}, preset.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: reset,
				children: "恢复示例"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-4",
			children: [inputs.map((input, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-panel p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-medium text-bone",
						children: ["输入 ", index + 1]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						tone: "danger",
						onClick: () => removeInput(input.id),
						disabled: inputs.length === 1,
						children: "移除"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "类型"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: input.kind,
							onChange: (event) => patchInput(input.id, { kind: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "file",
								children: "文件或 URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "lavfi",
								children: "虚拟源 lavfi"
							})]
						})]
					}), input.kind === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "命令里使用的路径或 URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							mono: true,
							value: input.location,
							placeholder: "footage/interview.mov",
							onChange: (location) => patchInput(input.id, { location })
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-mist",
							children: "lavfi 表达式"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							mono: true,
							value: input.lavfi,
							onChange: (lavfi) => patchInput(input.id, { lavfi })
						})]
					})]
				})]
			}, input.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: addInput,
				children: "添加输入"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-6 block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-sm text-mist",
				children: "输出路径"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: output.path,
				onChange: (path) => patchOutput({ path })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 border border-line p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium text-bone",
					children: "浏览器近似预览"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-pretty text-mist",
					children: "选择一个本地文件，只在这台浏览器里看影调和音量。它不会上传，也不会变成命令里的路径。缩放、降噪、响度标准化这些看不出来。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-3",
					type: "file",
					accept: "video/*,audio/*",
					onChange: (event) => {
						const file = event.target.files?.[0];
						if (!file) return;
						if (fileUrl) URL.revokeObjectURL(fileUrl);
						setFileUrl(URL.createObjectURL(file));
					}
				}),
				fileUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					className: "mt-3 aspect-video w-full bg-ink",
					src: fileUrl,
					controls: true,
					style: { filter: preview.filter },
					onVolumeChange: (event) => {
						event.currentTarget.volume = preview.volume;
					},
					onLoadedMetadata: (event) => {
						event.currentTarget.volume = preview.volume;
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex aspect-video items-center justify-center border border-dashed border-line text-sm text-mist",
					children: "未选择预览素材"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-xs text-mist",
					children: [
						"启用的滤镜 ",
						filters.filter((filter) => filter.enabled).length,
						" / ",
						FILTERS.length,
						" 种可加"
					]
				})
			]
		})
	] });
}
function ktList(args, indent = "        ") {
	if (!args.length) return "emptyList()";
	return `listOf(\n${args.map((arg) => `${indent}${ktString(arg)},`).join("\n")}\n${indent.slice(4)})`;
}
function modeName(mode) {
	if (mode === "path") return "LOCAL_PATH";
	if (mode === "url") return "REMOTE_URL";
	return "SOURCE";
}
function stripBinary(command) {
	return command.slice(1);
}
function gradleKts() {
	return `plugins {
    kotlin("jvm") version "2.1.21"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
}

kotlin {
    jvmToolchain(17)
}

application {
    mainClass.set("kerf.KerfJobKt")
}
`;
}
function kotlinJob(data, job = buildJob(data)) {
	const engine = data.engine;
	const flags = tokenize(engine.configureFlags);
	const commands = job.commands.map(stripBinary);
	const primary = commands[commands.length - 1] ?? [];
	const first = commands.length > 1 ? commands[0] : null;
	const jobs = Number(engine.jobs);
	const jobLiteral = Number.isFinite(jobs) && jobs > 0 ? String(Math.floor(jobs)) : "0";
	return `// 刃帧 KERF 生成的 Kotlin 作业。
// 只依赖 JDK 17+ 与 Kotlin 标准库，不拉取第三方 FFmpeg 封装。
//
// 命令行：
//   kotlinc KerfJob.kt -include-runtime -d kerf.jar && java -jar kerf.jar
// Gradle：
//   将本文件放到 src/main/kotlin/kerf/KerfJob.kt 后执行 ./gradlew run
//
// 浏览器里的刃帧不会启动你机器上的 ffmpeg。把这个文件带回本机再跑。

package kerf

import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.nio.file.attribute.PosixFilePermission
import java.security.MessageDigest
import java.time.Duration
import java.util.Locale

enum class EngineMode { LOCAL_PATH, REMOTE_URL, SOURCE }

data class EngineSpec(
    val mode: EngineMode,
    val binaryPath: String,
    val binaryUrl: String,
    val sha256: String,
    val sourceUrl: String,
    val sourceRef: String,
    val configureFlags: List<String>,
    val prefix: String,
    val jobs: Int,
    val workDir: String,
)

class EngineResolveException(message: String) : RuntimeException(message)

object FfmpegLocator {
    fun resolve(spec: EngineSpec, workDir: Path): Path = when (spec.mode) {
        EngineMode.LOCAL_PATH -> resolveLocal(spec.binaryPath)
        EngineMode.REMOTE_URL -> resolveUrl(spec, workDir)
        EngineMode.SOURCE -> resolveSource(spec, workDir)
    }

    private fun resolveLocal(raw: String): Path {
        if (raw.isBlank()) throw EngineResolveException("没有填写本地路径")
        val path = Path.of(raw)
        if (!Files.exists(path)) throw EngineResolveException("找不到二进制：\$path")
        if (Files.isDirectory(path)) throw EngineResolveException("路径是目录：\$path")
        if (!isWindows() && !Files.isExecutable(path)) {
            throw EngineResolveException("文件存在但没有执行权限：\$path")
        }
        return path.toAbsolutePath().normalize()
    }

    private fun resolveUrl(spec: EngineSpec, workDir: Path): Path {
        if (spec.binaryUrl.isBlank()) throw EngineResolveException("没有填写下载 URL")
        val cache = workDir.resolve("cache")
        Files.createDirectories(cache)
        val target = cache.resolve(cacheName(spec.binaryUrl))
        if (Files.isRegularFile(target) && shaMatches(target, spec.sha256)) {
            markExecutable(target)
            return target
        }
        val tmp = Files.createTempFile(cache, "ffmpeg-", ".download")
        val client = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS)
            .connectTimeout(Duration.ofSeconds(20))
            .build()
        val request = HttpRequest.newBuilder(URI.create(spec.binaryUrl))
            .timeout(Duration.ofMinutes(15))
            .GET()
            .build()
        val response = client.send(request, HttpResponse.BodyHandlers.ofFile(tmp))
        if (response.statusCode() !in 200..299) {
            Files.deleteIfExists(tmp)
            throw EngineResolveException("下载失败：HTTP \${response.statusCode()}")
        }
        if (!shaMatches(tmp, spec.sha256)) {
            Files.deleteIfExists(tmp)
            throw EngineResolveException("SHA-256 不一致，已丢弃下载文件")
        }
        Files.move(tmp, target, StandardCopyOption.REPLACE_EXISTING)
        markExecutable(target)
        return target
    }

    private fun resolveSource(spec: EngineSpec, workDir: Path): Path {
        if (spec.sourceUrl.isBlank()) throw EngineResolveException("没有填写源码仓库")
        val prefix = workDir.resolve(if (spec.prefix.isBlank()) "build/ffmpeg" else spec.prefix)
        val built = prefix.resolve(if (isWindows()) "bin/ffmpeg.exe" else "bin/ffmpeg")
        if (Files.isRegularFile(built)) {
            markExecutable(built)
            return built
        }
        if (isWindows()) {
            throw EngineResolveException("源码构建面向 Linux / macOS。Windows 请改用远程二进制 URL。")
        }
        val src = workDir.resolve("src/ffmpeg")
        if (!Files.isDirectory(src.resolve(".git"))) {
            Files.createDirectories(src.parent)
            run(
                listOf(
                    "git", "clone", "--depth", "1", "--branch", spec.sourceRef.ifBlank { "master" },
                    spec.sourceUrl, src.toString(),
                ),
                workDir,
            )
        }
        val jobs = if (spec.jobs > 0) spec.jobs else Runtime.getRuntime().availableProcessors().coerceAtLeast(1)
        val configure = mutableListOf(src.resolve("configure").toString(), "--prefix=\${prefix.toAbsolutePath()}")
        configure += spec.configureFlags
        run(configure, src)
        run(listOf("make", "-j\$jobs"), src)
        run(listOf("make", "install"), src)
        if (!Files.isRegularFile(built)) throw EngineResolveException("编译结束但未找到 \$built")
        markExecutable(built)
        return built
    }

    private fun cacheName(url: String): String {
        val path = runCatching { URI.create(url).path }.getOrDefault("").lowercase(Locale.US)
        return if (path.endsWith(".exe")) "ffmpeg.exe" else "ffmpeg"
    }

    private fun shaMatches(path: Path, expected: String): Boolean {
        val want = expected.trim().lowercase(Locale.US)
        if (want.isEmpty()) return true
        return sha256(path) == want
    }

    private fun sha256(path: Path): String {
        val digest = MessageDigest.getInstance("SHA-256")
        Files.newInputStream(path).use { input ->
            val buffer = ByteArray(1 shl 16)
            while (true) {
                val read = input.read(buffer)
                if (read < 0) break
                digest.update(buffer, 0, read)
            }
        }
        return digest.digest().joinToString("") { "%02x".format(it) }
    }

    private fun markExecutable(path: Path) {
        try {
            val perms = Files.getPosixFilePermissions(path).toMutableSet()
            perms += PosixFilePermission.OWNER_READ
            perms += PosixFilePermission.OWNER_EXECUTE
            Files.setPosixFilePermissions(path, perms)
        } catch (_: UnsupportedOperationException) {
            path.toFile().setExecutable(true)
        }
    }

    private fun run(command: List<String>, directory: Path) {
        val process = ProcessBuilder(command)
            .directory(directory.toFile())
            .redirectErrorStream(true)
            .start()
        process.inputStream.bufferedReader().useLines { lines -> lines.forEach(::println) }
        val code = process.waitFor()
        if (code != 0) throw EngineResolveException("命令失败（\$code）：\${command.joinToString(" ")}")
    }

    private fun isWindows(): Boolean =
        System.getProperty("os.name").lowercase(Locale.US).contains("win")
}

class FfmpegRunner(private val binary: Path) {
    fun execute(args: List<String>): Int {
        val command = ArrayList<String>(args.size + 1)
        command += binary.toString()
        command += args
        val process = ProcessBuilder(command)
            .redirectErrorStream(true)
            .start()
        process.inputStream.bufferedReader().useLines { lines ->
            lines.forEach { line ->
                println(line)
                parseProgress(line)
            }
        }
        return process.waitFor()
    }

    private fun parseProgress(line: String) {
        val separator = line.indexOf('=')
        if (separator <= 0) return
        val key = line.substring(0, separator)
        val value = line.substring(separator + 1)
        if (key == "out_time" || key == "progress") println("kerf \$key \$value")
    }
}

object KerfJob {
    val spec = EngineSpec(
        mode = EngineMode.${modeName(engine.mode)},
        binaryPath = ${ktString(engine.binaryPath.trim())},
        binaryUrl = ${ktString(engine.binaryUrl.trim())},
        sha256 = ${ktString(engine.sha256.trim())},
        sourceUrl = ${ktString(engine.sourceUrl.trim())},
        sourceRef = ${ktString(engine.sourceRef.trim())},
        configureFlags = ${ktList(flags)},
        prefix = ${ktString(engine.prefix.trim() || "build/ffmpeg")},
        jobs = ${jobLiteral},
        workDir = ${ktString(engine.workDir.trim() || ".")},
    )

    fun arguments(): List<String> = rewriteNull(${ktList(primary)})
${first ? `
    fun passOne(): List<String> = rewriteNull(${ktList(first)})
` : `
    fun passOne(): List<String>? = null
`}

    private fun rewriteNull(args: List<String>): List<String> {
        val sink = if (System.getProperty("os.name").lowercase(Locale.US).contains("win")) "NUL" else "/dev/null"
        return args.map { if (it == "/dev/null") sink else it }
    }
}

fun main() {
    val work = Path.of(KerfJob.spec.workDir).toAbsolutePath().normalize()
    Files.createDirectories(work)
    val binary = FfmpegLocator.resolve(KerfJob.spec, work)
    println("kerf binary \$binary")
    val runner = FfmpegRunner(binary)
    val first = KerfJob.passOne()
    if (first != null) {
        val passCode = runner.execute(first)
        if (passCode != 0) kotlin.system.exitProcess(passCode)
    }
    kotlin.system.exitProcess(runner.execute(KerfJob.arguments()))
}
`;
}
function KotlinPanel() {
	const data = useStudio(useShallow(selectData));
	const job = (0, import_react.useMemo)(() => buildJob(data), [data]);
	const kotlin = (0, import_react.useMemo)(() => kotlinJob(data, job), [data, job]);
	const gradle = (0, import_react.useMemo)(() => gradleKts(), []);
	const [tab, setTab] = (0, import_react.useState)("kotlin");
	const [copied, setCopied] = (0, import_react.useState)("");
	const body = tab === "shell" ? job.shell : tab === "gradle" ? gradle : tab === "plan" ? "" : kotlin;
	const filename = tab === "shell" ? "kerf-job.sh" : tab === "gradle" ? "build.gradle.kts" : "KerfJob.kt";
	async function copy() {
		await copyText(tab === "plan" ? job.plan.map((step) => `${step.title}\n${step.body}`).join("\n\n") : body);
		setCopied(tab);
		window.setTimeout(() => setCopied(""), 1500);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			index: "05",
			title: "Kotlin",
			body: "导出的是一个能编译的 Kotlin 文件：它按你选的方式找到 ffmpeg，再用 ProcessBuilder 跑这条命令。不依赖第三方封装库。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueList, { issues: job.issues }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex gap-2 overflow-x-auto",
			children: [
				["kotlin", "KerfJob.kt"],
				["gradle", "Gradle"],
				["shell", "命令"],
				["plan", "执行计划"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(id),
				className: cx("min-h-11 shrink-0 px-3 text-sm", tab === id ? "bg-brass text-ink" : "border border-line text-bone"),
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				tone: "primary",
				onClick: () => void copy(),
				children: copied === tab ? "已复制" : "复制"
			}), tab !== "plan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => downloadText(filename, body),
				children: ["下载 ", filename]
			}) : null]
		}),
		tab === "plan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-4 flex flex-col gap-3",
			children: job.plan.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border border-line bg-ink-2 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs text-brass",
						children: String(index + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-medium text-bone",
						children: step.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-wrap font-mono text-sm text-mist",
						children: step.body
					})
				]
			}, step.title))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "mt-4 max-h-[32rem] overflow-auto border border-line bg-ink p-4 font-mono text-xs leading-relaxed text-bone",
			children: body
		})
	] });
}
var PIX = [
	"",
	"yuv420p",
	"yuv422p",
	"yuv444p",
	"yuv422p10le",
	"yuv444p10le",
	"nv12",
	"p010le",
	"rgb24",
	"rgba",
	"gray"
].map((value) => ({
	value,
	label: value || "不指定"
}));
function availabilityLabel(state) {
	if (state === "builtin") return "内置编码器";
	if (state === "yes") return "这次探测里有对应开关";
	if (state === "no") return "这次探测里没有对应开关";
	return "还没贴探测输出，无法判断";
}
function ParamsPanel() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [inputId, setInputId] = (0, import_react.useState)(null);
	const data = useStudio();
	const input = data.inputs.find((item) => item.id === inputId) ?? data.inputs[0];
	const probe = parseProbe(data.engine.probeText);
	const videoState = codecAvailability(data.video.codec, probe.flags, VIDEO_CODECS);
	const audioState = codecAvailability(data.audio.codec, probe.flags, AUDIO_CODECS);
	const presets = presetOptions(data.video.codec);
	if (!input) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			index: "03",
			title: "参数",
			body: "这些是会写进命令的开关，不是说明书摘抄。搜索看的是名字、旗标和说明。空着的文本项不会出现在命令里。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: query,
			onChange: (event) => setQuery(event.target.value),
			placeholder: "搜索，例如 crf、loudnorm、-map、nvenc",
			"aria-label": "搜索参数"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex gap-2 overflow-x-auto",
			children: [
				["global", "全局"],
				["input", "输入"],
				["video", "视频"],
				["audio", "音频"],
				["mux", "封装"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#param-${id}`,
				className: "shrink-0 border border-line px-3 py-2 text-sm text-bone",
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			id: "param-global",
			className: "mt-8 font-mono text-xs text-brass",
			children: "全局"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-y / -n",
			label: "覆盖输出",
			help: "yes 加 -y，no 加 -n，询问则让 ffmpeg 自己停下来。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.global.overwrite,
				onChange: (overwrite) => data.patchGlobal({ overwrite }),
				options: [
					{
						value: "yes",
						label: "覆盖"
					},
					{
						value: "no",
						label: "不覆盖"
					},
					{
						value: "prompt",
						label: "询问"
					}
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-loglevel",
			label: "日志级别",
			help: "info 是默认，不写进命令。排查滤镜图时再用 debug。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.global.loglevel,
				onChange: (loglevel) => data.patchGlobal({ loglevel }),
				options: LOGLEVELS.map((value) => ({
					value,
					label: value
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-hide_banner",
			label: "隐藏版本横幅",
			help: "少一行版权声明，日志更干净。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.global.hideBanner,
				onChange: (hideBanner) => data.patchGlobal({ hideBanner }),
				label: "隐藏"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-nostdin",
			label: "不要读标准输入",
			help: "Kotlin 进程调用时应该打开，避免 ffmpeg 吃掉别的输入。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.global.nostdin,
				onChange: (nostdin) => data.patchGlobal({ nostdin }),
				label: "打开"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-progress",
			label: "机器可读进度",
			help: "写到 pipe:1。Kotlin 运行器会把 out_time 打出来。打开后不再加 -stats。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.global.progress,
				onChange: (progress) => data.patchGlobal({ progress }),
				label: "pipe:1"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-stats",
			label: "统计行",
			help: "只在关掉进度管道时使用。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.global.stats,
				onChange: (stats) => data.patchGlobal({ stats }),
				label: "显示统计"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-benchmark",
			label: "结束时打印耗时",
			help: "看滤镜和编码各花了多少时间。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.global.benchmark,
				onChange: (benchmark) => data.patchGlobal({ benchmark }),
				label: "基准"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-threads",
			label: "线程数",
			help: "留空让 ffmpeg 自己决定。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.global.threads,
				placeholder: "0",
				onChange: (threads) => data.patchGlobal({ threads })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-filter_complex_threads",
			label: "滤镜线程",
			help: "复杂滤镜图才有意义。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.global.filterThreads,
				onChange: (filterThreads) => data.patchGlobal({ filterThreads })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-max_muxing_queue_size",
			label: "封装队列",
			help: "音画时间戳差太多、报队列溢出时再加大，例如 1024。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.global.maxMuxingQueue,
				onChange: (maxMuxingQueue) => data.patchGlobal({ maxMuxingQueue })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-fps_mode",
			label: "帧率模式",
			help: "passthrough 保留原时间戳，cfr 固定帧率，vfr 可变。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.global.fpsMode,
				onChange: (fpsMode) => data.patchGlobal({ fpsMode }),
				options: [
					{
						value: "",
						label: "默认"
					},
					{
						value: "passthrough",
						label: "passthrough"
					},
					{
						value: "cfr",
						label: "cfr"
					},
					{
						value: "vfr",
						label: "vfr"
					},
					{
						value: "drop",
						label: "drop"
					}
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-copyts / -start_at_zero",
			label: "时间戳",
			help: "复制原始时间戳，或把起点归零。一般转码不用动。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					checked: data.global.copyts,
					onChange: (copyts) => data.patchGlobal({ copyts }),
					label: "copyts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					checked: data.global.startAtZero,
					onChange: (startAtZero) => data.patchGlobal({ startAtZero }),
					label: "start_at_zero"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-avoid_negative_ts",
			label: "负时间戳",
			help: "封装阶段怎么处理小于零的时间戳。auto 适合大多数 MP4。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.global.avoidNegativeTs,
				onChange: (avoidNegativeTs) => data.patchGlobal({ avoidNegativeTs }),
				options: [
					"auto",
					"disabled",
					"make_zero",
					"make_non_negative"
				].map((value) => ({
					value,
					label: value
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-noaccurate_seek",
			label: "关闭精确寻址",
			help: "只在你明确要落在关键帧上时打开。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.global.noAccurateSeek,
				onChange: (noAccurateSeek) => data.patchGlobal({ noAccurateSeek }),
				label: "不精确寻址"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-timelimit",
			label: "最长运行秒数",
			help: "超时后 ffmpeg 自己退出。留空表示不限制。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.global.timelimit,
				onChange: (timelimit) => data.patchGlobal({ timelimit })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			id: "param-input",
			className: "mt-8 font-mono text-xs text-brass",
			children: "输入"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-3 block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-sm text-mist",
				children: "正在配置"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: input.id,
				onChange: (event) => setInputId(event.target.value),
				children: data.inputs.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: item.id,
					children: [
						"输入 ",
						index + 1,
						" · ",
						item.kind === "lavfi" ? item.lavfi : item.location || "未命名"
					]
				}, item.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-ss",
			label: "起点",
			help: "输入侧先跳再解码，快。输出侧从开头解到那个点，慢但最稳。流复制时输入侧可能停在前一个关键帧。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					mono: true,
					value: input.seek,
					placeholder: "00:01:12.5",
					onChange: (seek) => data.patchInput(input.id, { seek })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
					value: input.seekPlace,
					onChange: (seekPlace) => data.patchInput(input.id, { seekPlace }),
					options: [{
						value: "input",
						label: "输入侧，快"
					}, {
						value: "output",
						label: "输出侧，精确"
					}]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-t / -to",
			label: "读到哪里",
			help: "-t 是时长，-to 是终点时间。都写在 -i 前面，限制这一路读入。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: input.duration,
					placeholder: "时长 00:00:30",
					onChange: (duration) => data.patchInput(input.id, { duration })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: input.to,
					placeholder: "终点 00:02:00",
					onChange: (to) => data.patchInput(input.id, { to })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-stream_loop",
			label: "循环",
			help: "-1 表示无限循环。做背景循环或短片垫长时再用。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: input.streamLoop,
				placeholder: "-1",
				onChange: (streamLoop) => data.patchInput(input.id, { streamLoop })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-re",
			label: "按原速读取",
			help: "推流或直播时打开。普通转码打开只会变慢。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: input.realtime,
				onChange: (realtime) => data.patchInput(input.id, { realtime }),
				label: "实时读取"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-f",
			label: "输入格式",
			help: "留空则探测。虚拟源会强制 lavfi。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: input.format,
				placeholder: "mov, mpegts, image2",
				onChange: (format) => data.patchInput(input.id, { format })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-hwaccel",
			label: "硬件解码",
			help: "解码器加速。编码器用参数页里的 NVENC / QSV / VideoToolbox，两套不是一回事。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: input.hwaccel,
				onChange: (hwaccel) => data.patchInput(input.id, { hwaccel }),
				options: HWACCELS.map((value) => ({
					value,
					label: value || "关闭"
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-hwaccel_device",
			label: "硬件设备",
			help: "例如 /dev/dri/renderD128 或 cuda 设备号。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: input.hwaccelDevice,
				onChange: (hwaccelDevice) => data.patchInput(input.id, { hwaccelDevice })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-hwaccel_output_format",
			label: "硬件输出格式",
			help: "想让帧留在显存里时填写，例如 cuda 或 nv12。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: input.hwaccelOutputFormat,
				onChange: (hwaccelOutputFormat) => data.patchInput(input.id, { hwaccelOutputFormat })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-itsoffset",
			label: "时间偏移",
			help: "这一路整体平移。正数表示推迟。单位秒。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: input.itsoffset,
				placeholder: "0.2",
				onChange: (itsoffset) => data.patchInput(input.id, { itsoffset })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-thread_queue_size",
			label: "输入队列",
			help: "多路实时输入丢帧时再加大，例如 1024。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: input.threadQueueSize,
				onChange: (threadQueueSize) => data.patchInput(input.id, { threadQueueSize })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-probesize / -analyzeduration",
			label: "探测预算",
			help: "有些传输流头很长，探测不够会认错编码。单位分别是字节和微秒。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: input.probesize,
					placeholder: "5000000",
					onChange: (probesize) => data.patchInput(input.id, { probesize })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: input.analyzeduration,
					placeholder: "5000000",
					onChange: (analyzeduration) => data.patchInput(input.id, { analyzeduration })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-fflags",
			label: "格式标志",
			help: "例如 +genpts、+discardcorrupt、+igndts。懂含义再写。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: input.fflags,
				onChange: (fflags) => data.patchInput(input.id, { fflags })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "额外输入参数",
			label: "原始输入参数",
			help: "原样拆成参数，加在 -i 前面。用引号包住含空格的值。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: input.extra,
				onChange: (extra) => data.patchInput(input.id, { extra })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			id: "param-video",
			className: "mt-8 font-mono text-xs text-brass",
			children: "视频"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
			query,
			flag: "-c:v",
			label: "视频编码器",
			help: "复制流不能再加画面滤镜。硬件编码器要这个构建真的编进去。",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.video.codec,
				onChange: (codec) => data.patchVideo({
					codec,
					preset: defaultPreset(codec),
					pixFmt: defaultPix(codec)
				}),
				options: VIDEO_CODECS.map((codec) => ({
					value: codec.value,
					label: codec.label
				}))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mist",
				children: availabilityLabel(videoState)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-preset / -quality",
			label: "预设",
			help: "x264 用速度档，NVENC 用 p1–p7，AMF 用 quality。编码器不支持时不会写入。",
			children: presets.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.video.codec === "libsvtav1" ? data.video.svtPreset : data.video.preset,
				onChange: (preset) => data.video.codec === "libsvtav1" ? data.patchVideo({
					svtPreset: preset,
					preset
				}) : data.patchVideo({ preset }),
				options: presets
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.video.preset,
				placeholder: "此编码器无预设",
				onChange: (preset) => data.patchVideo({ preset })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-tune",
			label: "调优",
			help: "只用于 libx264 / libx265。film 偏电影，animation 偏平涂，zerolatency 偏直播。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.video.tune,
				onChange: (tune) => data.patchVideo({ tune }),
				options: [
					"",
					"film",
					"animation",
					"grain",
					"stillimage",
					"fastdecode",
					"zerolatency"
				].map((value) => ({
					value,
					label: value || "不指定"
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-crf / -b:v",
			label: "码率控制",
			help: "CRF 看质量，ABR 平均码率，CBR 锁死码率。VP9/AV1 的 CRF 仍会带 -b:v 0。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.video.rateMode,
				onChange: (rateMode) => data.patchVideo({ rateMode }),
				options: [
					{
						value: "crf",
						label: "CRF / CQ"
					},
					{
						value: "abr",
						label: "平均码率"
					},
					{
						value: "cbr",
						label: "恒定码率"
					}
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-crf",
			label: "CRF",
			help: "x264 常用 18–23，x265 再加 2 到 4。越小越清楚、越大文件越小。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.video.crf,
				onChange: (crf) => data.patchVideo({ crf })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-cq",
			label: "NVENC CQ",
			help: "NVENC 不认 CRF，用 -cq。没填就回退到 CRF 那一栏。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.video.cq,
				onChange: (cq) => data.patchVideo({ cq })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-b:v / -maxrate / -minrate / -bufsize",
			label: "码率",
			help: "带单位，如 2500k 或 8M。纯数字会被当成比特。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.bitrate,
						placeholder: "目标",
						onChange: (bitrate) => data.patchVideo({ bitrate })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.maxrate,
						placeholder: "上限",
						onChange: (maxrate) => data.patchVideo({ maxrate })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.minrate,
						placeholder: "下限",
						onChange: (minrate) => data.patchVideo({ minrate })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.bufsize,
						placeholder: "缓冲",
						onChange: (bufsize) => data.patchVideo({ bufsize })
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-g / -keyint_min / -bf / -refs",
			label: "GOP 与参考帧",
			help: "关键帧间隔、最小间隔、B 帧数、参考帧。直播常把 -g 设成帧率的两倍。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.gop,
						placeholder: "GOP",
						onChange: (gop) => data.patchVideo({ gop })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.keyintMin,
						placeholder: "keyint_min",
						onChange: (keyintMin) => data.patchVideo({ keyintMin })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.bf,
						placeholder: "B 帧",
						onChange: (bf) => data.patchVideo({ bf })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.refs,
						placeholder: "参考帧",
						onChange: (refs) => data.patchVideo({ refs })
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-profile:v / -level",
			label: "档次与级别",
			help: "网页 H.264 常用 high / 4.1。ProRes 用数字：0 proxy，1 LT，2 标准，3 HQ，4 4444，5 XQ。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.video.profile,
					placeholder: "high",
					onChange: (profile) => data.patchVideo({ profile })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.video.level,
					placeholder: "4.1",
					onChange: (level) => data.patchVideo({ level })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-pix_fmt",
			label: "像素格式",
			help: "网页播放用 yuv420p。十位母带再用 yuv422p10le。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.video.pixFmt,
				onChange: (pixFmt) => data.patchVideo({ pixFmt }),
				options: PIX
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-r",
			label: "输出帧率",
			help: "强制输出帧率。已经在滤镜里用了 fps 就不要两边打架。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.video.fps,
				placeholder: "30",
				onChange: (fps) => data.patchVideo({ fps })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-tag:v",
			label: "视频标签",
			help: "例如 hvc1，让苹果播放器认 HEVC。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: data.video.tag,
				onChange: (tag) => data.patchVideo({ tag })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-color_primaries / -color_trc / -colorspace / -color_range",
			label: "色彩标记",
			help: "只写标记，不转换像素。要转换用滤镜里的色彩空间。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.colorPrimaries,
						placeholder: "bt709",
						onChange: (colorPrimaries) => data.patchVideo({ colorPrimaries })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.colorTrc,
						placeholder: "bt709",
						onChange: (colorTrc) => data.patchVideo({ colorTrc })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: data.video.colorspace,
						placeholder: "bt709",
						onChange: (colorspace) => data.patchVideo({ colorspace })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: data.video.colorRange,
						onChange: (colorRange) => data.patchVideo({ colorRange }),
						options: [
							{
								value: "",
								label: "不指定"
							},
							{
								value: "tv",
								label: "tv"
							},
							{
								value: "pc",
								label: "pc"
							}
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-cpu-used / -deadline",
			label: "VP9 / AOM 速度",
			help: "cpu-used 越大越快越松。deadline 用 good，别用 best，除非你愿意等。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.video.cpuUsed,
					placeholder: "cpu-used",
					onChange: (cpuUsed) => data.patchVideo({ cpuUsed })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
					value: data.video.deadline,
					onChange: (deadline) => data.patchVideo({ deadline }),
					options: [
						"good",
						"realtime",
						"best"
					].map((value) => ({
						value,
						label: value
					}))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-spatial-aq / -temporal-aq",
			label: "NVENC 自适应量化",
			help: "只对 NVENC 写入。空间 AQ 通常值得开。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					checked: data.video.spatialAq,
					onChange: (spatialAq) => data.patchVideo({ spatialAq }),
					label: "spatial-aq"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					checked: data.video.temporalAq,
					onChange: (temporalAq) => data.patchVideo({ temporalAq }),
					label: "temporal-aq"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-pass",
			label: "两遍编码",
			help: "libx264、libx265、VP9、AOM 会生成两条命令。第一遍输出到空设备。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.video.twoPass,
				onChange: (twoPass) => data.patchVideo({ twoPass }),
				label: "两遍"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-force_key_frames",
			label: "强制关键帧",
			help: "表达式，例如 expr:gte(t,n_forced*2)。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: data.video.forceKeyFrames,
				onChange: (forceKeyFrames) => data.patchVideo({ forceKeyFrames })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "额外视频参数",
			label: "原始视频参数",
			help: "例如 -x264-params aq-mode=3。整段按空格拆开。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: data.video.extra,
				onChange: (extra) => data.patchVideo({ extra })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			id: "param-audio",
			className: "mt-8 font-mono text-xs text-brass",
			children: "音频"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
			query,
			flag: "-c:a",
			label: "音频编码器",
			help: "FLAC 和 PCM 不写码率。MP3/Vorbis 若填了质量系数，就用 -q:a。",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.audio.codec,
				onChange: (codec) => data.patchAudio({ codec }),
				options: AUDIO_CODECS.map((codec) => ({
					value: codec.value,
					label: codec.label
				}))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mist",
				children: availabilityLabel(audioState)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-b:a",
			label: "音频码率",
			help: "AAC 对白 160k–192k 通常够。Opus 128k 已经很满。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.audio.bitrate,
				placeholder: "192k",
				onChange: (bitrate) => data.patchAudio({ bitrate })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-q:a",
			label: "质量系数",
			help: "LAME 里 0 最好、9 最小，常用 2–5。留空则用码率。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.audio.quality,
				onChange: (quality) => data.patchAudio({ quality })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-ar / -ac",
			label: "采样率与声道",
			help: "视频成片 48000 / 2。播客有时用 44100 / 1。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.audio.sampleRate,
					placeholder: "48000",
					onChange: (sampleRate) => data.patchAudio({ sampleRate })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.audio.channels,
					placeholder: "2",
					onChange: (channels) => data.patchAudio({ channels })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-sample_fmt",
			label: "采样格式",
			help: "例如 fltp、s16、s32。不确定就留空。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: data.audio.sampleFmt,
				onChange: (sampleFmt) => data.patchAudio({ sampleFmt })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-profile:a",
			label: "AAC 档次",
			help: "aac_low 最通用。留空用编码器默认。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.audio.profile,
				placeholder: "aac_low",
				onChange: (profile) => data.patchAudio({ profile })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-application / -vbr",
			label: "Opus",
			help: "audio 适合音乐和混音，voip 适合语音。只在 libopus 时写入。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
					value: data.audio.application,
					onChange: (application) => data.patchAudio({ application }),
					options: [
						"audio",
						"voip",
						"lowdelay"
					].map((value) => ({
						value,
						label: value
					}))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
					value: data.audio.vbr,
					onChange: (vbr) => data.patchAudio({ vbr }),
					options: [
						{
							value: "on",
							label: "vbr on"
						},
						{
							value: "off",
							label: "vbr off"
						},
						{
							value: "constrained",
							label: "constrained"
						}
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-cutoff",
			label: "截止频率",
			help: "低码率 AAC 有时手动收到 18000 左右。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.audio.cutoff,
				onChange: (cutoff) => data.patchAudio({ cutoff })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "额外音频参数",
			label: "原始音频参数",
			help: "原样追加到音频选项后面。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: data.audio.extra,
				onChange: (extra) => data.patchAudio({ extra })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			id: "param-mux",
			className: "mt-8 font-mono text-xs text-brass",
			children: "封装"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-f",
			label: "封装格式",
			help: "选「按扩展名」时不写 -f，由文件名决定。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.output.container,
				onChange: (container) => data.patchOutput({ container }),
				options: CONTAINERS.map((item) => ({
					value: item.value,
					label: item.label
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-ss / -t",
			label: "输出区间",
			help: "这是输出选项，在全部输入之后生效。和某一路输入上的起点不是同一个开关。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.output.start,
					placeholder: "起点",
					onChange: (start) => data.patchOutput({ start })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.output.duration,
					placeholder: "时长",
					onChange: (duration) => data.patchOutput({ duration })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-vn / -an / -sn / -dn",
			label: "丢掉哪类流",
			help: "做 GIF 或播客时把不需要的流关掉。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						checked: data.output.videoDisabled,
						onChange: (videoDisabled) => data.patchOutput({ videoDisabled }),
						label: "去掉视频"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						checked: data.output.audioDisabled,
						onChange: (audioDisabled) => data.patchOutput({ audioDisabled }),
						label: "去掉音频"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						checked: data.output.subtitleDisabled,
						onChange: (subtitleDisabled) => data.patchOutput({ subtitleDisabled }),
						label: "去掉字幕"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						checked: data.output.dataDisabled,
						onChange: (dataDisabled) => data.patchOutput({ dataDisabled }),
						label: "去掉数据流"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-c:s",
			label: "字幕编码器",
			help: "MP4 软字幕用 mov_text。烧进画面请用滤镜，而不是这里。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.output.subtitleCodec,
				onChange: (subtitleCodec) => data.patchOutput({ subtitleCodec }),
				options: SUBTITLE_CODECS
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-map",
			label: "流映射",
			help: "自动：简单链用 ffmpeg 默认，复合滤镜改映射到滤镜标签。第一路会强行 -map 0。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.output.mapMode,
				onChange: (mapMode) => data.patchOutput({ mapMode }),
				options: [
					{
						value: "auto",
						label: "自动"
					},
					{
						value: "all-first",
						label: "第一路全部流"
					},
					{
						value: "custom",
						label: "自定义"
					}
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-map",
			label: "自定义映射",
			help: "一行一个，不要自己写 -map。例如 0:v:0 或 [v]。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: data.output.customMaps,
				onChange: (event) => data.patchOutput({ customMaps: event.target.value })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-map_metadata / -map_chapters",
			label: "元数据与章节",
			help: "-1 表示丢掉。0 表示从第一路复制。留空则沿用 ffmpeg 默认。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.output.mapMetadata,
					placeholder: "元数据",
					onChange: (mapMetadata) => data.patchOutput({ mapMetadata })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.output.mapChapters,
					placeholder: "章节",
					onChange: (mapChapters) => data.patchOutput({ mapChapters })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-disposition",
			label: "流倾向",
			help: "写成 流=值，例如 v:0=default 或 v:1=attached_pic。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: data.output.disposition,
				onChange: (disposition) => data.patchOutput({ disposition })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-shortest",
			label: "以最短的流为准",
			help: "配音比画面短、又不想留黑尾时打开。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.output.shortest,
				onChange: (shortest) => data.patchOutput({ shortest }),
				label: "shortest"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-movflags +faststart",
			label: "快速开始",
			help: "把 moov 挪到文件头，网页边下边播。只对 MP4/MOV 写入。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: data.output.faststart,
				onChange: (faststart) => data.patchOutput({ faststart }),
				label: "faststart"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-fs",
			label: "文件大小上限",
			help: "到达字节数就停。例如 25000000。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: data.output.fileSizeLimit,
				onChange: (fileSizeLimit) => data.patchOutput({ fileSizeLimit })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-muxdelay / -muxpreload",
			label: "封装延迟",
			help: "单位秒。传输流里有时要压到 0。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.output.muxdelay,
					placeholder: "muxdelay",
					onChange: (muxdelay) => data.patchOutput({ muxdelay })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: data.output.muxpreload,
					placeholder: "muxpreload",
					onChange: (muxpreload) => data.patchOutput({ muxpreload })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-target",
			label: "旧式目标",
			help: "vcd、svcd、dvd、dv。现代成片几乎不用。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
				value: data.output.target,
				onChange: (target) => data.patchOutput({ target }),
				options: [
					{
						value: "",
						label: "无"
					},
					{
						value: "vcd",
						label: "vcd"
					},
					{
						value: "svcd",
						label: "svcd"
					},
					{
						value: "dvd",
						label: "dvd"
					},
					{
						value: "dv",
						label: "dv"
					}
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "-metadata",
			label: "元数据",
			help: "空值不会写入。键用 title、artist、comment、album 这类 ffmpeg 认得的名字。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [data.output.metadata.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 md:grid-cols-[8rem_minmax(0,1fr)_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							mono: true,
							value: row.key,
							placeholder: "title",
							onChange: (key) => data.patchMetadata(row.id, { key })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: row.value,
							placeholder: "值",
							onChange: (value) => data.patchMetadata(row.id, { value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							tone: "danger",
							onClick: () => data.removeMetadata(row.id),
							children: "删除"
						})
					]
				}, row.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: data.addMetadata,
					children: "添加一条"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			query,
			flag: "额外输出参数",
			label: "原始输出参数",
			help: "加在输出文件名之前。",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				mono: true,
				value: data.output.extra,
				onChange: (extra) => data.patchOutput({ extra })
			})
		})
	] });
}
var NAV = [
	{
		id: "engine",
		label: "引擎"
	},
	{
		id: "job",
		label: "作业"
	},
	{
		id: "params",
		label: "参数"
	},
	{
		id: "filters",
		label: "滤镜"
	},
	{
		id: "kotlin",
		label: "Kotlin"
	}
];
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8 text-brass",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2.5",
				y: "2.5",
				width: "27",
				height: "27",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7 24 L15 8 H20 L12 24 Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M19 8 H26 V13 H22.5 L19 8 Z",
				fill: "currentColor"
			})
		]
	});
}
function Studio() {
	const [section, setSection] = (0, import_react.useState)("engine");
	const [dockOpen, setDockOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const data = useStudio(useShallow(selectData));
	const job = (0, import_react.useMemo)(() => buildJob(data), [data]);
	const errors = job.issues.filter((issue) => issue.level === "error").length;
	(0, import_react.useEffect)(() => {
		const pending = useStudio.persist.rehydrate();
		if (pending && typeof pending.then === "function") pending.then(() => useStudio.getState().markHydrated());
		else useStudio.getState().markHydrated();
	}, []);
	const line = job.shell.split("\n").filter((item) => item && !item.startsWith("#")).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-ink text-bone",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:grid md:grid-cols-[14rem_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border-b border-line md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:border-r md:border-b-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-semibold leading-none",
							children: "刃帧"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-mono text-xs tracking-widest text-mist",
							children: "KERF"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:px-3",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSection(item.id),
							"aria-current": section === item.id ? "page" : void 0,
							className: cx("min-h-11 shrink-0 px-3 text-left text-sm", section === item.id ? "bg-brass text-ink" : "text-bone"),
							children: item.label
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden px-4 pb-4 text-xs leading-relaxed text-mist md:mt-auto md:block",
						children: "配置留在这台浏览器里。转码发生在你自己的 Kotlin 进程中。"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-5xl flex-col px-4 pt-5 pb-28",
					children: [
						section === "engine" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnginePanel, {}) : null,
						section === "job" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobPanel, {}) : null,
						section === "params" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamsPanel, {}) : null,
						section === "filters" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiltersPanel, {}) : null,
						section === "kotlin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KotlinPanel, {}) : null
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-5xl items-center gap-2 px-3 py-2 md:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "min-h-11 shrink-0 px-2 text-left",
						onClick: () => setDockOpen((open) => !open),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-mono text-xs text-brass",
							children: errors ? `${errors} 个错误` : "命令"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-bone",
							children: dockOpen ? "收起" : "展开"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 truncate font-mono text-xs text-mist",
						children: line
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 shrink-0 bg-brass px-3 text-sm font-medium text-ink",
						onClick: () => {
							copyText(job.shell).then(() => {
								setCopied(true);
								window.setTimeout(() => setCopied(false), 1500);
							});
						},
						children: copied ? "已复制" : "复制"
					})
				]
			}), dockOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mx-auto max-h-48 w-full max-w-5xl overflow-auto px-4 pb-3 font-mono text-xs leading-relaxed text-bone",
				children: job.shell
			}) : null]
		})]
	});
}
var SplitComponent = Studio;
//#endregion
export { SplitComponent as component };
