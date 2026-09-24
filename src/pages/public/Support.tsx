import React, { useState } from 'react';
import { Heart, Package, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const Support: React.FC = () => {
  const [pledged, setPledged] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center space-x-2 bg-emergency-100 text-emergency-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 text-emergency-600" />
          <span>Support Emergency Response</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
          Support Relief &amp; Emergency Supply Caches
        </h1>
        <p className="text-charcoal-600 text-sm mt-2">
          Direct your humanitarian support where it is urgently required. Track simulated relief distribution from Lahore, Karachi, and Multan central caches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* In-Kind Relief Packages */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200 shadow-card space-y-6">
          <h3 className="font-bold text-lg text-navy-950">Priority Supply Kits Needed</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-charcoal-200 bg-charcoal-50 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-bold text-sm text-navy-950">Clean Drinking Water Tankers (5,000L)</div>
                <div className="text-xs text-charcoal-600">Urgent need in Shahdara floodway &amp; Mochipura (Multan)</div>
              </div>
              <button
                onClick={() => setPledged(true)}
                className="bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs px-4 py-2 rounded-xl"
              >
                Pledge Kit
              </button>
            </div>

            <div className="p-4 rounded-xl border border-charcoal-200 bg-charcoal-50 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-bold text-sm text-navy-950">Infant Survival &amp; Pediatric Thermal Pack</div>
                <div className="text-xs text-charcoal-600">Formula, sterile bottles, thermal wraps, baby rehydration</div>
              </div>
              <button
                onClick={() => setPledged(true)}
                className="bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs px-4 py-2 rounded-xl"
              >
                Pledge Kit
              </button>
            </div>

            <div className="p-4 rounded-xl border border-charcoal-200 bg-charcoal-50 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-bold text-sm text-navy-950">Family Dry Rations Kit (14 Days)</div>
                <div className="text-xs text-charcoal-600">Flour, rice, lentils, cooking oil, matches, chlorine tablets</div>
              </div>
              <button
                onClick={() => setPledged(true)}
                className="bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs px-4 py-2 rounded-xl"
              >
                Pledge Kit
              </button>
            </div>
          </div>

          {pledged && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
              <span>Simulated relief pledge recorded! Thank you for supporting the humanitarian response demonstration.</span>
            </div>
          )}
        </div>

        {/* Drop-off Depot Points */}
        <div className="lg:col-span-5 bg-charcoal-50 p-6 sm:p-8 rounded-2xl border border-charcoal-200 space-y-4">
          <h3 className="font-bold text-base text-navy-950">Regional Supply Collection Depots</h3>
          <p className="text-xs text-charcoal-600">Verified locations where relief items are verified and cataloged.</p>

          <div className="space-y-3 text-xs text-charcoal-700">
            <div className="p-3 bg-white rounded-xl border border-charcoal-200">
              <div className="font-bold text-navy-950">Lahore Central Logistics Depot</div>
              <div>Multan Road near Thokar Niaz Baig Interchange</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-charcoal-200">
              <div className="font-bold text-navy-950">Karachi Port Trust Warehouse</div>
              <div>West Wharf Berth 14, Karachi</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-charcoal-200">
              <div className="font-bold text-navy-950">NDMA Regional Depot H-9</div>
              <div>Sector H-9/1, Islamabad</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
