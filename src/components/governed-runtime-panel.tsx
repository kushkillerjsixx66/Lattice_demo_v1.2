import { useState } from "react";
import { ArrowRight, ShieldCheck, ShieldX } from "lucide-react";
import { runGovernedMutation, type GovernedRun } from "@/lib/lattice/runtime";
import type { Disposition } from "@/lib/lattice/states";
import type { Scenario } from "@/lib/lattice/governed-state-machine";

const DEFAULT_INTENT = "Modify the Mutation Routing Specification through the governed mutation path.";

const SCENARIOS: { id: Scenario; label: string; description: string }[] = [
  { id: "clean", label: "Clean", description: "Constraints hold. A proposal becomes eligible for human review." },
  { id: "boundary", label: "Boundary violation", description: "Executor attempts to cross the canonical authority boundary." },
  { id: "disagreement", label: "Agent disagreement", description: "Vara reports uncertainty and the system enters governed mediation." },
];

export function GovernedRuntimePanel() {
  const [intent, setIntent] = useState(DEFAULT_INTENT);
  const [scenario, setScenario] = useState<Scenario>("clean");
  const [run, setRun] = useState<GovernedRun | null>(null);

  function execute() {
    setRun(runGovernedMutation(intent.trim() || DEFAULT_INTENT, scenario));
  }

  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <div>
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase">Governed mutation runtime</p>
        <h2 className="mt-2 font-display text-3xl tracking-tight">Propose a change to a governed system</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Governance is exercised as state transition, not decoration. Disagreement can remain unresolved,
          a boundary violation can halt execution, and only an independently audited clean path produces a mutation proposal.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {SCENARIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setScenario(item.id)}
            className={`rounded-xl p-3 text-left ring-1 ring-inset transition-colors ${scenario === item.id ? "bg-surface-2 ring-border" : "bg-surface ring-border/60"}`}
          >
            <span className="font-mono text-[0.65rem] tracking-widest uppercase">{item.label}</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted">{item.description}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <textarea
          value={intent}
          onChange={(event) => setIntent(event.target.value)}
          className="min-h-28 w-full rounded-xl bg-surface-2 p-4 text-sm leading-relaxed outline-none ring-1 ring-inset ring-border focus:ring-2"
          aria-label="Governed mutation intent"
        />
        <button
          type="button"
          onClick={execute}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fg px-4 py-3 font-mono text-xs tracking-wide text-surface uppercase transition-opacity hover:opacity-85 sm:w-fit"
        >
          Execute governed run <ArrowRight className="size-4" />
        </button>
      </div>

      {run ? <RunResult run={run} /> : null}
    </section>
  );
}

function RunResult({ run }: { run: GovernedRun }) {
  const final = run.trace.entries.at(-1);
  const audit = run.stumpy;
  const disposition: Disposition | "NONE" = audit?.disposition ?? "NONE";
  const eligible = disposition === "ELIGIBLE";

  return (
    <div className="flex flex-col gap-5 border-t border-border pt-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Cognitive state" value={audit?.state ?? final?.state ?? run.envelope.state} />
        <Metric label="Disposition" value={disposition} />
        <Metric label="Canonicalization" value={run.mutation?.canonicalization.status ?? "NOT CREATED"} />
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-surface-2 p-4">
        {eligible ? <ShieldCheck className="size-5" /> : <ShieldX className="size-5" />}
        <div>
          <p className="font-mono text-xs tracking-wide uppercase">
            {eligible ? "Mutation eligible for human review" : `Runtime disposition: ${disposition}`}
          </p>
          <p className="mt-1 text-sm text-muted">
            {eligible ? "Stumpy independently audited the accumulated evidence. A Mutation Envelope exists, but it is still only a proposal." : audit?.blocking_condition ?? "The canonical boundary remains closed."}
          </p>
        </div>
      </div>

      {audit ? (
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">Stumpy Audit</p>
            <span className="font-mono text-[0.65rem] uppercase">{audit.authority_result} · {audit.reversibility_result}</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {Object.entries(audit.invariant_results).map(([name, status]) => (
              <div key={name} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2 font-mono text-[0.65rem]">
                <span>{name}</span><span>{status}</span>
              </div>
            ))}
          </div>
          {audit.observations.length ? <p className="mt-3 text-xs leading-relaxed text-muted">{audit.observations.join(" ")}</p> : null}
        </div>
      ) : null}

      <div>
        <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">Cognitive state transitions</p>
        <div className="mt-3 flex flex-col gap-2">
          {run.trace.entries.map((entry) => (
            <div key={`${entry.sequence}-${entry.event.event_id}`} className="grid grid-cols-[2rem_7rem_1fr] gap-3 rounded-lg bg-surface-2 p-3 text-xs">
              <span className="font-mono text-subtle">{String(entry.sequence).padStart(2, "0")}</span>
              <span className="font-mono uppercase">{entry.actor}</span>
              <div>
                <span className="font-medium">{entry.state} · {entry.event.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {run.mutation ? (
        <div className="rounded-xl border border-border p-4">
          <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">Mutation Envelope</p>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <Detail label="Mutation ID" value={run.mutation.mutation_id} />
            <Detail label="Source branch" value={run.mutation.source.branch} />
            <Detail label="Path" value={run.mutation.mutation.path} />
            <Detail label="Operation" value={run.mutation.mutation.operation} />
            <Detail label="Reversible" value={String(run.mutation.governance.reversible)} />
            <Detail label="Authority" value={run.mutation.canonicalization.authority} />
          </dl>
        </div>
      ) : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-surface-2 p-4"><p className="font-mono text-[0.65rem] tracking-widest text-subtle uppercase">{label}</p><p className="mt-2 font-display text-lg tracking-tight">{value}</p></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="font-mono text-[0.65rem] tracking-widest text-subtle uppercase">{label}</dt><dd className="mt-1 break-all text-sm">{value}</dd></div>;
}
