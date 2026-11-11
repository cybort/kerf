import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultAudio, defaultGlobal, defaultInput, defaultOutput, defaultStudio, defaultVideo } from "./defaults";
import { makeFilter } from "./filters";
import { PRESETS } from "./presets";
import { createId } from "./quote";
import type { AudioEncode, EngineConfig, FilterNode, GlobalConfig, MediaInput, OutputConfig, StudioData, VideoEncode } from "./types";

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

function sampleData(): StudioData {
  const data = defaultStudio();
  data.filters = [
    makeFilter("scale", { w: "1920", h: "-2", flags: "lanczos", force: "decrease" }),
    makeFilter("loudnorm", { I: "-16", TP: "-1.5", LRA: "11" }),
  ];
  return data;
}

interface Actions {
  hydrated: boolean;
  markHydrated: () => void;
  patchEngine: (partial: Partial<EngineConfig>) => void;
  patchGlobal: (partial: Partial<GlobalConfig>) => void;
  patchVideo: (partial: Partial<VideoEncode>) => void;
  patchAudio: (partial: Partial<AudioEncode>) => void;
  patchOutput: (partial: Partial<OutputConfig>) => void;
  patchInput: (id: string, partial: Partial<MediaInput>) => void;
  addInput: () => void;
  removeInput: (id: string) => void;
  addFilter: (kind: string) => void;
  patchFilter: (id: string, params: Record<string, string>) => void;
  toggleFilter: (id: string) => void;
  removeFilter: (id: string) => void;
  moveFilter: (id: string, direction: -1 | 1) => void;
  setRawFilter: (value: string) => void;
  addMetadata: () => void;
  patchMetadata: (id: string, partial: { key?: string; value?: string }) => void;
  removeMetadata: (id: string) => void;
  applyPreset: (id: string) => void;
  reset: () => void;
}

export type StudioStore = StudioData & Actions;

const initial = sampleData();

export const useStudio = create<StudioStore>()(
  persist(
    (set) => ({
      ...initial,
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      patchEngine: (partial) => set((state) => ({ engine: { ...state.engine, ...partial } })),
      patchGlobal: (partial) => set((state) => ({ global: { ...state.global, ...partial } })),
      patchVideo: (partial) => set((state) => ({ video: { ...state.video, ...partial } })),
      patchAudio: (partial) => set((state) => ({ audio: { ...state.audio, ...partial } })),
      patchOutput: (partial) => set((state) => ({ output: { ...state.output, ...partial } })),
      patchInput: (id, partial) =>
        set((state) => ({
          inputs: state.inputs.map((input) => (input.id === id ? { ...input, ...partial } : input)),
        })),
      addInput: () => set((state) => ({ inputs: [...state.inputs, defaultInput()] })),
      removeInput: (id) =>
        set((state) => ({
          inputs: state.inputs.length === 1 ? state.inputs : state.inputs.filter((input) => input.id !== id),
        })),
      addFilter: (kind) => set((state) => ({ filters: [...state.filters, makeFilter(kind)] })),
      patchFilter: (id, params) =>
        set((state) => ({
          filters: state.filters.map((filter) =>
            filter.id === id ? { ...filter, params: { ...filter.params, ...params } } : filter,
          ),
        })),
      toggleFilter: (id) =>
        set((state) => ({
          filters: state.filters.map((filter) => (filter.id === id ? { ...filter, enabled: !filter.enabled } : filter)),
        })),
      removeFilter: (id) => set((state) => ({ filters: state.filters.filter((filter) => filter.id !== id) })),
      moveFilter: (id, direction) =>
        set((state) => {
          const index = state.filters.findIndex((filter) => filter.id === id);
          const next = index + direction;
          if (index < 0 || next < 0 || next >= state.filters.length) return state;
          const filters = state.filters.slice();
          const [item] = filters.splice(index, 1);
          filters.splice(next, 0, item as FilterNode);
          return { filters };
        }),
      setRawFilter: (value) => set({ rawFilter: value }),
      addMetadata: () =>
        set((state) => ({
          output: { ...state.output, metadata: [...state.output.metadata, { id: createId(), key: "", value: "" }] },
        })),
      patchMetadata: (id, partial) =>
        set((state) => ({
          output: {
            ...state.output,
            metadata: state.output.metadata.map((row) => (row.id === id ? { ...row, ...partial } : row)),
          },
        })),
      removeMetadata: (id) =>
        set((state) => ({
          output: {
            ...state.output,
            metadata: state.output.metadata.filter((row) => row.id !== id),
          },
        })),
      applyPreset: (id) =>
        set((state) => {
          const preset = PRESETS.find((item) => item.id === id);
          if (!preset) return state;
          return {
            video: { ...defaultVideo(), ...preset.video },
            audio: { ...defaultAudio(), ...preset.audio },
            output: { ...state.output, ...preset.output },
            global: { ...defaultGlobal(), ...state.global, hideBanner: true, nostdin: true, progress: true },
            filters: preset.filters.map((filter) => ({ ...filter, id: createId(), params: { ...filter.params } })),
            rawFilter: "",
          };
        }),
      reset: () => set(sampleData()),
    }),
    {
      name: "kerf-studio-v1",
      skipHydration: true,
      storage: createJSONStorage(() => (typeof window === "undefined" ? memoryStorage : localStorage)),
      partialize: (state) => ({
        engine: state.engine,
        global: state.global,
        inputs: state.inputs,
        filters: state.filters,
        output: state.output,
        video: state.video,
        audio: state.audio,
        rawFilter: state.rawFilter,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

export function selectData(state: StudioStore): StudioData {
  return {
    engine: state.engine,
    global: state.global,
    inputs: state.inputs,
    filters: state.filters,
    output: state.output,
    video: state.video,
    audio: state.audio,
    rawFilter: state.rawFilter,
  };
}
