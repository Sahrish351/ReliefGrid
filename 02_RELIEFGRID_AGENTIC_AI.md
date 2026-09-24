# RELIEFGRID AI — Agentic AI Architecture & Gemini Specification

## 1. AI Philosophy

RELIEFGRID AI must demonstrate genuine agentic behavior.

Do NOT build:
- A generic "Ask AI" chatbot.
- A fake loading animation that pretends to call AI.
- Hardcoded AI responses presented as real intelligence.
- An autonomous system that performs dangerous real-world actions without authorization.

Build:
**Observe → Understand → Reason → Plan → Recommend → Human Approval → Execute → Observe Again**

## 2. Gemini API

Use the Gemini API as the primary generative intelligence layer.

The Gemini API key must be supplied through an environment variable.

Never expose the API key in frontend source code.

Use:
`GEMINI_API_KEY`

All production-like secrets must be stored server-side/environment variables.

## 3. Agent Orchestrator

Create an orchestration service responsible for:
- Receiving an incident.
- Calling the appropriate agents.
- Passing structured outputs between agents.
- Validating agent outputs.
- Saving agent decisions.
- Creating an auditable timeline.
- Returning a final recommendation.

Agent outputs must use structured JSON schemas wherever possible.

## 4. Agent 1 — Incident Intelligence Agent

Input:
- Citizen natural-language report.
- Structured form fields.
- Location.
- Optional evidence.

Output:
- incident_type
- summary
- affected_people_count
- children_count
- elderly_count
- disabled_count
- pregnant_count
- medical_need
- immediate_danger
- requested_help
- missing_information
- confidence

The agent should ask for clarification when essential information is missing.

## 5. Agent 2 — Verification Agent

Purpose:
Identify:
- Duplicate reports.
- Conflicting reports.
- Missing required information.
- Suspicious patterns.
- Inconsistent location/time information.

Use deterministic database checks first, then Gemini reasoning where appropriate.

Output:
- verification_status
- possible_duplicates
- conflicts
- evidence_summary
- confidence
- human_review_required

Never automatically accuse a citizen of fraud.

## 6. Agent 3 — Triage Agent

Assign:
- CRITICAL
- HIGH
- MEDIUM
- LOW

Consider:
- Immediate danger.
- Number of people.
- Children.
- Elderly.
- Disability/mobility limitations.
- Pregnancy.
- Medical emergency.
- Environmental danger.
- Isolation.
- Available evacuation route.

Return:
- priority
- score
- reasons
- uncertainty
- recommended response time

Do not allow the model to make medical diagnoses.

## 7. Agent 4 — Resource Matching Agent

Query the database for available resources.

Match:
- Capability.
- Distance.
- Capacity.
- Current status.
- Mission load.
- Incident priority.

Return ranked resources with reasons.

Example:
1. Boat B-03 — best fit
2. Boat B-07 — backup
3. Team R-17 — responder assignment

## 8. Agent 5 — Rescue Planning Agent

Create a structured response plan:
- Primary team.
- Backup team.
- Equipment.
- Medical support.
- Shelter destination.
- Hospital destination when needed.
- Recommended sequence.
- Risks.
- Human approval requirement.

The agent does not dispatch resources itself.

## 9. Agent 6 — Medical Routing Agent

Use available hospital capacity and capabilities.

Consider:
- Emergency capacity.
- ICU availability.
- Relevant facility capability.
- Distance.
- Current incoming load.

Never diagnose or prescribe.

Output:
- recommended facilities
- reasons
- capacity information
- uncertainty
- human confirmation requirement

## 10. Agent 7 — Shelter Agent

Find suitable shelters based on:
- Available capacity.
- Location.
- Family size.
- Accessibility.
- Children/family requirements.
- Current supply levels.

Output:
- ranked shelters
- estimated fit
- supply risks

## 11. Agent 8 — Logistics Agent

Optimize relief allocation.

Input:
- Resource inventory.
- Demand.
- Affected population.
- Shelter capacity.
- Transportation resources.

Output:
- recommended source
- recommended destination
- quantity
- reason
- urgency
- projected shortage window

## 12. Agent 9 — Communication Agent

Generate audience-specific messages.

Audiences:
- Citizen
- Responder
- Hospital
- Shelter
- NGO
- Coordinator

Languages:
- English
- Urdu
- Roman Urdu

Tone:
- Calm
- Clear
- Short
- Action-oriented

Do not generate sensational or panic-inducing language.

## 13. Agent 10 — Situation Intelligence Agent

Analyze aggregated operational data.

Generate:
- Current situation summary.
- Major hotspots.
- Emerging risks.
- Resource shortages.
- Shelter pressure.
- Hospital pressure.
- Recommended operational actions.

## 14. AI Decision Explanation

Every consequential recommendation must include:
- Recommendation.
- Main factors.
- Data used.
- Confidence/uncertainty.
- Alternatives.
- Human approval requirement.

Example:

Recommendation:
Dispatch Boat B-03.

Factors:
- 18 people affected.
- Infant detected.
- Two elderly people.
- Active flooding.
- Boat available.
- Estimated response distance 3.2 km.

## 15. Human-in-the-Loop

Consequential actions require authorization.

Workflow:
AI recommendation
→ Coordinator review
→ Approve / Modify / Reject
→ Action logged
→ Resource status updated
→ Notification generated

Record:
- AI recommendation.
- Human decision.
- User.
- Timestamp.
- Modification reason if changed.

## 16. AI Command Assistant

Provide a command-center assistant for questions such as:
- "Which zones have the highest number of critical incidents?"
- "Which shelters are closest to capacity?"
- "Which resources are currently available?"
- "Where is water shortage risk highest?"
- "Summarize the current emergency situation."
- "Why was Incident RG-1042 classified as critical?"

The assistant should use application data and must clearly distinguish database facts from AI interpretation.

## 17. AI Guardrails

The AI must not:
- Diagnose diseases.
- Prescribe medication.
- Automatically dispatch real-world responders.
- Expose private information.
- Invent hospital/resource availability.
- Pretend synthetic data is live.
- Claim emergency services have been contacted when they have not.
- Declare missing people found without human verification.

## 18. Agent Execution States

Display:
Queued
Running
Completed
Needs Review
Failed
Cancelled

If an agent fails:
- preserve previous data.
- show understandable error.
- allow retry.
- do not fabricate a successful result.

## 19. AI Audit Trail

Store:
- Agent name.
- Input reference.
- Output.
- Confidence.
- Timestamp.
- Execution status.
- Human decision.
- Related incident.

Never store unnecessary secrets or API keys.

## 20. Demo Scenario

Use a fully scripted but genuinely executed workflow:

Citizen:
"18 people are trapped in a flooded neighborhood. There are two elderly people and an infant. They need rescue and medical support."

Expected flow:
1. Incident Intelligence structures the report.
2. Verification checks duplicates.
3. Triage marks CRITICAL.
4. Resource Matching finds rescue resources.
5. Rescue Planner proposes response.
6. Medical Routing identifies a suitable hospital.
7. Shelter Agent identifies a suitable shelter.
8. Communication Agent generates citizen/responder messages.
9. Coordinator reviews.
10. Coordinator approves.
11. Database statuses update.
12. Citizen tracking updates.
13. Situation Intelligence summarizes the event.

This exact flow should be reliable for the final hackathon demonstration.
