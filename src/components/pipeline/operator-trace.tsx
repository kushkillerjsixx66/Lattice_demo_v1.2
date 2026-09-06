import { Badge } from "@/components/ui/badge";
import type { FlagKind, PipelineResult } from "@/lib/lattice/types";

const FLAG_LABEL: Record<FlagKind, string> = {
  drift: "Drift",
  assumption: "Assumption",
  urgency: "Urgency",
  overcommit: "Overcommit",
};

export function OperatorTrace({ result }: { result: PipelineResult }) {
  const { trace } = result;
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <h3 className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
          Vara:Scan — flagged
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
          {trace.vara.scan}
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {trace.vara.flags.map((flag) => (
            <li key={flag.text} className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
              <Badge variant="flag" className="w-fit shrink-0">
                {FLAG_LABEL[flag.kind]}
              </Badge>
              <p className="text-sm leading-relaxed text-fg text-pretty">
                {flag.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <h3 className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
          Stumpy:Audit — constraints
        </h3>
        <p className="mt-2 text-sm text-muted">
          Evidence class{" "}
          <span className="font-mono text-fg">{trace.stumpy.evidenceClass}</span>
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg">
          {trace.stumpy.constraints.map((item) => (
            <li key={item} className="text-pretty">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted text-pretty">
          {trace.stumpy.optionality}
        </p>
      </section>

      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <h3 className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
          Enforce:Gate — held, decayed, invariants
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg text-pretty">
          {trace.enforce.gate}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <TraceList label="Held" items={trace.enforce.held} />
          <TraceList label="Decayed" items={trace.enforce.decayed} />
          <div>
            <p className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
              Invariants
            </p>
            <ul className="mt-2 space-y-2">
              {trace.enforce.invariants.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <span className="text-fg text-pretty">{item.name}</span>
                  <span className="font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <h3 className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
          Next reversible move
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg text-pretty">
          {trace.synthesis.nextReversibleMove}
        </p>
        {trace.synthesis.assumptionsSurfaced.length > 0 ? (
          <>
            <p className="mt-4 font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
              Assumptions surfaced
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              {trace.synthesis.assumptionsSurfaced.map((item) => (
                <li key={item} className="text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </div>
  );
}

function TraceList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
        {label}
      </p>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-subtle">None named.</p>
      ) : (
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-fg">
          {items.map((item) => (
            <li key={item} className="text-pretty">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
