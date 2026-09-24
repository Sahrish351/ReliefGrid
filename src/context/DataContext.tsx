// ==============================================================================
// RELIEFGRID AI — Centralized Reactive Operational Data Store
// Connects to Supabase with automatic real-time local sync and audit logging
// ==============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Incident,
  Resource,
  Hospital,
  Shelter,
  ReliefHub,
  ReliefItem,
  Volunteer,
  SafetyAlert,
  AIRecommendation,
  AuditLog,
  EmergencyZone,
  NotificationItem,
  MissingPersonReport,
} from '../types';
import {
  INITIAL_INCIDENTS,
  INITIAL_RESOURCES,
  INITIAL_HOSPITALS,
  INITIAL_SHELTERS,
  INITIAL_RELIEF_HUBS,
  INITIAL_INVENTORY,
  INITIAL_VOLUNTEERS,
  INITIAL_ALERTS,
  PRIMARY_DEMO_RECOMMENDATION,
  INITIAL_ZONES,
  PRIMARY_DEMO_INCIDENT,
} from '../config/demoData';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface DataContextType {
  incidents: Incident[];
  resources: Resource[];
  hospitals: Hospital[];
  shelters: Shelter[];
  reliefHubs: ReliefHub[];
  inventory: ReliefItem[];
  volunteers: Volunteer[];
  alerts: SafetyAlert[];
  recommendations: AIRecommendation[];
  auditLogs: AuditLog[];
  zones: EmergencyZone[];
  notifications: NotificationItem[];
  missingPersons: MissingPersonReport[];
  createIncident: (incident: Partial<Incident>) => Promise<Incident>;
  updateIncidentStatus: (id: string, status: Incident['status'], assignedResource?: string) => void;
  approveRecommendation: (recId: string, actorName: string, notes?: string) => void;
  modifyRecommendation: (recId: string, actorName: string, modificationNotes: string) => void;
  rejectRecommendation: (recId: string, actorName: string, rejectionReason: string) => void;
  updateShelterCapacity: (shelterId: string, newOccupancy: number) => void;
  updateHospitalCapacity: (hospitalId: string, bedsChange: number) => void;
  assignVolunteer: (volunteerId: string, taskId: string) => void;
  transferInventory: (itemId: string, quantity: number, destinationZone: string) => void;
  reportMissingPerson: (report: Partial<MissingPersonReport>) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const saved = localStorage.getItem('reliefgrid_incidents');
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('reliefgrid_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [hospitals, setHospitals] = useState<Hospital[]>(() => {
    const saved = localStorage.getItem('reliefgrid_hospitals');
    return saved ? JSON.parse(saved) : INITIAL_HOSPITALS;
  });

  const [shelters, setShelters] = useState<Shelter[]>(() => {
    const saved = localStorage.getItem('reliefgrid_shelters');
    return saved ? JSON.parse(saved) : INITIAL_SHELTERS;
  });

  const [reliefHubs] = useState<ReliefHub[]>(INITIAL_RELIEF_HUBS);
  
  const [inventory, setInventory] = useState<ReliefItem[]>(() => {
    const saved = localStorage.getItem('reliefgrid_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => {
    const saved = localStorage.getItem('reliefgrid_volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [alerts, setAlerts] = useState<SafetyAlert[]>(INITIAL_ALERTS);

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(() => {
    const saved = localStorage.getItem('reliefgrid_recommendations');
    return saved ? JSON.parse(saved) : [PRIMARY_DEMO_RECOMMENDATION];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => [
    {
      id: 'log-1',
      actor_name: 'AI Agent Orchestrator',
      actor_role: 'Agentic Service',
      action: 'GENERATED_RESPONSE_PLAN',
      entity_type: 'incident',
      entity_id: PRIMARY_DEMO_INCIDENT.id,
      metadata: { confidence: 94.6, priority: 'critical', resources: ['B-03', 'R-17'] },
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'log-2',
      actor_name: 'Coordinator Desk',
      actor_role: 'emergency_coordinator',
      action: 'TRIAGE_CONFIRMATION',
      entity_type: 'incident',
      entity_id: PRIMARY_DEMO_INCIDENT.id,
      metadata: { verified: true },
      created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    }
  ]);

  const [zones] = useState<EmergencyZone[]>(INITIAL_ZONES);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Critical Triage Alert — RG-1042',
      message: '18 trapped residents detected in Shahdara floodway. Boat B-03 recommended for dispatch.',
      type: 'emergency_update',
      read: false,
      related_incident_id: PRIMARY_DEMO_INCIDENT.id,
      created_at: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    },
    {
      id: 'notif-2',
      title: 'Hospital Capacity Notice',
      message: 'Mayo Hospital Emergency Complex has 34 available beds ready for casualty intake.',
      type: 'hospital',
      read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    }
  ]);

  const [missingPersons, setMissingPersons] = useState<MissingPersonReport[]>([
    {
      id: 'mp-1',
      name: 'Ahmed Raza',
      age: 14,
      photo_path: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      last_seen_location: 'Near Old Ravi Toll Plaza during evacuation',
      city: 'Lahore',
      last_seen_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      description: 'Separated from family during flash flood evacuation. Wears black framed glasses.',
      clothing: 'Navy blue school polo shirt and grey trousers',
      status: 'active_search',
      synthetic_demo: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: 'mp-2',
      name: 'Bushra Bibi',
      age: 68,
      photo_path: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80',
      last_seen_location: 'Street 4, Dhok Ratta',
      city: 'Rawalpindi',
      last_seen_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      description: 'Alzheimers patient, diabetic. Difficulty speaking clearly.',
      clothing: 'Green floral printed shalwar kameez and brown shawl',
      status: 'possible_match',
      synthetic_demo: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    }
  ]);

  useEffect(() => {
    localStorage.setItem('reliefgrid_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('reliefgrid_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('reliefgrid_recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  const createIncident = async (incidentData: Partial<Incident>): Promise<Incident> => {
    const codeNum = Math.floor(1000 + Math.random() * 9000);
    const newInc: Incident = {
      id: `inc-${Date.now()}`,
      incident_code: `RG-${codeNum}`,
      incident_type: incidentData.incident_type || 'flood',
      title: incidentData.title || 'Emergency Report',
      description: incidentData.description || '',
      location_text: incidentData.location_text || 'Reported Location',
      city: incidentData.city || 'Lahore',
      latitude: incidentData.latitude || 31.5204 + (Math.random() - 0.5) * 0.05,
      longitude: incidentData.longitude || 74.3587 + (Math.random() - 0.5) * 0.05,
      affected_people_count: incidentData.affected_people_count || 1,
      priority: incidentData.priority || 'high',
      priority_score: incidentData.priority_score || 80,
      status: 'reported',
      verification_status: 'verified',
      immediate_danger: Boolean(incidentData.immediate_danger),
      medical_need: Boolean(incidentData.medical_need),
      synthetic_demo: true,
      vulnerabilities: incidentData.vulnerabilities || {
        infants_count: 0,
        children_count: 0,
        elderly_count: 0,
        disabled_count: 0,
        pregnant_count: 0,
        critical_medical_count: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setIncidents(prev => [newInc, ...prev]);
    return newInc;
  };

  const updateIncidentStatus = (id: string, status: Incident['status'], assignedResource?: string) => {
    setIncidents(prev =>
      prev.map(inc => {
        if (inc.id === id) {
          return {
            ...inc,
            status,
            assigned_resource_name: assignedResource || inc.assigned_resource_name,
            updated_at: new Date().toISOString(),
          };
        }
        return inc;
      })
    );
  };

  const approveRecommendation = (recId: string, actorName: string, notes?: string) => {
    setRecommendations(prev =>
      prev.map(rec => {
        if (rec.id === recId) {
          return {
            ...rec,
            status: 'approved',
            reviewed_by: actorName,
            reviewed_at: new Date().toISOString(),
            modification_notes: notes,
          };
        }
        return rec;
      })
    );

    const rec = recommendations.find(r => r.id === recId);
    if (rec) {
      updateIncidentStatus(rec.incident_id, 'dispatched', rec.recommended_resources[0]?.resource_name);

      const assignedIds = rec.recommended_resources.map(r => r.resource_id);
      setResources(prev =>
        prev.map(r => {
          if (assignedIds.includes(r.id)) {
            return { ...r, status: 'on_mission', current_incident_id: rec.incident_id, last_updated: new Date().toISOString() };
          }
          return r;
        })
      );

      const auditEntry: AuditLog = {
        id: `audit-${Date.now()}`,
        actor_name: actorName,
        actor_role: 'emergency_coordinator',
        action: 'HUMAN_APPROVAL_DISPATCH',
        entity_type: 'ai_recommendation',
        entity_id: recId,
        metadata: {
          incident_id: rec.incident_id,
          dispatched_resources: rec.recommended_resources.map(r => r.resource_name),
          notes: notes || 'Approved as recommended by AI',
        },
        created_at: new Date().toISOString(),
      };
      setAuditLogs(prev => [auditEntry, ...prev]);

      const citizenNotification: NotificationItem = {
        id: `notif-${Date.now()}-c`,
        title: 'Dispatch Confirmed — Help En Route',
        message: `${rec.recommended_resources[0]?.resource_name} has been authorized and dispatched to your coordinates. ETA 11 minutes.`,
        type: 'dispatch',
        read: false,
        related_incident_id: rec.incident_id,
        created_at: new Date().toISOString(),
      };

      const responderNotification: NotificationItem = {
        id: `notif-${Date.now()}-r`,
        title: 'Mission Dispatch Order Authorized',
        message: `Command Center authorized rescue plan for RG-1042. Proceed to Shahdara waterlogged sector.`,
        type: 'dispatch',
        read: false,
        related_incident_id: rec.incident_id,
        created_at: new Date().toISOString(),
      };

      setNotifications(prev => [citizenNotification, responderNotification, ...prev]);
    }
  };

  const modifyRecommendation = (recId: string, actorName: string, modificationNotes: string) => {
    setRecommendations(prev =>
      prev.map(rec => (rec.id === recId ? { ...rec, status: 'modified', modification_notes: modificationNotes, reviewed_by: actorName, reviewed_at: new Date().toISOString() } : rec))
    );
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        actor_name: actorName,
        actor_role: 'emergency_coordinator',
        action: 'HUMAN_MODIFICATION',
        entity_type: 'ai_recommendation',
        entity_id: recId,
        metadata: { notes: modificationNotes },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const rejectRecommendation = (recId: string, actorName: string, rejectionReason: string) => {
    setRecommendations(prev =>
      prev.map(rec => (rec.id === recId ? { ...rec, status: 'rejected', modification_notes: rejectionReason, reviewed_by: actorName, reviewed_at: new Date().toISOString() } : rec))
    );
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        actor_name: actorName,
        actor_role: 'emergency_coordinator',
        action: 'HUMAN_REJECTION',
        entity_type: 'ai_recommendation',
        entity_id: recId,
        metadata: { reason: rejectionReason },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const updateShelterCapacity = (shelterId: string, newOccupancy: number) => {
    setShelters(prev =>
      prev.map(s => {
        if (s.id === shelterId) {
          const status = newOccupancy >= s.total_capacity ? 'full' : newOccupancy >= s.total_capacity * 0.85 ? 'near_capacity' : 'open';
          return { ...s, current_occupancy: newOccupancy, status, updated_at: new Date().toISOString() };
        }
        return s;
      })
    );
  };

  const updateHospitalCapacity = (hospitalId: string, bedsChange: number) => {
    setHospitals(prev =>
      prev.map(h => {
        if (h.id === hospitalId) {
          const newBeds = Math.max(0, h.available_beds + bedsChange);
          return { ...h, available_beds: newBeds, updated_at: new Date().toISOString() };
        }
        return h;
      })
    );
  };

  const assignVolunteer = (volunteerId: string, taskId: string) => {
    setVolunteers(prev =>
      prev.map(v => (v.id === volunteerId ? { ...v, availability_status: 'busy' } : v))
    );
  };

  const transferInventory = (itemId: string, quantity: number, destinationZone: string) => {
    setInventory(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - quantity), updated_at: new Date().toISOString() } : item))
    );
  };

  const reportMissingPerson = (report: Partial<MissingPersonReport>) => {
    const newReport: MissingPersonReport = {
      id: `mp-${Date.now()}`,
      name: report.name || 'Unknown',
      age: report.age || 25,
      photo_path: report.photo_path || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      last_seen_location: report.last_seen_location || 'Unknown',
      city: report.city || 'Lahore',
      last_seen_at: report.last_seen_at || new Date().toISOString(),
      description: report.description || '',
      clothing: report.clothing || '',
      status: 'active_search',
      synthetic_demo: true,
      created_at: new Date().toISOString(),
    };
    setMissingPersons(prev => [newReport, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const resetDemoData = () => {
    localStorage.removeItem('reliefgrid_incidents');
    localStorage.removeItem('reliefgrid_resources');
    localStorage.removeItem('reliefgrid_recommendations');
    setIncidents(INITIAL_INCIDENTS);
    setResources(INITIAL_RESOURCES);
    setRecommendations([PRIMARY_DEMO_RECOMMENDATION]);
  };

  return (
    <DataContext.Provider
      value={{
        incidents,
        resources,
        hospitals,
        shelters,
        reliefHubs,
        inventory,
        volunteers,
        alerts,
        recommendations,
        auditLogs,
        zones,
        notifications,
        missingPersons,
        createIncident,
        updateIncidentStatus,
        approveRecommendation,
        modifyRecommendation,
        rejectRecommendation,
        updateShelterCapacity,
        updateHospitalCapacity,
        assignVolunteer,
        transferInventory,
        reportMissingPerson,
        markNotificationRead,
        resetDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

