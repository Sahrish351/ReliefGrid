import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { OperationalMap } from '../../components/map/OperationalMap';
import {
  ShieldAlert,
  Compass,
  Activity,
  Building2,
  LifeBuoy,
  MapPin,
  Sparkles,
  Filter,
  Users,
  HeartHandshake,
  UserCheck,
  Package,
  Radio,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveNetwork: React.FC = () => {
  const { incidents, resources, hospitals, shelters, reliefHubs } = useData();
  const [selectedIncident, setSelectedIncident] = useState<any>(incidents[0] || null);
  const [selectedCity, setSelectedCity] = useState<'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Multan'>('Lahore');

  const STAKEHOLDERS = [
    { label: 'Citizens', count: `${incidents.length * 12} Reported In Need`, icon: Users, desc: 'Real-time distress caller status & emergency tracking' },
    { label: 'Rescue Responders', count: `${resources.length} Units Active`, icon: LifeBuoy, desc: 'Zodiac boats, USAR teams, ALS ambulances with telemetry' },
    { label: 'Hospitals & Trauma', count: `${hospitals.length} Centers Online`, icon: Activity, desc: 'ICU trauma beds, burn ward pre-alerts & pediatric slots' },
    { label: 'Evacuation Shelters', count: `${shelters.length} Shelters Staged`, icon: Building2, desc: 'Guaranteed bed capacities, potable water & dry tents' },
    { label: 'Humanitarian NGOs', count: '14 Partner Desks', icon: HeartHandshake, desc: 'Edhi, Al-Khidmat, Red Crescent coordinated distribution' },
    { label: 'Vetted Volunteers', count: '148 Field Workers', icon: UserCheck, desc: 'Trained community volunteers deployed on safe tasks' },
    { label: 'Relief Warehouses', count: `${reliefHubs.length} Regional Hubs`, icon: Package, desc: 'Decentralized ration caches and water purification kits' },
    { label: 'Coordinators', count: '4 Command Consoles', icon: Radio, desc: 'Certified emergency coordinators authorizing dispatches' },
  ];

  return (
    <div className="space-y-16 pb-24 overflow-x-hidden">
      
      {/* 1. TOP HEADER & OPERATIONAL BAR */}
      <section className="bg-navy-950 text-white py-14 border-b border-navy-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>GEOSPATIAL OPERATIONAL NETWORK &bull; LIVE SYNCHRONIZATION</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
                National Response Network
              </h1>
              <p className="text-navy-200 text-sm sm:text-base max-w-2xl">
                Real-time spatial telemetry unifying affected citizens, specialized rescue craft, clinical trauma capacity, and evacuation shelters across Pakistan.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/report-emergency"
                className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-elevated flex items-center space-x-2 transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Report Emergency</span>
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-navy-50 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm shadow-card flex items-center space-x-2 transition-all"
              >
                <Radio className="w-4 h-4 text-emerald-600" />
                <span>Sign In to Console</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAP & LIVE TELEMETRY SPLIT */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-charcoal-500 uppercase">Sector:</span>
            {(['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCity === city
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'bg-white border border-charcoal-200 text-charcoal-700 hover:text-navy-950'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-charcoal-500">
            SYNTHETIC DEMO TELEMETRY &bull; 100% AUDITABLE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Leaflet Map View */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-charcoal-200 shadow-elevated">
            <OperationalMap
              incidents={incidents}
              resources={resources}
              hospitals={hospitals}
              shelters={shelters}
              reliefHubs={reliefHubs}
              selectedCity={selectedCity}
              height="650px"
              onSelectIncident={(inc) => setSelectedIncident(inc)}
            />
          </div>

          {/* Right Live Telemetry Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Selected Incident Inspector */}
            {selectedIncident ? (
              <div className="bg-white border border-charcoal-200 rounded-2xl p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase bg-emergency-100 text-emergency-700 px-2 py-0.5 rounded">
                    {selectedIncident.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-xs font-mono text-charcoal-500 font-bold">
                    {selectedIncident.incident_code}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy-950">
                    {selectedIncident.title}
                  </h3>
                  <div className="text-xs text-charcoal-500 flex items-center space-x-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emergency-600" />
                    <span>{selectedIncident.location_text}, {selectedIncident.city}</span>
                  </div>
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed bg-charcoal-50 p-3 rounded-xl border border-charcoal-100">
                  {selectedIncident.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-charcoal-50 border border-charcoal-100">
                    <div className="text-[10px] text-charcoal-500 uppercase font-mono">Affected</div>
                    <div className="font-bold text-navy-950">{selectedIncident.affected_people_count} People</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-charcoal-50 border border-charcoal-100">
                    <div className="text-[10px] text-charcoal-500 uppercase font-mono">Priority Index</div>
                    <div className="font-bold text-emergency-600">{selectedIncident.priority_score} / 100</div>
                  </div>
                </div>

                <Link
                  to={`/track-emergency?id=${selectedIncident.incident_code}`}
                  className="w-full flex items-center justify-center space-x-2 bg-navy-950 hover:bg-navy-900 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  <span>Open Citizen Tracking Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="bg-charcoal-50 border border-charcoal-200 rounded-2xl p-6 text-center text-xs text-charcoal-500">
                Click any marker on the map to inspect incident telemetry.
              </div>
            )}

            {/* Quick Summary Counts */}
            <div className="bg-white border border-charcoal-200 rounded-2xl p-5 shadow-card space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-navy-950">
                Network Telemetry Status
              </div>
              <div className="space-y-2 text-xs text-charcoal-700">
                <div className="flex justify-between pb-1.5 border-b border-charcoal-100">
                  <span>Active Rescue Craft:</span>
                  <strong className="text-navy-950">{resources.filter((r) => r.resource_type === 'boat' || r.type === 'boat').length} Vessels</strong>
                </div>
                <div className="flex justify-between pb-1.5 border-charcoal-100">
                  <span>ALS Ambulances:</span>
                  <strong className="text-navy-950">{resources.filter((r) => r.resource_type === 'ambulance' || r.type === 'ambulance').length} Units</strong>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-charcoal-100">
                  <span>Available Trauma Beds:</span>
                  <strong className="text-emerald-600">{hospitals.reduce((acc, h) => acc + h.available_beds, 0)} Beds Open</strong>
                </div>
                <div className="flex justify-between">
                  <span>Shelter Free Capacity:</span>
                  <strong className="text-emerald-600">{shelters.reduce((acc, s) => acc + Math.max(0, (s.total_capacity || s.capacity || 200) - s.current_occupancy), 0)} Spaces</strong>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. COMPLETE RESPONSE NETWORK: 8 STAKEHOLDER PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-2">
              CONNECTED ACTORS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              The Complete Operational Network
            </h2>
            <p className="text-charcoal-600 text-sm mt-1">
              RELIEFGRID unifies eight critical humanitarian roles into a single synchronized state machine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAKEHOLDERS.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.label}
                  className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-950">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-navy-950">{st.label}</h3>
                    <div className="text-xs font-mono font-bold text-emerald-600 mt-0.5">{st.count}</div>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};
