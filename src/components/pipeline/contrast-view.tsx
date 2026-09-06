import type { PipelineResult } from "@/lib/lattice/types";

export function ContrastView({ result }: { result: PipelineResult }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
          What changed
        </p>
        <p className="mt-2 font-display text-xl leading-snug text-pretty md:text-2xl">
          {result.trace.delta.headline}
        </p>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
              Unconstrained would
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted text-pretty">
              {result.trace.delta.unconstrainedWould}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
              Lattice did
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-fg text-pretty">
              {result.trace.delta.latticeDid}
            </dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="flex flex-col rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
          <header className="mb-3 flex items-baseline justify-between gap-3">
            <h3 className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
              Unconstrained
            </h3>
            <span className="text-[0.6875rem] text-subtle">Helpful and complete</span>
          </header>
          <div className="prose-output text-sm leading-relaxed text-muted whitespace-pre-wrap text-pretty">
            {result.unconstrained}
          </div>
        </article>
        <article className="flex flex-col rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
          <header className="mb-3 flex items-baseline justify-between gap-3">
            <h3 className="font-mono text-[0.6875rem] tracking-widest text-fg uppercase">
              Lattice-governed
            </h3>
            <span className="text-[0.6875rem] text-subtle">Constrained and reversible</span>
          </header>
          <div className="prose-output text-sm leading-relaxed text-fg whitespace-pre-wrap text-pretty">
            {result.trace.synthesis.output}
          </div>
        </article>
      </div>
    </div>
  );
}
