import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  LifeBuoy,
  HeartPulse,
  Building2,
  Users,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Incident } from '../../types';

export const TrackEmergency: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || 'RG-1042';
  const [searchCode, setSearchCode] = useState(initialCode);
  const { incidents, notifications } = useData();

  const [activeIncident, setActiveIncident] = useState<Incident | null>(() => {
    return incidents.find((i) => i.incident_code.toLowerCase() === initialCode.toLowerCase()) || incidents[0];
  });

  useEffect(() => {
    if (searchCode) {
      const match = incidents.find((i) => i.incident_code.toLowerCase() === searchCode.trim().toLowerCase());
      if (match) setActiveIncident(match);
    }
  }, [searchCode, incidents]);

  const STAGES = [
    { key: 'reported', label: 'Reported' },
    { key: 'verification', label: 'Verification' },
    { key: 'prioritized', label: 'Prioritized' },
    { key: 'resource_matching', label: 'Resource Matching' },
    { key: 'response_planning', label: 'Response Plan' },
    { key: 'awaiting_approval', label: 'Awaiting Approval' },
    { key: 'dispatched', label: 'Dispatched' },
    { key: 'en_route', label: 'Responder En Route' },
    { key: 'on_scene', label: 'Help Arrived' },
    { key: 'resolved', label: 'Resolved' },
  ];

  const getCurrentStageIndex = (status: string) => {
    const idx = STAGES.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 5; // default awaiting approval if matching
  };

  const currentIdx = activeIncident ? getCurrentStageIndex(activeIncident.status) : 5;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Code Search */}
      <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600 block mb-1">
              Live Mission Tracker
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
              Track Emergency Status
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter RG code (e.g. RG-1042)"
                className="bg-charcoal-50 border border-charcoal-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900 uppercase"
              />
            </div>
            <button
              onClick={() => {
                const match = incidents.find((i) => i.incident_code.toLowerCase() === searchCode.trim().toLowerCase());
                if (match) setActiveIncident(match);
              }}
              className="bg-navy-900 hover:bg-navy-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {activeIncident ? (
        <div className="space-y-6">
          
          {/* Main Status Hero Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200 shadow-card space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-200 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-mono font-bold bg-navy-100 text-navy-950 px-3 py-1 rounded-lg">
                  {activeIncident.incident_code}
                </span>
                <span className={`text-xs font-extrabold uppercase px-2.5 py-1 rounded-md ${
                  activeIncident.priority === 'critical' ? 'bg-emergency-100 text-emergency-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeIncident.priority} PRIORITY (SCORE: {activeIncident.priority_score})
                </span>
              </div>

              <div className="text-xs text-charcoal-500 font-mono">
                Updated: {new Date(activeIncident.updated_at).toLocaleTimeString()}
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-950">
                {activeIncident.title}
              </h2>
              <p className="text-sm text-charcoal-700 mt-2 leading-relaxed">
                {activeIncident.description}
              </p>
              <div className="flex items-center space-x-2 text-xs font-medium text-charcoal-500 mt-3">
                <MapPin className="w-4 h-4 text-emergency-600 flex-shrink-0" />
                <span>{activeIncident.location_text} ({activeIncident.city})</span>
              </div>
            </div>

            {/* 10-Step Progress Timeline (04_RELIEFGRID_UI_UX.md Requirement) */}
            <div className="pt-4">
              <div className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-4">
                Operational Lifecycle Progress
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {STAGES.map((stg, i) => {
                  const isDone = i <= currentIdx;
                  const isCurrent = i === currentIdx;

                  return (
                    <div
                      key={stg.key}
                      className={`p-2.5 rounded-xl border text-xs transition-all ${
                        isCurrent
                          ? 'bg-emergency-50 border-emergency-500 text-emergency-900 font-bold shadow-xs'
                          : isDone
                          ? 'bg-navy-50 border-navy-300 text-navy-950 font-semibold'
                          : 'bg-charcoal-50 border-charcoal-200 text-charcoal-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono">0{i + 1}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-charcoal-400" />
                        )}
                      </div>
                      <div className="text-[11px] leading-tight truncate">{stg.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tactical Rescue Coordination Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-charcoal-200">
              
              <div className="p-4 rounded-xl bg-charcoal-50 border border-charcoal-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-navy-950 mb-1">
                  <LifeBuoy className="w-4 h-4 text-navy-700" />
                  <span>Assigned Unit</span>
                </div>
                <div className="text-sm font-bold text-navy-950">
                  {activeIncident.assigned_resource_name || 'Rapid Boat B-03 + Team R-17'}
                </div>
                <div className="text-xs text-charcoal-500 mt-1">Status: Dispatched (ETA 11 min)</div>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-50 border border-charcoal-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-navy-950 mb-1">
                  <HeartPulse className="w-4 h-4 text-green-700" />
                  <span>Medical Readiness</span>
                </div>
                <div className="text-sm font-bold text-navy-950">Mayo Trauma Complex</div>
                <div className="text-xs text-charcoal-500 mt-1">Pediatric bed &amp; oxygen ready</div>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-50 border border-charcoal-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-navy-950 mb-1">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span>Shelter Destination</span>
                </div>
                <div className="text-sm font-bold text-navy-950">Expo Center Shelter S-12</div>
                <div className="text-xs text-charcoal-500 mt-1">330 spaces open (Family Wing)</div>
              </div>

            </div>

            {/* AI Status Explanation Notice (04_RELIEFGRID_UI_UX.md section 9) */}
            <div className="bg-navy-900 text-white rounded-xl p-4 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wider block">
                  AI Real-Time Mission Explanation
                </span>
                <p className="text-navy-200 leading-relaxed">
                  Mission was prioritized as Critical due to 18 persons trapped in rising water above 4.5ft with 1 infant and 2 elderly persons. Ground ambulances cannot traverse the submerged road, so shallow-draft rescue craft B-03 was authorized by the Command Center.
                </p>
              </div>
            </div>

          </div>

          {/* Citizen In-App Advice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-950 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Safety Advice for Trapped Evacuees:</span>
            </div>
            <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
              <li>Remain on the highest dry structural floor or roof. Do NOT attempt to walk through fast-moving water.</li>
              <li>Keep the infant wrapped warm in dry blankets or clothes to prevent hypothermia.</li>
              <li>Conserve phone battery. If water rises further, signal with a bright cloth or flashlight.</li>
              <li>Rescue Boat B-03 has acoustic sirens and searchlights enabled.</li>
            </ul>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-charcoal-200">
          <ShieldAlert className="w-12 h-12 text-charcoal-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-navy-950">No Incident Found</h3>
          <p className="text-xs text-charcoal-500 mt-1">
            Please enter a valid incident code (e.g. RG-1042) to track live rescue status.
          </p>
        </div>
      )}

    </div>
  );
};
