import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as Check, r as Copy } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2AT1vS6.mjs";
import { a as OPERATOR_PROMPT, i as MAXIM, n as DECISION_TEMPLATE, o as PACK_INTRO, r as DISPOSITIONS, s as PACK_WORKED, t as CORE_CONSTRAINTS } from "./pack-BpKctYc5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pack-BiXxIPJ7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function packMarkdown() {
	const constraints = CORE_CONSTRAINTS.map((c) => `### ${c.id} — ${c.title}\n\n${c.body}`).join("\n\n");
	const dispositions = DISPOSITIONS.map((d) => `**${d.title}.** ${d.body}`).join("\n\n");
	const worked = PACK_WORKED.map((w) => `**${w.title}**\n- Unconstrained: ${w.unconstrained}\n- Governed: ${w.governed}`).join("\n\n");
	return `# Lattice Operator Prompt Pack v1.0

${MAXIM}

${PACK_INTRO}

## Core constraints

${constraints}

## Silence, hold, decay, proceed

${dispositions}

## Decision template

\`\`\`
${DECISION_TEMPLATE.trim()}
\`\`\`

## Worked contrast

${worked}

## Operator prompt

\`\`\`
${OPERATOR_PROMPT}
\`\`\`
`;
}
function PackPage() {
	const [copied, setCopied] = (0, import_react.useState)(null);
	async function copy(kind) {
		const text = kind === "pack" ? packMarkdown() : OPERATOR_PROMPT;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(kind);
			window.setTimeout(() => setCopied(null), 1600);
		} catch {
			setCopied(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase",
					children: ["Lattice Operator Prompt Pack v", "1.0"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl",
					children: "A portable governance layer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted md:text-lg",
					children: PACK_INTRO
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => void copy("pack"),
						className: "sm:w-auto",
						children: [copied === "pack" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied === "pack" ? "Copied pack" : "Copy full pack"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => void copy("prompt"),
						children: [copied === "prompt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied === "prompt" ? "Copied prompt" : "Copy operator prompt"]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight",
				children: "The maxim"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "mt-4 border-l border-border pl-5 font-display text-2xl leading-snug text-fg italic",
				children: MAXIM
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight",
				children: "Core constraints"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 flex flex-col gap-6",
				children: CORE_CONSTRAINTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
							children: item.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-xl tracking-tight",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: item.body
						})
					]
				}, item.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Silence, hold, decay, proceed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "These are first-class outcomes. None of them mean the system failed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2",
					children: DISPOSITIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl tracking-tight",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: item.body
						})]
					}, item.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Decision template"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Assumption listing, evidence class, reversibility. Fill it before you spend optionality."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto rounded-xl bg-surface-2 p-5 font-mono text-xs leading-relaxed text-fg shadow-[var(--shadow-border)]",
					children: DECISION_TEMPLATE.trim()
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight",
				children: "Worked contrast"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-col gap-4",
				children: PACK_WORKED.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl tracking-tight",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
							children: "Unconstrained"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: item.unconstrained
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
							children: "Governed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-relaxed text-fg",
							children: item.governed
						})] })]
					})]
				}, item.title))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Operator prompt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Self-contained. Paste into a capable model. Then run the same problem without it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto rounded-xl bg-surface-2 p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-fg shadow-[var(--shadow-border)]",
					children: OPERATOR_PROMPT
				})
			] })
		]
	});
}
//#endregion
export { PackPage as component };
