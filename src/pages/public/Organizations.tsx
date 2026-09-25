import React from 'react';
import { Building2, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';

export const Organizations: React.FC = () => {
  return (
    <div className="space-y-16 pb-24 overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <section className="relative min-h-[48vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.logistics.hero}
            alt="Humanitarian relief logistics convoy and distribution fleet on highway"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20 w-full">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-navy-900/80 border border-navy-800 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
              <HeartHandshake className="w-3.5 h-3.5 text-navy-200" />
              <span>Institutional Humanitarian Gateway</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              Partnering NGOs, Civil Defense &amp; Hospitals.
            </h1>
            <p className="text-navy-100 text-base sm:text-lg leading-relaxed">
              Connect your rescue boats, ambulances, evacuation beds, or relief inventory directly into RELIEFGRID's synchronized provincial dispatch grid.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-charcoal-200 shadow-card hover:shadow-elevated transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="font-bold text-xl text-navy-950">Rescue Organizations</h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Register teams, motorized zodiac boats, ambulances, and heavy USAR gear. Receive pre-structured mission coordinates with zero verbal transcription errors.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-navy-950 hover:text-emergency-600 pt-2 group"
            >
              <span>Authenticate Rescue Unit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-charcoal-200 shadow-card hover:shadow-elevated transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="font-bold text-xl text-navy-950">Hospitals &amp; Clinics</h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Broadcast emergency trauma capacity, available ventilators, pediatric beds, and blood units. Prevent casualty surges from overwhelming single facilities.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 pt-2 group"
            >
              <span>Authenticate Clinical Desk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-charcoal-200 shadow-card hover:shadow-elevated transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="font-bold text-xl text-navy-950">Shelters &amp; Relief Hubs</h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Manage family intake quotas, log drinking water and food ration buffer hours, and request automatic inventory transfers before shortages manifest.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-800 hover:text-purple-950 pt-2 group"
            >
              <span>Authenticate Shelter Operations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
