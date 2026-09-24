import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';
import {
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  LifeBuoy,
  HeartPulse,
  Building2,
  Compass,
} from 'lucide-react';

export const EmergencyTypes: React.FC = () => {
  const HAZARDS = [
    {
      id: 'flood',
      title: 'Floods & Flash Inundations',
      category: 'HYDROLOGICAL DISASTER',
      image: IMAGES.types.flood,
      risk: 'Seasonal monsoonal surges across Ravi, Chenab, and Indus basins, exacerbated by urban cloudbursts in Karachi and Rawalpindi. Water levels can rise several feet per hour, trapping ground-floor residents without warning.',
      aiResponse: 'Incident Intel extracts victim counts, infant demographics, and roof entrapment. Resource Matching queries shallow-water zodiacs (Boat B-03) and routes around inundated underpasses.',
      safetyDos: [
        'Move immediately to the highest safe dry elevation or roof.',
        'Cut electrical power at main breakers before water contacts switchboards.',
        'Signal rescue craft with high-visibility cloth or rhythmic whistle blasts.',
      ],
      safetyDonts: [
        'Never drive or walk through moving water over 6 inches deep.',
        'Do not drink untreated or unboiled tap water from inundated wells.',
        'Never touch electrical poles standing in water.',
      ],
      resources: 'Zodiac Rescue Boats &bull; Life Jackets &bull; Hypothermia Warmers &bull; ORS Packs',
    },
    {
      id: 'earthquake',
      title: 'Earthquakes & Structural Tremors',
      category: 'GEOPHYSICAL HAZARD',
      image: IMAGES.types.earthquake,
      risk: 'Tectonic subduction along Northern Pakistan fault lines causing sudden structural collapse in high-density unreinforced masonry buildings.',
      aiResponse: 'Triage Agent flags entrapment severity, matches Heavy Urban Search & Rescue (USAR) units equipped with acoustic listening devices, and locks neurotrauma surgery suites.',
      safetyDos: [
        'Drop, Cover, and Hold On beneath sturdy tables or load-bearing lintels.',
        'Evacuate only after tremor stops, using exterior stairwells (never elevators).',
        'Shut off gas supply lines immediately to prevent post-shake blazes.',
      ],
      safetyDonts: [
        'Do not run outside during active shaking due to falling glass facades.',
        'Do not use naked matches or lighters in damaged spaces.',
        'Do not re-enter compromised buildings until structural engineers certify safety.',
      ],
      resources: 'Pneumatic Shoring Beams &bull; Acoustic Void Listening Devices &bull; Blood Reserves',
    },
    {
      id: 'fire',
      title: 'Urban & Industrial Fires',
      category: 'THERMAL CRISIS',
      image: IMAGES.types.fire,
      risk: 'Chemical factory blazes, textile warehouse infernos, and high-rise apartment electrical fires producing lethal toxic smoke plumes.',
      aiResponse: 'Response Planning models smoke drift corridors, coordinates Class-B chemical foam tenders, and pre-alerts specialized burn ICU centers with capacity locks.',
      safetyDos: [
        'Crawl low to the floor where cleaner, cooler oxygen remains.',
        'Test interior doors with the back of hand before opening.',
        'Close doors behind you to starve the flames of oxygen draft.',
      ],
      safetyDonts: [
        'Never open a door that feels hot to the touch.',
        'Do not use elevators; flames and smoke rise rapidly through vertical elevator shafts.',
        'Do not delay evacuation to collect personal items or documents.',
      ],
      resources: 'Class-B Foam Tenders &bull; Smoke Extraction Fans &bull; Sterile Burn Dressings',
    },
    {
      id: 'heatwave',
      title: 'Severe Urban Heatwaves',
      category: 'CLIMATIC EXTREME',
      image: IMAGES.types.heatwave,
      risk: 'Temperatures exceeding 48°C coupled with high Arabian Sea humidity across Sindh and Punjab, placing infants, outdoor laborers, and elders at acute risk of fatal heatstroke.',
      aiResponse: 'Situation Intelligence Agent tracks wet-bulb temperature indices, alerts regional misting stations, and stages oral rehydration caches in vulnerable neighborhoods.',
      safetyDos: [
        'Consume cold electrolyte-balanced fluids continuously throughout the day.',
        'Apply cold, wet towels to the neck, armpits, and groin of distressed individuals.',
        'Recognize heatstroke symptoms: absence of sweating, disorientation, rapid pulse.',
      ],
      safetyDonts: [
        'Never leave children, elders, or pets inside parked vehicles for any duration.',
        'Avoid strenuous outdoor physical labor between 11:00 AM and 4:30 PM.',
        'Do not drink heavy caffeinated or sugary beverages that accelerate dehydration.',
      ],
      resources: 'Hydration Misting Stations &bull; ORS Packs &bull; Ice Baths &bull; ALS Ambulances',
    },
    {
      id: 'storm',
      title: 'Cyclones & Coastal Surges',
      category: 'COASTAL STORM',
      image: IMAGES.types.storm,
      risk: 'Arabian Sea tropical storm systems generating coastal flooding, wind speeds exceeding 100 km/h, and high-tension electrical line hazards.',
      aiResponse: 'Dispatches maritime evacuation orders, maps wind hazard perimeters, and routes coastal families to concrete-reinforced inland storm shelters.',
      safetyDos: [
        'Board up windows or secure reinforced storm shutters well in advance.',
        'Unplug sensitive electronics and turn off gas regulators before landfall.',
        'Keep battery-operated emergency radios tuned to NDMA bulletins.',
      ],
      safetyDonts: [
        'Never approach downed electrical wires or metal chainlink fences touching wires.',
        'Do not visit coastal sea walls or fishing piers to view storm waves.',
        'Do not venture outdoors during the calm "eye" of the cyclone.',
      ],
      resources: 'Reinforced Shelters &bull; Emergency Generators &bull; High-Clearance Rescue Trucks',
    },
    {
      id: 'building_collapse',
      title: 'Structural Building Collapses',
      category: 'URBAN COLLAPSE',
      image: IMAGES.types.buildingCollapse,
      risk: 'Catastrophic failure of load-bearing pillars in aging urban buildings following ground subsidence, heavy monsoon saturation, or structural overload.',
      aiResponse: 'Situation Intel calculates void geometry, schedules hydraulic cutters and shoring struts, and reserves orthopedic trauma teams.',
      safetyDos: [
        'Protect your head and nose with clothing to prevent suffocating on cement dust.',
        'Tap rhythmically on metal pipes or masonry walls so acoustic sensors detect you.',
        'Conserve vocal energy and shout only when you hear rescuers directly above.',
      ],
      safetyDonts: [
        'Never strike matches or light lighters due to ruptured gas lines.',
        'Do not thrash or kick violently; unstable debris could trigger secondary collapses.',
        'Do not lose hope; rescue sensors can hear faint tapping through deep concrete.',
      ],
      resources: 'Hydraulic Spreaders &bull; Concrete Diamond Saws &bull; Search Canines &bull; Orthopedic Trauma',
    },
  ];

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.types.storm}
            alt="Storm and disaster response protocols"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              HAZARD PROTOCOLS &bull; OPERATIONAL READINESS
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Trained Protocols for Every Major Hazard.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              Every disaster has unique physics, medical complications, and extraction requirements. Inspect the tailored Gemini intelligence models and citizen survival protocols for Pakistan&apos;s primary hazard profiles.
            </p>
          </div>
        </div>
      </section>

      {/* 2. LARGE EDITORIAL SECTIONS FOR EACH HAZARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {HAZARDS.map((h, idx) => (
          <div
            key={h.id}
            id={h.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-charcoal-200"
          >
            {/* Image Side (Alternating on large screens) */}
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 shadow-elevated">
                <img
                  src={h.image}
                  alt={h.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white text-xs font-mono">
                  {h.category} &bull; Tailored Gemini multi-agent response model active
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emergency-600 uppercase tracking-widest">
                  {h.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950">
                  {h.title}
                </h2>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-500">
                  The Humanitarian Risk
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  {h.risk}
                </p>
              </div>

              <div className="p-4 bg-navy-50 border border-navy-200 rounded-xl space-y-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-navy-950">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>How RELIEFGRID AI Responds</span>
                </div>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {h.aiResponse}
                </p>
              </div>

              {/* Do's and Don'ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Immediate Do&apos;s</span>
                  </div>
                  <ul className="space-y-1 text-emerald-950 list-disc list-inside">
                    {h.safetyDos.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl">
                  <div className="font-bold text-rose-900 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Critical Don&apos;ts</span>
                  </div>
                  <ul className="space-y-1 text-rose-950 list-disc list-inside">
                    {h.safetyDonts.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal-100">
                <div className="text-[11px] font-mono text-charcoal-500">
                  Pre-staged: {h.resources}
                </div>
                <Link
                  to="/report-emergency"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-emergency-600 hover:text-emergency-700"
                >
                  <span>Report this emergency</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </section>

    </div>
  );
};
