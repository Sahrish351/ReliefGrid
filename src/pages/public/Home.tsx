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
  Flame,
  Droplets,
  Wind,
  Maximize2,
  ExternalLink,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { AISimulator } from '../../components/ai/AISimulator';
import { AIOrchestratorVisual } from '../../components/ai/AIOrchestratorVisual';
import { OperationalMap } from '../../components/map/OperationalMap';
import { useData } from '../../context/DataContext';

export const Home: React.FC = () => {
  const { incidents, resources, hospitals, shelters, reliefHubs } = useData();
  const [selectedMapCity, setSelectedMapCity] = useState<'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Multan'>('Lahore');

  const EMERGENCY_CATEGORIES = [
    {
      title: 'Floods & Flash Floods',
      category: 'HYDROMETEOROLOGICAL',
      desc: 'River basin inundation telemetry, high-water rooftop extractions, and shallow-draft zodiac watercraft routing.',
      img: IMAGES.types.flood,
      type: 'flood',
      stats: '14 Active Missions &bull; 6 Watercraft Deployed',
    },
    {
      title: 'Earthquakes & Structural Tremors',
      category: 'GEOPHYSICAL',
      desc: 'Acoustic void search sensors, heavy hydraulic shoring tenders, rapid collapse triage, and emergency field hospitals.',
      img: IMAGES.types.earthquake,
      type: 'earthquake',
      stats: '2 Structural Teams &bull; USAR Trained',
    },
    {
      title: 'Urban & Industrial Fires',
      category: 'THERMAL HAZARD',
      desc: 'Class-B chemical foam tenders, thermal drone boundary mapping, smoke plume evacuation corridors, and burn ward intake.',
      img: IMAGES.types.fire,
      type: 'fire',
      stats: '4 Tenders On Standby &bull; Burn ICU Alerted',
    },
    {
      title: 'Severe Urban Heatwaves',
      category: 'CLIMATIC EXTREME',
      desc: 'Solar-powered community misting stations, oral rehydration caches, and prioritized hyperthermia ALS ambulances.',
      img: IMAGES.types.heatwave,
      type: 'heatwave',
      stats: '12 Misting Hubs &bull; ORS Logistics Active',
    },
    {
      title: 'Cyclones & Coastal Surges',
      category: 'COASTAL DEFENSE',
      desc: 'High-tension power line risk mitigation, mandatory seawall evacuation alerts, and maritime search-and-rescue.',
      img: IMAGES.types.storm,
      type: 'storm',
      stats: 'Wind Telemetry 85km/h &bull; Harbor Locked',
    },
    {
      title: 'Building & Trench Collapses',
      category: 'STRUCTURAL URBAN',
      desc: 'Pneumatic rescue struts, search dog teams, trapped victim thermal detection, and spinal trauma stabilization.',
      img: IMAGES.types.buildingCollapse,
      type: 'building_collapse',
      stats: 'Heavy Lifting Cranes &bull; Trauma Surge',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC FULL-WIDTH HERO (75–85vh with Authentic Photography & Overlays) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center bg-navy-950 overflow-hidden">
        
        {/* Full-bleed Authentic Humanitarian Photography Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroRescue}
            alt="Rescue responders evacuating flood victims safely"
            onError={handleImageError}
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          />
          {/* Deep Navy/Black Sophisticated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60"></div>
          {/* Subtle Coordinate Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"></div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Eyebrow Beacon */}
              <div className="inline-flex items-center space-x-2.5 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase shadow-subtle">
                <span className="w-2.5 h-2.5 rounded-full bg-emergency-500 animate-ping"></span>
                <span>AI-POWERED EMERGENCY RESPONSE &bull; PAKISTAN DISPATCH GRID</span>
              </div>

              {/* Massive Elegant Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-white tracking-tight leading-[1.08]">
                When Every Second Matters, <br />
                <span className="text-transparent bg-gradient-to-r from-white via-navy-100 to-emergency-400 bg-clip-text">
                  Intelligence
                </span>{' '}
                Should Move First.
              </h1>

              {/* Stronger, Punchy Supporting Paragraph */}
              <p className="text-navy-100 text-base sm:text-xl font-normal max-w-2xl leading-relaxed text-balance">
                RELIEFGRID AI orchestrates multi-agent Gemini intelligence to turn frantic emergency calls into verified, prioritized, and human-authorized rescue operations within minutes.
              </p>

              {/* High-Contrast Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/report-emergency"
                  className="inline-flex items-center space-x-3 bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-extrabold px-8 py-4 rounded-2xl text-base shadow-elevated transition-all border border-emergency-500 group"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                  <ShieldAlert className="w-5 h-5" />
                  <span>Report an Emergency</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/emergency-map"
                  className="inline-flex items-center space-x-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-7 py-4 rounded-2xl text-base backdrop-blur-md border border-white/30 shadow-subtle transition-all"
                >
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <span>Explore Response Network</span>
                </Link>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-navy-200 font-medium">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Mandatory Human Approval Gate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>10 Specialized Gemini Reasoning Agents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sub-Second Proximity Matching</span>
                </div>
              </div>

            </div>

            {/* Right Column: 3 Floating UI Mission Overlays */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Floating UI Card 1: AI Response Active */}
              <div className="bg-navy-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shadow-float transform hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>AI RESPONSE ACTIVE</span>
                  </span>
                  <span className="text-[10px] font-mono text-navy-300">LAT: 31.621 &bull; LON: 74.282</span>
                </div>
                <div className="text-sm font-bold">Shahdara Ravi Basin Submersion</div>
                <div className="text-xs text-navy-200 mt-1 flex items-center justify-between">
                  <span>Corroboration: <strong>94% Confidence</strong></span>
                  <span className="text-emerald-400 font-mono">10 Agents Synced</span>
                </div>
              </div>

              {/* Floating UI Card 2: 18 People Critical */}
              <div className="bg-gradient-to-br from-emergency-950/90 to-navy-900/90 backdrop-blur-md border border-emergency-500/40 rounded-2xl p-4 text-white shadow-float transform hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-emergency-600 text-white text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded tracking-wider">
                    PRIORITY 96 &bull; CRITICAL
                  </span>
                  <span className="text-[11px] font-mono text-emergency-300">MISSION RG-1042</span>
                </div>
                <div className="text-sm font-bold text-white">18 People Trapped in High Water</div>
                <div className="text-xs text-navy-200 mt-1 flex items-center justify-between">
                  <span>Demographics: <strong>1 Infant, 2 Elderly</strong></span>
                  <span className="text-emergency-300 font-bold">Hypothermia Risk</span>
                </div>
              </div>

              {/* Floating UI Card 3: Rescue Team En Route */}
              <div className="bg-navy-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shadow-float transform hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-extrabold">
                    <LifeBuoy className="w-3.5 h-3.5" />
                    <span>RESCUE TEAM EN ROUTE</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">ETA 11 MIN</span>
                </div>
                <div className="text-sm font-bold">Rescue Boat B-03 + Team R-17</div>
                <div className="text-xs text-navy-200 mt-1 flex items-center justify-between">
                  <span>Target: General Hospital ICU Bed 04</span>
                  <span className="text-navy-300">Speed: 18 kts</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM SECTION (Editorial Split: The Real-World Humanitarian Gap) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-charcoal-200 rounded-3xl p-8 sm:p-14 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Humanitarian Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-navy-950 border border-charcoal-200 shadow-elevated">
                <img
                  src={IMAGES.rescueTeam}
                  alt="Humanitarian first responders on emergency mission"
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                  Rescue teams, clinical wards, and evacuation shelters require instantaneous synchrony during the golden hour.
                </div>
              </div>
            </div>

            {/* Right Editorial Typography */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-emergency-600 uppercase tracking-widest">
                <AlertTriangle className="w-4 h-4" />
                <span>THE HUMANITARIAN REALITY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-navy-950 tracking-tight leading-[1.15]">
                Emergency response is fragmented. <br />
                <span className="text-navy-700 bg-gradient-to-r from-navy-900 to-indigo-900 bg-clip-text text-transparent">
                  RELIEFGRID connects the entire response network.
                </span>
              </h2>

              <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
                During devastating river floods, sudden earthquakes, or heatwaves, citizens, rescue teams, trauma hospitals, evacuation shelters, and relief NGOs operate in isolated data silos. Frantic distress calls are answered on disconnected phone lines, while emergency ward managers have no visibility into arriving victims.
              </p>

              {/* Strong Visual Divider & Benchmark Statistic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-charcoal-50 border border-charcoal-200">
                  <div className="text-2xl sm:text-3xl font-black text-charcoal-400 font-mono">4.2 Hours</div>
                  <div className="text-xs font-bold text-charcoal-700 mt-1 uppercase tracking-wider">Traditional Fragmented Dispatch</div>
                  <div className="text-xs text-charcoal-500 mt-1">Lost to uncoordinated phone trees, manual spreadsheet verification, and delayed route planning.</div>
                </div>

                <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 text-white shadow-elevated">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">&lt; 3 Minutes</div>
                  <div className="text-xs font-bold text-white mt-1 uppercase tracking-wider">With RELIEFGRID AI</div>
                  <div className="text-xs text-navy-200 mt-1">Instant Gemini NLP extraction, 10-agent triage synthesis, hospital bed reserve, and coordinator approval.</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SIGNATURE AI ORCHESTRATION (10 Agents Central Console & Workflow)     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIOrchestratorVisual />
      </section>

      {/* ========================================================================= */}
      {/* 4. FULL-WIDTH SIGNATURE AI RESPONSE SIMULATOR                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AISimulator />
      </section>

      {/* ========================================================================= */}
      {/* 5. LIVE PAKISTAN RESPONSE NETWORK (Immersive National Map with Stats)     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-navy-600 uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-emergency-600 animate-ping"></span>
              <span>LIVE OPERATIONAL NETWORK TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Live Emergency Response Network Across Pakistan
            </h2>
            <p className="text-charcoal-600 text-sm mt-1 max-w-2xl">
              Track active emergency incidents, rescue resource locations, clinical trauma bed capacities, and community shelters in real time.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-charcoal-100 p-1.5 rounded-2xl border border-charcoal-200">
            {(['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedMapCity(city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedMapCity === city
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'text-charcoal-700 hover:text-navy-950'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Floating Metric Panels Over/Around the Map */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-charcoal-200 p-4 rounded-2xl shadow-card">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500 tracking-wider">
              ACTIVE INCIDENTS
            </div>
            <div className="text-2xl font-black text-emergency-600 font-mono mt-0.5">
              342 Active
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              Synthetic demonstration data
            </div>
          </div>

          <div className="bg-white border border-charcoal-200 p-4 rounded-2xl shadow-card">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500 tracking-wider">
              RESCUE UNITS READY
            </div>
            <div className="text-2xl font-black text-navy-950 font-mono mt-0.5">
              27 Units Available
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              Watercraft, USAR, ALS ambulances
            </div>
          </div>

          <div className="bg-white border border-charcoal-200 p-4 rounded-2xl shadow-card">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500 tracking-wider">
              SHELTER STATUS
            </div>
            <div className="text-2xl font-black text-amber-600 font-mono mt-0.5">
              18 Near Capacity
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              3,120 of 3,800 spaces occupied
            </div>
          </div>

          <div className="bg-white border border-charcoal-200 p-4 rounded-2xl shadow-card">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500 tracking-wider">
              HOSPITAL SURGE
            </div>
            <div className="text-2xl font-black text-purple-600 font-mono mt-0.5">
              12 Capacity Alerts
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              Trauma pre-alerts active
            </div>
          </div>
        </div>

        {/* Large Immersive Leaflet Map */}
        <div className="bg-white rounded-3xl p-3 border border-charcoal-200 shadow-elevated">
          <OperationalMap
            incidents={incidents}
            resources={resources}
            hospitals={hospitals}
            shelters={shelters}
            reliefHubs={reliefHubs}
            selectedCity={selectedMapCity}
            height="560px"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-charcoal-500 px-2">
          <span>Map Telemetry: Leaflet GeoSpatial Grid &bull; Live Marker Pulsing</span>
          <Link to="/emergency-map" className="font-bold text-navy-950 hover:text-emergency-600 flex items-center space-x-1">
            <span>Open Fullscreen Operational Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. EMERGENCY TYPES (6 Large Editorial Contextual Cards)                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
              MULTI-HAZARD PROTOCOLS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Trained Protocols for All Major Hazards
            </h2>
            <p className="text-charcoal-600 text-sm mt-1 max-w-xl">
              Each disaster type activates specialized agent parsing rules, equipment matching, and clinical triage paths.
            </p>
          </div>

          <Link
            to="/emergency-types"
            className="text-xs font-bold text-navy-950 hover:text-emergency-600 flex items-center space-x-1.5"
          >
            <span>Explore All Hazard Protocols</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMERGENCY_CATEGORIES.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-3xl overflow-hidden border border-charcoal-200 shadow-card hover:shadow-float transition-all duration-300 flex flex-col"
            >
              {/* Large Image with Dark Gradient */}
              <div className="relative h-56 overflow-hidden bg-navy-950">
                <img
                  src={item.img}
                  alt={item.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-mono opacity-90">
                  {item.stats}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-navy-950 mb-2 group-hover:text-emergency-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={`/emergency-types#${item.type}`}
                  className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs font-bold text-navy-950 group-hover:text-emergency-600 transition-colors"
                >
                  <span>Response Protocol</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. HUMANITARIAN RESPONSE ECOSYSTEM (Visual Beautiful Flow Diagram)        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-14 text-white border border-navy-800 shadow-float relative overflow-hidden">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              COMPLETE HUMANITARIAN ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight mt-1">
              Connecting Every Node in the Lifeline
            </h2>
            <p className="text-navy-200 text-sm mt-2">
              RELIEFGRID is not merely an intake form. It is a shared coordination fabric unifying affected citizens, rescue agencies, trauma centers, and relief supplies.
            </p>
          </div>

          {/* Graphical Flow Diagram */}
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Top Node: Citizen */}
            <div className="flex justify-center">
              <div className="bg-white text-navy-950 px-8 py-3.5 rounded-2xl shadow-elevated border-2 border-emergency-500 font-bold text-sm flex items-center space-x-3">
                <Users className="w-5 h-5 text-emergency-600" />
                <span>Affected Citizen / Community In Need</span>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-white to-emergency-500 animate-pulse"></div>
            </div>

            {/* Center Node: RELIEFGRID AI Multi-Agent Core */}
            <div className="flex justify-center">
              <div className="bg-emergency-600 text-white px-10 py-5 rounded-3xl shadow-float border-2 border-white/30 text-center relative group">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">
                  ORCHESTRATION ENGINE
                </div>
                <div className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                  RELIEFGRID AI Multi-Agent Core
                </div>
                <div className="text-xs text-white/90 mt-1">
                  10 Autonomous Gemini Reasoning Agents &bull; Continuous State Log
                </div>
              </div>
            </div>

            {/* Branching Lines */}
            <div className="grid grid-cols-3 text-center text-xs font-mono text-navy-300">
              <div>&swarr; Spatial Dispatch</div>
              <div>&darr; Clinical Triage</div>
              <div>&searr; Evacuation</div>
            </div>

            {/* Middle Tier: 3 Primary Response Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-navy-900/90 border border-white/20 p-5 rounded-2xl text-center">
                <LifeBuoy className="w-6 h-6 text-emergency-400 mx-auto mb-2" />
                <div className="font-bold text-base text-white">Rescue Responders</div>
                <div className="text-xs text-navy-300 mt-1">
                  Rescue 1122, Army Aviation, boat units &amp; USAR teams with turn-by-turn routing.
                </div>
              </div>

              <div className="bg-navy-900/90 border border-white/20 p-5 rounded-2xl text-center">
                <Activity className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="font-bold text-base text-white">Hospitals &amp; Trauma</div>
                <div className="text-xs text-navy-300 mt-1">
                  Real-time ICU bed reservations, hypothermia treatment pre-alerts &amp; surge status.
                </div>
              </div>

              <div className="bg-navy-900/90 border border-white/20 p-5 rounded-2xl text-center">
                <Building2 className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="font-bold text-base text-white">Evacuation Shelters</div>
                <div className="text-xs text-navy-300 mt-1">
                  Capacity management, family housing, clean water distribution &amp; medicine caches.
                </div>
              </div>
            </div>

            {/* Bottom Tier: NGOs, Relief Hubs & Volunteers */}
            <div className="flex justify-center pt-2">
              <div className="bg-navy-950 border border-navy-700 px-8 py-4 rounded-2xl text-center max-w-xl">
                <div className="flex items-center justify-center space-x-2 text-amber-400 text-xs font-mono uppercase font-bold mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span>COMMUNITY RELIEF DISTRIBUTION LAYER</span>
                </div>
                <div className="text-xs text-navy-200">
                  Humanitarian NGOs (Edhi, Red Crescent, Al-Khidmat), decentralized warehouses, and certified local volunteers deployed on non-hazardous support tasks.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PREDICTIVE INTELLIGENCE (Dark Navy Section with Real-Time Situation Insight) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-float">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-1">
                PREDICTIVE SITUATION INTELLIGENCE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Early Hazard Forecasting &bull; 6-Hour Horizon
              </h2>
            </div>
            <span className="text-xs font-mono bg-navy-900 text-navy-300 px-3 py-1.5 rounded-xl border border-navy-700">
              SYNTHETIC DEMO TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Insight Banner */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-gradient-to-r from-purple-900/40 to-navy-900 border border-purple-500/30 rounded-2xl p-6 shadow-inner">
                <div className="flex items-center space-x-2 text-purple-300 text-xs font-mono font-bold uppercase mb-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AI SITUATION SYNTHESIS &bull; ZONE 4 ALERT</span>
                </div>
                <blockquote className="text-base sm:text-lg font-bold text-white leading-snug">
                  &ldquo;Flood-related incidents are increasing in Zone 4 (Shahdara Ravi Basin). Watercraft resources may become constrained if the trend continues over the next 4 hours.&rdquo;
                </blockquote>
                <div className="mt-4 pt-4 border-t border-purple-800/60 flex flex-wrap items-center justify-between gap-2 text-xs text-navy-200">
                  <span>Proactive Recommendation: Pre-stage 3 zodiac boats from Multan Reserve</span>
                  <span className="text-purple-300 font-mono">Confidence: 91.2%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-navy-900 p-3.5 rounded-xl border border-navy-800">
                  <div className="text-xs text-navy-400">Shelter Risk</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">High (88%)</div>
                </div>
                <div className="bg-navy-900 p-3.5 rounded-xl border border-navy-800">
                  <div className="text-xs text-navy-400">Hospital Pressure</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">Moderate (62%)</div>
                </div>
                <div className="bg-navy-900 p-3.5 rounded-xl border border-navy-800">
                  <div className="text-xs text-navy-400">Watercraft Availability</div>
                  <div className="text-lg font-bold text-red-400 mt-1">Constrained (2 Left)</div>
                </div>
              </div>
            </div>

            {/* Right Synthetic Telemetry Bars */}
            <div className="lg:col-span-5 bg-navy-900/80 p-6 rounded-2xl border border-navy-800 space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-navy-300">
                REGIONAL INCIDENT TREND (PAST 24H)
              </div>

              {[
                { time: '00:00 - 06:00', count: '48 Incidents', width: '35%', color: 'bg-navy-600' },
                { time: '06:00 - 12:00', count: '112 Incidents', width: '65%', color: 'bg-indigo-600' },
                { time: '12:00 - 18:00', count: '184 Incidents (Peak)', width: '92%', color: 'bg-emergency-600' },
                { time: '18:00 - 24:00 (Projected)', count: '142 Incidents', width: '75%', color: 'bg-amber-600' },
              ].map((row) => (
                <div key={row.time} className="space-y-1">
                  <div className="flex justify-between text-xs text-navy-200">
                    <span>{row.time}</span>
                    <span className="font-mono font-bold">{row.count}</span>
                  </div>
                  <div className="w-full bg-navy-950 h-2.5 rounded-full overflow-hidden">
                    <div className={`${row.color} ${row.width} h-full rounded-full`}></div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. IMPACT STATISTICS (Large Numbers with Human Context & Synthetic Label) */}
      {/* ========================================================================= */}
      <section className="bg-white border-y border-charcoal-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600">
              MEASURED CAPABILITY FOOTPRINT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 mt-1">
              Operational Scale &bull; National Coverage
            </h2>
            <p className="text-xs text-charcoal-500 mt-2 font-mono">
              Synthetic demonstration metrics representing simulated response throughput
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-8 rounded-3xl bg-charcoal-50 border border-charcoal-200 shadow-card">
              <div className="text-4xl sm:text-5xl font-black text-navy-950 font-heading">
                18,450+
              </div>
              <div className="text-xs font-bold text-charcoal-700 uppercase tracking-widest mt-2">
                People Supported
              </div>
              <div className="text-[11px] text-charcoal-500 mt-1">
                Safe evacuations &amp; aid delivery
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-charcoal-50 border border-charcoal-200 shadow-card">
              <div className="text-4xl sm:text-5xl font-black text-emergency-600 font-heading">
                342
              </div>
              <div className="text-xs font-bold text-charcoal-700 uppercase tracking-widest mt-2">
                Rescue Missions
              </div>
              <div className="text-[11px] text-charcoal-500 mt-1">
                Authorized by emergency coordinators
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-charcoal-50 border border-charcoal-200 shadow-card">
              <div className="text-4xl sm:text-5xl font-black text-navy-950 font-heading">
                12,800+
              </div>
              <div className="text-xs font-bold text-charcoal-700 uppercase tracking-widest mt-2">
                Relief Resources Coordinated
              </div>
              <div className="text-[11px] text-charcoal-500 mt-1">
                Rations, medicines &amp; safe water
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-charcoal-50 border border-charcoal-200 shadow-card">
              <div className="text-4xl sm:text-5xl font-black text-emerald-600 font-heading">
                94.8%
              </div>
              <div className="text-xs font-bold text-charcoal-700 uppercase tracking-widest mt-2">
                AI Recommendation Acceptance
              </div>
              <div className="text-[11px] text-charcoal-500 mt-1">
                Coordinator agreement with AI dispatch
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CINEMATIC CLOSING CTA (Humanitarian Background Image & High Contrast) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-float border border-navy-800 bg-navy-950 min-h-[420px] flex items-center justify-center p-8 sm:p-16 text-center">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.communitySafety}
              alt="Community safety and relief workers helping families"
              onError={handleImageError}
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>THE OPERATIONAL FUTURE OF DISASTER RESPONSE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              Build a safer response network together.
            </h2>

            <p className="text-navy-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you are a citizen needing immediate rescue, a paramedic in an ambulance, a hospital chief, or an NGO relief team, RELIEFGRID AI connects your efforts in real time.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/report-emergency"
                className="bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-extrabold px-8 py-4 rounded-2xl text-base shadow-elevated transition-all flex items-center space-x-2 group"
              >
                <ShieldAlert className="w-5 h-5" />
                <span>Report an Emergency</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/command"
                className="bg-white hover:bg-navy-50 text-navy-950 font-extrabold px-8 py-4 rounded-2xl text-base shadow-card transition-all flex items-center space-x-2"
              >
                <Radio className="w-5 h-5 text-emerald-600" />
                <span>Explore Command Center</span>
              </Link>
            </div>

            <div className="text-xs text-navy-400 font-mono pt-4">
              RELIEFGRID AI &bull; Autonomous Gemini Orchestration &bull; Human Authorization Required
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
