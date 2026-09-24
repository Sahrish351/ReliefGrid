-- ==============================================================================
-- RELIEFGRID AI — Complete PostgreSQL / Supabase Schema
-- Specification Compliant (03_RELIEFGRID_SUPABASE.md)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_optional TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN (
        'citizen',
        'responder',
        'hospital_staff',
        'shelter_manager',
        'organization_admin',
        'volunteer',
        'emergency_coordinator',
        'super_admin'
    )),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    organization_type TEXT NOT NULL CHECK (organization_type IN (
        'rescue',
        'hospital',
        'shelter',
        'ngo',
        'relief_hub',
        'government',
        'other'
    )),
    description TEXT,
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending', 'rejected')),
    contact_email TEXT NOT NULL,
    phone TEXT,
    location TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. INCIDENTS
CREATE TABLE IF NOT EXISTS public.incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_code TEXT NOT NULL UNIQUE,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    incident_type TEXT NOT NULL CHECK (incident_type IN (
        'flood',
        'earthquake',
        'fire',
        'heatwave',
        'storm',
        'building_collapse',
        'road_accident',
        'industrial_accident',
        'medical_emergency',
        'mass_casualty',
        'water_shortage',
        'food_shortage',
        'medical_supply_shortage',
        'displacement',
        'missing_person',
        'other'
    )),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location_text TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    affected_people_count INTEGER NOT NULL DEFAULT 1,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    priority_score INTEGER NOT NULL DEFAULT 50,
    status TEXT NOT NULL DEFAULT 'reported' CHECK (status IN (
        'reported',
        'verification',
        'prioritized',
        'resource_matching',
        'response_planning',
        'awaiting_approval',
        'dispatched',
        'en_route',
        'on_scene',
        'resolved',
        'closed'
    )),
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('unverified', 'verified', 'flagged_duplicate', 'rejected')),
    immediate_danger BOOLEAN NOT NULL DEFAULT false,
    medical_need BOOLEAN NOT NULL DEFAULT false,
    synthetic_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. INCIDENT VULNERABILITIES
CREATE TABLE IF NOT EXISTS public.incident_vulnerabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    infants_count INTEGER NOT NULL DEFAULT 0,
    children_count INTEGER NOT NULL DEFAULT 0,
    elderly_count INTEGER NOT NULL DEFAULT 0,
    disabled_count INTEGER NOT NULL DEFAULT 0,
    pregnant_count INTEGER NOT NULL DEFAULT 0,
    critical_medical_count INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. INCIDENT REPORTS
CREATE TABLE IF NOT EXISTS public.incident_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    raw_input TEXT NOT NULL,
    channel TEXT NOT NULL DEFAULT 'web_form',
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. INCIDENT EVIDENCE
CREATE TABLE IF NOT EXISTS public.incident_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    storage_path TEXT NOT NULL,
    evidence_type TEXT NOT NULL DEFAULT 'photo',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. INCIDENT DUPLICATES
CREATE TABLE IF NOT EXISTS public.incident_duplicates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    possible_incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    similarity_score NUMERIC(5, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'potential' CHECK (status IN ('potential', 'confirmed_duplicate', 'distinct')),
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. RESOURCES
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    resource_type TEXT NOT NULL CHECK (resource_type IN (
        'ambulance',
        'boat',
        'rescue_vehicle',
        'fire_truck',
        'medical_team',
        'rescue_team',
        'transport',
        'equipment'
    )),
    capability TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN (
        'available',
        'assigned',
        'en_route',
        'on_mission',
        'unavailable',
        'maintenance'
    )),
    capacity INTEGER NOT NULL DEFAULT 4,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    current_incident_id UUID REFERENCES public.incidents(id) ON DELETE SET NULL,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. RESOURCE ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.resource_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    assignment_status TEXT NOT NULL DEFAULT 'assigned' CHECK (assignment_status IN (
        'assigned',
        'acknowledged',
        'en_route',
        'on_scene',
        'completed',
        'recalled'
    )),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 10. HOSPITALS
CREATE TABLE IF NOT EXISTS public.hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    emergency_capacity INTEGER NOT NULL DEFAULT 50,
    available_beds INTEGER NOT NULL DEFAULT 20,
    icu_beds INTEGER NOT NULL DEFAULT 5,
    ventilators INTEGER NOT NULL DEFAULT 4,
    blood_units INTEGER NOT NULL DEFAULT 45,
    emergency_status TEXT NOT NULL DEFAULT 'normal' CHECK (emergency_status IN ('normal', 'moderate_pressure', 'high_pressure', 'critical_capacity')),
    capabilities TEXT[] NOT NULL DEFAULT ARRAY['trauma', 'emergency_surgery', 'pediatrics'],
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. HOSPITAL CASES
CREATE TABLE IF NOT EXISTS public.hospital_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'incoming' CHECK (status IN ('incoming', 'admitted', 'stabilized', 'discharged', 'transferred')),
    priority TEXT NOT NULL DEFAULT 'high' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    arrival_estimate TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. SHELTERS
