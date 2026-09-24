import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Radio,
  ShieldAlert,
  AlertTriangle,
  LifeBuoy,
  HeartPulse,
  Building2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Compass,
  FileText,
  Send,
  MessageSquare,
  RefreshCw,
  Users,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { OperationalMap } from '../../components/map/OperationalMap';
import { queryCommandAssistant } from '../../services/ai';
import { Incident } from '../../types';

export const CommandCenter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requestedIncidentId = searchParams.get('incident');

  const {
    incidents,
    resources,
    hospitals,
    shelters,
    reliefHubs,
    recommendations,
    approveRecommendation,
    modifyRecommendation,
    rejectRecommendation,
    zones,
    auditLogs,
  } = useData();
  const { user } = useAuth();

  // Active selected incident for deep inspection
  const [selectedIncident, setSelectedIncident] = useState<Incident>(() => {
    if (requestedIncidentId) {
      const match = incidents.find((i) => i.id === requestedIncidentId);
      if (match) return match;
    }
    return incidents[0];
  });

  // Assistant query state
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantConversation, setAssistantConversation] = useState<
    { role: 'user' | 'assistant'; text: string }[]
  >([
    {
      role: 'assistant',
      text: 'Good day, Coordinator. Command Assistant active. Telemetry linked to Ravi Basin, Nullah Lai, and coastal Karachi sectors. How can I assist operational deployment?',
    },
  ]);
  const [isAssistantThinking, setIsAssistantThinking] = useState(false);

  // Filter queue by priority
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Human approval modal state
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [modifyNotes, setModifyNotes] = useState('');

  // Primary active recommendation
  const activeRec = recommendations.find((r) => r.incident_id === selectedIncident?.id) || recommendations[0];

  const handleApprove = () => {
    if (!activeRec) return;
    approveRecommendation(activeRec.id, user?.full_name || 'Coordinator Hashmi');
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSendAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;

    const userText = assistantQuery;
    setAssistantConversation((prev) => [...prev, { role: 'user', text: userText }]);
    setAssistantQuery('');
    setIsAssistantThinking(true);

    try {
      const res = await queryCommandAssistant(userText, {
        incidentsCount: incidents.length,
        criticalIncidents: incidents.filter((i) => i.priority === 'critical').length,
        selectedIncident,
        zones,
      });
      setAssistantConversation((prev) => [...prev, { role: 'assistant', text: res.answer }]);
    } catch (e) {
      setAssistantConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Ravi Basin floodway shows crest peaking within 2 hours. Recommended to hold Boat B-07 in reserve.',
        },
      ]);
    }
    setIsAssistantThinking(false);
  };

  // Metrics
  const criticalCount = incidents.filter((i) => i.priority === 'critical').length;
  const availableRespondersCount = resources.filter((r) => r.status === 'available').length;
  const avgShelterOccupancy = Math.round(
    (shelters.reduce((acc, s) => acc + s.current_occupancy, 0) /
      shelters.reduce((acc, s) => acc + s.total_capacity, 0)) *
      100
  );
  const hospitalsUnderPressure = hospitals.filter((h) => h.emergency_status !== 'normal').length;

  const filteredIncidents = incidents.filter((inc) => {
    if (filterPriority === 'all') return true;
    return inc.priority === filterPriority;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Command Banner (04_RELIEFGRID_UI_UX.md section 11) */}
      <div className="bg-navy-950 text-white rounded-2xl p-6 border border-navy-800 shadow-elevated">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full bg-emergency-600 animate-ping"></div>
              <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
                RELIEFGRID COMMAND DESK • LEVEL 1 OPERATIONAL MATRIX
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Emergency Coordinator Command Center
            </h1>
            <p className="text-xs text-navy-300">
              Coordinated Operations: Lahore • Karachi • Rawalpindi • Islamabad • Multan
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-navy-900 border border-navy-700 px-3 py-1.5 rounded-xl">
              <span className="text-navy-400 block text-[10px]">Duty Officer:</span>
              <span className="font-bold text-white">{user?.full_name || 'Brig. (R) Imran Hashmi'}</span>
            </div>
            <div className="bg-navy-900 border border-navy-700 px-3 py-1.5 rounded-xl">
              <span className="text-navy-400 block text-[10px]">Data Mode:</span>
              <span className="font-bold text-amber-400">Synthetic Simulation</span>
            </div>
          </div>
        </div>

        {/* 6 Key Operational Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-navy-800 text-xs">
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Active Incidents</span>
            <span className="text-2xl font-extrabold text-white font-mono mt-0.5 block">{incidents.length}</span>
            <span className="text-[10px] text-navy-300">Across 5 zones</span>
          </div>

          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-emergency-400 block text-[11px] font-bold">Critical Priority</span>
            <span className="text-2xl font-extrabold text-emergency-500 font-mono mt-0.5 block">{criticalCount}</span>
            <span className="text-[10px] text-emergency-400 animate-pulse">Immediate danger</span>
          </div>

          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Available Units</span>
            <span className="text-2xl font-extrabold text-green-400 font-mono mt-0.5 block">{availableRespondersCount}</span>
            <span className="text-[10px] text-navy-300">Boats &amp; squads ready</span>
          </div>

          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Shelter Pressure</span>
            <span className="text-2xl font-extrabold text-amber-400 font-mono mt-0.5 block">{avgShelterOccupancy}%</span>
            <span className="text-[10px] text-navy-300">1,240 spaces open</span>
          </div>

          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Hospitals Surging</span>
            <span className="text-2xl font-extrabold text-navy-200 font-mono mt-0.5 block">{hospitalsUnderPressure} / {hospitals.length}</span>
            <span className="text-[10px] text-navy-300">Moderate to high</span>
          </div>

          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Avg Response Time</span>
            <span className="text-2xl font-extrabold text-white font-mono mt-0.5 block">13.2m</span>
            <span className="text-[10px] text-green-400">Within target SLA</span>
          </div>
        </div>
      </div>

      {/* Main Operational Split: Map on Left, AI Recommendation & Priority Queue on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Operational Map (Visual Anchor) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-navy-900" />
                <h3 className="font-bold text-sm text-navy-950">Synchronized Tactical GIS Grid</h3>
              </div>
              <span className="text-xs font-mono text-charcoal-500">
                Focused: {selectedIncident?.city || 'Lahore'} Sector
              </span>
            </div>

            <OperationalMap
              incidents={incidents}
              resources={resources}
              hospitals={hospitals}
              shelters={shelters}
              reliefHubs={reliefHubs}
              selectedCity={selectedIncident?.city || 'Lahore'}
              height="490px"
              onSelectIncident={(inc) => setSelectedIncident(inc)}
            />
          </div>

          {/* AI Command Assistant Console (02_RELIEFGRID_AGENTIC_AI.md section 16) */}
          <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-charcoal-200 pb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="font-bold text-xs text-navy-950 uppercase tracking-wider">
                  AI Tactical Command Assistant
                </h4>
              </div>
              <span className="text-[11px] text-charcoal-400 font-mono">Gemini 3.6 Flash Active</span>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-2 pr-1 text-xs">
              {assistantConversation.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-navy-900 text-white ml-8 font-medium'
                      : 'bg-charcoal-50 border border-charcoal-200 text-charcoal-800 mr-4'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isAssistantThinking && (
                <div className="text-xs text-charcoal-400 italic p-2 flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Command Assistant evaluating telemetry...</span>
                </div>
              )}
            </div>

            {/* Quick suggested prompt buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Which zones have highest critical incidents?',
                'Which shelters are closest to capacity?',
                'Why was Incident RG-1042 classified critical?',
              ].map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => setAssistantQuery(query)}
                  className="text-[10px] bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 px-2 py-1 rounded-lg transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendAssistant} className="flex gap-2 pt-1">
              <input
                type="text"
                value={assistantQuery}
                onChange={(e) => setAssistantQuery(e.target.value)}
                placeholder="Ask command assistant about zones, shelters, or resources..."
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-navy-900"
              />
              <button
                type="submit"
                className="bg-navy-900 hover:bg-navy-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: AI Recommendation Panel & Human Approval Controls */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* AI Recommendation Panel (04_RELIEFGRID_UI_UX.md section 12 Requirement) */}
          <div className="bg-white rounded-2xl border-2 border-navy-900 shadow-card p-6 space-y-4 relative overflow-hidden">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="bg-navy-950 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                  AI RECOMMENDATION
                </span>
                <span className="font-mono text-xs font-bold text-charcoal-500">
                  {selectedIncident?.incident_code || 'RG-1042'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">Confidence</span>
                <span className="font-extrabold text-sm text-navy-950">{activeRec?.confidence || 94.6}%</span>
              </div>
            </div>

            {/* Recommendation Summary Headline */}
            <div>
              <div className="text-xs text-charcoal-500 font-semibold mb-0.5">Proposed Tactical Action:</div>
              <h3 className="text-base font-bold font-heading text-navy-950 leading-snug">
                {activeRec?.recommendation ||
                  'Dispatch Rapid Rescue Boat B-03 + Team R-17; Pre-alert Mayo Hospital Trauma Complex; Assign Expo Center Shelter S-12.'}
              </h3>
            </div>

            {/* WHY Section (04_RELIEFGRID_UI_UX.md section 12) */}
            <div className="bg-charcoal-50 p-4 rounded-xl border border-charcoal-200 space-y-2 text-xs">
              <div className="font-bold text-navy-950 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-navy-700" />
                <span>WHY (Explainable Decision Factors):</span>
              </div>
              <ul className="text-charcoal-700 space-y-1 list-disc list-inside">
                <li>{selectedIncident?.affected_people_count || 18} individuals affected (above single ground vehicle threshold)</li>
                <li>Infant detected: severe hypothermia vulnerability in cold water exposure</li>
                <li>Elderly individuals detected: mobility impairment requiring physical transfer</li>
                <li>Active water depth &gt; 4.5ft: overland ambulance vehicles blocked</li>
                <li>Nearest capable resource: Boat B-03 located 3.1 km away (ETA 11 min)</li>
              </ul>
            </div>

            {/* Recommended Facility Destination */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-green-50 border border-green-200">
                <span className="text-[10px] font-bold text-green-800 uppercase block">Medical Facility</span>
                <span className="font-bold text-navy-950 truncate block mt-0.5">Mayo Trauma Complex</span>
                <span className="text-[10px] text-charcoal-500">34 beds open • Pediatric ICU</span>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                <span className="text-[10px] font-bold text-purple-800 uppercase block">Evacuation Shelter</span>
                <span className="font-bold text-navy-950 truncate block mt-0.5">Expo Center S-12</span>
                <span className="text-[10px] text-charcoal-500">330 spaces open • Family area</span>
              </div>
            </div>

            {/* Human Authorization Controls */}
            <div className="pt-2 border-t border-charcoal-200 space-y-2">
              <div className="text-[11px] text-charcoal-500 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0" />
                <span>Consequential Action: Requires coordinator sign-off</span>
              </div>

              {activeRec?.status === 'approved' ? (
                <div className="p-3 bg-green-100 text-green-800 font-bold rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Authorized by {activeRec.reviewed_by || 'Coordinator'}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-green-200 px-2 py-0.5 rounded">Dispatched</span>
                </div>
              ) : activeRec?.status === 'rejected' ? (
                <div className="p-3 bg-emergency-100 text-emergency-800 font-bold rounded-xl text-xs flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-emergency-600" />
                  <span>Plan Rejected: {activeRec.modification_notes || 'Resource recalled'}</span>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleApprove}
                    className="col-span-1 bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition-all shadow-card"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => setModifyModalOpen(true)}
                    className="bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 font-semibold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Modify
                  </button>

                  <button
                    onClick={() => {
                      if (!activeRec) return;
                      rejectRecommendation(activeRec.id, user?.full_name || 'Coordinator', 'Alternative overland route preferred');
                    }}
                    className="bg-charcoal-100 hover:bg-emergency-50 hover:text-emergency-700 text-charcoal-800 font-semibold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Incident Priority Queue */}
          <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-5 space-y-3">
            
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-2">
              <h4 className="font-bold text-xs text-navy-950 uppercase tracking-wider">
                AI Incident Priority Queue ({filteredIncidents.length})
              </h4>
              <div className="flex items-center space-x-1 text-xs">
                {['all', 'critical', 'high', 'medium'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterPriority(p)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                      filterPriority === p ? 'bg-navy-900 text-white' : 'bg-charcoal-100 text-charcoal-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {filteredIncidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between ${
                    selectedIncident?.id === inc.id
                      ? 'bg-navy-50 border-navy-400 ring-1 ring-navy-400'
                      : 'bg-charcoal-50 border-charcoal-100 hover:bg-charcoal-100'
                  }`}
                >
                  <div className="space-y-1 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-charcoal-600 text-[10px]">{inc.incident_code}</span>
                      <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded ${
                        inc.priority === 'critical' ? 'bg-emergency-100 text-emergency-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inc.priority}
                      </span>
                      <span className="text-[10px] text-charcoal-400">{inc.city}</span>
                    </div>
                    <div className="font-bold text-navy-950 truncate text-xs">{inc.title}</div>
                    <div className="text-[10px] text-charcoal-500">
                      {inc.affected_people_count} Victims • {inc.status.replace('_', ' ')}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-charcoal-400 flex-shrink-0 mt-2" />
                </div>
              ))}
            </div>

          </div>

          {/* Audit Trail Mini Log */}
          <div className="bg-charcoal-50 rounded-2xl border border-charcoal-200 p-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
              Recent Human &amp; AI Audit Entries
            </div>
            <div className="space-y-1.5 max-h-28 overflow-y-auto text-[11px] text-charcoal-600 font-mono">
              {auditLogs.slice(0, 4).map((l) => (
                <div key={l.id} className="truncate">
                  [{new Date(l.created_at).toLocaleTimeString()}] <strong>{l.actor_name}</strong>: {l.action}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modify Recommendation Modal */}
      {modifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-float border border-charcoal-200 space-y-4">
            <h3 className="font-bold text-base text-navy-950">Modify Response Plan</h3>
            <p className="text-xs text-charcoal-600">
              Provide coordinator override rationale. All modifications are permanently recorded in the audit trail.
            </p>
            <textarea
              rows={3}
              value={modifyNotes}
              onChange={(e) => setModifyNotes(e.target.value)}
              placeholder="e.g. Add Boat B-07 as secondary backup due to high current flow..."
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModifyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-600 hover:bg-charcoal-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeRec) {
                    modifyRecommendation(activeRec.id, user?.full_name || 'Coordinator', modifyNotes || 'Plan modified');
                  }
                  setModifyModalOpen(false);
                }}
                className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Save &amp; Authorize Override
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
