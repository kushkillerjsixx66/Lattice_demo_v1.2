import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CORE_CONSTRAINTS,
  DECISION_TEMPLATE,
  DISPOSITIONS,
  MAXIM,
  OPERATOR_PROMPT,
  PACK_INTRO,
  PACK_VERSION,
  PACK_WORKED,
} from "@/lib/lattice/pack";
import { packMarkdown } from "@/lib/lattice/pack-markdown";

export const Route = createFileRoute("/pack")({ component: PackPage });

function PackPage() {
  const [copied, setCopied] = useState<"pack" | "prompt" | null>(null);

  async function copy(kind: "pack" | "prompt") {
    const text = kind === "pack" ? packMarkdown() : OPERATOR_PROMPT;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase">
          Lattice Operator Prompt Pack v{PACK_VERSION}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl">
          A portable governance layer.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {PACK_INTRO}
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => void copy("pack")} className="sm:w-auto">
            {copied === "pack" ? <Check /> : <Copy />}
            {copied === "pack" ? "Copied pack" : "Copy full pack"}
          </Button>
          <Button variant="outline" onClick={() => void copy("prompt")}>
            {copied === "prompt" ? <Check /> : <Copy />}
            {copied === "prompt" ? "Copied prompt" : "Copy operator prompt"}
          </Button>
        </div>
      </header>

      <section>
        <h2 className="font-display text-2xl tracking-tight">The maxim</h2>
        <blockquote className="mt-4 border-l border-border pl-5 font-display text-2xl leading-snug text-fg italic">
          {MAXIM}
        </blockquote>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-tight">
          Core constraints
        </h2>
        <ol className="mt-6 flex flex-col gap-6">
          {CORE_CONSTRAINTS.map((item) => (
            <li key={item.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
                {item.id}
              </p>
              <h3 className="mt-2 font-display text-xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-tight">
          Silence, hold, decay, proceed
        </h2>
        <p className="mt-2 text-sm text-muted">
          These are first-class outcomes. None of them mean the system failed.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {DISPOSITIONS.map((item) => (
            <article
              key={item.id}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-tight">
          Decision template
        </h2>
        <p className="mt-2 text-sm text-muted">
          Assumption listing, evidence class, reversibility. Fill it before you
          spend optionality.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-2 p-5 font-mono text-xs leading-relaxed text-fg shadow-[var(--shadow-border)]">
          {DECISION_TEMPLATE.trim()}
        </pre>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-tight">
          Worked contrast
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {PACK_WORKED.map((item) => (
            <article
              key={item.title}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
              <dl className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <dt className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
                    Unconstrained
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {item.unconstrained}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
                    Governed
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg">
                    {item.governed}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-tight">Operator prompt</h2>
        <p className="mt-2 text-sm text-muted">
          Self-contained. Paste into a capable model. Then run the same problem
          without it.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-2 p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-fg shadow-[var(--shadow-border)]">
          {OPERATOR_PROMPT}
        </pre>
      </section>
    </main>
  );
}