CREATE TABLE IF NOT EXISTS public.shelters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    total_capacity INTEGER NOT NULL DEFAULT 200,
    current_occupancy INTEGER NOT NULL DEFAULT 50,
    food_hours_remaining INTEGER NOT NULL DEFAULT 72,
    water_hours_remaining INTEGER NOT NULL DEFAULT 48,
    medical_support BOOLEAN NOT NULL DEFAULT true,
    accessibility_support BOOLEAN NOT NULL DEFAULT true,
    family_area BOOLEAN NOT NULL DEFAULT true,
    children_area BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'near_capacity', 'full', 'closed')),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. SHELTER ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.shelter_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shelter_id UUID NOT NULL REFERENCES public.shelters(id) ON DELETE CASCADE,
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    people_count INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'checked_in', 'departed')),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. RELIEF HUBS
CREATE TABLE IF NOT EXISTS public.relief_hubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    status TEXT NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'limited', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. RELIEF INVENTORY
CREATE TABLE IF NOT EXISTS public.relief_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hub_id UUID NOT NULL REFERENCES public.relief_hubs(id) ON DELETE CASCADE,
    resource_category TEXT NOT NULL CHECK (resource_category IN (
        'drinking_water',
        'food_packages',
        'medicines',
        'hygiene_kits',
        'blankets',
        'tents',
        'baby_supplies',
        'clothing',
        'generators',
        'emergency_equipment'
    )),
    quantity INTEGER NOT NULL DEFAULT 100,
    unit TEXT NOT NULL DEFAULT 'units',
    minimum_threshold INTEGER NOT NULL DEFAULT 20,
    expiry_date_optional DATE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. RELIEF TRANSFERS
CREATE TABLE IF NOT EXISTS public.relief_transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_id UUID NOT NULL REFERENCES public.relief_inventory(id) ON DELETE CASCADE,
    source_hub_id UUID NOT NULL REFERENCES public.relief_hubs(id) ON DELETE CASCADE,
    destination_hub_id UUID REFERENCES public.relief_hubs(id) ON DELETE SET NULL,
    destination_zone TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_transit' CHECK (status IN ('requested', 'approved', 'in_transit', 'delivered', 'cancelled')),
    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. VOLUNTEERS
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_id_optional UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    skills TEXT[] NOT NULL DEFAULT ARRAY['general_support'],
    languages TEXT[] NOT NULL DEFAULT ARRAY['English', 'Urdu'],
    availability_status TEXT NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable')),
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending', 'unverified')),
    latitude DOUBLE PRECISION NOT NULL DEFAULT 31.5204,
    longitude DOUBLE PRECISION NOT NULL DEFAULT 74.3587,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. VOLUNTEER ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.volunteer_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volunteer_id UUID NOT NULL REFERENCES public.volunteers(id) ON DELETE CASCADE,
    incident_id_optional UUID REFERENCES public.incidents(id) ON DELETE SET NULL,
    task_title TEXT NOT NULL,
    task_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'declined')),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 19. MISSING PERSON REPORTS
CREATE TABLE IF NOT EXISTS public.missing_person_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    photo_path TEXT,
    last_seen_location TEXT NOT NULL,
    last_seen_at TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    clothing TEXT NOT NULL,
    medical_notes_optional TEXT,
    status TEXT NOT NULL DEFAULT 'active_search' CHECK (status IN ('active_search', 'possible_match', 'verified_found', 'resolved')),
    synthetic_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. MISSING PERSON MATCHES
CREATE TABLE IF NOT EXISTS public.missing_person_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES public.missing_person_reports(id) ON DELETE CASCADE,
    possible_match_id UUID REFERENCES public.missing_person_reports(id) ON DELETE CASCADE,
    similarity_score NUMERIC(5, 2) NOT NULL,
    review_status TEXT NOT NULL DEFAULT 'pending_human_review' CHECK (review_status IN ('pending_human_review', 'verified_match', 'dismissed')),
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('emergency_update', 'dispatch', 'shelter', 'hospital', 'safety_alert', 'info')),
    read_at TIMESTAMPTZ,
    related_incident_id_optional UUID REFERENCES public.incidents(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 22. SAFETY ALERTS
CREATE TABLE IF NOT EXISTS public.safety_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('flood_warning', 'heatwave_advisory', 'structural_collapse_risk', 'weather_alert')),
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'severe', 'moderate', 'advisory')),
    location TEXT NOT NULL,
    active_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    active_until TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
    synthetic_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 23. AI RUNS
CREATE TABLE IF NOT EXISTS public.ai_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id_optional UUID REFERENCES public.incidents(id) ON DELETE SET NULL,
    agent_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('queued', 'running', 'completed', 'needs_review', 'failed', 'cancelled')),
    input_reference TEXT NOT NULL,
    structured_output JSONB NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL,
    error_message TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 24. AI RECOMMENDATIONS
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    ai_run_id UUID REFERENCES public.ai_runs(id) ON DELETE SET NULL,
    recommendation_type TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    reasoning JSONB NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'modified', 'rejected')),
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 25. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 26. EMERGENCY ZONES
CREATE TABLE IF NOT EXISTS public.emergency_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    risk_level TEXT NOT NULL CHECK (risk_level IN ('critical', 'high', 'moderate', 'low')),
    population_estimate INTEGER NOT NULL,
    synthetic_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 27. SITUATION REPORTS
CREATE TABLE IF NOT EXISTS public.situation_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    summary TEXT NOT NULL,
    critical_incidents JSONB NOT NULL,
    shortages JSONB NOT NULL,
    recommendations JSONB NOT NULL,
    synthetic_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_vulnerabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relief_hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- Permissive demo access policies for authenticated & public viewing
CREATE POLICY "Public profiles can be viewed by all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY "Public organizations viewable by all" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Incidents viewable by all" ON public.incidents FOR SELECT USING (true);
CREATE POLICY "Anyone can create incident" ON public.incidents FOR INSERT WITH CHECK (true);
CREATE POLICY "Coordinators and responders can update incidents" ON public.incidents FOR UPDATE USING (true);

CREATE POLICY "Resources viewable by all" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Hospitals viewable by all" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Shelters viewable by all" ON public.shelters FOR SELECT USING (true);
CREATE POLICY "Relief hubs viewable by all" ON public.relief_hubs FOR SELECT USING (true);
CREATE POLICY "AI recommendations viewable by all" ON public.ai_recommendations FOR SELECT USING (true);
