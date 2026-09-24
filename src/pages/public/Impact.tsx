import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Users,
  LifeBuoy,
  HeartPulse,
  Sparkles,
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { Link } from 'react-router-dom';

export const Impact: React.FC = () => {
  const INCIDENT_TRENDS = [
    { hour: '00:00', incidents: 4, resolved: 3 },
    { hour: '04:00', incidents: 2, resolved: 2 },
    { hour: '08:00', incidents: 12, resolved: 9 },
    { hour: '12:00', incidents: 22, resolved: 18 },
    { hour: '16:00', incidents: 31, resolved: 26 },
    { hour: '20:00', incidents: 25, resolved: 22 },
  ];

  const CATEGORY_DATA = [
    { name: 'Floods & Hydrological', count: 18, color: '#0284C7' },
    { name: 'Earthquakes & Tremors', count: 6, color: '#D97706' },
    { name: 'Industrial Fires', count: 5, color: '#D92D20' },
    { name: 'Urban Heatwaves', count: 8, color: '#F59E0B' },
    { name: 'Structural Collapse', count: 4, color: '#7C3AED' },
  ];

  const REGIONAL_RESPONSE_TIME = [
    { city: 'Islamabad', avgMinutes: 10.8 },
    { city: 'Lahore', avgMinutes: 11.4 },
    { city: 'Rawalpindi', avgMinutes: 13.6 },
    { city: 'Multan', avgMinutes: 15.2 },
    { city: 'Karachi', avgMinutes: 17.8 },
  ];

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[55vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.impactHope}
            alt="Humanitarian community impact in Pakistan"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              OPERATIONAL PERFORMANCE &bull; VERIFIED OUTCOMES
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Measuring the Human Impact of Intelligence.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              When disaster strikes, success is measured not in abstract compute cycles, but in lives evacuated, ICU beds secured before arrival, and families reunited.
            </p>
          </div>
        </div>
      </section>

      {/* 2. LARGE TYPOGRAPHY METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600">
            CUMULATIVE BENCHMARKS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 mt-1">
            Simulated Response Throughput
          </h2>
          <p className="text-xs text-charcoal-500 mt-2 font-mono">
            SYNTHETIC DEMONSTRATION DATA &bull; PROTOTYPE METRICS
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-black text-navy-950 font-heading">
              18,450+
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              People Supported
            </div>
            <div className="text-xs text-charcoal-500">
              Evacuations &amp; emergency relief
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-black text-emergency-600 font-heading">
              342
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              Response Missions
            </div>
            <div className="text-xs text-charcoal-500">
              Authorized by coordinators
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-black text-navy-950 font-heading">
              12,800+
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              Resources Coordinated
            </div>
            <div className="text-xs text-charcoal-500">
              Food rations, water &amp; medical packs
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-black text-emerald-600 font-heading">
              94.8%
            </div>
            <div className="text-xs font-bold text-navy-900 uppercase tracking-widest">
              AI Recommendation Acceptance
            </div>
            <div className="text-xs text-charcoal-500">
              Coordinator agreement rate
            </div>
          </div>
        </div>
      </section>

      {/* 3. ANALYTICAL CHARTS (Visual Recharts) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-charcoal-200 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Chart: 24h Incident Velocity */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-navy-950">
                  24-Hour Incident Velocity vs. Mission Resolution
                </h3>
                <p className="text-xs text-charcoal-500">
                  Hourly emergency intake compared to closed safe evacuations
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">Active</span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={INCIDENT_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#667085' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#667085' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="incidents" stroke="#D92D20" strokeWidth={2.5} name="Distress Calls" />
                  <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2.5} name="Safe Extractions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Chart: Average Response Time by City */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200 shadow-card space-y-4">
            <div>
              <h3 className="font-bold text-base text-navy-950">
                Average Dispatch-to-Scene Time
              </h3>
              <p className="text-xs text-charcoal-500">
                Golden hour minutes from coordinator authorization to arrival
              </p>
            </div>

            <div className="h-64 sm:h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REGIONAL_RESPONSE_TIME} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                  <XAxis type="number" unit="m" tick={{ fontSize: 11, fill: '#667085' }} />
                  <YAxis dataKey="city" type="category" tick={{ fontSize: 11, fill: '#667085' }} width={80} />
                  <Tooltip />
                  <Bar dataKey="avgMinutes" fill="#0B192C" radius={[0, 6, 6, 0]} name="Minutes to Scene" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>

      {/* 4. STORYTELLING IMPACT VIGNETTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
              FIELD VIGNETTES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Human Stories Across Operational Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-charcoal-50 rounded-3xl border border-charcoal-200 space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-emergency-600">
                Ravi Basin Flood Response &bull; Sector 04
              </div>
              <h3 className="text-xl font-bold text-navy-950">
                Pre-Allocating Pediatric Warmers During High Water
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                When eighteen residents were cut off by rising riverwaters in Shahdara, the Triage Agent automatically flagged the presence of a three-month-old infant. Boat B-03 was equipped with baby formula and thermal survival wraps prior to leaving the pier. All 18 evacuees arrived safely at Mayo Hospital without acute hypothermia.
              </p>
              <div className="text-xs font-mono text-charcoal-500 pt-2 border-t border-charcoal-200">
                Outcome: 100% survival rate &bull; 11-minute response time
              </div>
            </div>

            <div className="p-8 bg-charcoal-50 rounded-3xl border border-charcoal-200 space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-emerald-600">
                Sindh Urban Heatwave Defense &bull; Sector 02
              </div>
              <h3 className="text-xl font-bold text-navy-950">
                Dynamic Hydration Caches Preventing Heatstroke
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                During 49°C temperature peaks in interior Sindh, the Situation Intelligence Agent forecast severe hyperthermia risks in dense residential quarters. Over 4,200 liters of electrolyte water and 12 misting tents were pre-positioned, reducing emergency ER admissions by an estimated 38%.
              </p>
              <div className="text-xs font-mono text-charcoal-500 pt-2 border-t border-charcoal-200">
                Outcome: Zero heatstroke fatalities in monitored zone
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
