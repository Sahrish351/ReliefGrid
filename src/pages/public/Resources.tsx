import React, { useState } from 'react';
import {
  FileText,
  Download,
  Code,
  Database,
  Shield,
  BookOpen,
  ArrowRight,
  LifeBuoy,
  HeartPulse,
  Building2,
  Users,
  Package,
  Compass,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { Link } from 'react-router-dom';

export const Resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const CATEGORIES = [
    'All',
    'Emergency Preparedness',
    'First Response',
    'Evacuation',
    'Medical Support',
    'Shelter Operations',
    'Volunteer Guidance',
    'Relief Logistics',
  ];

  const RESOURCES = [
    {
      title: 'Monsoon Flood Swiftwater Navigation Manual',
      category: 'First Response',
      format: 'PDF SOP &bull; 2.4 MB',
      image: IMAGES.floodBoat,
      desc: 'Standard operating manual for shallow-water zodiacs navigating urban flash flood debris and underwater obstacles.',
    },
    {
      title: '72-Hour Family Disaster Evacuation Guide',
      category: 'Emergency Preparedness',
      format: 'Urdu &amp; English &bull; 1.8 MB',
      image: IMAGES.firstAidKit,
      desc: 'Practical packing checklist and emergency communication plan for households in high-risk river basins.',
    },
    {
      title: 'Tertiary Trauma Ward Mass-Casualty Pre-Alert Protocol',
      category: 'Medical Support',
      format: 'Clinical Protocol &bull; 3.1 MB',
      image: IMAGES.hospitalCare,
      desc: 'Guidelines for ER trauma coordinators receiving automated AI pre-alerts and hypothermia resuscitation queues.',
    },
    {
      title: 'Community Shelter Intake & Biometric Roster SOP',
      category: 'Shelter Operations',
      format: 'Field Standard &bull; 1.2 MB',
      image: IMAGES.shelterInterior,
      desc: 'Procedures for verifying family units, managing water supply reserves, and coordinating with decentralized NGO warehouses.',
    },
    {
      title: 'Decentralized Warehouse Inventory Balancing Rules',
      category: 'Relief Logistics',
      format: 'Technical Whitepaper &bull; 4.0 MB',
      image: IMAGES.logisticsWarehouse,
      desc: 'Algorithms and supply chain models for staging oral rehydration salts and family food rations in regional hubs.',
    },
    {
      title: 'Field Volunteer Non-Hazardous Task Charter',
      category: 'Volunteer Guidance',
      format: 'Safety Guide &bull; 1.5 MB',
      image: IMAGES.volunteersDistribution,
      desc: 'Safety boundaries, food ration distribution protocols, and family support tasks for certified community volunteers.',
    },
  ];

  const filtered = selectedCategory === 'All'
    ? RESOURCES
    : RESOURCES.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.communicationsRadio}
            alt="Humanitarian resource knowledge center"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              KNOWLEDGE CENTER &bull; STANDARD OPERATING PROTOCOLS
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Humanitarian Resources &amp; Field Guides.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              Curated field manuals, clinical triage protocols, shelter management standards, and open technical schemas for responders and communities.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-charcoal-200 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-950 text-white shadow-sm'
                  : 'bg-white border border-charcoal-200 text-charcoal-700 hover:text-navy-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL RESOURCE CARDS WITH IMAGERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl overflow-hidden border border-charcoal-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-navy-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono opacity-90" dangerouslySetInnerHTML={{ __html: item.format }}>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold font-heading text-navy-950 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => alert(`Downloading standard: ${item.title}`)}
                  className="w-full flex items-center justify-center space-x-2 bg-charcoal-50 hover:bg-navy-950 hover:text-white text-navy-950 border border-charcoal-200 font-bold py-3 rounded-xl text-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Field Protocol</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEVELOPER & OPEN SCHEMAS CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-elevated">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              DEVELOPER &bull; OPEN SCHEMAS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Open PostgreSQL DDL &amp; Multi-Agent JSON Schemas
            </h2>
            <p className="text-navy-200 text-sm leading-relaxed">
              All 27 relational tables, RLS policy definitions, and Gemini agent JSON prompt definitions are completely open and auditable in the codebase.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
              <span className="bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-700 text-amber-300">
                supabase/schema.sql (27 Tables)
              </span>
              <span className="bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-700 text-emerald-300">
                server/index.ts (Express Port 5000)
              </span>
              <span className="bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-700 text-blue-300">
                src/services/ai.ts (Multi-Tier Fallback)
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
