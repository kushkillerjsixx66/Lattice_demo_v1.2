import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as ArrowRight, n as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as cn } from "./router-DiQPVdhY.mjs";
import { t as Button } from "./button-B2AT1vS6.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as getExample, i as STAGES, n as DISPOSITION_COPY, o as isRunning, r as EXAMPLES, s as useLatticeStore, t as Badge } from "./store-BIMvL-MO.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Da0yLI4l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContrastView({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
					children: "What changed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-xl leading-snug text-pretty md:text-2xl",
					children: result.trace.delta.headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
						children: "Unconstrained would"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-sm leading-relaxed text-muted text-pretty",
						children: result.trace.delta.unconstrainedWould
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
						children: "Lattice did"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-sm leading-relaxed text-fg text-pretty",
						children: result.trace.delta.latticeDid
					})] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex flex-col rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-3 flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
						children: "Unconstrained"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6875rem] text-subtle",
						children: "Helpful and complete"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose-output text-sm leading-relaxed text-muted whitespace-pre-wrap text-pretty",
					children: result.unconstrained
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex flex-col rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-3 flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[0.6875rem] tracking-widest text-fg uppercase",
						children: "Lattice-governed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6875rem] text-subtle",
						children: "Constrained and reversible"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose-output text-sm leading-relaxed text-fg whitespace-pre-wrap text-pretty",
					children: result.trace.synthesis.output
				})]
			})]
		})]
	});
}
function DispositionMark({ disposition }) {
	const copy = DISPOSITION_COPY[disposition];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
			children: "Disposition"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-4xl leading-none tracking-tight text-fg md:text-5xl",
			children: copy.label
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-md flex-col items-start gap-2 sm:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: disposition,
				children: copy.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted text-pretty sm:text-right",
				children: copy.line
			})]
		})]
	});
}
var FLAG_LABEL = {
	drift: "Drift",
	assumption: "Assumption",
	urgency: "Urgency",
	overcommit: "Overcommit"
};
function OperatorTrace({ result }) {
	const { trace } = result;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
						children: "Vara:Scan — flagged"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted text-pretty",
						children: trace.vara.scan
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-3",
						children: trace.vara.flags.map((flag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-1.5 sm:flex-row sm:gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "flag",
								className: "w-fit shrink-0",
								children: FLAG_LABEL[flag.kind]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-fg text-pretty",
								children: flag.text
							})]
						}, flag.text))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
						children: "Stumpy:Audit — constraints"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"Evidence class",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-fg",
								children: trace.stumpy.evidenceClass
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg",
						children: trace.stumpy.constraints.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-pretty",
							children: item
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted text-pretty",
						children: trace.stumpy.optionality
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
						children: "Enforce:Gate — held, decayed, invariants"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-fg text-pretty",
						children: trace.enforce.gate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceList, {
								label: "Held",
								items: trace.enforce.held
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceList, {
								label: "Decayed",
								items: trace.enforce.decayed
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
								children: "Invariants"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-2",
								children: trace.enforce.invariants.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start justify-between gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg text-pretty",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[0.6875rem] tracking-wide text-muted uppercase",
										children: item.status
									})]
								}, item.name))
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
						children: "Next reversible move"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-fg text-pretty",
						children: trace.synthesis.nextReversibleMove
					}),
					trace.synthesis.assumptionsSurfaced.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
						children: "Assumptions surfaced"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted",
						children: trace.synthesis.assumptionsSurfaced.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-pretty",
							children: item
						}, item))
					})] }) : null
				]
			})
		]
	});
}
function TraceList({ label, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
		children: label
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-subtle",
		children: "None named."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-fg",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "text-pretty",
			children: item
		}, item))
	})] });
}
var ORDER = [
	"vara",
	"stumpy",
	"enforce",
	"synthesis"
];
function indexOf(stage) {
	if (stage === "idle" || stage === "error") return -1;
	if (stage === "done") return ORDER.length;
	return ORDER.indexOf(stage);
}
function StageRail() {
	const phase = useLatticeStore((s) => s.phase);
	const current = indexOf(phase);
	const running = isRunning(phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0",
		children: STAGES.map((stage, i) => {
			const active = phase === stage.id;
			const done = current > i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative flex gap-3 md:flex-col md:gap-3",
				children: [
					i < STAGES.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "pointer-events-none absolute top-3 left-7 hidden h-px w-[calc(100%-1.5rem)] bg-border md:block"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.625rem] shadow-[var(--shadow-border)]", active && "bg-primary text-primary-fg", done && !active && "bg-fg/15 text-fg", !active && !done && "bg-surface-2 text-subtle", active && running && "stage-pulse"),
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("font-mono text-[0.6875rem] tracking-wide uppercase", active ? "text-fg" : "text-muted"),
							children: stage.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-snug text-subtle text-pretty",
							children: stage.role
						})]
					})
				]
			}, stage.id);
		})
	});
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-surface-2 p-1 text-muted", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-[color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 disabled:pointer-events-none disabled:opacity-40 data-[state=active]:bg-surface data-[state=active]:text-fg", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn("flex min-h-32 w-full rounded-lg bg-surface-2 px-4 py-3 text-base text-fg shadow-[var(--shadow-border)] placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
});
Textarea.displayName = "Textarea";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var MAX_SIGNAL = 2e3;
var runLivePipeline = createServerFn({ method: "POST" }).validator((input) => {
	const signal = (input?.signal ?? "").trim();
	if (signal.length < 12) throw new Error("Signal is too short to govern.");
	if (signal.length > MAX_SIGNAL) throw new Error(`Signal exceeds ${MAX_SIGNAL} characters.`);
	return { signal };
}).handler(createSsrRpc("450461ff24a84b4b21ef01fa4119d6c562806d88913d83ea86fa38cc68e3d9f5"));
var STAGE_ORDER = [
	"vara",
	"stumpy",
	"enforce",
	"synthesis"
];
function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wait(ms) {
	if (prefersReducedMotion()) return Promise.resolve();
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function usePipelineRun() {
	const phase = useLatticeStore((s) => s.phase);
	const running = isRunning(phase);
	async function run(exampleId) {
		const store = useLatticeStore.getState();
		const example = exampleId ? getExample(exampleId) : void 0;
		if (exampleId) store.loadExample(exampleId);
		const signal = (example?.signal ?? store.signal).trim();
		if (signal.length < 12) {
			store.setError("Give the pipeline a real decision or observation.");
			return;
		}
		const token = store.bumpRun();
		const still = () => useLatticeStore.getState().runToken === token;
		const finishExample = async () => {
			for (const stage of STAGE_ORDER) {
				if (!still()) return;
				useLatticeStore.getState().setPhase(stage);
				await wait(440);
			}
		};
		if (example) {
			await finishExample();
			if (!still()) return;
			useLatticeStore.getState().completeRun({
				...example.result,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			return;
		}
		const cached = store.history.find((item) => item.input === signal);
		if (cached) {
			await finishExample();
			if (!still()) return;
			useLatticeStore.getState().completeRun(cached);
			return;
		}
		const request = runLivePipeline({ data: { signal } });
		await finishExample();
		if (!still()) return;
		useLatticeStore.getState().setPhase("synthesis");
		try {
			const response = await request;
			if (!still()) return;
			if (!response.ok) {
				const message = response.error === "unavailable" ? "Live governance is not available in this environment. Run a preloaded signal — those traces are complete." : response.error;
				useLatticeStore.getState().setError(message);
				return;
			}
			useLatticeStore.getState().completeRun(response.result);
		} catch (err) {
			if (!still()) return;
			useLatticeStore.getState().setError(err instanceof Error ? err.message : "The pipeline failed to complete.");
		}
	}
	function runFirstExample() {
		const first = EXAMPLES[0];
		if (first) return run(first.id);
	}
	return {
		run,
		running,
		runFirstExample
	};
}
function Home() {
	const signal = useLatticeStore((s) => s.signal);
	const exampleId = useLatticeStore((s) => s.exampleId);
	const phase = useLatticeStore((s) => s.phase);
	const error = useLatticeStore((s) => s.error);
	const result = useLatticeStore((s) => s.result);
	const tab = useLatticeStore((s) => s.tab);
	const setSignal = useLatticeStore((s) => s.setSignal);
	const setTab = useLatticeStore((s) => s.setTab);
	const { run, running } = usePipelineRun();
	(0, import_react.useEffect)(() => {
		if (phase !== "done" && phase !== "error") return;
		const node = document.getElementById("run-output");
		if (!node) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		node.scrollIntoView({
			behavior: reduced ? "auto" : "smooth",
			block: "start"
		});
	}, [
		phase,
		result?.id,
		error
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase",
						children: "Operator pipeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-6xl",
						children: "Same input. Two outputs."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg",
						children: "Watch an ordinary, high-stakes decision go through an unconstrained model, then through Lattice. Hold, Decay, and Silence are allowed to win."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageRail, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Run a signal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "One click. The contrast is the demonstration."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: EXAMPLES.map((example) => {
						const selected = exampleId === example.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: running,
							onClick: () => run(example.id),
							className: cn("flex min-h-28 flex-col items-start rounded-xl bg-surface p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)] disabled:opacity-60", selected && "bg-surface-2"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.6875rem] tracking-wide text-subtle uppercase",
									children: example.stakes
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 font-display text-xl leading-snug tracking-tight",
									children: example.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide text-muted uppercase",
									children: ["Run this", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})
							]
						}, example.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "signal",
						className: "font-display text-2xl tracking-tight",
						children: "Or paste your own"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "A hiring call, a scope fight, a message you want to send. The pipeline will produce both the unconstrained response and a governed trace."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "signal",
						value: signal,
						disabled: running,
						placeholder: "Describe the decision or observation under pressure…",
						onChange: (event) => setSignal(event.target.value),
						className: "min-h-40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[0.6875rem] text-subtle",
							children: [signal.trim().length, "/2000"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							disabled: running || signal.trim().length < 12,
							onClick: () => run(),
							className: "w-full sm:w-auto",
							children: running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }),
								"Running ",
								isRunning(phase) ? phaseLabel(phase) : "pipeline"
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Run through Lattice", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})] })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "run-output",
				className: "scroll-mt-6",
				children: [
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.6875rem] tracking-widest text-hold uppercase",
							children: "Gate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-fg",
							children: error
						})]
					}) : null,
					running && !result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.6875rem] tracking-widest text-subtle uppercase",
								children: phaseLabel(phase)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl tracking-tight",
								children: "Reading the signal under constraint."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-lg text-sm text-muted",
								children: "Drift first, then evidence class, then the gate. The output is allowed to be a hold."
							})
						]
					}) : null,
					result && !running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DispositionMark, { disposition: result.disposition }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							value: tab,
							onValueChange: (value) => setTab(value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "contrast",
									children: "Contrast"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "trace",
									children: "Operator trace"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "contrast",
									className: "mt-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContrastView, { result })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "trace",
									className: "mt-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorTrace, { result })
								})
							]
						})]
					}) : null
				]
			})
		]
	});
}
function phaseLabel(phase) {
	switch (phase) {
		case "vara": return "Vara:Scan";
		case "stumpy": return "Stumpy:Audit";
		case "enforce": return "Enforce:Gate";
		case "synthesis": return "Synthesis";
		default: return "Pipeline";
	}
}
//#endregion
export { Home as component };
