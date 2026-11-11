import { createId } from "./quote";
import type {
  AudioEncode,
  EngineConfig,
  GlobalConfig,
  MediaInput,
  OutputConfig,
  StudioData,
  VideoEncode,
} from "./types";

export function defaultEngine(): EngineConfig {
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
    probeText: "",
  };
}

export function defaultGlobal(): GlobalConfig {
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
    timelimit: "",
  };
}

export function defaultInput(partial?: Partial<MediaInput>): MediaInput {
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
    ...partial,
  };
}

export function defaultVideo(): VideoEncode {
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
    extra: "",
  };
}

export function defaultAudio(): AudioEncode {
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
    extra: "",
  };
}

export function defaultOutput(): OutputConfig {
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
    metadata: [{ id: createId(), key: "title", value: "" }],
  };
}

export function defaultStudio(): StudioData {
  return {
    engine: defaultEngine(),
    global: defaultGlobal(),
    inputs: [defaultInput({ location: "footage/interview.mov" })],
    filters: [],
    output: defaultOutput(),
    video: defaultVideo(),
    audio: defaultAudio(),
    rawFilter: "",
  };
}
