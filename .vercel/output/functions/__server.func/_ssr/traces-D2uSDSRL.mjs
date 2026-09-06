import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2AT1vS6.mjs";
import { n as DISPOSITION_COPY, s as useLatticeStore, t as Badge } from "./store-BIMvL-MO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/traces-D2uSDSRL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TracesPage() {
	const history = useLatticeStore((s) => s.history);
	const openTrace = useLatticeStore((s) => s.openTrace);
	const navigate = useNavigate();
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase",
				children: "Operator traces"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl",
				children: "Decision logs, kept on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base leading-relaxed text-muted md:text-lg",
				children: "Every completed run is stored locally. Open one to see the moment drift was named, the hold that was issued, the next reversible move."
			})
		] }), !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-xl bg-surface shadow-[var(--shadow-border)]" }) : history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-tight",
					children: "No traces yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-md text-sm leading-relaxed text-muted",
					children: "Run a preloaded signal on the pipeline. The operator trace lands here after the gate closes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: ["Open the pipeline", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-3",
			children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					openTrace(item.id);
					navigate({ to: "/" });
				},
				className: "flex w-full flex-col gap-3 rounded-xl bg-surface p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)] sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl tracking-tight",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm leading-relaxed text-muted",
							children: item.trace.delta.headline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-mono text-[0.6875rem] text-subtle",
							children: [
								item.source === "example" ? "Preloaded" : "Live",
								" ·",
								" ",
								formatWhen(item.createdAt)
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: item.disposition,
					className: "w-fit shrink-0",
					children: DISPOSITION_COPY[item.disposition].label
				})]
			}) }, item.id))
		})]
	});
}
function formatWhen(value) {
	if (value === "authored") return "Authored trace";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Unknown time";
	return date.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
//#endregion
export { TracesPage as component };
