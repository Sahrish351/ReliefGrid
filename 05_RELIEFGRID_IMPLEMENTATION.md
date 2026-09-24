# RELIEFGRID AI — Antigravity Implementation & Delivery Specification

## 1. Build Objective

Build the complete RELIEFGRID AI platform as a polished, responsive, hackathon-ready web application.

The application must include:
- Public website.
- Authentication.
- Role-based dashboards.
- Citizen emergency workflow.
- Multi-agent Gemini workflow.
- Rescue coordination.
- Hospital network.
- Shelter network.
- NGO/relief management.
- Volunteer network.
- Missing person workflow.
- Live operational map.
- Emergency command center.
- Analytics.
- Predictive intelligence.
- Notifications.
- Audit logs.
- Synthetic demo data.

Do not simplify the product into a basic dashboard.

## 2. Technology

Preferred stack:
- React
- TypeScript
- Vite
- Tailwind CSS or an equivalent maintainable styling system
- Supabase
- Gemini API
- Recharts or another suitable charting library
- Map library suitable for the environment

Use a clean modular architecture.

## 3. Environment Variables

Use environment variables for:
- Supabase URL
- Supabase anon/public key
- Gemini API key

Never commit secrets.

Use:
GEMINI_API_KEY

If a backend/serverless function is needed for Gemini, keep the API key server-side.

## 4. Build Order

### Phase 1 — Foundation
- Project setup.
- Design system.
- Routing.
- Auth.
- Supabase client.
- Global navigation.
- Role guards.

### Phase 2 — Public Website
Build all major public pages before deep dashboards.

### Phase 3 — Database
Implement schema and seed/demo data.

### Phase 4 — Citizen Workflow
Emergency reporting, tracking, shelters, hospitals, missing person, volunteer.

### Phase 5 — Operational Portals
Responder, hospital, shelter, NGO, volunteer.

### Phase 6 — Command Center
Live map, incident queue, resources, AI recommendations, analytics.

### Phase 7 — Gemini Agents
Implement real agent workflows.

### Phase 8 — Realtime
Implement important realtime updates.

### Phase 9 — QA
Test all role flows.

### Phase 10 — Visual Polish
Responsive behavior, animations, loading states, error states, image quality.

## 5. Route Structure

Public:
/
 /about
 /how-it-works
 /emergency-map
 /emergency-types
 /safety
 /shelters
 /hospitals
 /report-emergency
 /track-emergency
 /missing-person
 /volunteer
 /support
 /organizations
 /impact
 /ai-technology
 /resources
 /faq
 /contact

Auth:
 /login
 /register
 /forgot-password

Citizen:
 /app
 /app/emergencies
 /app/emergencies/:id
 /app/report
 /app/shelters
 /app/hospitals
 /app/missing-person
 /app/volunteer
 /app/notifications
 /app/profile

Responder:
 /responder
 /responder/missions
 /responder/missions/:id
 /responder/resources
 /responder/map
 /responder/history
 /responder/profile

Hospital:
 /hospital
 /hospital/capacity
 /hospital/cases
 /hospital/resources
 /hospital/profile

Shelter:
 /shelter
 /shelter/capacity
 /shelter/assignments
 /shelter/supplies
 /shelter/profile

Organization:
 /organization
 /organization/resources
 /organization/inventory
 /organization/distributions
 /organization/volunteers
 /organization/impact

Volunteer:
 /volunteer/dashboard
 /volunteer/opportunities
 /volunteer/tasks
 /volunteer/profile

Coordinator:
 /command
 /command/incidents
 /command/incidents/:id
 /command/map
 /command/resources
 /command/hospitals
 /command/shelters
 /command/logistics
 /command/alerts
 /command/intelligence
 /command/reports
 /command/ai-assistant

Admin:
 /admin
 /admin/users
 /admin/organizations
 /admin/incidents
 /admin/resources
 /admin/hospitals
 /admin/shelters
 /admin/ai
 /admin/audit
 /admin/settings

## 6. Components

Create reusable components for:
- Header
- Footer
- Emergency CTA
- Status badge
- Priority badge
- Incident card
- Resource card
- Hospital card
- Shelter card
- AI recommendation card
- Approval controls
- Timeline
- Map marker
- Map filters
- Metric card
- Chart card
- Notification item
- Empty state
- Error state
- Loading skeleton
- Modal
- Drawer
- Toast
- Form fields
- File upload
- Search
- Pagination

## 7. AI Implementation

Create a service layer for Gemini.

Suggested conceptual functions:
- analyzeIncident()
- verifyIncident()
- prioritizeIncident()
- matchResources()
- planResponse()
- recommendHospital()
- recommendShelter()
- optimizeRelief()
- generateCommunication()
- summarizeSituation()
- generateAfterActionReport()

Do not call Gemini directly from every component.

Keep AI calls centralized and testable.

## 8. Agent Workflow

When a new incident is created:

