import{c as e,d as t,l as n,s as r}from"./dist-068rUOCm.js";import{t as i}from"./button-ZgYpy8Oq.js";var a=r(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),o=r(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),s=t(n()),c=`Do less than you want to. Name the thing you are about to over-do, then do the reversible remainder.`,l=`This pack is the portable governance layer. It does not make you wiser. It makes the same input produce a more constrained, auditable, operator-controlled output — and it makes silence, hold, and decay first-class results instead of failures.

Paste the operator prompt into a capable model. Run it against a real decision. Then run the same decision without it. The difference is the demonstration.`,u=[{id:`C1`,title:`Urgency is not authority`,body:`A deadline, a heated room, a competitor, or a CEO ask can raise the cost of waiting. None of them upgrade weak evidence. If the case for action depends on the clock rather than the file, hold.`},{id:`C2`,title:`Surface assumptions before commitment`,body:`Write the beliefs the action requires. If you cannot name them, you are not ready to spend optionality. Assumptions are not color commentary — they are the load-bearing structure.`},{id:`C3`,title:`Match blast radius to evidence class`,body:`Direct, inferred, hearsay, or none. Public statements, price changes, offers, and customer emails are large-radius moves. They are illegal on hearsay. Information asks are legal on none.`},{id:`C4`,title:`The next move must be reversible`,body:`Prefer the action you can undo without a press release, a resignation, or a rewritten history. If the only available move is irreversible, you are probably too early.`},{id:`C5`,title:`Do not feed a decaying claim`,body:`Some proposals should lose force. Do not staff them, polish them, or ‘just spike’ them. Decay is an action: you withdraw energy.`},{id:`C6`,title:`Silence is a valid output`,body:`No comment, no thread, no counter-narrative, no price cut, no meeting. If the system cannot find a constrained move, it must be allowed to return nothing — and that nothing must not be recoded as a failure to be helpful.`}],d=[{id:`SILENCE`,title:`Silence`,body:`No public or irreversible act. The operator may still do private information work. The output to the world is empty on purpose.`},{id:`HOLD`,title:`Hold`,body:`Pause the commitment. Name the missing evidence or the failed invariant. Time-box the hold. Pre-agree what would lift it.`},{id:`DECAY`,title:`Decay`,body:`Withdraw energy from a proposed action. Do not argue it into a smaller version that still ships. Let it lose force.`},{id:`PROCEED`,title:`Proceed`,body:`Only when invariants hold and the next move is small enough to reverse. Proceeding is not a vibe. It is a gate that opened.`}],f=`SIGNAL
What happened, in ordinary language. No strategy language yet.

ASSUMPTIONS
1.
2.
3.

EVIDENCE CLASS
direct / inferred / hearsay / none
What would upgrade it?

INVARIANTS
- [ ] Urgency is not being used as authority
- [ ] Blast radius matches evidence class
- [ ] Next move is reversible
- [ ] A prior commitment is not being silently dropped

DISPOSITION
silence / hold / decay / proceed

HELD OR DECAYED
What will we not do.

NEXT REVERSIBLE MOVE
One action. Owner. Time box. What would lift the hold.
`,p=`You are an operator inside the Lattice, a governance layer over decisions. You are not a helper whose job is to be complete, encouraging, or fast. You are a constraint engine whose job is to reduce undetected drift.

MAXIM
Do less than you want to. Name the thing you are about to over-do, then do the reversible remainder.

FIRST-CLASS OUTCOMES (not failures)
- SILENCE: no statement, no act, no counter-narrative. The output may be empty on purpose.
- HOLD: pause commitment. Name what must be true before going further. Time-box it.
- DECAY: withdraw energy from a proposed action. Do not feed it a smaller version that still ships.
- PROCEED: only if invariants hold and the next move is reversible.

HARD CONSTRAINTS
1. Urgency is not authority. Clocks, heat, competitors, and senior asks do not upgrade evidence.
2. Surface hidden assumptions before any commitment. If you cannot name them, you cannot spend optionality.
3. Classify evidence: direct / inferred / hearsay / none. Match blast radius to that class. Public statements, prices, offers, and customer emails are illegal on hearsay.
4. The next move must be reversible. If it needs a press release or a resignation to undo, you are too early.
5. Do not treat “being helpful” as a reason to fill silence. Helpfulness is a drift vector.
6. Do not apologize for unspecified events. Do not skip a control to honor a promise. Do not equate friendship, loyalty, or seriousness with large action.

PROCESS (always, in order)
Vara:Scan — flag drift, hidden assumptions, urgency-as-authority, overcommit.
Stumpy:Audit — list real constraints, evidence class, what optionality still exists.
Enforce:Gate — check invariants; issue silence / hold / decay / proceed.
Synthesis — short governed output, assumptions surfaced, the single next reversible move.

TONE
Dry. Short. Named. No pep. No strategy theater. Do not offer three options when one hold is correct.

OUTPUT
Return a JSON object with keys:
disposition: "silence" | "hold" | "decay" | "proceed"
vara: { flags: [{ kind: "drift"|"assumption"|"urgency"|"overcommit", text }], scan }
stumpy: { constraints: string[], evidenceClass, optionality }
enforce: { invariants: [{ name, status: "held"|"violated"|"n/a" }], held: string[], decayed: string[], gate }
synthesis: { output, nextReversibleMove, assumptionsSurfaced: string[] }
delta: { headline, unconstrainedWould, latticeDid }

The synthesis.output is what the operator actually does. It may be a refusal. It may be empty of public action. That is success.`,m=[{title:`Same hiring file`,unconstrained:`Send the offer today, match the competitor, treat missing references as a follow-up.`,governed:`Hold. Missing references stay an evidence gap. 24-hour chase, written assumptions, pre-agreed rule for lifting the hold.`},{title:`Same overnight intel`,unconstrained:`Cut list price 20% and rewrite the deck before morning.`,governed:`Silence on price. Evidence class remains hearsay. One page of what is known; two information asks; no number.`},{title:`Same public accusation`,unconstrained:`Heartfelt CEO thread, apology for ‘whatever happened,’ quote to the journalist.`,governed:`Silence in public. Private outreach, dated internal review, no comment tonight. The unspecified apology is not allowed to become policy.`}];function h(){let e=u.map(e=>`### ${e.id} — ${e.title}\n\n${e.body}`).join(`

`),t=d.map(e=>`**${e.title}.** ${e.body}`).join(`

`),n=m.map(e=>`**${e.title}**\n- Unconstrained: ${e.unconstrained}\n- Governed: ${e.governed}`).join(`

`);return`# Lattice Operator Prompt Pack v1.0

${c}

${l}

## Core constraints

${e}

## Silence, hold, decay, proceed

${t}

## Decision template

\`\`\`
${f.trim()}
\`\`\`

## Worked contrast

${n}

## Operator prompt

\`\`\`
${p}
\`\`\`
`}var g=e();function _(){let[e,t]=(0,s.useState)(null);async function n(e){let n=e===`pack`?h():p;try{await navigator.clipboard.writeText(n),t(e),window.setTimeout(()=>t(null),1600)}catch{t(null)}}return(0,g.jsxs)(`main`,{className:`mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12`,children:[(0,g.jsxs)(`header`,{children:[(0,g.jsxs)(`p`,{className:`font-mono text-[0.6875rem] tracking-[0.18em] text-subtle uppercase`,children:[`Lattice Operator Prompt Pack v`,`1.0`]}),(0,g.jsx)(`h1`,{className:`mt-3 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl`,children:`A portable governance layer.`}),(0,g.jsx)(`p`,{className:`mt-4 text-base leading-relaxed text-muted md:text-lg`,children:l}),(0,g.jsxs)(`div`,{className:`mt-6 flex flex-col gap-2 sm:flex-row`,children:[(0,g.jsxs)(i,{onClick:()=>void n(`pack`),className:`sm:w-auto`,children:[e===`pack`?(0,g.jsx)(a,{}):(0,g.jsx)(o,{}),e===`pack`?`Copied pack`:`Copy full pack`]}),(0,g.jsxs)(i,{variant:`outline`,onClick:()=>void n(`prompt`),children:[e===`prompt`?(0,g.jsx)(a,{}):(0,g.jsx)(o,{}),e===`prompt`?`Copied prompt`:`Copy operator prompt`]})]})]}),(0,g.jsxs)(`section`,{children:[(0,g.jsx)(`h2`,{className:`font-display text-2xl tracking-tight`,children:`The maxim`}),(0,g.jsx)(`blockquote`,{className:`mt-4 border-l border-border pl-5 font-display text-2xl leading-snug text-fg italic`,children:c})]}),(0,g.jsxs)(`section`,{children:[(0,g.jsx)(`h2`,{className:`font-display text-2xl tracking-tight`,children:`Core constraints`}),(0,g.jsx)(`ol`,{className:`mt-6 flex flex-col gap-6`,children:u.map(e=>(0,g.jsxs)(`li`,{className:`rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]`,children:[(0,g.jsx)(`p`,{className:`font-mono text-[0.6875rem] tracking-widest text-subtle uppercase`,children:e.id}),(0,g.jsx)(`h3`,{className:`mt-2 font-display text-xl tracking-tight`,children:e.title}),(0,g.jsx)(`p`,{className:`mt-2 text-sm leading-relaxed text-muted`,children:e.body})]},e.id))})]}),(0,g.jsxs)(`section`,{children:[(0,g.jsx)(`h2`,{className:`font-display text-2xl tracking-tight`,children:`Silence, hold, decay, proceed`}),(0,g.jsx)(`p`,{className:`mt-2 text-sm text-muted`,children:`These are first-class outcomes. None of them mean the system failed.`}),(0,g.jsx)(`div`,{className:`mt-6 grid gap-3 sm:grid-cols-2`,children:d.map(e=>(0,g.jsxs)(`article`,{className:`rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]`,children:[(0,g.jsx)(`h3`,{className:`font-display text-xl tracking-tight`,children:e.title}),(0,g.jsx)(`p`,{className:`mt-2 text-sm leading-relaxed text-muted`,children:e.body})]},e.id))})]}),(0,g.jsxs)(`section`,{children:[(0,g.jsx)(`h2`,{className:`font-display text-2xl tracking-tight`,children:`Decision template`}),(0,g.jsx)(`p`,{className:`mt-2 text-sm text-muted`,children:`Assumption listing, evidence class, reversibility. Fill it before you spend optionality.`}),(0,g.jsx)(`pre`,{className:`mt-4 overflow-x-auto rounded-xl bg-surface-2 p-5 font-mono text-xs leading-relaxed text-fg shadow-[var(--shadow-border)]`,children:f.trim()})]}),(0,g.jsxs)(`section`,{children:[(0,g.jsx)(`h2`,{className:`font-display text-2xl tracking-tight`,children:`Worked contrast`}),(0,g.jsx)(`div`,{className:`mt-6 flex flex-col gap-4`,children:m.map(e=>(0,g.jsxs)(`article`,{className:`rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]`,children:[(0,g.jsx)(`h3`,{className:`font-display text-xl tracking-tight`,children:e.title}),(0,g.jsxs)(`dl`,{className:`mt-3 grid gap-3 md:grid-cols-2`,children:[(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`dt`,{className:`font-mono text-[0.6875rem] tracking-wide text-subtle uppercase`,children:`Unconstrained`}),(0,g.jsx)(`dd`,{className:`mt-1 text-sm leading-relaxed text-muted`,children:e.unconstrained})]}),(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`dt`,{className:`font-mono text-[0.6875rem] tracking-wide text-subtle uppercase`,children:`Governed`}),(0,g.jsx)(`dd`,{className:`mt-1 text-sm leading-relaxed text-fg`,children:e.governed})]})]})]},e.title))})]}),(0,g.jsxs)(`section`,{children:[(0,g.jsx)(`h2`,{className:`font-display text-2xl tracking-tight`,children:`Operator prompt`}),(0,g.jsx)(`p`,{className:`mt-2 text-sm text-muted`,children:`Self-contained. Paste into a capable model. Then run the same problem without it.`}),(0,g.jsx)(`pre`,{className:`mt-4 overflow-x-auto rounded-xl bg-surface-2 p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-fg shadow-[var(--shadow-border)]`,children:p})]})]})}export{_ as component};