import React, { useState } from 'react';
import { Activity, HeartPulse, Bed, ShieldAlert, Plus, Minus, AlertCircle, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const HospitalPortal: React.FC = () => {
  const { hospitals, updateHospitalCapacity } = useData();
  const activeHospital = hospitals[0]; // Mayo Hospital Trauma Complex

  const [availableBeds, setAvailableBeds] = useState(activeHospital?.available_beds || 34);

  const handleAdjustBeds = (delta: number) => {
    const updated = Math.max(0, availableBeds + delta);
    setAvailableBeds(updated);
    if (activeHospital) {
      updateHospitalCapacity(activeHospital.id, delta);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200 shadow-card flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5 text-green-700" />
            <span>Emergency Trauma Center Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
            {activeHospital?.name || 'Mayo Hospital Emergency Complex'}
          </h1>
          <p className="text-xs text-charcoal-500">
            Level-1 Trauma &amp; Pediatric Emergency Facility • Location: {activeHospital?.location}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase bg-green-100 text-green-800 px-3 py-1.5 rounded-xl">
            Emergency Bay: Open (Normal Flow)
          </span>
        </div>
      </div>

      {/* Real-time Capacity Control Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Available Beds with Live Stepper */}
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Available Beds</span>
            <Bed className="w-4 h-4 text-navy-700" />
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">{availableBeds}</div>
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => handleAdjustBeds(-1)}
              className="flex-1 bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 p-1.5 rounded-lg text-xs font-bold flex items-center justify-center"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleAdjustBeds(1)}
              className="flex-1 bg-navy-900 hover:bg-navy-800 text-white p-1.5 rounded-lg text-xs font-bold flex items-center justify-center"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">ICU Beds</span>
            <HeartPulse className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">{activeHospital?.icu_beds || 8}</div>
          <span className="text-[11px] text-green-700 font-semibold">Ready for critical casualty intake</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Ventilators Active</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">{activeHospital?.ventilators || 6}</div>
          <span className="text-[11px] text-charcoal-500">2 standby units tested</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Blood Bank</span>
            <HeartPulse className="w-4 h-4 text-emergency-600" />
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">{activeHospital?.blood_units || 82}</div>
          <span className="text-[11px] text-charcoal-500">O-Negative: 12 Units Reserve</span>
        </div>

      </div>

      {/* Incoming Emergency Cases / Pre-Alerts (04_RELIEFGRID_UI_UX.md section 13) */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-emergency-600" />
            <h3 className="font-bold text-base text-navy-950">Incoming Casualty Pre-Alerts</h3>
          </div>
          <span className="text-xs font-mono text-charcoal-400">Live Ambulance Bay Inbound</span>
        </div>

        <div className="space-y-3">
          {/* Incoming Case from Demo Scenario */}
          <div className="p-4 rounded-xl border border-emergency-200 bg-emergency-50/50 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold bg-emergency-100 text-emergency-800 px-2 py-0.5 rounded">
                  INBOUND • RG-1042
                </span>
                <span className="text-xs font-bold text-navy-950">Extraction from Shahdara Floodway</span>
              </div>
              <p className="text-xs text-charcoal-700">
                1 Infant (7 months, hypothermia risk) &amp; 1 Elderly (68 yrs, COPD on supplemental oxygen). Transported by Rescue M-04.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-charcoal-500 block uppercase font-bold">Estimated Arrival</span>
              <span className="text-base font-extrabold text-emergency-600 font-mono">18 minutes</span>
              <button
                onClick={() => alert('Pediatric bay and Oxygen port reserved for RG-1042.')}
                className="mt-1 bg-emergency-600 hover:bg-emergency-700 text-white font-bold text-[11px] px-3 py-1 rounded-lg block"
              >
                Acknowledge Pre-Alert
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-charcoal-200 bg-charcoal-50 flex items-center justify-between text-xs">
            <div>
              <span className="font-mono font-bold text-charcoal-500 mr-2">INBOUND • RG-1049</span>
              <span className="font-bold text-navy-950">Ring Road Multi-Vehicle Trauma</span>
              <div className="text-charcoal-500 text-[11px] mt-0.5">2 adult orthopedics cases. En route via Ambulance A-01.</div>
            </div>
            <span className="font-bold text-charcoal-700 font-mono">ETA 25 min</span>
          </div>
        </div>
      </div>

    </div>
  );
};
