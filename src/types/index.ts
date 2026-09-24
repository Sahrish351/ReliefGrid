// ==============================================================================
// RELIEFGRID AI — Complete Type Definitions
// Compliant with 01_RELIEFGRID_PRODUCT.md & 03_RELIEFGRID_SUPABASE.md
// ==============================================================================

export type UserRole =
  | 'citizen'
  | 'responder'
  | 'hospital_staff'
  | 'shelter_manager'
  | 'organization_admin'
  | 'volunteer'
  | 'emergency_coordinator'
  | 'super_admin';

export interface UserProfile {
  id: string;
  auth_user_id?: string;
  full_name: string;
  email: string;
  phone_optional?: string;
  avatar_url?: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'pending';
  created_at: string;
  updated_at: string;
}

export type OrganizationType =
  | 'rescue'
  | 'hospital'
  | 'shelter'
  | 'ngo'
  | 'relief_hub'
  | 'government'
  | 'other';

export interface Organization {
  id: string;
  name: string;
  organization_type: OrganizationType;
  description?: string;
  verification_status: 'verified' | 'pending' | 'rejected';
  contact_email: string;
  phone?: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export type IncidentType =
  | 'flood'
  | 'earthquake'
  | 'fire'
  | 'heatwave'
  | 'storm'
  | 'building_collapse'
  | 'road_accident'
  | 'industrial_accident'
  | 'medical_emergency'
  | 'mass_casualty'
  | 'water_shortage'
  | 'food_shortage'
  | 'medical_supply_shortage'
  | 'displacement'
  | 'missing_person'
  | 'other';

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type IncidentStatus =
  | 'reported'
  | 'verification'
  | 'prioritized'
  | 'resource_matching'
  | 'response_planning'
  | 'awaiting_approval'
  | 'dispatched'
  | 'en_route'
  | 'on_scene'
  | 'resolved'
  | 'closed';

export interface IncidentVulnerabilities {
  id?: string;
  incident_id?: string;
  infants_count: number;
  children_count: number;
  elderly_count: number;
  disabled_count: number;
  pregnant_count: number;
  critical_medical_count: number;
  notes?: string;
}

export interface Incident {
  id: string;
  incident_code: string;
  reporter_id?: string;
  reporter_name?: string;
  reporter_phone?: string;
  incident_type: IncidentType;
  title: string;
  description: string;
  location_text: string;
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Multan' | string;
  latitude: number;
  longitude: number;
  affected_people_count: number;
  priority: PriorityLevel;
  priority_score: number; // 0-100
  status: IncidentStatus;
  verification_status: 'unverified' | 'verified' | 'flagged_duplicate' | 'rejected';
  immediate_danger: boolean;
  medical_need: boolean;
  synthetic_demo: boolean;
  vulnerabilities: IncidentVulnerabilities;
  assigned_resource_id?: string;
  assigned_resource_name?: string;
  assigned_hospital_id?: string;
  assigned_hospital_name?: string;
  assigned_shelter_id?: string;
  assigned_shelter_name?: string;
  created_at: string;
  updated_at: string;
}

export type ResourceType =
  | 'ambulance'
  | 'boat'
  | 'rescue_vehicle'
  | 'fire_truck'
  | 'medical_team'
  | 'rescue_team'
  | 'transport'
  | 'equipment';

export type ResourceStatus =
  | 'available'
  | 'assigned'
  | 'en_route'
  | 'on_mission'
  | 'unavailable'
  | 'maintenance';

export interface Resource {
  id: string;
  organization_id?: string;
  name: string;
  resource_type: ResourceType;
  type?: ResourceType;
  capability: string;
  status: ResourceStatus;
  capacity: number;
  city: string;
  latitude: number;
  longitude: number;
  current_incident_id?: string;
  last_updated: string;
}

export interface Hospital {
  id: string;
  organization_id?: string;
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  emergency_capacity: number;
  available_beds: number;
  icu_beds: number;
  icu_available?: number;
  ventilators: number;
  ventilators_available?: number;
  blood_units: number;
  blood_units_available?: number;
  trauma_level?: string;
  contact_phone?: string;
  emergency_status: 'normal' | 'moderate_pressure' | 'high_pressure' | 'critical_capacity';
  capabilities: string[];
  updated_at: string;
}

export interface Shelter {
  id: string;
  organization_id?: string;
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  total_capacity: number;
  capacity?: number;
  current_occupancy: number;
  food_hours_remaining: number;
  water_hours_remaining: number;
  food_supply_days?: number;
  water_supply_liters?: number;
  medical_support: boolean;
  medical_station?: boolean;
  accessibility_support: boolean;
  family_area: boolean;
  children_area: boolean;
  power_backup?: boolean;
  status: 'open' | 'near_capacity' | 'full' | 'closed';
  updated_at: string;
}

export interface ReliefHub {
  id: string;
  organization_id?: string;
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  status: 'operational' | 'limited' | 'closed';
  created_at: string;
}

export interface ReliefItem {
  id: string;
  hub_id: string;
  hub_name?: string;
  resource_category:
    | 'drinking_water'
    | 'food_packages'
    | 'medicines'
    | 'hygiene_kits'
    | 'blankets'
    | 'tents'
    | 'baby_supplies'
    | 'clothing'
    | 'generators'
    | 'emergency_equipment';
  quantity: number;
  unit: string;
  minimum_threshold: number;
  expiry_date_optional?: string;
  updated_at: string;
}

export interface Volunteer {
  id: string;
  profile_id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  languages: string[];
  availability_status: 'available' | 'busy' | 'unavailable';
  verification_status: 'verified' | 'pending' | 'unverified';
  latitude: number;
  longitude: number;
  hours_contributed: number;
  created_at: string;
}

export interface MissingPersonReport {
  id: string;
  reporter_id?: string;
  name: string;
  age: number;
  photo_path?: string;
  last_seen_location: string;
  city: string;
  last_seen_at: string;
  description: string;
  clothing: string;
  medical_notes_optional?: string;
  status: 'active_search' | 'possible_match' | 'verified_found' | 'resolved';
  synthetic_demo: boolean;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type: 'emergency_update' | 'dispatch' | 'shelter' | 'hospital' | 'safety_alert' | 'info';
  read: boolean;
  related_incident_id?: string;
  created_at: string;
}

export interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  alert_type: 'flood_warning' | 'heatwave_advisory' | 'structural_collapse_risk' | 'weather_alert';
  severity: 'critical' | 'severe' | 'moderate' | 'advisory';
  location: string;
  city: string;
  active_from: string;
  active_until: string;
  synthetic_demo: boolean;
}

export interface AIRecommendation {
  id: string;
  incident_id: string;
  ai_run_id?: string;
  recommendation_type: string;
  recommendation: string;
  recommended_resources: {
    resource_id: string;
    resource_name: string;
    resource_type: string;
    role: string;
  }[];
  recommended_hospital?: {
    hospital_id: string;
    hospital_name: string;
    reason: string;
  };
  recommended_shelter?: {
    shelter_id: string;
    shelter_name: string;
    reason: string;
  };
  reasoning: {
    factors: string[];
    affected_breakdown: string;
    urgency_rationale: string;
    data_points_used: string[];
  };
  confidence: number;
  status: 'pending' | 'approved' | 'modified' | 'rejected';
  reviewed_by?: string;
  reviewed_at?: string;
  modification_notes?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_name: string;
  actor_role: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface EmergencyZone {
  id: string;
  name: string;
  city: string;
  risk_level: 'critical' | 'high' | 'moderate' | 'low';
  population_estimate: number;
  synthetic_demo: boolean;
  active_incidents_count: number;
}

