import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { ContrastView } from "@/components/pipeline/contrast-view";
import { DispositionMark } from "@/components/pipeline/disposition-mark";
import { OperatorTrace } from "@/components/pipeline/operator-trace";
import { StageRail } from "@/components/pipeline/stage-rail";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { usePipelineRun } from "@/hooks/use-pipeline-run";
import { EXAMPLES } from "@/lib/lattice/examples";
import { isRunning, useLatticeStore } from "@/lib/lattice/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const signal = useLatticeStore((s) => s.signal);
  const exampleId = useLatticeStore((s) => s.exampleId);
  const phase = useLatticeStore((s) => s.phase);
  const error = useLatticeStore((s) => s.error);
  const result = useLatticeStore((s) => s.result);
  const tab = useLatticeStore((s) => s.tab);
  const setSignal = useLatticeStore((s) => s.setSignal);
  const setTab = useLatticeStore((s) => s.setTab);
  const { run, running } = usePipelineRun();

  useEffect(() => {
    if (phase !== "done" && phase !== "error") return;
    const node = document.getElementById("run-output");
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [phase, result?.id, error]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12">
      <section className="max-w-3xl">
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase">
          Operator pipeline
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-6xl">
          Same input. Two outputs.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Watch an ordinary, high-stakes decision go through an unconstrained
          model, then through Lattice. Hold, Decay, and Silence are allowed to
          win.
        </p>
      </section>

      <section className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6">
        <StageRail />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl tracking-tight">
              Run a signal
            </h2>
            <p className="mt-1 text-sm text-muted">
              One click. The contrast is the demonstration.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((example) => {
            const selected = exampleId === example.id;
            return (
              <button
                key={example.id}
                type="button"
                disabled={running}
                onClick={() => run(example.id)}
                className={cn(
                  "flex min-h-28 flex-col items-start rounded-xl bg-surface p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)] disabled:opacity-60",
                  selected && "bg-surface-2",
                )}
              >
                <span className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
                  {example.stakes}
                </span>
                <span className="mt-2 font-display text-xl leading-snug tracking-tight">
                  {example.title}
                </span>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
                  Run this
                  <ArrowRight className="size-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <label htmlFor="signal" className="font-display text-2xl tracking-tight">
          Or paste your own
        </label>
        <p className="text-sm text-muted">
          A hiring call, a scope fight, a message you want to send. The pipeline
          will produce both the unconstrained response and a governed trace.
        </p>
        <Textarea
          id="signal"
          value={signal}
          disabled={running}
          placeholder="Describe the decision or observation under pressure…"
          onChange={(event) => setSignal(event.target.value)}
          className="min-h-40"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] text-subtle">
            {signal.trim().length}/2000
          </p>
          <Button
            size="lg"
            disabled={running || signal.trim().length < 12}
            onClick={() => run()}
            className="w-full sm:w-auto"
          >
            {running ? (
              <>
                <LoaderCircle className="animate-spin" />
                Running {isRunning(phase) ? phaseLabel(phase) : "pipeline"}
              </>
            ) : (
              <>
                Run through Lattice
                <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </section>

      <section id="run-output" className="scroll-mt-6">
        {error ? (
          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[0.6875rem] tracking-widest text-hold uppercase">
              Gate
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg">{error}</p>
          </div>
        ) : null}

        {running && !result ? (
          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
              {phaseLabel(phase)}
            </p>
            <p className="mt-2 font-display text-2xl tracking-tight">
              Reading the signal under constraint.
            </p>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Drift first, then evidence class, then the gate. The output is
              allowed to be a hold.
            </p>
          </div>
        ) : null}

        {result && !running ? (
          <div className="flex flex-col gap-6">
            <DispositionMark disposition={result.disposition} />
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as "contrast" | "trace")}
            >
              <TabsList>
                <TabsTrigger value="contrast">Contrast</TabsTrigger>
                <TabsTrigger value="trace">Operator trace</TabsTrigger>
              </TabsList>
              <TabsContent value="contrast" className="mt-5">
                <ContrastView result={result} />
              </TabsContent>
              <TabsContent value="trace" className="mt-5">
                <OperatorTrace result={result} />
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function phaseLabel(phase: string): string {
  switch (phase) {
    case "vara":
      return "Vara:Scan";
    case "stumpy":
      return "Stumpy:Audit";
    case "enforce":
      return "Enforce:Gate";
    case "synthesis":
      return "Synthesis";
    default:
      return "Pipeline";
  }
}
