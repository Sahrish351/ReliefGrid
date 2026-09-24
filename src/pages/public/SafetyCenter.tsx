import React, { useState } from 'react';
import { IMAGES, handleImageError } from '../../config/images';
import {
  ShieldAlert,
  AlertTriangle,
  CheckSquare,
  Droplets,
  Heart,
  FileText,
  PhoneCall,
  CheckCircle2,
  Package,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyCenter: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const EMERGENCY_CONTACTS = [
    { name: 'Rescue 1122 (Punjab & KP)', phone: '1122', note: 'Primary First Response & USAR' },
    { name: 'Edhi Ambulance Service', phone: '115', note: 'Nationwide Medical & Morgue Transport' },
    { name: 'Chhipa Emergency Service', phone: '1020', note: 'Emergency Ambulance Fleet' },
    { name: 'National Disaster Management (NDMA)', phone: '051-111-157-157', note: 'Crisis Operations Center' },
    { name: 'Sindh Emergency Rescue 1122', phone: '1122', note: 'Urban Fire & Medical Karachi' },
  ];

  const GO_BAG_ITEMS = [
    '3 liters of clean bottled drinking water per family member per day (3-day minimum)',
    'Non-perishable high-protein food rations (dry fruits, biscuits, canned beans)',
    'Waterproof sealed pouch containing original CNIC, passport, property deeds, and family photos',
    '72-hour supply of critical prescription medications (insulin cooling pouch, asthma inhalers)',
    'Compact, well-stocked First Aid Kit (tourniquets, sterile gauze, burn gel, antiseptic)',
    'Battery-operated or hand-crank AM/FM emergency radio with extra batteries',
    'High-lumen waterproof LED flashlight and spare rechargeable power bank',
    'Emergency silver foil thermal space blankets (hypothermia defense in floodwaters)',
    'High-pitch emergency rescue whistle to signal swiftwater boats through rain',
    'N95 respirator dust masks for protection against concrete collapse dust & smoke',
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.firstAidKit}
            alt="Emergency first aid and disaster preparedness kit"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              CITIZEN SAFETY CENTER &bull; DISASTER READINESS
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Preparedness Saves Lives Before Responders Arrive.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              When communication lines snap and flash floods crest, immediate personal readiness determines family survival during the critical first 72 hours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED NATIONAL EMERGENCY CONTACTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-charcoal-200 pb-6 mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-emergency-600 mb-1">
            IMMEDIATE LIFELINES
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-navy-950">
            National Emergency Dispatch Hotlines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {EMERGENCY_CONTACTS.map((c) => (
            <div
              key={c.name}
              className="p-5 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-2"
            >
              <div className="text-xs font-bold text-navy-950">{c.name}</div>
              <div className="text-2xl font-black font-mono text-emergency-600">{c.phone}</div>
              <div className="text-[11px] text-charcoal-500">{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE 72-HOUR GO-BAG CHECKLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-4 sticky top-28">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600">
              ESSENTIAL CHECKLIST
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight leading-tight">
              The 72-Hour Evacuation Go-Bag
            </h2>
            <p className="text-charcoal-600 text-sm leading-relaxed">
              Every household in flood, seismic, and urban hazard zones should keep a pre-packed, waterproof backpack ready by the primary exit door.
            </p>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <div className="text-xs font-bold text-emerald-900">Your Readiness Progress</div>
              <div className="text-2xl font-black text-emerald-700 font-mono">
                {completedCount} / {GO_BAG_ITEMS.length} Packed
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${(completedCount / GO_BAG_ITEMS.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {GO_BAG_ITEMS.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <button
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : 'bg-white border-charcoal-200 text-charcoal-800 hover:border-charcoal-300'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-5 h-5 rounded border-2 border-charcoal-300"></div>
                    )}
                  </div>
                  <span className={`text-xs sm:text-sm ${isChecked ? 'line-through opacity-75' : ''}`}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. EVACUATION GUIDANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
              STEP-BY-STEP DRILLS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Standard Evacuation Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-navy-950">Prioritize Vulnerable Family</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Assign a dedicated adult guardian to infants, toddlers, and bedridden elders. Ensure life jackets or flotation rings are donned before water enters the home.
              </p>
            </div>

            <div className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-navy-950">Isolate Home Hazards</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Shut off primary gas valves and electrical circuit breakers. Unsecured gas cylinders in floodwater can rupture or create floating explosion hazards.
              </p>
            </div>

            <div className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-navy-950">Move to Verified Shelters</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Do not seek refuge in makeshift roadside camps. Check RELIEFGRID&apos;s live shelter directory to confirm open bed capacity, potable water, and medical presence.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