1. Save original incident.
2. Run Incident Intelligence.
3. Save structured AI output.
4. Run Verification.
5. Run Triage.
6. Query available resources.
7. Run Resource Matching.
8. Run Rescue Planning.
9. Run Hospital/Shelter agents when relevant.
10. Generate Communication messages.
11. Save AI recommendation.
12. Present to authorized coordinator.
13. Coordinator approves/modifies/rejects.
14. If approved, update assignments.
15. Notify relevant users.
16. Track mission status.
17. On resolution, generate summary.

If any AI call fails:
- preserve incident.
- show AI unavailable state.
- allow retry.
- do not fabricate output.

## 9. Demo Mode

Create a clearly marked demo mode.

Banner:
**SYNTHETIC DEMO DATA — NOT A LIVE EMERGENCY SERVICE**

Do not imply that the prototype contacts real emergency services.

The app should have preloaded scenarios for the final presentation.

## 10. Final Demo Scenario

Prepare a one-click or easy-to-run scenario:

Title:
Flood Rescue — Zone 4

Input:
"18 people are trapped in a flooded neighborhood. Two elderly people and one infant need assistance. Medical support may be required."

The workflow should produce:
- Critical priority.
- Rescue resource recommendation.
- Medical resource recommendation.
- Shelter recommendation.
- Explainable reasoning.
- Human approval.
- Mission dispatch.
- Citizen notification.
- Updated command center metrics.

## 11. Image Implementation

Create a centralized image configuration.

Every external image must:
- be valid.
- have meaningful alt text.
- use an appropriate crop.
- have a fallback.

Never invent image URLs.

If remote image loading is unreliable, provide local/gradient fallback layouts without breaking the page.

Use image optimization and lazy loading for below-the-fold images.

## 12. Error Handling

Handle:
- Network failures.
- Supabase failures.
- Gemini failures.
- Invalid forms.
- Unauthorized routes.
- Empty datasets.
- Missing records.
- Image failures.

Errors should be human-readable.

## 13. Loading Experience

Use:
- Skeletons.
- Progress states.
- Agent execution steps.
- Button loading states.

For AI processing show meaningful steps:
"Understanding incident"
"Checking reports"
"Assessing priority"
"Finding resources"
"Preparing response"

Do not fake progress if no operation is actually running.

## 14. Performance

- Lazy load routes.
- Lazy load heavy map components.
- Avoid unnecessary database requests.
- Paginate long lists.
- Cache suitable public reference data.
- Optimize images.
- Keep dashboard interactions responsive.

## 15. Security

- Protected routes.
- Server-side authorization.
- RLS.
- Input validation.
- Safe file uploads.
- No secrets in frontend.
- Audit consequential actions.

## 16. QA Checklist

Before completion verify:

### Public
- Home loads.
- Navigation works.
- Images load.
- Mobile layout works.
- CTAs work.

### Auth
- Login works.
- Register works.
- Protected routes redirect correctly.
- Role routing works.

### Citizen
- Report emergency works.
- Incident tracking works.
- Shelter/hospital search works.
- Notifications work.

### AI
- Gemini call works.
- Structured output is handled.
- AI failure is handled.
- Recommendation is saved.
- Human approval is saved.

### Responder
- Mission assignment works.
- Mission status updates.

### Hospital
- Capacity updates work.

### Shelter
- Capacity and supplies update.

### Organization
- Inventory and distribution work.

### Volunteer
- Opportunities and assignments work.

### Command
- Incidents appear.
- Map works.
- AI recommendations appear.
- Approve/modify/reject works.
- Analytics use database data.

### Admin
- Users and operational records are manageable.
- Audit logs appear.

## 17. Visual QA

Check:
- Desktop 1440px.
- Laptop 1280px.
- Tablet.
- Mobile 390px.

No:
- horizontal overflow.
- broken images.
- clipped text.
- inaccessible controls.
- inconsistent spacing.
- unreadable charts.
- duplicate navigation.

## 18. Hackathon Quality Rules

The final application must feel like a coherent product.

Do not:
- remove modules to save time without explicit approval.
- replace AI agents with static text.
- create placeholder pages saying "Coming Soon."
- use lorem ipsum.
- use fake testimonials.
- use fake partner logos.
- present synthetic statistics as real.
- use broken image URLs.
- make every page look identical.

Do:
- prioritize the end-to-end emergency workflow.
- keep the public website visually exceptional.
- keep the command center operational and data-rich.
- keep AI explainable.
- keep human approval for consequential actions.
- make the final demo reliable.

## 19. Definition of Completion

The project is complete only when:

A user can register/login → report an emergency → the platform structures the report → Gemini-powered agents analyze it → priority is assigned → relevant resources are matched → a response plan is generated → an authorized coordinator approves it → assignments are created → citizen/responder status updates → shelter/hospital coordination is shown → incident can be resolved → AI can generate an after-action report.

The project should be presentation-ready, visually polished, responsive, secure, and clearly marked as a synthetic/demo platform where appropriate.
