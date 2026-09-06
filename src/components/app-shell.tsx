import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LatticeMark } from "@/components/lattice-mark";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Pipeline" },
  { to: "/pack", label: "Prompt pack" },
  { to: "/cases", label: "Cases" },
  { to: "/traces", label: "Traces" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative min-h-dvh bg-bg text-fg">
        <div className="lattice-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex min-h-dvh flex-col">
          <header className="border-b border-border">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <Link
                to="/"
                className="flex items-center gap-2.5 text-fg no-underline"
              >
                <LatticeMark className="size-6" />
                <span className="font-display text-xl leading-none tracking-tight">
                  Lattice
                </span>
              </Link>
              <nav className="flex flex-wrap items-center gap-1">
                {NAV.map((item) => {
                  const active =
                    item.to === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "inline-flex h-11 items-center rounded-md px-3 text-sm no-underline transition-colors duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                        active
                          ? "bg-surface-2 text-fg"
                          : "text-muted hover:bg-surface-2 hover:text-fg",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>
          <div className="flex-1">{children}</div>
          <footer className="border-t border-border">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
              <p className="font-display text-sm text-muted italic">
                Do less than you want to.
              </p>
              <p className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
                Operator pack v1.0
              </p>
            </div>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
}
