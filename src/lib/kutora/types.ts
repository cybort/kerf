export type EngineMode = "path" | "url" | "source";
export type Overwrite = "yes" | "no" | "prompt";
export type SeekPlace = "input" | "output";
export type RateMode = "crf" | "abr" | "cbr";
export type MapMode = "auto" | "all-first" | "custom";
export type InputKind = "file" | "lavfi";

export interface EngineConfig {
  mode: EngineMode;
  binaryPath: string;
  binaryUrl: string;
  sha256: string;
  sourceUrl: string;
  sourceRef: string;
  configureFlags: string;
  prefix: string;
  jobs: string;
  workDir: string;
  probeText: string;
}

export interface GlobalConfig {
  overwrite: Overwrite;
  loglevel: string;
  hideBanner: boolean;
  stats: boolean;
  progress: boolean;
  nostdin: boolean;
  benchmark: boolean;
  threads: string;
  filterThreads: string;
  maxMuxingQueue: string;
  fpsMode: string;
  copyts: boolean;
  startAtZero: boolean;
  avoidNegativeTs: string;
  noAccurateSeek: boolean;
  timelimit: string;
}

export interface MediaInput {
  id: string;
  kind: InputKind;
  location: string;
  lavfi: string;
  seek: string;
  seekPlace: SeekPlace;
  duration: string;
  to: string;
  streamLoop: string;
  realtime: boolean;
  format: string;
  hwaccel: string;
  hwaccelDevice: string;
  hwaccelOutputFormat: string;
  itsoffset: string;
  threadQueueSize: string;
  probesize: string;
  analyzeduration: string;
  fflags: string;
  extra: string;
}

export interface VideoEncode {
  codec: string;
  preset: string;
  tune: string;
  rateMode: RateMode;
  crf: string;
  cq: string;
  bitrate: string;
  maxrate: string;
  minrate: string;
  bufsize: string;
  gop: string;
  keyintMin: string;
  bf: string;
  refs: string;
  profile: string;
  level: string;
  pixFmt: string;
  fps: string;
  tag: string;
  colorPrimaries: string;
  colorTrc: string;
  colorspace: string;
  colorRange: string;
  spatialAq: boolean;
  temporalAq: boolean;
  cpuUsed: string;
  deadline: string;
  svtPreset: string;
  twoPass: boolean;
  forceKeyFrames: string;
  extra: string;
}

export interface AudioEncode {
  codec: string;
  bitrate: string;
  sampleRate: string;
  channels: string;
  quality: string;
  profile: string;
  sampleFmt: string;
  application: string;
  vbr: string;
  cutoff: string;
  extra: string;
}

export interface MetaRow {
  id: string;
  key: string;
  value: string;
}

export interface OutputConfig {
  path: string;
  container: string;
  duration: string;
  start: string;
  fileSizeLimit: string;
  videoDisabled: boolean;
  audioDisabled: boolean;
  subtitleDisabled: boolean;
  dataDisabled: boolean;
  subtitleCodec: string;
  mapMode: MapMode;
  customMaps: string;
  mapMetadata: string;
  mapChapters: string;
  disposition: string;
  shortest: boolean;
  faststart: boolean;
  muxdelay: string;
  muxpreload: string;
  target: string;
  extra: string;
  metadata: MetaRow[];
}

export interface FilterNode {
  id: string;
  kind: string;
  enabled: boolean;
  params: Record<string, string>;
}

export interface StudioData {
  engine: EngineConfig;
  global: GlobalConfig;
  inputs: MediaInput[];
  filters: FilterNode[];
  output: OutputConfig;
  video: VideoEncode;
  audio: AudioEncode;
  rawFilter: string;
}

export interface Issue {
  level: "error" | "warn";
  message: string;
}

export interface PlanStep {
  title: string;
  body: string;
}

export interface BuiltJob {
  binary: string;
  commands: string[][];
  shell: string;
  issues: Issue[];
  plan: PlanStep[];
  graphText: string;
}
