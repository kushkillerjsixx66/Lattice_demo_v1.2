import { createGovernanceEnvelope, type GovernanceEnvelope } from "./envelope";
import { planner, type RuntimeEvent } from "./agents";
import { appendTrace, createTrace, type GovernanceTrace } from "./governance";
import { createMutationEnvelope, type MutationEnvelope } from "./mutation";
import { runGovernedStateMachine, type Scenario } from "./governed-state-machine";
import { stumpy, type StumpyAudit } from "./stumpy";
import { veil } from "./veil";
import { vara } from "./vara";

export type GovernedRun = {
  envelope: GovernanceEnvelope;
  plan: ReturnType<typeof planner.plan>;
  trace: GovernanceTrace;
  mutation?: MutationEnvelope;
  stumpy?: StumpyAudit;
  scenario?: Scenario;
};

export function runGovernedMutation(intent: string, scenario: Scenario = "clean"): GovernedRun {
  const envelope = createGovernanceEnvelope(intent);
  let trace = createTrace(envelope);
  const plan = planner.plan(envelope, intent);
  const branch = scenario === "boundary" ? "main" : "chatgpt";

  const add = (
    state: GovernanceTrace["entries"][number]["state"],
    actor: RuntimeEvent["actor"],
    message: string,
  ) => {
    trace = appendTrace(trace, {
      state,
      actor,
      event: {
        event_id: `EVT-${trace.entries.length + 1}`,
        actor,
        message,
        branch,
      },
    });
  };

  add("COHERENT", "planner", `Plan created for: ${intent}`);

  const intake = veil.intake(envelope, branch);
  add(intake.state, "executor", intake.reason);

  const interpretation = vara.interpret(envelope, intent, scenario);
  add(interpretation.state, "vara", interpretation.reason);

  // The state machine supplies transition policy only. It does not produce
  // Stumpy's audit result. Stumpy independently evaluates the evidence.
  const stateMachine = runGovernedStateMachine(scenario);
  for (const transition of stateMachine.transitions) {
    add(transition.to, transition.actor, transition.reason);
  }

  const audit = stumpy.audit(envelope, plan, trace, interpretation, branch);
  add(audit.state, "stumpy", audit.blocking_condition ?? audit.observations[0] ?? "Stumpy audit complete.");

  if (!intake.accepted || audit.disposition !== "ELIGIBLE") {
    return { envelope, plan, trace, stumpy: audit, scenario };
  }

  const mutation = createMutationEnvelope({
    branch: "chatgpt",
    actor: "model",
    path: "04_system_spec/mutation_routing/MUTATION_ROUTING_SPEC.md",
    operation: "update",
    summary: intent,
    state: audit.state,
    disposition: audit.disposition,
    reversible: audit.reversibility_result === "HELD",
  });

  return { envelope, plan, trace, stumpy: audit, scenario, mutation };
}
