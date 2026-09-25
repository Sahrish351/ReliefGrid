import React, { useState } from 'react';
import {
  Activity,
  MapPin,
  HeartPulse,
  ShieldAlert,
  Search,
  Filter,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Droplet,
  Bed,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

export const FindHospital: React.FC = () => {
  const { hospitals } = useData();
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredHospitals = hospitals.filter((h) => {
    if (selectedCity !== 'All' && h.city !== selectedCity) return false;
    if (
      searchQuery &&
      !h.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !h.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hospitals.hero}
            alt="Emergency hospital trauma center ambulance bay and medical facilities"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              CLINICAL TRAUMA NETWORK &bull; LIVE ICU CAPACITY
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Emergency Hospital Capacity Directory.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              Real-time ICU trauma beds, active ventilators, blood bank reserves, and clinical pre-alert routing across Pakistan&apos;s primary tertiary care centers.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & CITY FILTER CONSOLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-charcoal-200 rounded-2xl p-5 shadow-card space-y-4">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex items-center space-x-3 w-full lg:w-96 bg-charcoal-50 px-4 py-3 rounded-xl border border-charcoal-200">
              <Search className="w-5 h-5 text-charcoal-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by hospital name or medical specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-navy-950"
              />
            </div>

            {/* City Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {['All', 'Lahore', 'Karachi', 'Rawalpindi', 'Islamabad', 'Multan'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCity === c
                      ? 'bg-navy-950 text-white shadow-sm'
                      : 'bg-charcoal-100 text-charcoal-700 hover:text-navy-950'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-charcoal-500 pt-2 border-t border-charcoal-100 font-mono">
            <span>Showing {filteredHospitals.length} tertiary care facilities</span>
            <span>Real-time pre-alert link active &bull; Synthetic demo data</span>
          </div>

        </div>
      </section>

      {/* 3. HOSPITAL CARDS (Spacious Editorial Cards) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.map((h, idx) => {
            const hasFreeBeds = h.available_beds > 0;
            const icuCount = h.icu_beds ?? h.icu_available ?? 0;
            const hasFreeIcu = icuCount > 0;
            const traumaStatus = h.trauma_level || h.emergency_status.replace('_', ' ').toUpperCase();
            const vents = h.ventilators ?? h.ventilators_available ?? 0;
            const blood = h.blood_units ?? h.blood_units_available ?? 0;
            const phone = h.contact_phone || '+92 42 9923 1122';

            const cardPhotos = [
              IMAGES.hospitals.clinicalTeam,
              IMAGES.hospitals.icuMonitoring,
              IMAGES.hospitals.diagnostics,
            ];
            const cardImg = cardPhotos[idx % cardPhotos.length];

            return (
              <div
                key={h.id}
                className="bg-white border border-charcoal-200 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-48 overflow-hidden bg-navy-950">
                    <img
                      src={cardImg}
                      alt={`Emergency facilities at ${h.name}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>

                    <div className="absolute top-3 left-3">
                      <span className="bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded">
                        {h.city}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                      <span>{traumaStatus}</span>
                      <span className={hasFreeIcu ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {icuCount} ICU Beds Open
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-navy-950">
                        {h.name}
                      </h3>
                      <div className="text-xs text-charcoal-500 flex items-center space-x-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0" />
                        <span>{h.location}</span>
                      </div>
                    </div>

                    {/* Metric Badges */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-100">
                        <div className="text-[10px] text-charcoal-500 uppercase font-mono">Total Beds</div>
                        <div className="font-bold text-navy-950 mt-0.5">{h.available_beds} Open</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-100">
                        <div className="text-[10px] text-charcoal-500 uppercase font-mono">Ventilators</div>
                        <div className="font-bold text-emerald-700 mt-0.5">{vents} Ready</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-100">
                        <div className="text-[10px] text-charcoal-500 uppercase font-mono">Blood Bank</div>
                        <div className="font-bold text-navy-950 mt-0.5">{blood} Units</div>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-charcoal-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <PhoneCall className="w-3.5 h-3.5 text-emergency-600" />
                        <span>Trauma Reception: <strong className="text-navy-950">{phone}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link
                    to="/emergency-map"
                    className="w-full flex items-center justify-center space-x-2 bg-navy-950 hover:bg-navy-900 text-white font-bold py-3 rounded-xl text-xs transition-colors"
                  >
                    <span>View Hospital on Live Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
