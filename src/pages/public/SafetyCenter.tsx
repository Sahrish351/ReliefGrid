import React from 'react';
import { IMAGES, handleImageError } from '../../config/images';
import { ShieldAlert, AlertTriangle, CheckSquare, Droplets, Heart, FileText, PhoneCall } from 'lucide-react';

export const SafetyCenter: React.FC = () => {
  const EMERGENCY_CONTACTS = [
    { name: 'Rescue 1122 (Punjab & KP)', phone: '1122' },
    { name: 'Edhi Ambulance Service', phone: '115' },
    { name: 'Chhipa Emergency Service', phone: '1020' },
    { name: 'National Disaster Management (NDMA)', phone: '051-111-157-157' },
    { name: 'Sindh Emergency Rescue Service', phone: '1122' },
  ];

  const GO_BAG_CHECKLIST = [
    '3 liters of clean bottled water per person per day',
    '3-day supply of non-perishable high-energy food rations',
    'Battery-powered or hand-crank AM/FM emergency radio',
    'High-intensity LED flashlight and extra AA/AAA batteries',
    'Comprehensive First Aid Kit with tourniquets and sterile gauze',
    'Prescription medications, insulin cooling pouch, and inhalers',
    'Waterproof pouch with CNIC, passport, and property deeds',
    'Infant formula, sterile baby bottles, and thermal wrap',
    'Emergency silver thermal survival blankets',
    'Whistle to signal search and rescue teams in high water',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            <span>Community Preparedness Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
            Emergency Preparedness &amp; Safety Guidance
          </h1>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Preparation saves lives before first responders arrive. Review essential go-bag checklists, monsoon flood defense protocols, and verified national emergency hotlines.
          </p>
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[16/9] bg-navy-950 shadow-card">
          <img
            src={IMAGES.communitySafety}
            alt="Community flood preparedness in Pakistan"
            onError={handleImageError}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* Emergency Hotlines Strip */}
      <div className="bg-navy-950 text-white rounded-2xl p-6 border border-navy-800 shadow-elevated">
        <div className="flex items-center space-x-2 mb-4">
          <PhoneCall className="w-5 h-5 text-emergency-500" />
          <h3 className="font-bold text-base">Verified National Emergency Contacts</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {EMERGENCY_CONTACTS.map((c) => (
            <div key={c.name} className="bg-navy-900 p-3 rounded-xl border border-navy-800">
              <div className="text-[11px] text-navy-300 truncate">{c.name}</div>
              <div className="text-lg font-mono font-extrabold text-amber-400 mt-1">{c.phone}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Go-Bag Checklist & Flood Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Go-Bag Checklist */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200 shadow-card">
          <div className="flex items-center space-x-2 mb-4">
            <CheckSquare className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-lg text-navy-950">72-Hour Evacuation Go-Bag Checklist</h3>
          </div>
          <p className="text-xs text-charcoal-500 mb-4">
            Pack these essential items in a lightweight, waterproof backpack placed near the primary exit.
          </p>
          <div className="space-y-2.5">
            {GO_BAG_CHECKLIST.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs text-charcoal-700 bg-charcoal-50 p-2.5 rounded-lg border border-charcoal-100">
                <span className="font-bold text-navy-900">{idx + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flood Preparedness Step-by-Step */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200 shadow-card space-y-4">
          <div className="flex items-center space-x-2 mb-1">
            <Droplets className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-navy-950">River Basin &amp; Urban Flood Safety</h3>
          </div>
          <p className="text-xs text-charcoal-500">
            Vital measures when water levels rise along Ravi, Indus, or Nullah Lai.
          </p>

          <div className="space-y-3 text-xs text-charcoal-700">
            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-100">
              <strong className="text-navy-950 block mb-1">Before Water Reaches Your Threshold:</strong>
              Move electronics, vital medicines, and documents to upper levels. Sandbag entrance ways if available. Unplug all major electrical appliances.
            </div>

            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-100">
              <strong className="text-navy-950 block mb-1">During Active Inundation:</strong>
              Do not walk through flowing water. Just 6 inches of fast water can knock an adult off balance. If trapped in a building, climb to the roof; do not hide in closed attics without roof exits.
            </div>

            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-100">
              <strong className="text-navy-950 block mb-1">After Flood Recedes:</strong>
              Avoid standing pools of water due to electrocution from downed cables. Disinfect all contaminated water tanks and boil tap water for 10 minutes before consumption.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
