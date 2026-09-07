import { EXAMPLES, getExample } from "@/lib/lattice/examples";
import { simulatePipeline } from "@/lib/lattice/simulate";
import { isRunning, useLatticeStore } from "@/lib/lattice/store";
import type { StageId } from "@/lib/lattice/types";

const STAGE_ORDER: StageId[] = ["vara", "stumpy", "enforce", "synthesis"];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms: number): Promise<void> {
  if (prefersReducedMotion()) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function usePipelineRun() {
  const phase = useLatticeStore((s) => s.phase);
  const running = isRunning(phase);

  async function run(exampleId?: string) {
    const store = useLatticeStore.getState();
    const example = exampleId ? getExample(exampleId) : undefined;
    if (exampleId) store.loadExample(exampleId);
    const signal = (example?.signal ?? store.signal).trim();

    if (signal.length < 12) {
      store.setError("Give the pipeline a real decision or observation.");
      return;
    }

    const token = store.bumpRun();
    const still = () => useLatticeStore.getState().runToken === token;

    const finishExample = async () => {
      for (const stage of STAGE_ORDER) {
        if (!still()) return;
        useLatticeStore.getState().setPhase(stage);
        await wait(440);
      }
    };

    if (example) {
      await finishExample();
      if (!still()) return;
      useLatticeStore.getState().completeRun({
        ...example.result,
        createdAt: new Date().toISOString(),
      });
      return;
    }

    const cached = store.history.find((item) => item.input === signal);
    if (cached) {
      await finishExample();
      if (!still()) return;
      useLatticeStore.getState().completeRun(cached);
      return;
    }

    // Custom signals: deterministic client-side simulation.
    // Zero network, zero API key, source: "simulated".
    await finishExample();
    if (!still()) return;
    useLatticeStore.getState().setPhase("synthesis");

    try {
      const result = simulatePipeline(signal);
      if (!still()) return;
      useLatticeStore.getState().completeRun(result);
    } catch (err) {
      if (!still()) return;
      useLatticeStore.getState().setError(
        err instanceof Error ? err.message : "The pipeline failed to complete.",
      );
    }
  }

  function runFirstExample() {
    const first = EXAMPLES[0];
    if (first) return run(first.id);
  }

  return { run, running, runFirstExample };
}
