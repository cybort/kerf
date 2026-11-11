import { defaultAudio, defaultVideo } from "./defaults";
import { makeFilter } from "./filters";
import type { AudioEncode, FilterNode, OutputConfig, VideoEncode } from "./types";

export interface Preset {
  id: string;
  name: string;
  detail: string;
  video: Partial<VideoEncode>;
  audio: Partial<AudioEncode>;
  output: Partial<OutputConfig>;
  filters: FilterNode[];
}

export const PRESETS: Preset[] = [
  {
    id: "web-h264",
    name: "网页成片",
    detail: "H.264 · CRF 20 · AAC · 1080p · faststart",
    video: { ...defaultVideo(), codec: "libx264", preset: "slow", tune: "film", rateMode: "crf", crf: "20", profile: "high", pixFmt: "yuv420p" },
    audio: { ...defaultAudio(), codec: "aac", bitrate: "192k", sampleRate: "48000", channels: "2" },
    output: { container: "mp4", faststart: true, videoDisabled: false, audioDisabled: false },
    filters: [
      makeFilter("scale", { w: "1920", h: "-2", flags: "lanczos", force: "decrease" }),
      makeFilter("loudnorm", { I: "-16", TP: "-1.5", LRA: "11" }),
    ],
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
      crf: "",
    },
    audio: { ...defaultAudio(), codec: "pcm_s16le", bitrate: "", sampleRate: "48000", channels: "2" },
    output: { container: "mov", faststart: false, videoDisabled: false, audioDisabled: false },
    filters: [],
  },
  {
    id: "podcast",
    name: "播客母带",
    detail: "单声道 · loudnorm −16 · MP3",
    video: { ...defaultVideo(), codec: "copy" },
    audio: { ...defaultAudio(), codec: "libmp3lame", bitrate: "", quality: "4", sampleRate: "44100", channels: "1" },
    output: { container: "mp3", faststart: false, videoDisabled: true, audioDisabled: false, subtitleDisabled: true },
    filters: [
      makeFilter("highpass", { f: "80" }),
      makeFilter("acompressor", { threshold: "-18", ratio: "3", attack: "20", release: "250" }),
      makeFilter("loudnorm", { I: "-16", TP: "-1.5", LRA: "11" }),
    ],
  },
  {
    id: "gif",
    name: "短循环 GIF",
    detail: "12 fps · 480 宽 · 调色板",
    video: { ...defaultVideo(), codec: "gif", preset: "", tune: "", profile: "", pixFmt: "", rateMode: "crf" },
    audio: { ...defaultAudio(), codec: "copy" },
    output: { container: "gif", faststart: false, videoDisabled: false, audioDisabled: true, subtitleDisabled: true },
    filters: [
      makeFilter("fps", { fps: "12" }),
      makeFilter("scale", { w: "480", h: "-2", flags: "lanczos", force: "decrease" }),
      makeFilter("palette", { stats: "diff", dither: "bayer" }),
    ],
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
      spatialAq: true,
    },
    audio: { ...defaultAudio(), codec: "aac", bitrate: "192k" },
    output: { container: "mp4", faststart: true },
    filters: [makeFilter("scale", { w: "1920", h: "-2", flags: "lanczos", force: "decrease" })],
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
      pixFmt: "yuv420p",
    },
    audio: { ...defaultAudio(), codec: "libopus", bitrate: "128k", application: "audio", vbr: "on", sampleRate: "48000", channels: "2" },
    output: { container: "webm", faststart: false },
    filters: [makeFilter("scale", { w: "1280", h: "-2", flags: "lanczos", force: "decrease" })],
  },
  {
    id: "voice",
    name: "对白清理",
    detail: "高通 · 频谱降噪 · 压缩 · 复制视频",
    video: { ...defaultVideo(), codec: "copy", preset: "", tune: "", profile: "", pixFmt: "" },
    audio: { ...defaultAudio(), codec: "aac", bitrate: "160k", sampleRate: "48000", channels: "2" },
    output: { container: "matroska", faststart: false },
    filters: [
      makeFilter("highpass", { f: "80" }),
      makeFilter("afftdn", { nr: "10", nf: "-45" }),
      makeFilter("acompressor", { threshold: "-20", ratio: "2.5", attack: "15", release: "180" }),
      makeFilter("alimiter", { limit: "0.95" }),
    ],
  },
];
