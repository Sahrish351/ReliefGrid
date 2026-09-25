import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Compass,
  ArrowRight,
  Radio,
  Building2,
  Activity,
  HeartHandshake,
  Users,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  LifeBuoy,
  Cpu,
  Layers,
  PhoneCall,
  Clock,
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  ArrowUpRight,
  ChevronRight,
  Heart,
  Droplets,
  Flame,
  Wind,
  Home as HomeIcon,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { AISimulator } from '../../components/ai/AISimulator';
import { AIOrchestratorVisual } from '../../components/ai/AIOrchestratorVisual';
import { OperationalMap } from '../../components/map/OperationalMap';
import { useData } from '../../context/DataContext';

export const Home: React.FC = () => {
  const { incidents, resources, hospitals, shelters, reliefHubs } = useData();
  const [selectedMapCity, setSelectedMapCity] = useState<'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Multan'>('Lahore');

  const PROTOCOL_ITEMS = [
    {
      title: 'Floods & Flash Inundation',
      subtitle: 'Hydrological Warning',
      img: IMAGES.types.flood,
      type: 'flood',
      desc: 'River telemetry, shallow-draft zodiac navigation, and rooftop swiftwater extractions.',
    },
    {
      title: 'Earthquakes & Structural Tremors',
      subtitle: 'Geophysical Hazard',
      img: IMAGES.types.earthquake,
      type: 'earthquake',
      desc: 'Acoustic void listening, heavy hydraulic shoring, and rapid trauma triage corridors.',
    },
    {
      title: 'Urban & Industrial Fires',
      subtitle: 'Thermal Incident',
      img: IMAGES.types.fire,
      type: 'fire',
      desc: 'Class-B chemical tenders, drone smoke perimeter tracking, and burn ward intake alerts.',
    },
    {
      title: 'Severe Urban Heatwaves',
      subtitle: 'Climatic Extreme',
      img: IMAGES.types.heatwave,
      type: 'heatwave',
      desc: 'Community hydration misting caches, hyperthermia ALS routing, and vulnerable elder monitoring.',
    },
    {
      title: 'Cyclones & Storm Surges',
      subtitle: 'Coastal Threat',
      img: IMAGES.types.storm,
      type: 'storm',
      desc: 'Seawall inundation modeling, storm-surge extractions, and critical power line safety zones.',
    },
    {
      title: 'Building & Trench Collapses',
      subtitle: 'Urban Structural',
      img: IMAGES.types.buildingCollapse,
      type: 'building_collapse',
      desc: 'Pneumatic rescue struts, search dog deployment, and spinal stabilization protocols.',
    },
  ];

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC FULL-WIDTH HERO (75–90vh, Open, Storytelling-Driven)        */}
      {/* ========================================================================= */}
      <section className="relative min-h-[80vh] lg:min-h-[86vh] flex items-center bg-navy-950 overflow-hidden">
        {/* Full-bleed Authentic Humanitarian Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroRescue}
            alt="Emergency rescue team evacuating flood victims"
            onError={handleImageError}
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          {/* Subtle Directional Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40"></div>
        </div>

        {/* Hero Narrative Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-7">
              {/* Minimal Eyebrow */}
              <div className="inline-flex items-center space-x-2.5 text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>AI-POWERED EMERGENCY RESPONSE &bull; PAKISTAN DISPATCH GRID</span>
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-white tracking-tight leading-[1.06]">
                WHEN EVERY SECOND <br />
                MATTERS, <br />
                <span className="text-transparent bg-gradient-to-r from-white via-navy-100 to-emergency-400 bg-clip-text">
                  INTELLIGENCE
                </span> <br />
                SHOULD MOVE FIRST.
              </h1>

              {/* Short, Punchy Supporting Paragraph */}
              <p className="text-navy-100 text-lg sm:text-xl font-normal max-w-xl leading-relaxed">
                RELIEFGRID orchestrates multi-agent Gemini intelligence to turn frantic emergency calls into verified, prioritized, and human-authorized rescue operations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/report-emergency"
                  className="inline-flex items-center space-x-3 bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-extrabold px-8 py-4 rounded-xl text-base shadow-elevated transition-all border border-emergency-500 group"
                >
                  <ShieldAlert className="w-5 h-5" />
                  <span>REPORT AN EMERGENCY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/emergency-map"
                  className="inline-flex items-center space-x-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-7 py-4 rounded-xl text-base backdrop-blur-md border border-white/20 transition-all"
                >
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <span>EXPLORE RESPONSE NETWORK</span>
                </Link>
              </div>

              {/* Subtle Trust Indicators */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-8 text-xs text-navy-200 font-medium">
                <span className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Human-in-the-Loop Safeguard</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>10 Specialized Gemini Agents</span>
                </span>
                <span className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sub-Second Proximity Matching</span>
                </span>
              </div>
            </div>

            {/* Right: Floating Product UI Overlays */}
            <div className="lg:col-span-4 space-y-3.5">
              
              <div className="bg-navy-900/90 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white shadow-elevated">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 font-extrabold mb-1">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AI RESPONSE ACTIVE</span>
                  </span>
                  <span>ZONE 4 &bull; LAHORE</span>
                </div>
                <div className="text-sm font-bold">Shahdara Ravi Basin High Water</div>
                <div className="text-xs text-navy-200 mt-1">10 Autonomous Agents Synchronized</div>
              </div>

              <div className="bg-navy-900/90 backdrop-blur-md border border-emergency-500/50 rounded-xl p-4 text-white shadow-elevated">
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="bg-emergency-600 text-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
                    18 PEOPLE &bull; CRITICAL
                  </span>
                  <span className="text-emergency-300">SCORE: 96/100</span>
                </div>
                <div className="text-sm font-bold">1 Infant &bull; 2 Elderly &bull; Medical Support Needed</div>
                <div className="text-xs text-navy-300 mt-1">Immediate Watercraft Extraction Required</div>
              </div>

              <div className="bg-navy-900/90 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white shadow-elevated">
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-extrabold mb-1">
                  <span className="flex items-center space-x-1.5">
                    <LifeBuoy className="w-3.5 h-3.5" />
                    <span>RESCUE TEAM EN ROUTE</span>
                  </span>
                  <span className="text-emerald-400 font-bold">ETA 11 MIN</span>
                </div>
                <div className="text-sm font-bold">Rescue Boat B-03 + Swiftwater Team R-17</div>
                <div className="text-xs text-navy-200 mt-1">Destination: General Hospital ICU Bed 04</div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST / NETWORK STRIP (Clean Horizontal, Open Typography, No Big Cards) */}
      {/* ========================================================================= */}
      <section className="border-y border-charcoal-200/80 bg-white py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center text-center">
            {[
              { label: 'Emergency Response', sub: 'Rescue 1122 & USAR', icon: LifeBuoy },
              { label: 'Hospitals', sub: 'Trauma & ICU Network', icon: Activity },
              { label: 'Evacuation Shelters', sub: 'Guaranteed Capacity', icon: Building2 },
              { label: 'Humanitarian NGOs', sub: 'Relief Distribution', icon: HeartHandshake },
              { label: 'Community Volunteers', sub: 'Vetted Field Support', icon: Users },
              { label: 'Relief Logistics', sub: 'Food & Medical Caches', icon: Cpu },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.label} className="space-y-1">
                  <div className="flex items-center justify-center space-x-2 text-navy-950 font-bold text-sm">
                    <Icon className="w-4 h-4 text-emergency-600 flex-shrink-0" />
                    <span>{node.label}</span>
                  </div>
                  <div className="text-[11px] text-charcoal-500 font-medium">{node.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE REAL-WORLD PROBLEM (Editorial Split, Whitespace, Open Layout)      */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Large Humanitarian Image (Editorial Bleed) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 shadow-elevated">
              <img
                src={IMAGES.rescueTeam}
                alt="Emergency responders planning mission on the ground"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white text-xs font-mono">
                Rescue teams, medical staff, and shelter managers need real-time synchrony during critical golden hours.
              </div>
            </div>
          </div>

          {/* Typography & Editorial Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono font-bold tracking-widest text-emergency-600 uppercase">
              THE HUMANITARIAN REALITY
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-navy-950 tracking-tight leading-[1.1]">
              Emergency response is fragmented. <br />
              <span className="text-navy-700">
                RELIEFGRID connects the entire response network.
              </span>
            </h2>

            <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
              When catastrophic floods, earthquakes, or industrial fires strike, emergency response usually breaks into isolated silos. Frantic callers wait on busy phone lines, rescue boats deploy without medical telemetry, and hospital trauma centers receive mass casualties with zero advance warning.
            </p>

            <div className="pt-2 border-t border-charcoal-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-black text-charcoal-400 font-mono">4.2 Hours</div>
                <div className="text-xs font-bold text-navy-950 uppercase tracking-wider mt-1">Average Traditional Delay</div>
                <div className="text-xs text-charcoal-500 mt-1">Lost to uncoordinated phone trees and manual verification.</div>
              </div>

              <div>
                <div className="text-3xl font-black text-emerald-600 font-mono">&lt; 3 Minutes</div>
                <div className="text-xs font-bold text-navy-950 uppercase tracking-wider mt-1">With RELIEFGRID AI</div>
                <div className="text-xs text-charcoal-500 mt-1">Instant NLP parsing, 10-agent triage, hospital bed lock, and coordinator dispatch.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW RELIEFGRID WORKS (Horizontal Process, Typography & Connecting Lines)*/}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-2">
              STANDARD OPERATING JOURNEY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              An intelligent, verified operational journey from distress to recovery.
            </h2>
          </div>

          {/* Horizontal Linear Steps with Open Typography */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4 text-left">
            {[
              { step: '01', title: 'REPORT', desc: 'Voice, SMS, or WhatsApp distress intake.' },
              { step: '02', title: 'UNDERSTAND', desc: 'Gemini extracts trapped counts & urgency.' },
              { step: '03', title: 'VERIFY', desc: 'Spatial anti-spam & duplicate cross-check.' },
              { step: '04', title: 'TRIAGE', desc: 'Severity index computed 0 to 100.' },
              { step: '05', title: 'MATCH', desc: 'Proximity search for boats, USAR & beds.' },
              { step: '06', title: 'PLAN', desc: 'Safe approach corridors calculated.' },
              { step: '07', title: 'APPROVE', desc: 'Coordinator verifies before dispatch.', highlight: true },
              { step: '08', title: 'RESPOND', desc: 'Live GPS telemetry and telemetry updates.' },
              { step: '09', title: 'RECOVER', desc: 'Shelter check-in and post-action review.' },
            ].map((st) => (
              <div
                key={st.step}
                className={`p-3.5 border-t-2 transition-all ${
                  st.highlight
                    ? 'border-emergency-600 bg-emergency-50/50'
                    : 'border-charcoal-300 hover:border-navy-950'
                }`}
              >
                <div
                  className={`text-[10px] font-mono font-extrabold ${
                    st.highlight ? 'text-emergency-600' : 'text-charcoal-400'
                  }`}
                >
                  STEP {st.step}
                </div>
                <div
                  className={`text-sm font-extrabold mt-1 ${
                    st.highlight ? 'text-emergency-900' : 'text-navy-950'
                  }`}
                >
                  {st.title}
                </div>
                <div className="text-xs text-charcoal-600 mt-1 leading-snug">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AI ORCHESTRATION (One Emergency. Ten Intelligent Agents.)               */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <AIOrchestratorVisual />
      </section>

      {/* ========================================================================= */}
      {/* 6. SIGNATURE DEMO (Full-Width Interactive System Simulator)               */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <AISimulator />
      </section>

      {/* ========================================================================= */}
      {/* 7. LIVE PAKISTAN RESPONSE NETWORK (Immersive Wide Leaflet Map)            */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 mb-1">
              LIVE NATIONWIDE COORDINATION GRID
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Operational Response Network Across Pakistan
            </h2>
            <p className="text-charcoal-600 text-sm mt-1 max-w-2xl">
              Track verified distress incidents, available watercraft and ambulances, hospital trauma beds, and community shelters across major operational sectors.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {(['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedMapCity(city)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedMapCity === city
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'bg-white border border-charcoal-200 text-charcoal-700 hover:text-navy-950'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Operational Status Pills (Not large cards) */}
        <div className="flex flex-wrap items-center gap-6 py-2 border-y border-charcoal-200 text-xs font-mono text-charcoal-700">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emergency-600 animate-ping"></span>
            <span><strong>342</strong> Active Incidents</span>
          </span>
          <span className="text-charcoal-300">|</span>
          <span><strong>27</strong> Rescue Units Available</span>
          <span className="text-charcoal-300">|</span>
          <span><strong>18</strong> Shelters Near Capacity</span>
          <span className="text-charcoal-300">|</span>
          <span><strong>12</strong> Hospital Capacity Pre-Alerts</span>
          <span className="text-charcoal-300">|</span>
          <span className="text-charcoal-500 font-sans italic">Synthetic demonstration telemetry</span>
        </div>

        {/* Wide Immersive Map */}
        <div className="w-full rounded-2xl overflow-hidden border border-charcoal-200 shadow-elevated">
          <OperationalMap
            incidents={incidents}
            resources={resources}
            hospitals={hospitals}
            shelters={shelters}
            reliefHubs={reliefHubs}
            selectedCity={selectedMapCity}
            height="580px"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-charcoal-500">
          <span>Leaflet GeoSpatial Telemetry Engine</span>
          <Link to="/emergency-map" className="font-bold text-navy-950 hover:text-emergency-600 flex items-center space-x-1">
            <span>Open Fullscreen Map View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. HUMAN STORIES / HUMAN IMPACT (Warm Editorial Layout with Real Photos)   */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emergency-600 mb-2">
              LIVES BEHIND THE DATA
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Human Stories of Resilience &amp; Coordination
            </h2>
            <p className="text-charcoal-600 text-sm mt-1">
              Every coordinate on the map is a human family. Here is how coordinated intelligence protects dignity and safety during crises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Story 1 */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 shadow-card">
                <img
                  src={IMAGES.storyFamily}
                  alt="Family evacuated safely from flood zone"
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[11px] font-mono uppercase text-charcoal-400 font-bold">
                SIMULATED CASE 01 &bull; SHAHDARA, LAHORE
              </div>
              <h3 className="text-lg font-bold text-navy-950 leading-snug">
                &ldquo;Water reached the window sills within an hour. The rescue boat arrived with baby formula already on board.&rdquo;
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                By parsing the presence of a three-month-old infant in the original text call, RELIEFGRID pre-staged pediatric supplies on Boat B-03 before launch.
              </p>
            </div>

            {/* Story 2 */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 shadow-card">
                <img
                  src={IMAGES.storyElderly}
                  alt="Elderly patient receiving medical triage"
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[11px] font-mono uppercase text-charcoal-400 font-bold">
                SIMULATED CASE 02 &bull; MULTAN SUBURB
              </div>
              <h3 className="text-lg font-bold text-navy-950 leading-snug">
                &ldquo;My diabetic father needed insulin and hypothermia stabilization. The hospital had a warm bed ready.&rdquo;
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                The Hospital Coordination Agent reserved Mayo Trauma Bed 04 and alerted the endocrine specialist 20 minutes before the ambulance arrived.
              </p>
            </div>

            {/* Story 3 */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 shadow-card">
                <img
                  src={IMAGES.shelterCommunity}
                  alt="Community shelter safe space"
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[11px] font-mono uppercase text-charcoal-400 font-bold">
                SIMULATED CASE 03 &bull; KARACHI MALIR BASIN
              </div>
              <h3 className="text-lg font-bold text-navy-950 leading-snug">
                &ldquo;We were displaced without clean water. Within three hours, the shelter registered all eight of us.&rdquo;
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Automated shelter capacity balancing prevented overcrowding at Expo Center and routed families to well-supplied community hubs.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. EMERGENCY RESPONSE PROTOCOLS (Large Editorial Image Tiles)             */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
                HAZARD-SPECIFIC INTELLIGENCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
                Trained Emergency Response Protocols
              </h2>
            </div>
            <Link to="/emergency-types" className="text-xs font-bold text-navy-950 hover:text-emergency-600 flex items-center space-x-1">
              <span>View All Protocols</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROTOCOL_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 shadow-card hover:shadow-elevated transition-all"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded">
                    {item.subtitle}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                  <h3 className="text-xl font-bold font-heading">{item.title}</h3>
                  <p className="text-xs text-navy-200 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <Link
                    to={`/emergency-types#${item.type}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 group-hover:text-white pt-2 transition-colors"
                  >
                    <span>Read Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CONNECTED RESPONSE NETWORK (Visual Open Flow Diagram)                 */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
              THE COORDINATION ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              One Unified Response Ecosystem
            </h2>
            <p className="text-charcoal-600 text-sm mt-1">
              Data originates with the citizen and flows seamlessly across emergency services under human supervision.
            </p>
          </div>

          <div className="max-w-4xl mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center text-center">
              
              <div className="p-4 border border-charcoal-200 rounded-xl bg-white space-y-1">
                <Users className="w-6 h-6 text-navy-950 mx-auto" />
                <div className="font-bold text-sm text-navy-950">1. Citizen</div>
                <div className="text-[11px] text-charcoal-500">Distress call or text</div>
              </div>

              <div className="text-charcoal-400 font-mono hidden md:block">&rarr;</div>

              <div className="p-5 border-2 border-emergency-600 rounded-xl bg-navy-950 text-white space-y-1 shadow-elevated">
                <Cpu className="w-6 h-6 text-emerald-400 mx-auto animate-pulse" />
                <div className="font-extrabold text-sm">2. RELIEFGRID AI</div>
                <div className="text-[10px] text-navy-200 font-mono">10 Autonomous Agents</div>
              </div>

              <div className="text-charcoal-400 font-mono hidden md:block">&rarr;</div>

              <div className="p-4 border border-charcoal-200 rounded-xl bg-white space-y-1">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm text-navy-950">3. Coordinator</div>
                <div className="text-[11px] text-charcoal-500">Authorizes dispatch</div>
              </div>

            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200">
                <LifeBuoy className="w-5 h-5 text-emergency-600 mx-auto mb-1" />
                <div className="font-bold text-sm text-navy-950">Rescue Teams</div>
                <div className="text-xs text-charcoal-600">Turn-by-turn flood navigation</div>
              </div>
              <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200">
                <Activity className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <div className="font-bold text-sm text-navy-950">Hospitals</div>
                <div className="text-xs text-charcoal-600">Pre-alerted ICU beds</div>
              </div>
              <div className="p-4 bg-charcoal-50 rounded-xl border border-charcoal-200">
                <Building2 className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <div className="font-bold text-sm text-navy-950">Shelters &amp; NGOs</div>
                <div className="text-xs text-charcoal-600">Guaranteed bed &amp; food allocation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. PREDICTIVE INTELLIGENCE (Editorial Analytical Section, Not a Dark Box) */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-600">
                SITUATION INTELLIGENCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
                Predictive Hazard Modeling &bull; 6-Hour Horizon
              </h2>
              <p className="text-charcoal-600 text-base leading-relaxed">
                By synthesizing live telemetry from river gauges, weather radars, and historical flood boundaries, the Situation Intelligence Agent forecasts resource bottlenecks before they occur.
              </p>

              <div className="p-5 bg-purple-50/70 border-l-4 border-purple-600 rounded-r-xl space-y-2">
                <div className="text-xs font-mono font-bold text-purple-900 uppercase">
                  SIMULATED SITUATION SYNTHESIS
                </div>
                <blockquote className="text-sm font-semibold text-navy-950">
                  &ldquo;Flood-related incidents are increasing in Zone 4 (Shahdara Ravi Basin). Watercraft resources may become constrained if the trend continues over the next six hours.&rdquo;
                </blockquote>
                <div className="text-[11px] text-purple-700 font-mono">
                  Recommended action: Pre-position 3 auxiliary zodiac boats from Multan reserve.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-500">
                MONITORED REGIONAL CAPACITY (PAST 24H)
              </div>

              {[
                { label: 'Shelter Capacity Risk', value: '88%', status: 'Critical Surge', bar: 'w-[88%] bg-emergency-600' },
                { label: 'Trauma Ward Pressure', value: '62%', status: 'Moderate', bar: 'w-[62%] bg-amber-500' },
                { label: 'Zodiac Watercraft Availability', value: '18%', status: 'Constrained (2 Left)', bar: 'w-[18%] bg-rose-600' },
                { label: 'Clean Water Purification Buffer', value: '74%', status: 'Adequate', bar: 'w-[74%] bg-emerald-600' },
              ].map((m) => (
                <div key={m.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-navy-950">
                    <span>{m.label}</span>
                    <span className="font-mono text-charcoal-600">{m.status} ({m.value})</span>
                  </div>
                  <div className="w-full bg-charcoal-100 h-2 rounded-full overflow-hidden">
                    <div className={`${m.bar} h-full rounded-full`}></div>
                  </div>
                </div>
              ))}

              <div className="text-[11px] font-mono text-charcoal-400 pt-2">
                * Synthetic demo telemetry representing automated analytical capacity
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. IMPACT (Large Typography Metrics, Open, With Synthetic Label)          */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600">
              DEMONSTRATED SCALE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 mt-1">
              Operational Performance Footprint
            </h2>
            <p className="text-xs text-charcoal-500 mt-2 font-mono">
              SYNTHETIC DEMONSTRATION DATA &bull; PROTOTYPE BENCHMARK
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
                Safe evacuations &amp; relief aid
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
                Rations, medical &amp; water kits
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
                Coordinator agreement with AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FINAL CINEMATIC CTA (Powerful Ending, Full-Width Photo, Open Text)    */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-3xl overflow-hidden bg-navy-950 min-h-[460px] flex items-center justify-center p-8 sm:p-16 text-center shadow-elevated">
          
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.communitySafety}
              alt="Humanitarian volunteers working with affected families"
              onError={handleImageError}
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              JOIN THE LIFELINE
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              BUILD A SAFER RESPONSE NETWORK TOGETHER.
            </h2>

            <p className="text-navy-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Whether you are an affected citizen requesting emergency extraction, a first responder, an NGO coordinator, or a hospital chief, RELIEFGRID AI coordinates your efforts in real time.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/report-emergency"
                className="bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-extrabold px-8 py-4 rounded-xl text-base shadow-elevated transition-all flex items-center space-x-2"
              >
                <ShieldAlert className="w-5 h-5" />
                <span>REPORT AN EMERGENCY</span>
              </Link>

              <Link
                to="/emergency-map"
                className="bg-white hover:bg-navy-50 text-navy-950 font-extrabold px-8 py-4 rounded-xl text-base shadow-card transition-all flex items-center space-x-2"
              >
                <Compass className="w-5 h-5 text-navy-800" />
                <span>EXPLORE THE NETWORK</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
