import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EXAMPLES } from "./examples";
import type { PipelineResult, StageId } from "./types";

export type RunPhase = "idle" | StageId | "done" | "error";
export type ResultTab = "contrast" | "trace";

const HISTORY_LIMIT = 20;

interface LatticeState {
  signal: string;
  exampleId: string | null;
  phase: RunPhase;
  error: string | null;
  result: PipelineResult | null;
  history: PipelineResult[];
  tab: ResultTab;
  runToken: number;
  setSignal: (value: string) => void;
  loadExample: (id: string) => void;
  setTab: (tab: ResultTab) => void;
  setPhase: (phase: RunPhase) => void;
  setError: (error: string | null) => void;
  completeRun: (result: PipelineResult) => void;
  openTrace: (id: string) => void;
  reset: () => void;
  bumpRun: () => number;
}

export const useLatticeStore = create<LatticeState>()(
  persist(
    (set, get) => ({
      signal: "",
      exampleId: null,
      phase: "idle",
      error: null,
      result: null,
      history: [],
      tab: "contrast",
      runToken: 0,
      setSignal: (value) => set({ signal: value, exampleId: null }),
      loadExample: (id) => {
        const example = EXAMPLES.find((item) => item.id === id);
        if (!example) return;
        set({ signal: example.signal, exampleId: id, error: null });
      },
      setTab: (tab) => set({ tab }),
      setPhase: (phase) => set({ phase }),
      setError: (error) => set({ error, phase: error ? "error" : get().phase }),
      completeRun: (result) =>
        set((state) => {
          const without = state.history.filter(
            (item) => item.id !== result.id && item.input !== result.input,
          );
          return {
            phase: "done",
            error: null,
            result,
            tab: "contrast",
            history: [result, ...without].slice(0, HISTORY_LIMIT),
          };
        }),
      openTrace: (id) => {
        const found = get().history.find((item) => item.id === id);
        if (!found) return;
        set({
          result: found,
          signal: found.input,
          exampleId: found.exampleId ?? null,
          phase: "done",
          tab: "trace",
          error: null,
        });
      },
      reset: () =>
        set({
          phase: "idle",
          error: null,
          result: null,
          exampleId: null,
          signal: "",
        }),
      bumpRun: () => {
        const next = get().runToken + 1;
        set({ runToken: next, error: null, result: null, phase: "vara" });
        return next;
      },
    }),
    {
      name: "lattice.traces.v1",
      partialize: (state) => ({ history: state.history }),
    },
  ),
);

export function isRunning(phase: RunPhase): boolean {
  return (
    phase === "vara" ||
    phase === "stumpy" ||
    phase === "enforce" ||
    phase === "synthesis"
  );
}
