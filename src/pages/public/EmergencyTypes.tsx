import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';
import { ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export const EmergencyTypes: React.FC = () => {
  const PROTOCOLS = [
    {
      id: 'flood',
      title: 'Floods & Flash Inundations',
      image: IMAGES.types.flood,
      summary: 'Seasonal monsoon river surges across Ravi, Chenab, and Indus basins, plus urban cloudbursts in Karachi and Rawalpindi.',
      aiStrategy: 'Gemini evaluates topographic water crest estimates, identifies shallow-water craft (Boat B-03), and flags infants and hypothermia vectors.',
      doList: ['Move immediately to highest dry roof', 'Turn off electrical mains before water reaches switchboard', 'Signal using flashlights or high-contrast cloth'],
      dontList: ['Do not walk through moving water over 6 inches deep', 'Do not drive through flooded underpasses', 'Do not consume unboiled tap water'],
    },
    {
      id: 'earthquake',
      title: 'Earthquakes & Structural Collapses',
      image: IMAGES.types.earthquake,
      summary: 'Tectonic tremors along Northern Pakistan fault lines and subsequent structural instability in high-density urban tenements.',
      aiStrategy: 'Matches Heavy USAR units with acoustic listening equipment and pneumatic shoring beams, pre-alerting neurotrauma surgical teams.',
      doList: ['Drop, Cover, and Hold on under sturdy furniture', 'Evacuate only when shaking stops using stairwells', 'Check for gas leaks and structural cracks'],
      dontList: ['Never use elevators during or after a tremor', 'Do not re-enter buildings before certified engineer safety clearance', 'Avoid standing under glass facades'],
    },
    {
      id: 'fire',
      title: 'Urban & Industrial Fires',
      image: IMAGES.types.fire,
      summary: 'Chemical and textile industrial zone blazes, residential electrical short-circuits, and warehouse fires.',
      aiStrategy: 'Routes HazMat foam tender units, maps wind drift of toxic fumes, and pre-alerts regional burn trauma intensive care centers.',
      doList: ['Crawl low under smoke where air is cleaner', 'Feel doors with the back of hand before opening', 'Close doors behind you to slow flame propagation'],
      dontList: ['Do not open hot doors', 'Do not run if clothes catch fire — Stop, Drop, and Roll', 'Do not return to retrieve possessions'],
    },
    {
      id: 'heatwave',
      title: 'Severe Heatwave Emergencies',
      image: IMAGES.types.heatwave,
      summary: 'Extreme 45°C–50°C summer heatwaves in Sindh and Punjab with severe humidity index spikes.',
      aiStrategy: 'Deploys mobile hydration caches, monitors ORS supplies, and reserves emergency department cooling baths for heatstroke victims.',
      doList: ['Drink electrolyte water continuously even if not thirsty', 'Keep vulnerable elderly and infants in shade with wet towels', 'Know warning signs: confusion, cessation of sweating'],
      dontList: ['Avoid direct sunlight between 11 AM and 4 PM', 'Never leave children or elderly inside parked vehicles', 'Do not consume heavy dehydrating beverages'],
    },
    {
      id: 'storm',
      title: 'Severe Storms & Cyclones',
      image: IMAGES.types.storm,
      summary: 'Coastal Arabian Sea tropical storms and inland squalls snapping high-tension power cables.',
      aiStrategy: 'Monitors electrical grid telemetry, dispatches specialized line clearance squads, and routes coastal residents to hardened shelters.',
      doList: ['Secure loose outdoor items that could become airborne', 'Stay away from flooded streets with dangling wires', 'Keep battery radio tuned to NDMA emergency broadcasts'],
      dontList: ['Do not touch any downed cable or fence in contact with it', 'Do not seek shelter under isolated trees during lightning', 'Avoid coastal fishing piers during storm surges'],
    },
    {
      id: 'building_collapse',
      title: 'Structural Building Collapses',
      image: IMAGES.types.buildingCollapse,
      summary: 'Yielding of foundation columns in unreinforced masonry structures following heavy rain or unlicensed additions.',
      aiStrategy: 'Calculates entrapment voids, coordinates hydraulic spreaders, and directs casualties to tertiary trauma resuscitation suites.',
      doList: ['Protect head and airway from dust clouds with clothing', 'Tap rhythmically on pipes or walls so rescuers can hear', 'Conserve energy and vocal stamina'],
      dontList: ['Do not use matches or lighters due to potential gas leaks', 'Do not panic or kick violently to avoid causing secondary collapses', 'Avoid shouting continuously'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-navy-600">Standard Protocols</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950 mt-1">
          Hazard Types &amp; Operational Protocols
        </h1>
        <p className="text-charcoal-600 text-sm sm:text-base mt-2">
          Every disaster type demands distinct AI triage models, specialized rescue equipment, and public safety procedures. Review the protocols below.
        </p>
      </div>

      {/* Protocol Cards */}
      <div className="space-y-10">
        {PROTOCOLS.map((proto) => (
          <div
            key={proto.id}
            id={proto.id}
            className="bg-white rounded-3xl border border-charcoal-200 overflow-hidden shadow-card hover:shadow-elevated transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image */}
            <div className="lg:col-span-4 h-64 lg:h-auto bg-navy-950 relative overflow-hidden">
              <img
                src={proto.image}
                alt={proto.title}
                onError={handleImageError}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden"></div>
              <div className="absolute bottom-4 left-4 text-white lg:hidden">
                <span className="font-bold text-lg">{proto.title}</span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8 p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-2xl font-bold font-heading text-navy-950">{proto.title}</h2>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">{proto.summary}</p>
              </div>

              {/* AI Strategy Box */}
              <div className="bg-navy-50 rounded-xl p-3.5 border border-navy-200 text-xs">
                <div className="font-bold text-navy-900 mb-1 flex items-center space-x-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-navy-700" />
                  <span>RELIEFGRID AI Dispatch Protocol:</span>
                </div>
                <p className="text-charcoal-700 leading-relaxed">{proto.aiStrategy}</p>
              </div>

              {/* Do / Don't Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-green-50/70 p-4 rounded-xl border border-green-200 space-y-2">
                  <div className="font-bold text-green-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-700" />
                    <span>Recommended Actions (Do)</span>
                  </div>
                  <ul className="space-y-1 text-green-950 list-disc list-inside">
                    {proto.doList.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emergency-50/70 p-4 rounded-xl border border-emergency-200 space-y-2">
                  <div className="font-bold text-emergency-900 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-emergency-700" />
                    <span>Critical Hazards to Avoid (Don't)</span>
                  </div>
                  <ul className="space-y-1 text-emergency-950 list-disc list-inside">
                    {proto.dontList.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  to={`/report-emergency`}
                  className="bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                >
                  Report {proto.title} Emergency &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
