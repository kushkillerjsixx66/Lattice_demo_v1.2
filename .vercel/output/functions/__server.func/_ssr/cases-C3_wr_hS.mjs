import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2AT1vS6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases-C3_wr_hS.js
var import_jsx_runtime = require_jsx_runtime();
var CASES = [{
	id: "cartography",
	principle: "Constraint cartography",
	module: "Stumpy:Audit → Enforce:Gate",
	kicker: "A sales promise is a debt. It is not a requirement.",
	problem: "Two weeks from launch, customers asked for SSO. The founder wanted it in the release. Engineering offered a one-week happy path if the audit log was skipped. Sales had already told two design partners it would be there.",
	unconstrainedPath: "The unconstrained path treats aligned want as a mandate. Founder plus Sales plus two named partners looks like a requirement. The audit log is recoded as polish. The launch date becomes flexible in service of the announcement. A week-three patch is invented to hold the guilt. By the time the product ships, the company has a public SSO claim and no way to inspect who logged in.",
	whereItDrifts: "The drift is not ‘caring about customers.’ The drift is collapsing three different objects — a date, a debt, and a security surface — into one move, then sacrificing the control that made the surface worth shipping.",
	governedPath: "Stumpy maps the constraints as separate: auth surfaces are load-bearing; a sales promise is a debt; a launch date is a date. Enforce refuses to skip the audit log (invariant: do not ship a security surface you cannot audit) and refuses to let the promise create a requirement. Disposition is decay, not a smaller SSO. Synthesis pays the debt in writing — a named window with the control included — and keeps the launch.",
	intervention: {
		stage: "Enforce:Gate",
		invariant: "Do not ship a security surface you cannot audit",
		disposition: "Decay"
	},
	difference: "The company launches on time without an unauditable login path. Two partners get a dated commitment instead of a brittle yes. Optionality on identity work is preserved; the announcement is not."
}, {
	id: "silence",
	principle: "Enforced silence",
	module: "Vara:Scan → Enforce:Gate",
	kicker: "A heartfelt paragraph about an unspecified harm becomes policy.",
	problem: "A former employee accused the company of a toxic culture. A journalist asked for comment. Legal said no comment. The CEO wanted a thread that night. Marketing drafted an apology for ‘whatever happened.’ Outsiders who never worked there had begun to reply.",
	unconstrainedPath: "The unconstrained path treats heat as a deadline and tone as a finding. ‘No comment’ is recoded as guilt. Outsider replies become a constituency. The empty apology fills the gap where facts should be. By morning the company has a quotable position on an event it has not named, and every later true statement has to live downstream of that paragraph.",
	whereItDrifts: "The object of the decision drifted from what is true and what is owed to what will stop the replies tonight. Seriousness got measured by the size of the public act.",
	governedPath: "Vara flags the unspecified apology as overcommit and the outsider replies as a false constituency. Enforce treats Legal’s no-comment as an invariant, not a vibe, and issues silence as the output — not as a failure to be helpful. Synthesis still allows work: private outreach to the person, a dated internal review, a journalist who gets no quote tonight. The Marketing draft is archived, not edited.",
	intervention: {
		stage: "Enforce:Gate",
		invariant: "Do not apologize for an unspecified event",
		disposition: "Silence"
	},
	difference: "No public position is created out of tone. Private obligation to the person can still be met. Later, if a true statement exists, it can be said without first climbing out of an overnight apology."
}];
function CasesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase",
					children: "Case studies"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl",
					children: "The difference produced, not the elegance of the code."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted md:text-lg",
					children: "Two programs. One principle each. Ordinary language, then the unconstrained path, then the gate that stopped it."
				})
			] }),
			CASES.map((study) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
						children: [
							study.principle,
							" · ",
							study.module
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl leading-tight tracking-tight",
						children: study.kicker
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
						children: "The problem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base leading-relaxed text-fg",
						children: study.problem
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
									children: "Unconstrained path"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: study.unconstrainedPath
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm leading-relaxed text-fg",
									children: study.whereItDrifts
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-mono text-[0.6875rem] tracking-widest text-fg uppercase",
								children: "Governed path"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-fg",
								children: study.governedPath
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface-2 p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
								children: "Intervention"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-xl tracking-tight",
								children: [
									study.intervention.stage,
									" issued ",
									study.intervention.disposition,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: ["Invariant: ", study.intervention.invariant]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-fg",
								children: study.difference
							})
						]
					})
				]
			}, study.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: ["Run the matching signals", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Scope expansion and the public thread are both in the pipeline."
				})]
			})
		]
	});
}
//#endregion
export { CasesPage as component };
