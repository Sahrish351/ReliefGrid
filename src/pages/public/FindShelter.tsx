import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Users,
  Droplets,
  Utensils,
  HeartPulse,
  Check,
  Filter,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { useData } from '../../context/DataContext';

export const FindShelter: React.FC = () => {
  const { shelters } = useData();
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [familyOnly, setFamilyOnly] = useState<boolean>(false);
  const [medicalOnly, setMedicalOnly] = useState<boolean>(false);

  const filteredShelters = shelters.filter((s) => {
    if (selectedCity !== 'All' && s.city !== selectedCity) return false;
    if (familyOnly && !s.family_area) return false;
    if (medicalOnly && !s.medical_support && !s.medical_station) return false;
    if (
      searchQuery &&
      !s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.location.toLowerCase().includes(searchQuery.toLowerCase())
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
            src={IMAGES.shelters.hero}
            alt="Humanitarian emergency shelter encampment and relief ground"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              SAFE HARBOR DIRECTORY &bull; LIVE CAPACITY
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Find Verified Safe Evacuation Shelters.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              Real-time shelter bed counts, clean drinking water reserves, food ration caches, and dedicated family quarters across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONSOLE */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-white border border-charcoal-200 rounded-2xl p-5 shadow-card space-y-4">
          
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="flex items-center space-x-3 w-full lg:w-96 bg-charcoal-50 px-4 py-3 rounded-xl border border-charcoal-200">
              <Search className="w-5 h-5 text-charcoal-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by shelter name, zone, or street..."
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

            {/* Checkbox Toggles */}
            <div className="flex items-center space-x-4 w-full lg:w-auto text-xs font-semibold text-charcoal-700">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={familyOnly}
                  onChange={(e) => setFamilyOnly(e.target.checked)}
                  className="rounded text-navy-900 focus:ring-0"
                />
                <span>Family Quarters Only</span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicalOnly}
                  onChange={(e) => setMedicalOnly(e.target.checked)}
                  className="rounded text-navy-900 focus:ring-0"
                />
                <span>On-Site Medical Station</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-charcoal-500 pt-2 border-t border-charcoal-100 font-mono">
            <span>Showing {filteredShelters.length} verified shelters</span>
            <span>Synthetic demo telemetry &bull; Capacity refreshed every 15s</span>
          </div>

        </div>
      </section>

      {/* 3. SHELTER CARDS (Rich, Visual, Not a Database Table) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShelters.map((s, idx) => {
            const totalCap = s.total_capacity || s.capacity || 200;
            const freeSlots = Math.max(0, totalCap - s.current_occupancy);
            const occupancyPct = Math.round((s.current_occupancy / totalCap) * 100);
            const isFull = occupancyPct >= 95;
            const waterAmt = s.water_supply_liters || (s.water_hours_remaining ? s.water_hours_remaining * 25 : 1200);
            const foodDays = s.food_supply_days || (s.food_hours_remaining ? Math.round(s.food_hours_remaining / 24) : 5);

            const shelterPhotos = [
              IMAGES.shelters.accommodation,
              IMAGES.shelters.rations,
              IMAGES.shelters.welfare,
            ];
            const cardImg = shelterPhotos[idx % shelterPhotos.length];

            return (
              <div
                key={s.id}
                className="bg-white border border-charcoal-200 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-48 overflow-hidden bg-navy-950">
                    <img
                      src={cardImg}
                      alt={`Accommodation at ${s.name}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>

                    <div className="absolute top-3 left-3">
                      <span className="bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded">
                        {s.city}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                      <span>{s.status.toUpperCase()}</span>
                      <span className={freeSlots > 20 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {freeSlots} Spaces Open
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-navy-950">
                        {s.name}
                      </h3>
                      <div className="text-xs text-charcoal-500 flex items-center space-x-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0" />
                        <span>{s.location}</span>
                      </div>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-navy-950">
                        <span>Capacity: {s.current_occupancy} / {totalCap} occupied</span>
                        <span className="font-mono text-charcoal-600">{occupancyPct}%</span>
                      </div>
                      <div className="w-full bg-charcoal-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isFull ? 'bg-emergency-600' : occupancyPct > 80 ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${occupancyPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {s.family_area && (
                        <span className="text-[10px] bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded border border-purple-200">
                          Family Quarters
                        </span>
                      )}
                      {(s.medical_support || s.medical_station) && (
                        <span className="text-[10px] bg-red-50 text-red-700 font-semibold px-2 py-0.5 rounded border border-red-200">
                          First Aid Clinic
                        </span>
                      )}
                      {(s.power_backup || s.accessibility_support) && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200">
                          Accessible / Backup
                        </span>
                      )}
                    </div>

                    {/* Resource Buffers */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-charcoal-600 bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100">
                      <div>
                        Water: <strong>{waterAmt}L</strong>
                      </div>
                      <div>
                        Rations: <strong>{foodDays} Days</strong>
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
                    <span>View Location on Live Map</span>
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
