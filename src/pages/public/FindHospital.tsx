import React, { useState } from 'react';
import { Activity, MapPin, HeartPulse, ShieldAlert, Search, Filter } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FindHospital: React.FC = () => {
  const { hospitals } = useData();
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredHospitals = hospitals.filter((h) => {
    if (selectedCity !== 'All' && h.city !== selectedCity) return false;
    if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Activity className="w-3.5 h-3.5 text-green-700" />
          <span>Trauma &amp; Clinical Reception Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
          Emergency Hospital Capacity Directory
        </h1>
        <p className="text-charcoal-600 text-sm mt-2">
          Real-time bed availability, ICU readiness, active ventilators, and blood bank levels across major tertiary medical centers in Pakistan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by hospital name or clinical facility..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-transparent focus:outline-none text-charcoal-800"
          />
        </div>

        <div className="flex items-center space-x-1.5 text-xs">
          <span className="text-charcoal-500 font-semibold">City:</span>
          {['All', 'Lahore', 'Karachi', 'Rawalpindi', 'Islamabad', 'Multan'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedCity === c ? 'bg-navy-900 text-white' : 'bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

      </div>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hosp) => {
          return (
            <div
              key={hosp.id}
              className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 flex flex-col justify-between hover:shadow-elevated transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-navy-700 bg-navy-50 px-2 py-0.5 rounded">
                    {hosp.city}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    hosp.emergency_status === 'normal'
                      ? 'bg-green-100 text-green-800'
                      : hosp.emergency_status === 'high_pressure'
                      ? 'bg-emergency-100 text-emergency-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {hosp.emergency_status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="font-bold text-base text-navy-950 mb-1">{hosp.name}</h3>
                <div className="flex items-center space-x-1.5 text-xs text-charcoal-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-charcoal-400" />
                  <span className="truncate">{hosp.location}</span>
                </div>

                {/* Clinical Beds Metric Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100">
                    <span className="text-[10px] text-charcoal-500 block">Available Emergency Beds</span>
                    <span className="font-bold text-base text-navy-950">{hosp.available_beds}</span>
                    <span className="text-[10px] text-charcoal-400"> / {hosp.emergency_capacity} cap</span>
                  </div>

                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100">
                    <span className="text-[10px] text-charcoal-500 block">ICU Beds / Ventilators</span>
                    <span className="font-bold text-base text-green-700">{hosp.icu_beds}</span>
                    <span className="text-[10px] text-charcoal-400"> / {hosp.ventilators} Vents</span>
                  </div>
                </div>

                {/* Blood Bank Units */}
                <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100 mb-4 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <HeartPulse className="w-4 h-4 text-emergency-600" />
                    <span className="font-semibold text-charcoal-700">Blood Bank Reserves:</span>
                  </div>
                  <span className="font-bold text-navy-950">{hosp.blood_units} Units</span>
                </div>

                {/* Clinical Capabilities Tags */}
                <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-charcoal-600 mb-4">
                  {hosp.capabilities.map((cap) => (
                    <span key={cap} className="bg-charcoal-100 px-2 py-0.5 rounded capitalize">
                      {cap.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs">
                <span className="text-charcoal-400 text-[11px]">Direct ambulance bay triage</span>
                <button
                  onClick={() => alert(`Ambulance reception contact for ${hosp.name} initiated.`)}
                  className="font-bold text-navy-900 hover:text-emergency-600 transition-colors"
                >
                  Contact Desk &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
