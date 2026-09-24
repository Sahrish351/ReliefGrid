import React, { useState } from 'react';
import { LifeBuoy, MapPin, CheckCircle2, Clock, Navigation, AlertTriangle, Users } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { OperationalMap } from '../../components/map/OperationalMap';
import { useAuth } from '../../context/AuthContext';

export const ResponderPortal: React.FC = () => {
  const { user } = useAuth();
  const { incidents, resources, updateIncidentStatus, hospitals, shelters, reliefHubs } = useData();

  // Active missions
  const activeMissions = incidents.filter((i) => i.priority === 'critical' || i.status === 'dispatched' || i.status === 'en_route');

  const [selectedMission, setSelectedMission] = useState(activeMissions[0] || incidents[0]);

  const handleUpdateStatus = (missionId: string, nextStatus: any) => {
    updateIncidentStatus(missionId, nextStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="bg-navy-950 text-white rounded-2xl p-6 border border-navy-800 shadow-elevated">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-navy-900 border border-navy-700 px-3 py-1 rounded-full text-xs font-bold text-amber-400 mb-1">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Rescue 1122 Tactical Unit Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Rescue Responder Mission Queue
            </h1>
            <p className="text-xs text-navy-300">
              Unit: <strong>Rapid Flood Rescue Boat B-03 + Team R-17</strong> • Base: Shahdara Staging Pier
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-bold text-white uppercase tracking-wider">Unit Status: Ready for Tasking</span>
          </div>
        </div>

        {/* 4 Metric counters (04_RELIEFGRID_UI_UX.md section 10) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-navy-800 text-xs">
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Active Missions</span>
            <span className="text-2xl font-mono font-bold text-white mt-0.5 block">{activeMissions.length}</span>
          </div>
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Available Watercraft</span>
            <span className="text-2xl font-mono font-bold text-green-400 mt-0.5 block">
              {resources.filter((r) => r.status === 'available').length}
            </span>
          </div>
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">En Route</span>
            <span className="text-2xl font-mono font-bold text-amber-400 mt-0.5 block">
              {resources.filter((r) => r.status === 'en_route').length}
            </span>
          </div>
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-navy-400 block text-[11px]">Rescued Today</span>
            <span className="text-2xl font-mono font-bold text-white mt-0.5 block">142</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Mission List on Left, Map & Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Missions List */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold text-navy-950">Mission Dispatch Queue</h2>
          
          <div className="space-y-3">
            {activeMissions.map((mission) => {
              const isSelected = selectedMission?.id === mission.id;
              return (
                <div
                  key={mission.id}
                  onClick={() => setSelectedMission(mission)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-card space-y-3 ${
                    isSelected ? 'border-navy-900 ring-2 ring-navy-900/10' : 'border-charcoal-200 hover:border-charcoal-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-navy-950 bg-navy-100 px-2 py-0.5 rounded">
                      {mission.incident_code}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      mission.priority === 'critical' ? 'bg-emergency-100 text-emergency-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {mission.priority} Priority
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-navy-950">{mission.title}</h3>
                    <div className="flex items-center space-x-1.5 text-xs text-charcoal-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0" />
                      <span>{mission.location_text}</span>
                    </div>
                  </div>

                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100 text-xs space-y-0.5">
                    <div><strong>Payload:</strong> {mission.affected_people_count} individuals</div>
                    {mission.vulnerabilities.infants_count > 0 && (
                      <div className="text-emergency-700 font-bold">⚠️ Infant Present — Pediatric thermal kit required</div>
                    )}
                    {mission.vulnerabilities.elderly_count > 0 && (
                      <div className="text-amber-800 font-bold">⚠️ Elderly Persons — Oxygen &amp; stretcher needed</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-charcoal-100 text-xs">
                    <span className="text-charcoal-500">
                      Status: <strong className="uppercase text-navy-950">{mission.status.replace('_', ' ')}</strong>
                    </span>
                    <span className="font-bold text-emergency-600">ETA: ~11 min</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Mission Command Panel & Map */}
        <div className="lg:col-span-7 space-y-4">
          
          {selectedMission && (
            <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-charcoal-400">ACTIVE TARGET</span>
                  <h3 className="text-lg font-bold text-navy-950">{selectedMission.title}</h3>
                </div>
                <span className="text-xs font-mono font-bold bg-navy-100 text-navy-950 px-2.5 py-1 rounded-lg">
                  {selectedMission.incident_code}
                </span>
              </div>

              {/* Status Action Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider block">
                  Update Mission Status
                </span>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => handleUpdateStatus(selectedMission.id, 'en_route')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      selectedMission.status === 'en_route'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-charcoal-50 border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100'
                    }`}
                  >
                    1. En Route
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedMission.id, 'on_scene')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      selectedMission.status === 'on_scene'
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                        : 'bg-charcoal-50 border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100'
                    }`}
                  >
                    2. On Scene
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedMission.id, 'resolved')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      selectedMission.status === 'resolved'
                        ? 'bg-green-600 text-white border-green-700 shadow-xs'
                        : 'bg-charcoal-50 border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100'
                    }`}
                  >
                    3. Rescued
                  </button>

                  <button
                    onClick={() => alert(`Radio frequency 144.250 MHz linked to Base Shahdara.`)}
                    className="py-2 rounded-xl font-bold border border-charcoal-200 bg-charcoal-50 text-charcoal-700 hover:bg-charcoal-100 text-center"
                  >
                    Radio Base
                  </button>
                </div>
              </div>

              {/* Map Preview */}
              <div className="h-64 rounded-xl overflow-hidden border border-charcoal-200">
                <OperationalMap
                  incidents={[selectedMission]}
                  resources={resources}
                  hospitals={hospitals}
                  shelters={shelters}
                  reliefHubs={reliefHubs}
                  selectedCity={selectedMission.city}
                  height="100%"
                />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
