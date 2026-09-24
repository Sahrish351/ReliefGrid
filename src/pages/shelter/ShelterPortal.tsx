import React, { useState } from 'react';
import { Building2, Users, Droplets, Utensils, HeartPulse, Plus, CheckCircle2, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ShelterPortal: React.FC = () => {
  const { shelters, updateShelterCapacity } = useData();
  const activeShelter = shelters[0]; // Expo Center Shelter S-12

  const [occupancy, setOccupancy] = useState(activeShelter?.current_occupancy || 120);

  const handleIntakeFamily = (count: number) => {
    const updated = occupancy + count;
    setOccupancy(updated);
    if (activeShelter) {
      updateShelterCapacity(activeShelter.id, updated);
    }
  };

  const occupancyRate = Math.round((occupancy / (activeShelter?.total_capacity || 450)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200 shadow-card flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-purple-700" />
            <span>Evacuation Reception &amp; Housing Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
            {activeShelter?.name || 'Expo Center Emergency Relief Shelter S-12'}
          </h1>
          <p className="text-xs text-charcoal-500">
            Location: {activeShelter?.location} • Sector: Johar Town, Lahore
          </p>
        </div>

        <button
          onClick={() => handleIntakeFamily(4)}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-card flex items-center space-x-2 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Intake Family (4 Evacuees)</span>
        </button>
      </div>

      {/* Main Capacity & Supply Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Occupancy Card */}
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Occupancy Rate</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">
            {occupancy} <span className="text-sm font-normal text-charcoal-400">/ {activeShelter?.total_capacity || 450}</span>
          </div>
          <div className="w-full h-2 bg-charcoal-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${occupancyRate}%` }}></div>
          </div>
          <span className="text-[11px] text-green-700 font-semibold block pt-1">
            {(activeShelter?.total_capacity || 450) - occupancy} available beds
          </span>
        </div>

        {/* Drinking Water Buffer */}
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Drinking Water Buffer</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">96 <span className="text-sm font-normal text-charcoal-400">Hours</span></div>
          <span className="text-[11px] text-charcoal-500">24,000L filtered reserve tank active</span>
        </div>

        {/* Food Rations Buffer */}
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Dry Food Rations</span>
            <Utensils className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">120 <span className="text-sm font-normal text-charcoal-400">Hours</span></div>
          <span className="text-[11px] text-charcoal-500">Hot meals catered 3x daily</span>
        </div>

        {/* Medical Support Desk */}
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">On-Site Medical Desk</span>
            <HeartPulse className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-xl font-bold text-navy-950 mt-1">2 Doctors On Duty</div>
          <span className="text-[11px] text-green-700 font-semibold">Pediatric triage &amp; ORS active</span>
        </div>

      </div>

      {/* Incoming Evacuee Transits (04_RELIEFGRID_UI_UX.md section 14) */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 space-y-4">
        <h3 className="font-bold text-base text-navy-950">Scheduled Inbound Evacuee Groups</h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                  INCOMING • RG-1042
                </span>
                <span className="font-bold text-navy-950 text-xs">Shahdara Flood Rescued Group</span>
              </div>
              <p className="text-xs text-charcoal-700">
                18 Evacuees (4 children, 2 elderly, 1 infant). Assigned to Family Hall C.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">ETA</span>
              <span className="font-mono font-bold text-sm text-purple-900">22 min</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
