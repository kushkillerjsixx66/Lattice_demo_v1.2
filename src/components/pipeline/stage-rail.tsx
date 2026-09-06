import { STAGES, type StageId } from "@/lib/lattice/types";
import { isRunning, useLatticeStore } from "@/lib/lattice/store";
import { cn } from "@/lib/utils";

const ORDER: StageId[] = ["vara", "stumpy", "enforce", "synthesis"];

function indexOf(stage: StageId | "idle" | "done" | "error"): number {
  if (stage === "idle" || stage === "error") return -1;
  if (stage === "done") return ORDER.length;
  return ORDER.indexOf(stage);
}

export function StageRail() {
  const phase = useLatticeStore((s) => s.phase);
  const current = indexOf(phase);
  const running = isRunning(phase);

  return (
    <ol className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0">
      {STAGES.map((stage, i) => {
        const active = phase === stage.id;
        const done = current > i;
        return (
          <li key={stage.id} className="relative flex gap-3 md:flex-col md:gap-3">
            {i < STAGES.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-3 left-7 hidden h-px w-[calc(100%-1.5rem)] bg-border md:block"
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.625rem] shadow-[var(--shadow-border)]",
                active && "bg-primary text-primary-fg",
                done && !active && "bg-fg/15 text-fg",
                !active && !done && "bg-surface-2 text-subtle",
                active && running && "stage-pulse",
              )}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p
                className={cn(
                  "font-mono text-[0.6875rem] tracking-wide uppercase",
                  active ? "text-fg" : "text-muted",
                )}
              >
                {stage.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-subtle text-pretty">
                {stage.role}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
