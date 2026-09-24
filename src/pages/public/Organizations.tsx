import React from 'react';
import { Building2, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Organizations: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <HeartHandshake className="w-3.5 h-3.5 text-navy-700" />
          <span>Institutional Humanitarian Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy-950 tracking-tight leading-tight">
          Partnering NGOs, Civil Defense &amp; Hospitals
        </h1>
        <p className="text-charcoal-600 text-base sm:text-lg mt-2 leading-relaxed">
          Connect your organization's rescue boats, ambulances, evacuation beds, or relief inventory directly into RELIEFGRID's synchronized provincial dispatch grid.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-bold text-lg text-navy-950">Rescue Organizations</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Register teams, motorized zodiac boats, ambulances, and heavy USAR gear. Receive pre-structured mission coordinates with zero verbal transcription errors.
          </p>
          <Link to="/responder" className="inline-block text-xs font-bold text-navy-900 hover:text-emergency-600 pt-2">
            Access Responder Portal &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-900 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-bold text-lg text-navy-950">Hospitals &amp; Clinics</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Broadcast emergency trauma capacity, available ventilators, pediatric beds, and blood units. Prevent casualty surges from overwhelming single facilities.
          </p>
          <Link to="/hospital" className="inline-block text-xs font-bold text-green-800 hover:text-green-900 pt-2">
            Access Hospital Emergency Desk &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-bold text-lg text-navy-950">Shelters &amp; Relief Hubs</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Manage family intake quotas, log drinking water and food ration buffer hours, and request automatic inventory transfers before shortages manifest.
          </p>
          <Link to="/shelter" className="inline-block text-xs font-bold text-purple-800 hover:text-purple-900 pt-2">
            Access Shelter Intake Portal &rarr;
          </Link>
        </div>

      </div>

    </div>
  );
};
