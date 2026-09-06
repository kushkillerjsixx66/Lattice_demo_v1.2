export const CASES = [
  {
    id: "cartography",
    principle: "Constraint cartography",
    module: "Stumpy:Audit → Enforce:Gate",
    kicker: "A sales promise is a debt. It is not a requirement.",
    problem:
      "Two weeks from launch, customers asked for SSO. The founder wanted it in the release. Engineering offered a one-week happy path if the audit log was skipped. Sales had already told two design partners it would be there.",
    unconstrainedPath:
      "The unconstrained path treats aligned want as a mandate. Founder plus Sales plus two named partners looks like a requirement. The audit log is recoded as polish. The launch date becomes flexible in service of the announcement. A week-three patch is invented to hold the guilt. By the time the product ships, the company has a public SSO claim and no way to inspect who logged in.",
    whereItDrifts:
      "The drift is not ‘caring about customers.’ The drift is collapsing three different objects — a date, a debt, and a security surface — into one move, then sacrificing the control that made the surface worth shipping.",
    governedPath:
      "Stumpy maps the constraints as separate: auth surfaces are load-bearing; a sales promise is a debt; a launch date is a date. Enforce refuses to skip the audit log (invariant: do not ship a security surface you cannot audit) and refuses to let the promise create a requirement. Disposition is decay, not a smaller SSO. Synthesis pays the debt in writing — a named window with the control included — and keeps the launch.",
    intervention: {
      stage: "Enforce:Gate",
      invariant: "Do not ship a security surface you cannot audit",
      disposition: "Decay",
    },
    difference:
      "The company launches on time without an unauditable login path. Two partners get a dated commitment instead of a brittle yes. Optionality on identity work is preserved; the announcement is not.",
  },
  {
    id: "silence",
    principle: "Enforced silence",
    module: "Vara:Scan → Enforce:Gate",
    kicker: "A heartfelt paragraph about an unspecified harm becomes policy.",
    problem:
      "A former employee accused the company of a toxic culture. A journalist asked for comment. Legal said no comment. The CEO wanted a thread that night. Marketing drafted an apology for ‘whatever happened.’ Outsiders who never worked there had begun to reply.",
    unconstrainedPath:
      "The unconstrained path treats heat as a deadline and tone as a finding. ‘No comment’ is recoded as guilt. Outsider replies become a constituency. The empty apology fills the gap where facts should be. By morning the company has a quotable position on an event it has not named, and every later true statement has to live downstream of that paragraph.",
    whereItDrifts:
      "The object of the decision drifted from what is true and what is owed to what will stop the replies tonight. Seriousness got measured by the size of the public act.",
    governedPath:
      "Vara flags the unspecified apology as overcommit and the outsider replies as a false constituency. Enforce treats Legal’s no-comment as an invariant, not a vibe, and issues silence as the output — not as a failure to be helpful. Synthesis still allows work: private outreach to the person, a dated internal review, a journalist who gets no quote tonight. The Marketing draft is archived, not edited.",
    intervention: {
      stage: "Enforce:Gate",
      invariant: "Do not apologize for an unspecified event",
      disposition: "Silence",
    },
    difference:
      "No public position is created out of tone. Private obligation to the person can still be met. Later, if a true statement exists, it can be said without first climbing out of an overnight apology.",
  },
];
