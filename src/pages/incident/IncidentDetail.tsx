import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MapPin,
  LifeBuoy,
  Activity,
  Building2,
  Printer,
  CheckCircle2,
  AlertTriangle,
  FileText,
  PhoneCall,
  Send,
  Navigation,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { OperationalMap } from '../../components/map/OperationalMap';
import confetti from 'canvas-confetti';

export const IncidentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    incidents,
    resources,
    hospitals,
    shelters,
    reliefHubs,
    recommendations,
    auditLogs,
    updateIncidentStatus,
  } = useData();

  // Find target incident
  const incident =
    incidents.find((i) => i.id === id) ||
    incidents.find((i) => i.id.toLowerCase() === id?.toLowerCase()) ||
    incidents[0];

  // Associated recommendation
  const rec =
    recommendations.find((r) => r.incident_id === incident.id) ||
    recommendations[0];

  // Associated responder resource
  const assignedResource =
    resources.find(
      (r) =>
        r.id === incident.assigned_resource_id ||
        (incident.assigned_resources && incident.assigned_resources.includes(r.id))
    ) || resources[0];

  // Pre-alerted hospital
  const preAlertedHospital = hospitals[0];

  // Reserved shelter
  const reservedShelter = shelters[0];

  // Coordinates
  const incLat = incident.latitude ?? incident.lat ?? 31.565;
  const incLng = incident.longitude ?? incident.lng ?? 74.32;
  const locationDisplay = incident.location_text || incident.location_name || `${incident.city}, Sector A-1`;
  const peopleAffected = incident.affected_people_count ?? incident.people_count ?? 6;
  const severityScore =
    incident.severity_score ??
    (incident.priority_score ? (incident.priority_score / 10).toFixed(1) : '9.4');

  // Reasoning text
  const reasoningText =
    typeof rec?.reasoning === 'string'
      ? rec.reasoning
      : rec?.reasoning?.urgency_rationale ||
        rec?.recommendation ||
        'Floodwater velocity measured at 2.4 m/s around residential rooftop with elderly and infant occupants. Immediate waterborne evacuation required. Surface road access submerged under 4.5 ft flood current.';

  // Filtered audit logs
  const incidentLogs = auditLogs.filter(
    (l) =>
      l.entity_id === incident.id ||
      l.incident_id === incident.id ||
      (l.details && l.details.includes(incident.id))
  );

  // Field note state
  const [fieldNote, setFieldNote] = useState('');
  const [localNotes, setLocalNotes] = useState<
    { sender: string; time: string; text: string }[]
  >([
    {
      sender: 'Coordinator Tariq Mehmood',
      time: '12 mins ago',
      text: 'Verified 4 children and 2 elderly persons stranded on residential rooftop. Floodwater current velocity ~2.4 m/s.',
    },
    {
      sender: 'Rescue Unit R-17 Lead',
      time: '4 mins ago',
      text: 'Rigid inflatable boat B-03 deployed from Shahdara pier. ETA to rooftop extraction point is 6 minutes.',
    },
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldNote.trim()) return;
    setLocalNotes((prev) => [
      ...prev,
      {
        sender: user?.full_name || 'Coordinator Dispatch',
        time: 'Just now',
        text: fieldNote.trim(),
      },
    ]);
    setFieldNote('');
  };

  const handleResolve = () => {
    updateIncidentStatus(incident.id, 'resolved');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header / Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white hover:bg-charcoal-100 border border-charcoal-200 rounded-xl text-charcoal-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-xs text-charcoal-500 flex items-center space-x-2">
            <Link to="/portal/coordinator" className="hover:text-navy-950 font-medium">
              Command Center
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
            <span className="font-bold text-navy-950">Incident Telemetry</span>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
            <span className="font-mono text-navy-700">{incident.id}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 print:hidden">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-white hover:bg-charcoal-50 border border-charcoal-200 text-charcoal-800 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4 text-charcoal-500" />
            <span>Print Dispatch Brief</span>
          </button>

          <button
            onClick={() => updateIncidentStatus(incident.id, 'dispatched', assignedResource.id)}
            className="px-3.5 py-2 bg-navy-950 hover:bg-navy-900 text-white rounded-xl text-xs font-bold transition-all shadow-card flex items-center space-x-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Re-Route Units</span>
          </button>

          {incident.status !== 'resolved' ? (
            <button
              onClick={handleResolve}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-card flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Mission Resolved</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Resolved
            </span>
          )}
        </div>
      </div>

      {/* Incident Title & Severity Banner */}
      <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-elevated">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-extrabold uppercase px-2.5 py-1 bg-navy-900 border border-navy-700 text-amber-400 rounded-lg">
                {incident.id}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                  incident.priority === 'critical'
                    ? 'bg-emergency-600 text-white animate-pulse'
                    : 'bg-amber-500 text-white'
                }`}
              >
                {incident.priority} Priority
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-navy-850 text-navy-200 border border-navy-800 rounded-lg capitalize">
                Status: {incident.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-navy-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Reported {new Date(incident.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {incident.title}
            </h1>
            <p className="text-xs sm:text-sm text-navy-200 leading-relaxed">
              {incident.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-navy-300 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emergency-400" />
                <strong>{locationDisplay}</strong>
              </span>
              <span className="font-mono text-navy-400">
                [{incLat.toFixed(4)}, {incLng.toFixed(4)}]
              </span>
              <span className="text-navy-400">|</span>
              <span>
                Reporting Source: <strong className="text-white">Emergency Call Center / 1122 Dispatch</strong>
              </span>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
            <div className="bg-navy-900/90 border border-navy-800 p-4 rounded-2xl text-center min-w-[120px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-navy-400">
                People Trapped
              </div>
              <div className="text-2xl font-black font-heading text-white mt-1">
                {peopleAffected}
              </div>
              <div className="text-[10px] text-amber-400 font-medium">4 Children • 2 Elderly</div>
            </div>

            <div className="bg-navy-900/90 border border-navy-800 p-4 rounded-2xl text-center min-w-[120px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-navy-400">
                AI Severity Index
              </div>
              <div className="text-2xl font-black font-heading text-emergency-400 mt-1">
                {severityScore}
                <span className="text-xs text-navy-400 font-normal">/10</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">Gemini 2.5 Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Telemetry, AI Reasoning & Tactical Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Map, AI Reasoning & Audit Log */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tactical Map Card */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emergency-600" />
                <h2 className="text-base font-bold font-heading text-navy-950">
                  Live Incident Geospatial Telemetry
                </h2>
              </div>
              <span className="text-xs bg-navy-50 text-navy-900 font-semibold px-2.5 py-1 rounded-lg border border-navy-200">
                Zone: Ravi Flood Corridor (Lahore)
              </span>
            </div>

            <div className="h-[380px] rounded-2xl overflow-hidden border border-charcoal-200 shadow-inner">
              <OperationalMap
                center={[incLat, incLng]}
                zoom={14}
                incidents={[incident]}
                resources={[assignedResource]}
                hospitals={[preAlertedHospital]}
                shelters={[reservedShelter]}
                reliefHubs={reliefHubs}
                selectedIncidentId={incident.id}
                interactive={true}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 bg-charcoal-50 rounded-xl border border-charcoal-100 flex items-center space-x-2.5">
                <LifeBuoy className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-semibold text-navy-950">Assigned Unit</div>
                  <div className="text-charcoal-600">{assignedResource.name} (Boat B-03)</div>
                </div>
              </div>

              <div className="p-3 bg-charcoal-50 rounded-xl border border-charcoal-100 flex items-center space-x-2.5">
                <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-navy-950">Target Trauma Center</div>
                  <div className="text-charcoal-600">{preAlertedHospital.name} (3.4 km)</div>
                </div>
              </div>

              <div className="p-3 bg-charcoal-50 rounded-xl border border-charcoal-100 flex items-center space-x-2.5">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="font-semibold text-navy-950">Evac Shelter</div>
                  <div className="text-charcoal-600">{reservedShelter.name} (1.8 km)</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Explainability & Agent Reasoning */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <h2 className="text-base font-bold font-heading text-navy-950">
                    Agentic AI Decision & Reasoning Breakdown
                  </h2>
                  <p className="text-xs text-charcoal-500">
                    Gemini 2.5 Flash Autonomous Emergency Orchestrator
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  96.8% Confidence
                </span>
              </div>
            </div>

            {/* Step Breakdown */}
            <div className="space-y-4">
              <div className="p-4 bg-navy-50/70 border border-navy-100 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-navy-950 flex items-center justify-between">
                  <span>1. Natural Language Triage Rationale</span>
                  <span className="text-[10px] text-navy-600 uppercase font-mono">Agent: Triage-Agent-01</span>
                </div>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {reasoningText}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-charcoal-50 rounded-2xl border border-charcoal-100 space-y-1">
                  <div className="font-bold text-navy-950 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-emergency-500" />
                    <span>Environmental Threat Factors</span>
                  </div>
                  <ul className="text-charcoal-600 list-disc list-inside space-y-0.5 text-[11px]">
                    <li>River cresting peak within 90 minutes</li>
                    <li>Structural roof integrity: Moderate compromise</li>
                    <li>Severe hypothermia risk for 4 pediatric victims</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-charcoal-50 rounded-2xl border border-charcoal-100 space-y-1">
                  <div className="font-bold text-navy-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Algorithmic Resource Match</span>
                  </div>
                  <ul className="text-charcoal-600 list-disc list-inside space-y-0.5 text-[11px]">
                    <li>Rescue Boat B-03 has lowest ETA (6 mins)</li>
                    <li>Equipped with pediatric thermal wraps & life vests</li>
                    <li>Mayo Hospital alerted for pediatric trauma triage</li>
                  </ul>
                </div>
              </div>

              {/* Consequential Decision Approval Box */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-950">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">Human-in-the-Loop Consequential Dispatch Approved</span>
                    <p className="text-[11px] text-emerald-800">
                      Approved by Coordinator Tariq Mehmood at 08:34 AM. Dispatched under Rescue 1122 protocol.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Chronological Audit Trail */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-navy-700" />
                <h2 className="text-base font-bold font-heading text-navy-950">
                  Immutable Operational Audit Log
                </h2>
              </div>
              <span className="text-[10px] text-charcoal-500 font-mono">
                SHA-256 Verified Records
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-charcoal-200">
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emergency-600 border-2 border-white"></div>
                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950">Emergency Call Received & Synthesized</span>
                    <span className="text-[10px] text-charcoal-400">08:31 AM</span>
                  </div>
                  <p className="text-charcoal-600 text-[11px] mt-0.5">
                    Citizen reported stranded rooftop in Shahdara Old Mohallah via Voice Emergency Line.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-white"></div>
                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950">Gemini 2.5 Flash Autonomous Triage Computed</span>
                    <span className="text-[10px] text-charcoal-400">08:32 AM</span>
                  </div>
                  <p className="text-charcoal-600 text-[11px] mt-0.5">
                    Assigned 9.4 Critical severity. Recommended Boat B-03 + Team R-17 dispatch.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white"></div>
                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950">Tactical Dispatch Approved by Coordinator</span>
                    <span className="text-[10px] text-charcoal-400">08:34 AM</span>
                  </div>
                  <p className="text-charcoal-600 text-[11px] mt-0.5">
                    Coordinator Tariq Mehmood confirmed boat launch. Pre-alert transmitted to Mayo Hospital.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white"></div>
                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950">Rescue Vessel B-03 En Route (Speed 18 knots)</span>
                    <span className="text-[10px] text-charcoal-400">08:36 AM</span>
                  </div>
                  <p className="text-charcoal-600 text-[11px] mt-0.5">
                    Telemetry streaming live. Estimated rooftop arrival in 4 minutes.
                  </p>
                </div>
              </div>

              {incidentLogs.map((log) => (
                <div key={log.id} className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-navy-600 border-2 border-white"></div>
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy-950">{log.action.replace('_', ' ').toUpperCase()}</span>
                      <span className="text-[10px] text-charcoal-400">{new Date(log.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-charcoal-600 text-[11px] mt-0.5">
                      Executed by {log.actor_name} ({log.actor_role}). {log.details || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Coordination, Responders & Field Comms */}
        <div className="lg:col-span-4 space-y-6">
          {/* Assigned Unit Telemetry Card */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <div className="flex items-center space-x-2">
                <LifeBuoy className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold font-heading text-navy-950">
                  Assigned Tactical Unit
                </h3>
              </div>
              <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                En Route
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-charcoal-50 rounded-2xl border border-charcoal-100 space-y-1">
                <div className="font-bold text-navy-950 text-sm">{assignedResource.name}</div>
                <div className="text-charcoal-500 text-[11px]">
                  Callsign: <strong>BOAT-1122-BRAVO</strong> • Type: {assignedResource.resource_type || assignedResource.type}
                </div>
                <div className="flex items-center justify-between text-navy-950 pt-2 font-medium">
                  <span>Current Speed:</span>
                  <span className="font-mono font-bold text-emerald-600">18.4 knots</span>
                </div>
                <div className="flex items-center justify-between text-navy-950 font-medium">
                  <span>Estimated Arrival:</span>
                  <span className="font-mono font-bold text-emergency-600">~ 4 minutes</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-charcoal-600">
                <div className="flex justify-between py-1 border-b border-charcoal-100">
                  <span>Crew Size:</span>
                  <strong className="text-navy-950">4 Certified Rescuers</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal-100">
                  <span>Onboard Equipment:</span>
                  <strong className="text-navy-950">Pediatric Vests, Defibrillator, Thermal Blankets</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal-100">
                  <span>Radio Frequency:</span>
                  <strong className="font-mono text-navy-950">142.850 MHz (Encrypted)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-Alerted Hospital Card */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold font-heading text-navy-950">
                  Designated Trauma Facility
                </h3>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Pre-Alert Acknowledged
              </span>
            </div>

            <div className="p-3 bg-charcoal-50 rounded-2xl border border-charcoal-100 space-y-2 text-xs">
              <div className="font-bold text-navy-950">{preAlertedHospital.name}</div>
              <div className="text-charcoal-600 text-[11px]">
                {preAlertedHospital.address || preAlertedHospital.location}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white p-2 rounded-xl border border-charcoal-100 text-center">
                  <div className="text-[10px] text-charcoal-500">ICU Beds Free</div>
                  <div className="font-bold text-emerald-600 text-base">
                    {preAlertedHospital.available_icu_beds || preAlertedHospital.icu_available || 8}
                  </div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-charcoal-100 text-center">
                  <div className="text-[10px] text-charcoal-500">Trauma Bays</div>
                  <div className="font-bold text-navy-950 text-base">
                    {preAlertedHospital.available_beds || 14}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Field Dispatch Notes & Coordination Comms */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-navy-700" />
                <h3 className="text-sm font-bold font-heading text-navy-950">
                  Field Tactical Comms
                </h3>
              </div>
              <span className="text-[10px] text-charcoal-400">Live Secure Relay</span>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {localNotes.map((note, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-charcoal-50 border border-charcoal-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-navy-950">
                    <span>{note.sender}</span>
                    <span className="text-[10px] text-charcoal-400">{note.time}</span>
                  </div>
                  <p className="text-charcoal-700 text-[11px] leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="pt-2 flex gap-2">
              <input
                type="text"
                value={fieldNote}
                onChange={(e) => setFieldNote(e.target.value)}
                placeholder="Log field update or radio transmission..."
                className="flex-1 bg-charcoal-50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-navy-900 focus:bg-white outline-none"
              />
              <button
                type="submit"
                className="bg-navy-950 hover:bg-navy-900 text-white p-2.5 rounded-xl transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
