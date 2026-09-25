import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';
import {
  ShieldCheck,
  Heart,
  Users,
  MapPin,
  Award,
  CheckCircle2,
  ArrowRight,
  LifeBuoy,
  Activity,
  Building2,
  Cpu,
  AlertTriangle,
  Lock,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[60vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.about.hero}
            alt="Humanitarian emergency operations coordination"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              OUR MISSION &bull; HUMANITARIAN TECHNOLOGY
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Built for First Responders, Vulnerable Families, and Public Safety.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              RELIEFGRID was founded on a simple principle: when catastrophic emergencies strike, coordination should be instantaneous, transparent, and accountable to human judgment.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM & WHY FRAGMENTED RESPONSE FAILS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emergency-600">
              THE STRUCTURAL PROBLEM
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight leading-tight">
              Why traditional emergency response breaks down during peak crises.
            </h2>
            <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
              Disasters do not respect administrative boundaries. During major river floods, earthquakes, or industrial fires, emergency operations break down not from a lack of bravery, but from extreme information fragmentation.
            </p>
            <div className="space-y-4 pt-2 border-t border-charcoal-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-emergency-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy-950 text-sm">Siloed Phone Hotlines</div>
                  <div className="text-xs text-charcoal-600">Hundreds of duplicate calls flood disconnected dispatch desks with no spatial synthesis.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-emergency-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy-950 text-sm">Blind Resource Dispatch</div>
                  <div className="text-xs text-charcoal-600">Watercraft deploy without knowing if arriving victims need pediatric care, incubators, or wheelchair ramps.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-emergency-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy-950 text-sm">Overwhelmed Receiving Hospitals</div>
                  <div className="text-xs text-charcoal-600">Trauma wards receive ambulances with zero pre-alerts, resulting in diverted critical casualties.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 shadow-elevated">
              <img
                src={IMAGES.about.mission}
                alt="Emergency logistics warehouse in Pakistan"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white text-xs font-mono">
                Logistics relief hub in Lahore: synchronizing rations, blood reserves, and water purification units.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. OUR APPROACH: HOW AI HELPS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-2">
              THE RELIEFGRID APPROACH
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Ten Specialized Agents &bull; One Synchronized Operational Backbone
            </h2>
            <p className="text-charcoal-600 text-sm mt-1">
              Rather than replacing human first responders with a black-box algorithm, RELIEFGRID automates the tedious information synthesis so coordinators can make informed decisions in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 border border-charcoal-200 rounded-2xl bg-white">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-navy-950">Intelligent Extraction</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Gemini NLP reads unstructured distress text, voices, and WhatsApp messages, extracting exact headcounts, trapped status, and urgent demographic markers (infants, elderly, diabetic).
              </p>
            </div>

            <div className="space-y-3 p-6 border border-charcoal-200 rounded-2xl bg-white">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-navy-950">Spatial Proximity Routing</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Automated matching queries the nearest specialized assets—such as twin-outboard zodiac boats, high-water trucks, or thermal drone operators—and factors in flood depth barriers.
              </p>
            </div>

            <div className="space-y-3 p-6 border border-charcoal-200 rounded-2xl bg-white">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-navy-950">Explainable Decisions</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Every priority score, triage assignment, and shelter recommendation includes a deterministic chain-of-thought rationale, ensuring coordinators understand exactly why an action was proposed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HUMAN-IN-THE-LOOP PHILOSOPHY */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-navy-950 text-white shadow-elevated">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>CORE SAFETY PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight">
              Human-in-the-Loop Governance: AI Recommends, Humans Authorize.
            </h2>
            <p className="text-navy-200 text-base sm:text-lg leading-relaxed">
              We reject autonomous weaponized or unverified AI dispatch. In RELIEFGRID, no rescue boat launches, no hospital route changes, and no evacuation order broadcasts without explicit authorization from an authorized Emergency Coordinator.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-navy-800 text-xs text-navy-300">
              <div>
                <strong className="text-white block mb-1">Approve Action</strong>
                Coordinator validates proposed dispatch with one click.
              </div>
              <div>
                <strong className="text-white block mb-1">Modify Recommendation</strong>
                Coordinator swaps assigned craft or alters destination shelter.
              </div>
              <div>
                <strong className="text-white block mb-1">Reject with Reason</strong>
                Rejections log mandatory feedback to refine subsequent AI ranking.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MISSION & VISION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600">OUR CHARTER</div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-navy-950">Our Mission</h3>
            <p className="text-charcoal-600 text-base leading-relaxed">
              To eliminate preventable deaths and suffering during natural and man-made disasters by creating an open, intelligent, and ethical coordination grid connecting every citizen to life-saving aid within minutes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600">THE FUTURE</div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-navy-950">Our Vision</h3>
            <p className="text-charcoal-600 text-base leading-relaxed">
              A world where no disaster call goes unheard, no hospital is blindsided by mass casualties, and no relief supplies sit idle in a warehouse while vulnerable families wait in floodwater.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950">
            Explore the Response Architecture
          </h2>
          <p className="text-charcoal-600 text-sm">
            Inspect our live multi-agent pipeline or view real-time operations across Pakistan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/ai-technology"
              className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-card"
            >
              10-Agent AI Architecture
            </Link>
            <Link
              to="/emergency-map"
              className="bg-white border border-charcoal-200 text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-card hover:bg-charcoal-50"
            >
              Live Operational Network
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
