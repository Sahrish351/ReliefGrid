import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';
import { ShieldCheck, Heart, Users, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Editorial Split Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-emergency-600" />
            <span>Humanitarian Technology Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy-950 tracking-tight leading-tight">
            Built for Responders, Citizens, and the Most Vulnerable.
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            RELIEFGRID AI was founded on a simple principle: when catastrophic emergencies strike, coordination should be immediate, explainable, and accountable to human oversight.
          </p>
        </div>

        <div className="lg:col-span-5 rounded-3xl overflow-hidden aspect-[4/3] bg-navy-950 border border-charcoal-200 shadow-elevated">
          <img
            src={IMAGES.heroTeamwork}
            alt="Humanitarian relief coordination team in Pakistan"
            onError={handleImageError}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <div className="border-b border-charcoal-200 pb-3">
          <h2 className="text-2xl font-bold font-heading text-navy-950">Our Four Operating Principles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold mb-4">
              01
            </div>
            <h3 className="font-bold text-base text-navy-950 mb-2">Human-in-the-Loop</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              AI recommends; humans authorize. Consequential decisions like dispatching boats or admitting patients always require coordinator confirmation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold mb-4">
              02
            </div>
            <h3 className="font-bold text-base text-navy-950 mb-2">Explainable AI (XAI)</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Every score, recommendation, and dispatch proposal is backed by transparent factor breakdowns, ensuring field teams know exactly why an action was chosen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold mb-4">
              03
            </div>
            <h3 className="font-bold text-base text-navy-950 mb-2">Vulnerability First</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Our triage models explicitly prioritize infants, the elderly, individuals with disabilities, and pregnant women at risk of exposure or medical cutoffs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold mb-4">
              04
            </div>
            <h3 className="font-bold text-base text-navy-950 mb-2">Zero Dark Silos</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Hospitals, evacuation shelters, NGO food caches, and rescue boats share real-time synchronized telemetry, preventing duplication and resource starvation.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Focus */}
      <div className="bg-charcoal-50 rounded-3xl p-8 border border-charcoal-200">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-navy-600">Geographic Footprint</span>
          <h2 className="text-2xl font-bold font-heading text-navy-950 mt-1">Engineered for Pakistan's Hazard Geography</h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
            From the Ravi River lowlands of Lahore and the high-risk Nullah Lai basin in Rawalpindi, to the coastal monsoon vulnerabilities of Karachi and the Chenab embankments in Multan, RELIEFGRID AI models the regional hydrology and demographic density of each corridor.
          </p>
        </div>
      </div>

    </div>
  );
};
