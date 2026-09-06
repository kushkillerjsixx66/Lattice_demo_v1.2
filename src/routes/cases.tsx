import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CASES } from "@/lib/lattice/cases";

export const Route = createFileRoute("/cases")({ component: CasesPage });

function CasesPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase">
          Case studies
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl">
          The difference produced, not the elegance of the code.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          Two programs. One principle each. Ordinary language, then the
          unconstrained path, then the gate that stopped it.
        </p>
      </header>

      {CASES.map((study) => (
        <article key={study.id} className="flex flex-col gap-6">
          <header>
            <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
              {study.principle} · {study.module}
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight">
              {study.kicker}
            </h2>
          </header>

          <section>
            <h3 className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
              The problem
            </h3>
            <p className="mt-2 text-base leading-relaxed text-fg">{study.problem}</p>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <h3 className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
                Unconstrained path
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {study.unconstrainedPath}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg">
                {study.whereItDrifts}
              </p>
            </section>
            <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <h3 className="font-mono text-[0.6875rem] tracking-widest text-fg uppercase">
                Governed path
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg">
                {study.governedPath}
              </p>
            </section>
          </div>

          <section className="rounded-xl bg-surface-2 p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
              Intervention
            </p>
            <p className="mt-2 font-display text-xl tracking-tight">
              {study.intervention.stage} issued {study.intervention.disposition}.
            </p>
            <p className="mt-1 text-sm text-muted">
              Invariant: {study.intervention.invariant}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg">{study.difference}</p>
          </section>
        </article>
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild>
          <Link to="/">
            Run the matching signals
            <ArrowRight />
          </Link>
        </Button>
        <p className="text-sm text-muted">
          Scope expansion and the public thread are both in the pipeline.
        </p>
      </div>
    </main>
  );
}
