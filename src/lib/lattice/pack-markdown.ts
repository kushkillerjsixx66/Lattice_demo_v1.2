import {
  CORE_CONSTRAINTS,
  DECISION_TEMPLATE,
  DISPOSITIONS,
  MAXIM,
  OPERATOR_PROMPT,
  PACK_INTRO,
  PACK_VERSION,
  PACK_WORKED,
} from "./pack";

export function packMarkdown(): string {
  const constraints = CORE_CONSTRAINTS.map(
    (c) => `### ${c.id} — ${c.title}\n\n${c.body}`,
  ).join("\n\n");
  const dispositions = DISPOSITIONS.map(
    (d) => `**${d.title}.** ${d.body}`,
  ).join("\n\n");
  const worked = PACK_WORKED.map(
    (w) =>
      `**${w.title}**\n- Unconstrained: ${w.unconstrained}\n- Governed: ${w.governed}`,
  ).join("\n\n");

  return `# Lattice Operator Prompt Pack v${PACK_VERSION}

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
