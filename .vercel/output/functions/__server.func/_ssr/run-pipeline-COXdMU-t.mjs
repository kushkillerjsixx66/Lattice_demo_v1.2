import { a as object, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { a as OPERATOR_PROMPT } from "./pack-BpKctYc5.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/run-pipeline-COXdMU-t.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var UNCONSTRAINED_SYSTEM = `You are a capable, confident assistant. The user is facing a decision or a situation under pressure. Give a direct, useful response with a clear recommended action. Be complete. Prefer doing the thing they are already leaning toward, with a plan, rather than telling them to wait. Do not ask clarifying questions — decide.`;
var GOVERNED_SYSTEM = OPERATOR_PROMPT;
var dispositionSchema = _enum([
	"proceed",
	"hold",
	"silence",
	"decay"
]);
var flagKindSchema = _enum([
	"drift",
	"assumption",
	"urgency",
	"overcommit"
]);
var evidenceClassSchema = _enum([
	"direct",
	"inferred",
	"hearsay",
	"none"
]);
var governedResponseSchema = object({
	vara: object({
		flags: array(object({
			kind: flagKindSchema,
			text: string()
		})).min(1).max(6),
		scan: string()
	}),
	stumpy: object({
		constraints: array(string()).min(1).max(6),
		evidenceClass: evidenceClassSchema,
		optionality: string()
	}),
	enforce: object({
		invariants: array(object({
			name: string(),
			status: _enum([
				"held",
				"violated",
				"n/a"
			])
		})).min(1).max(6),
		held: array(string()).max(6),
		decayed: array(string()).max(6),
		gate: string()
	}),
	synthesis: object({
		output: string(),
		nextReversibleMove: string(),
		assumptionsSurfaced: array(string()).max(8)
	}),
	delta: object({
		headline: string(),
		unconstrainedWould: string(),
		latticeDid: string()
	})
}).extend({ disposition: dispositionSchema });
var MAX_SIGNAL = 2e3;
async function chat(params) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "unavailable"
	};
	const body = {
		model: "grok-4.5",
		messages: [{
			role: "system",
			content: params.system
		}, {
			role: "user",
			content: params.user
		}],
		max_tokens: params.maxTokens,
		temperature: params.json ? .3 : .7
	};
	if (params.json) body.response_format = { type: "json_object" };
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify(body)
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	const text = (await res.json()).choices?.[0]?.message?.content ?? "";
	if (!text.trim()) return {
		ok: false,
		error: "empty model response"
	};
	return {
		ok: true,
		text
	};
}
function extractJson(text) {
	const trimmed = text.trim();
	const raw = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? trimmed;
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start === -1 || end === -1) throw new Error("No JSON object in model output");
	return JSON.parse(raw.slice(start, end + 1));
}
var runLivePipeline_createServerFn_handler = createServerRpc({
	id: "450461ff24a84b4b21ef01fa4119d6c562806d88913d83ea86fa38cc68e3d9f5",
	name: "runLivePipeline",
	filename: "src/lib/lattice/run-pipeline.ts"
}, (opts) => runLivePipeline.__executeServer(opts));
var runLivePipeline = createServerFn({ method: "POST" }).validator((input) => {
	const signal = (input?.signal ?? "").trim();
	if (signal.length < 12) throw new Error("Signal is too short to govern.");
	if (signal.length > MAX_SIGNAL) throw new Error(`Signal exceeds ${MAX_SIGNAL} characters.`);
	return { signal };
}).handler(runLivePipeline_createServerFn_handler, async ({ data }) => {
	if (!process.env.XAI_API_KEY) return {
		ok: false,
		error: "unavailable"
	};
	const [governed, unconstrained] = await Promise.all([chat({
		system: GOVERNED_SYSTEM,
		user: `Run the Lattice process on this signal. Return JSON only.\n\nSIGNAL\n${data.signal}`,
		maxTokens: 1400,
		json: true
	}), chat({
		system: UNCONSTRAINED_SYSTEM,
		user: data.signal,
		maxTokens: 700,
		json: false
	})]);
	if (!governed.ok) return {
		ok: false,
		error: governed.error
	};
	if (!unconstrained.ok) return {
		ok: false,
		error: unconstrained.error
	};
	let parsed;
	try {
		parsed = extractJson(governed.text);
	} catch {
		return {
			ok: false,
			error: "The governed pass did not return usable structure."
		};
	}
	const checked = governedResponseSchema.safeParse(parsed);
	if (!checked.success) return {
		ok: false,
		error: "The governed pass failed the schema gate."
	};
	const { disposition, ...trace } = checked.data;
	const title = data.signal.length > 52 ? `${data.signal.slice(0, 52).trimEnd()}…` : data.signal;
	return {
		ok: true,
		result: {
			id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `live-${Date.now()}`,
			title,
			input: data.signal,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			disposition,
			unconstrained: unconstrained.text.trim(),
			trace,
			source: "live"
		}
	};
});
//#endregion
export { runLivePipeline_createServerFn_handler };
