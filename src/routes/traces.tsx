import { useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DISPOSITION_COPY } from "@/lib/lattice/types";
import { useLatticeStore } from "@/lib/lattice/store";

export const Route = createFileRoute("/traces")({ component: TracesPage });

function TracesPage() {
  const history = useLatticeStore((s) => s.history);
  const openTrace = useLatticeStore((s) => s.openTrace);
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase">
          Operator traces
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl">
          Decision logs, kept on this device.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          Every completed run is stored locally. Open one to see the moment
          drift was named, the hold that was issued, the next reversible move.
        </p>
      </header>

      {!ready ? (
        <div className="h-40 rounded-xl bg-surface shadow-[var(--shadow-border)]" />
      ) : history.length === 0 ? (
        <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
          <p className="font-display text-2xl tracking-tight">No traces yet.</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            Run a preloaded signal on the pipeline. The operator trace lands
            here after the gate closes.
          </p>
          <Button asChild className="mt-5">
            <Link to="/">
              Open the pipeline
              <ArrowRight />
            </Link>
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  openTrace(item.id);
                  void navigate({ to: "/" });
                }}
                className="flex w-full flex-col gap-3 rounded-xl bg-surface p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)] sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-display text-xl tracking-tight">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                    {item.trace.delta.headline}
                  </p>
                  <p className="mt-2 font-mono text-[0.6875rem] text-subtle">
                    {item.source === "example" ? "Preloaded" : "Live"} ·{" "}
                    {formatWhen(item.createdAt)}
                  </p>
                </div>
                <Badge variant={item.disposition} className="w-fit shrink-0">
                  {DISPOSITION_COPY[item.disposition].label}
                </Badge>
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function formatWhen(value: string): string {
  if (value === "authored") return "Authored trace";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
