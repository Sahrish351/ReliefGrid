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
  Sparkles,
  Shield,
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

  const cardImages = [
    IMAGES.shelters.accommodation,
    IMAGES.shelters.rations,
    IMAGES.shelters.welfare,
    IMAGES.shelters.hero,
  ];

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.shelters.hero}
            alt="Evacuation shelter community and humanitarian safe harbor"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
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

      {/* 2. OVERALL SHELTER NETWORK CAPACITY STATS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-navy-950 font-heading">
              3,200
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              Total Evacuee Capacity
            </div>
            <div className="text-xs text-charcoal-500">
              Across designated relief centers
            </div>
          </div>

          <div className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-heading">
              1,420
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              Available Beds Now
            </div>
            <div className="text-xs text-charcoal-500">
              Safe, dry &bull; Immediate check-in
            </div>
          </div>

          <div className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-navy-950 font-heading">
              28,500L
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              Potable Water Reserves
            </div>
            <div className="text-xs text-charcoal-500">
              Chlorinated &bull; Regularly tested
            </div>
          </div>

          <div className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-heading">
              100%
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              Family Security
            </div>
            <div className="text-xs text-charcoal-500">
              Dedicated women &amp; children wings
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEARCH & FILTER CONSOLE */}
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

      {/* 4. SHELTER CARDS (Rich, Visual, Distinct Photography) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShelters.map((s, idx) => {
            const totalCap = s.total_capacity || s.capacity || 200;
            const freeSlots = Math.max(0, totalCap - s.current_occupancy);
            const occupancyPct = Math.round((s.current_occupancy / totalCap) * 100);
            const isFull = occupancyPct >= 95;
            const waterAmt = s.water_supply_liters || (s.water_hours_remaining ? s.water_hours_remaining * 25 : 1200);
            const foodDays = s.food_supply_days || (s.food_hours_remaining ? Math.round(s.food_hours_remaining / 24) : 5);
            const cardImg = cardImages[idx % cardImages.length];

            return (
              <div
                key={s.id}
                className="bg-white border border-charcoal-200 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner with Context-Specific Photo */}
                  <div className="relative h-48 overflow-hidden bg-navy-950">
                    <img
                      src={cardImg}
                      alt={`Shelter facility at ${s.name}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent"></div>

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
                    className="w-full flex items-center justify-center space-x-2 bg-navy-950 hover:bg-navy-900 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-subtle"
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

      {/* 5. SUPPLIES BUFFER & ACCESSIBILITY SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-navy-950 rounded-3xl p-8 sm:p-12 text-white border border-navy-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>HUMANITARIAN STANDARDS ASSURANCE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
                Sphere Project Minimum Standards Built-In.
              </h2>
              <p className="text-navy-200 text-sm sm:text-base leading-relaxed">
                RELIEFGRID tracks 15 liters of water per person per day, minimum floor space metrics, and separate sanitation facilities for women and vulnerable families. Automated supply chain replenishment alerts prevent critical shortages before they arise.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-navy-300">
                <span>&bull; Biometric Missing-Person Cross-Referencing</span>
                <span>&bull; Cold-Chain Insulin Storage</span>
                <span>&bull; Gender-Segregated Hygiene Wings</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Link
                to="/emergency-map"
                className="inline-flex items-center space-x-2 bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-6 py-4 rounded-xl text-sm shadow-card transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Shelters on Live Map</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950">
            Managing an evacuation center or community hall?
          </h2>
          <p className="text-charcoal-600 text-sm">
            Sign in to your shelter manager portal to update live headcounts, request water tanker replenishments, and log family intakes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-card"
            >
              Sign In to Shelter Portal
            </Link>
            <Link
              to="/contact"
              className="bg-white border border-charcoal-200 text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-charcoal-50"
            >
              Register a New Relief Center
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FindShelter;
