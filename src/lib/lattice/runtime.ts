import { createGovernanceEnvelope, type GovernanceEnvelope } from "./envelope";
import { planner, type RuntimeEvent } from "./agents";
import { appendTrace, createTrace, type GovernanceTrace } from "./governance";
import { createMutationEnvelope, type MutationEnvelope } from "./mutation";
import { runGovernedStateMachine, type Scenario } from "./governed-state-machine";
import { veil } from "./veil";
import { vara } from "./vara";

export type GovernedRun = {
  envelope: GovernanceEnvelope;
  plan: ReturnType<typeof planner.plan>;
  trace: GovernanceTrace;
  mutation?: MutationEnvelope;
  scenario?: Scenario;
};

export function runGovernedMutation(intent: string, scenario: Scenario = "clean"): GovernedRun {
  const envelope = createGovernanceEnvelope(intent);
  let trace = createTrace(envelope);
  const plan = planner.plan(envelope, intent);
  const branch = scenario === "boundary" ? "main" : "chatgpt";

  const add = (state: GovernanceTrace["entries"][number]["state"], actor: RuntimeEvent["actor"], message: string, witness?: GovernanceTrace["entries"][number]["witness"]) => {
    trace = appendTrace(trace, {
      state,
      actor,
      event: { event_id: `EVT-${trace.entries.length + 1}`, actor, message, branch },
      witness,
    });
  };

  add("COHERENT", "planner", `Plan created for: ${intent}`);

  const intake = veil.intake(envelope, branch);
  add(intake.state, "executor", intake.reason);
  if (!intake.accepted) return { envelope, plan, trace, scenario };

  const interpretation = vara.interpret(envelope, intent, scenario);
  add(interpretation.state, "vara", interpretation.reason);

  const stateMachine = runGovernedStateMachine(scenario);
  for (const transition of stateMachine.transitions) {
    const witness = {
      state: transition.to,
      invariant_results: stateMachine.invariant_results,
      authority_result: stateMachine.invariant_results.authority_hierarchy === "HELD" ? "HELD" as const : "VIOLATED" as const,
      reversibility_result: stateMachine.invariant_results.reversibility === "HELD" ? "HELD" as const : "VIOLATED" as const,
      disposition: stateMachine.disposition,
    };
    add(transition.to, transition.actor, transition.reason, witness);
  }

  if (scenario === "clean") {
    return {
      envelope,
      plan,
      trace,
      scenario,
      mutation: createMutationEnvelope({
        branch: "chatgpt",
        actor: "model",
        path: "04_system_spec/mutation_routing/MUTATION_ROUTING_SPEC.md",
        operation: "update",
        summary: intent,
        state: stateMachine.state,
        disposition: stateMachine.disposition,
        reversible: true,
      }),
    };
  }

  return { envelope, plan, trace, scenario };
}
