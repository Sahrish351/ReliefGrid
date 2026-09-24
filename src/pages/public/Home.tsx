import React from 'react';
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
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { AISimulator } from '../../components/ai/AISimulator';
import { AIAgentsShowcase } from '../../components/ai/AIAgentsShowcase';
import { OperationalMap } from '../../components/map/OperationalMap';
import { useData } from '../../context/DataContext';

export const Home: React.FC = () => {
  const { incidents, resources, hospitals, shelters, reliefHubs } = useData();

  const TRUST_ITEMS = [
    { label: 'Emergency Response 1122', icon: LifeBuoy },
    { label: 'National Disaster Coordination', icon: Radio },
    { label: 'Hospital Emergency Network', icon: Activity },
    { label: 'Community Evacuation Shelters', icon: Building2 },
    { label: 'Humanitarian Relief Logistics', icon: HeartHandshake },
  ];

  const EMERGENCY_CATEGORIES = [
    { title: 'Floods & Flash Inundation', desc: 'Ravi & Indus basin telemetry with shallow-water zodiac extraction units.', img: IMAGES.types.flood, type: 'flood' },
    { title: 'Earthquakes & Structural', desc: 'Heavy USAR acoustic sensors, hydraulic cutters, and evacuation routing.', img: IMAGES.types.earthquake, type: 'earthquake' },
    { title: 'Industrial & Urban Fires', desc: 'HazMat foam tenders, rapid smoke evacuation, and burn triage routing.', img: IMAGES.types.fire, type: 'fire' },
    { title: 'Severe Heatwave Emergencies', desc: 'Community misting stations, ORS caches, and hyperthermia ALS routing.', img: IMAGES.types.heatwave, type: 'heatwave' },
    { title: 'Cyclones & Severe Storms', desc: 'High-tension power line hazard detection and rooftop storm extractions.', img: IMAGES.types.storm, type: 'storm' },
    { title: 'Building Collapses', desc: 'Shoring, debris removal, entrapped person location, and trauma triage.', img: IMAGES.types.buildingCollapse, type: 'building_collapse' },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION (Editorial Split Layout) */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 border border-navy-200 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emergency-600 animate-pulse"></span>
                <span>AI-POWERED EMERGENCY RESPONSE &amp; HUMANITARIAN COORDINATION</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-navy-950 tracking-tight leading-[1.1]">
                When Every Second Matters, <span className="text-emergency-600">Intelligence</span> Should Move First.
              </h1>

              <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed max-w-xl">
                RELIEFGRID AI orchestrates multi-agent intelligence to turn frantic emergency calls into verified, prioritized, and human-authorized rescue missions across Pakistan.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/report-emergency"
                  className="inline-flex items-center space-x-2.5 bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-bold px-7 py-4 rounded-2xl text-sm sm:text-base shadow-elevated transition-all"
                >
                  <ShieldAlert className="w-5 h-5" />
                  <span>Report an Emergency</span>
                </Link>

                <Link
                  to="/emergency-map"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-navy-50 text-navy-950 font-bold border border-charcoal-200 px-6 py-4 rounded-2xl text-sm sm:text-base shadow-card transition-all"
                >
                  <Compass className="w-5 h-5 text-navy-700" />
                  <span>Explore Response Network</span>
                </Link>
              </div>

              {/* Key trust badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-charcoal-500 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Human-in-the-Loop Approval</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>10 Specialized Gemini Agents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Zero Exposed API Secrets</span>
                </div>
              </div>

            </div>

            {/* Right Cinematic Rescue Imagery & Live Floating Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-float border border-charcoal-200 aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] bg-navy-950">
                <img
                  src={IMAGES.heroRescue}
                  alt="Emergency flood rescue team navigating high water"
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Live Incident Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-elevated border border-charcoal-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-1.5 text-[10px] font-extrabold uppercase bg-emergency-100 text-emergency-700 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emergency-600 animate-ping"></span>
                      <span>ACTIVE MISSION: RG-1042</span>
                    </span>
                    <span className="text-[11px] font-mono text-charcoal-500">Zone 4 (Lahore)</span>
                  </div>
                  <div className="text-xs font-bold text-navy-950">
                    18 Trapped Residents in Floodway
                  </div>
                  <div className="text-[11px] text-charcoal-600 mt-1 flex items-center justify-between">
                    <span>Assigned: <strong>Boat B-03 + Team R-17</strong></span>
                    <span className="text-emergency-600 font-bold">ETA 11 min</span>
                  </div>
                </div>

                {/* Subtle top status badge */}
                <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span>Operational Grid Live</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="border-y border-charcoal-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center space-x-2.5 justify-center py-2 text-charcoal-700 text-xs sm:text-sm font-semibold">
                  <Icon className="w-4 h-4 text-navy-700 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE INTERACTIVE AI SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AISimulator />
      </section>

      {/* 4. 10 AI AGENTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIAgentsShowcase />
      </section>

      {/* 5. LIVE OPERATIONAL NETWORK MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy-600 mb-1">
              Real-Time Humanitarian Map
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
              Live Emergency Response Network Across Pakistan
            </h2>
            <p className="text-charcoal-600 text-sm mt-1 max-w-xl">
              Track operational rescue units, medical beds, available shelter capacities, and regional hazard zones in real time.
            </p>
          </div>
          <Link
            to="/emergency-map"
            className="text-xs font-bold text-navy-950 hover:text-emergency-600 flex items-center space-x-1.5"
          >
            <span>Open Fullscreen Map View</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <OperationalMap
          incidents={incidents}
          resources={resources}
          hospitals={hospitals}
          shelters={shelters}
          reliefHubs={reliefHubs}
          selectedCity="Lahore"
          height="520px"
        />
      </section>

      {/* 6. PROBLEM STATEMENT (Editorial Split) */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 border border-navy-800 shadow-elevated">
              <img
                src={IMAGES.heroTeamwork}
                alt="Humanitarian emergency operations coordination desk"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">The Humanitarian Challenge</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold leading-tight">
                Disasters Fragment Information. Fragmented Information Costs Lives.
              </h2>
              <p className="text-navy-200 text-sm sm:text-base leading-relaxed">
                During river floods, sudden earthquakes, or heatwaves, citizens cannot tell which shelters have space, first responders receive chaotic duplicate alerts, and coordinators waste hours cross-checking hospital bed availability over phone calls.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
                  <div className="font-bold text-sm text-white mb-1">Before RELIEFGRID AI</div>
                  <div className="text-xs text-navy-300">Siloed spreadsheets, duplicate phone reports, blind resource dispatch without vulnerability awareness.</div>
                </div>
                <div className="bg-navy-800 p-4 rounded-xl border border-navy-700">
                  <div className="font-bold text-sm text-amber-300 mb-1">With RELIEFGRID AI</div>
                  <div className="text-xs text-navy-200">Instant AI structuring, explainable triage, automated hospital pre-alerts, and human-authorized dispatch in minutes.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (Visual 5-Step Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-navy-600">Standard Operating Protocol</span>
          <h2 className="text-3xl font-extrabold font-heading text-navy-950 mt-1">Five Coordinated Steps to Safety</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Report', desc: 'Citizen submits natural-language text or call details with demographic markers.' },
            { step: '02', title: 'Understand', desc: 'Gemini extracts structured counts, vulnerable age groups, and hazard vectors.' },
            { step: '03', title: 'Coordinate', desc: 'Spatial matching queries nearest capable watercraft, vehicles, and hospital beds.' },
            { step: '04', title: 'Respond', desc: 'Emergency coordinator reviews explainable AI factors and authorizes mission dispatch.' },
            { step: '05', title: 'Recover', desc: 'Real-time telemetry tracks evacuation to designated shelters with supply monitoring.' }
          ].map((item, idx) => (
            <div key={item.step} className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card relative">
              <div className="text-xs font-mono font-bold text-navy-700 mb-2">STEP {item.step}</div>
              <h3 className="font-bold text-base text-navy-950 mb-1">{item.title}</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EMERGENCY TYPES (6 Contextual Image Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600">Hazard Readiness</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950 mt-1">
              Trained Protocols for All Major Hazards
            </h2>
          </div>
          <Link to="/emergency-types" className="text-xs font-bold text-navy-950 hover:text-emergency-600 flex items-center space-x-1">
            <span>View All Protocols</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMERGENCY_CATEGORIES.map((cat) => (
            <div key={cat.title} className="bg-white rounded-2xl overflow-hidden border border-charcoal-200 shadow-card group hover:shadow-elevated transition-all flex flex-col">
              <div className="h-44 overflow-hidden relative bg-navy-950">
                <img
                  src={cat.img}
                  alt={cat.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-navy-950 mb-1">{cat.title}</h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{cat.desc}</p>
                </div>
                <Link
                  to={`/emergency-types#${cat.type}`}
                  className="text-xs font-bold text-navy-900 group-hover:text-emergency-600 flex items-center space-x-1 mt-4 pt-3 border-t border-charcoal-100"
                >
                  <span>Read Emergency Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. IMPACT STATISTICS (Large Numbers with Human Context) */}
      <section className="bg-white border-y border-charcoal-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600">Simulated Impact &amp; Reach</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">Demonstration Footprint</h2>
            <p className="text-xs text-charcoal-500 mt-1">Synthetic figures representing operational network capacity</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-charcoal-50 border border-charcoal-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-heading">18,450+</div>
              <div className="text-xs font-bold text-charcoal-600 uppercase tracking-wider mt-2">Evacuees Supported</div>
            </div>
            <div className="p-6 rounded-2xl bg-charcoal-50 border border-charcoal-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-emergency-600 font-heading">342</div>
              <div className="text-xs font-bold text-charcoal-600 uppercase tracking-wider mt-2">Missions Authorized</div>
            </div>
            <div className="p-6 rounded-2xl bg-charcoal-50 border border-charcoal-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-heading">3,120</div>
              <div className="text-xs font-bold text-charcoal-600 uppercase tracking-wider mt-2">Shelter Beds Live</div>
            </div>
            <div className="p-6 rounded-2xl bg-charcoal-50 border border-charcoal-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-green-600 font-heading">94.8%</div>
              <div className="text-xs font-bold text-charcoal-600 uppercase tracking-wider mt-2">AI Recommendation Acceptance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CALM HUMANITARIAN CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-elevated border border-navy-800">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Build a Safer Response Network Together.
            </h2>
            <p className="text-navy-200 text-sm sm:text-base leading-relaxed">
              Whether you are a citizen requesting urgent help, a paramedic on duty, an NGO coordinator, or a community volunteer, RELIEFGRID AI connects your efforts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/report-emergency"
                className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-card transition-all"
              >
                Report Emergency Now
              </Link>
              <Link
                to="/command"
                className="bg-white hover:bg-navy-50 text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                Enter Command Center
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
