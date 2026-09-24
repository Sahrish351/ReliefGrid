# RELIEFGRID AI — Supabase Database, Authentication & Security Specification

## 1. Backend

Use Supabase for:
- PostgreSQL database.
- Authentication.
- Row Level Security.
- Realtime subscriptions where useful.
- Storage for user-uploaded evidence/photos.
- Server-side functions/API integration as appropriate.

Do not place Gemini API secrets in client-side code.

## 2. Authentication

Use email/password authentication.

The architecture should support future OAuth providers but do not add unnecessary providers unless they are fully configured.

After login, route users according to role.

Unauthenticated users must not access protected dashboards.

## 3. Roles

Use application roles:
- citizen
- responder
- hospital_staff
- shelter_manager
- organization_admin
- volunteer
- emergency_coordinator
- super_admin

Use profile records linked to Supabase Auth users.

## 4. Core Tables

### profiles
- id
- auth_user_id
- full_name
- email
- phone_optional
- avatar_url
- role
- status
- created_at
- updated_at

### organizations
- id
- name
- organization_type
- description
- verification_status
- contact_email
- phone
- location
- created_at
- updated_at

Types:
- rescue
- hospital
- shelter
- ngo
- relief_hub
- government
- other

### incidents
- id
- incident_code
- reporter_id
- incident_type
- title
- description
- location_text
- latitude
- longitude
- affected_people_count
- priority
- priority_score
- status
- verification_status
- immediate_danger
- medical_need
- synthetic_demo
- created_at
- updated_at

### incident_vulnerabilities
- id
- incident_id
- infants_count
- children_count
- elderly_count
- disabled_count
- pregnant_count
- critical_medical_count
- notes

### incident_reports
Store original report submissions and update history.

### incident_evidence
- id
- incident_id
- uploaded_by
- storage_path
- evidence_type
- created_at

### incident_duplicates
- id
- incident_id
- possible_incident_id
- similarity_score
- status
- reviewed_by

### resources
- id
- organization_id
- name
- resource_type
- capability
- status
- capacity
- latitude
- longitude
- current_incident_id
- last_updated

Types:
- ambulance
- boat
- rescue_vehicle
- fire_truck
- medical_team
- rescue_team
- transport
- equipment

### resource_assignments
- id
- resource_id
- incident_id
- assigned_by
- assignment_status
- assigned_at
- completed_at

### hospitals
- id
- organization_id
- name
- location
- latitude
- longitude
- emergency_capacity
- available_beds
- icu_beds
- ventilators
- blood_units
- emergency_status
- capabilities
- updated_at

### hospital_cases
- id
- incident_id
- hospital_id
- status
- priority
- arrival_estimate
- created_at

Do not store unnecessary sensitive medical information in the prototype.

### shelters
- id
- organization_id
- name
- location
- latitude
- longitude
- total_capacity
- current_occupancy
- food_hours_remaining
- water_hours_remaining
- medical_support
- accessibility_support
- family_area
- children_area
- status
- updated_at

### shelter_assignments
- id
- shelter_id
- incident_id
- people_count
- status
- assigned_at

### relief_hubs
- id
- organization_id
- name
- location
- latitude
- longitude
- status

### relief_inventory
- id
- hub_id
- resource_category
- quantity
- unit
- minimum_threshold
- expiry_date_optional
- updated_at

### relief_transfers
- id
- inventory_id
- source_hub_id
- destination_hub_id
- destination_zone
- quantity
- status
- approved_by
- created_at

### volunteers
- id
- profile_id
- organization_id_optional
- skills
- languages
- availability_status
- verification_status
- latitude
- longitude

### volunteer_assignments
- id
- volunteer_id
- incident_id_optional
- task_title
- task_description
- status
- assigned_at
- completed_at

### missing_person_reports
- id
- reporter_id
- name
- age
- photo_path
- last_seen_location
- last_seen_at
- description
- clothing
- medical_notes_optional
- status
- synthetic_demo
- created_at

### missing_person_matches
- id
- report_id
- possible_match_id
- similarity_score
- review_status
- reviewed_by

### notifications
- id
- user_id
- title
- message
- type
- read_at
- related_incident_id_optional
- created_at

### safety_alerts
- id
- title
- description
- alert_type
- severity
- location
- active_from
- active_until
- synthetic_demo

### ai_runs
- id
- incident_id_optional
- agent_name
- status
- input_reference
- structured_output
- confidence
- error_message
- started_at
- completed_at

### ai_recommendations
- id
- incident_id
- ai_run_id
- recommendation_type
- recommendation
- reasoning
- confidence
- status
- reviewed_by
- reviewed_at

Statuses:
pending
approved
modified
rejected

### audit_logs
- id
- actor_id
- action
- entity_type
- entity_id
- metadata
- created_at

### emergency_zones
- id
- name
- city
- risk_level
- population_estimate
- synthetic_demo

### situation_reports
- id
- created_by
- summary
- critical_incidents
- shortages
- recommendations
- synthetic_demo
- created_at

## 5. Relationships

Key relationships:
- Auth user → profile.
- Organization → resources.
- Organization → hospital/shelter/relief hub.
- Citizen → incidents.
- Incident → vulnerabilities.
- Incident → evidence.
- Incident → assignments.
- Incident → AI runs.
- Incident → AI recommendations.
- Hospital → hospital cases.
- Shelter → shelter assignments.
- Volunteer → volunteer assignments.
- Relief hub → inventory.
- Inventory → transfers.

## 6. Row Level Security

Implement RLS carefully.

Citizen:
- Can read/write own profile.
- Can create incidents.
- Can read own incidents.
- Can read notifications belonging to them.
- Can access public shelter/hospital information.
- Cannot read other citizens' private data.

Responder:
- Can read assigned incidents.
- Can update assigned mission status.
- Can update their resource availability.
- Cannot access unrelated private citizen data beyond operational requirements.

Hospital staff:
- Can manage their hospital data.
- Can read relevant incoming cases.
- Cannot access unrelated citizen information.

Shelter manager:
- Can manage their shelter.
- Can manage shelter assignments.
- Cannot access unrelated private data.

Organization admin:
- Can manage their organization's resources/volunteers.

Emergency coordinator:
- Can read operational incidents/resources.
- Can create/review recommendations.
- Can approve/modify/reject AI plans.
- Access should be audited.

Super admin:
- Full system administration.

## 7. Realtime

Use realtime for:
- Incident status.
- Resource assignment.
- Responder status.
- Shelter occupancy.
- Hospital capacity.
- Notifications.
- Command-center metrics where useful.

Do not overuse realtime where normal queries are sufficient.

## 8. Demo Seed Data

Create realistic synthetic demo data for:
- Lahore.
- Karachi.
- Islamabad.
- Rawalpindi.
- Multan.

Include:
- 25+ incidents.
- 15+ rescue resources.
- 8+ hospitals.
- 10+ shelters.
- 5+ relief hubs.
- 20+ volunteers.
- Relief inventory.
- AI recommendations.
- Notifications.
- Safety alerts.

Clearly mark synthetic/demo data.

## 9. Data Quality

Never show empty-looking dashboards during the demo.

Seed meaningful values and relationships so:
- maps have markers.
- charts have trends.
- command center has active incidents.
- shelters have capacity.
- hospitals have capacity.
- resources have assignments.
- AI recommendations have real database context.

## 10. Security

- Validate all input.
- Sanitize user-generated content.
- Enforce authorization server-side.
- Protect storage paths.
- Never expose API keys.
- Avoid unnecessary sensitive medical data.
- Log consequential administrative actions.
