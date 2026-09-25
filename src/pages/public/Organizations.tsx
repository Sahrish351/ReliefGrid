import React from 'react';
import { Building2, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight, Activity, Users, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';

export const Organizations: React.FC = () => {
  return (
    <div className="space-y-16 pb-24 overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <section className="relative min-h-[45vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.logistics.hero}
            alt="Humanitarian relief logistics and multi-agency coordination warehouse"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20 w-full">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-navy-900/80 border border-navy-800 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
              <HeartHandshake className="w-3.5 h-3.5 text-navy-300" />
              <span>Institutional Humanitarian Gateway</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              Partnering NGOs, Civil Defense &amp; Hospitals.
            </h1>
            <p className="text-navy-100 text-base sm:text-lg leading-relaxed">
              Connect your organization&apos;s rescue boats, ambulances, evacuation beds, or relief inventory directly into RELIEFGRID&apos;s synchronized provincial dispatch grid.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-7 rounded-2xl border border-charcoal-200 shadow-card space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-lg text-navy-950">Rescue Organizations</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Register teams, motorized zodiac boats, ambulances, and heavy USAR gear. Receive pre-structured mission coordinates with zero verbal transcription errors.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-navy-950 hover:text-emergency-600 pt-2 transition-colors"
            >
              <span>Sign in to Responder Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-charcoal-200 shadow-card space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-900 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-lg text-navy-950">Hospitals &amp; Trauma Centers</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Broadcast emergency trauma capacity, available ventilators, pediatric beds, and blood units. Prevent casualty surges from overwhelming single facilities.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 pt-2 transition-colors"
            >
              <span>Sign in to Hospital Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-charcoal-200 shadow-card space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-lg text-navy-950">Shelters &amp; Relief Hubs</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Manage family intake quotas, log drinking water and food ration buffer hours, and request automatic inventory transfers before shortages manifest.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-800 hover:text-purple-950 pt-2 transition-colors"
            >
              <span>Sign in to Shelter Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Integration CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-charcoal-50 rounded-3xl p-8 sm:p-12 border border-charcoal-200 text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-navy-950">
            Request an Institutional Agency Integration
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl mx-auto">
            Authorized disaster management agencies (NDMA, PDMA, Rescue 1122, Edhi, PRCS) can onboard regional fleet telemetry and trauma rosters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-subtle transition-all"
            >
              Contact Integration Desk
            </Link>
            <Link
              to="/login"
              className="bg-white border border-charcoal-200 text-navy-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm hover:bg-charcoal-100 transition-all"
            >
              Sign In to Organization Portal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Organizations;
