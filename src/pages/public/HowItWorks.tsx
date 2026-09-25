import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  LifeBuoy,
  HeartPulse,
  Building2,
  Radio,
  FileText,
  Compass,
  UserCheck,
  AlertTriangle,
  Clock,
  Layers,
  Activity,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const JOURNEY_STEPS = [
    {
      num: '01',
      title: 'Citizen Report Intake',
      sub: 'Multi-Channel Ingestion',
      desc: 'Reports arrive via web forms, transcribed 1122 phone calls, or emergency SMS. Senders can describe the incident naturally in English, Urdu, or Roman Urdu.',
      actor: 'Citizen / Community',
      output: 'Raw unstructured text & geolocation coordinates',
    },
    {
      num: '02',
      title: 'AI Understanding & Entity Extraction',
      sub: 'Gemini NLP Parsing',
      desc: 'The Incident Intelligence Agent transforms messy conversational cries for help into structured entities: headcount, flood depth, entrapment, and vulnerabilities.',
      actor: 'Incident Intel Agent',
      output: '18 trapped (1 infant, 2 elderly, oxygen-dependent)',
    },
    {
      num: '03',
      title: 'Verification & Anti-Spam Synthesis',
      sub: 'Spatial De-duplication',
      desc: 'The Verification Agent cross-references incoming reports against existing incidents within a 500-meter cluster radius to filter duplicates and verify authenticity.',
      actor: 'Verification Agent',
      output: 'Trust score 94.6% • 3 nearby corroborations',
    },
    {
      num: '04',
      title: 'Multi-Factor Triage & Urgency Scoring',
      sub: 'Priority Calculation (0-100)',
      desc: 'The Triage Agent evaluates life-threat urgency: rate of floodwater rise, trapped status, infant presence, and assigns Critical, High, Medium, or Low priority.',
      actor: 'Triage Agent',
      output: 'Score: 96 / 100 (CRITICAL PRIORITY)',
    },
    {
      num: '05',
      title: 'Resource Proximity & Capability Matching',
      sub: 'Specialized Asset Selection',
      desc: 'Queries real-time telemetry across watercraft, ambulances, and squads, matching exact operational capabilities (e.g. shallow water draft for Boat B-03).',
      actor: 'Resource Matching Agent',
      output: 'Rescue Boat B-03 (1.8km) + Swiftwater Team R-17',
    },
    {
      num: '06',
      title: 'Mandatory Human Authorization Gate',
      sub: 'Coordinator Oversight',
      desc: 'Strict safety rule: no consequential rescue unit launches autonomously. A certified Emergency Coordinator reviews the AI factors and authorizes the dispatch.',
      actor: 'Emergency Coordinator',
      output: 'Authorized & Cryptographically Logged in Audit Trail',
      highlight: true,
    },
    {
      num: '07',
      title: 'Immediate Field Dispatch',
      sub: 'Turn-by-Turn Mission Orders',
      desc: 'Upon human approval, encrypted dispatch orders fire to responder rugged tablets and boat telemetry terminals with hazard-avoiding routing.',
      actor: 'Field Responders',
      output: 'En Route to Target GPS (ETA 11 min)',
    },
    {
      num: '08',
      title: 'Live Telemetry & Stakeholder Tracking',
      sub: 'Public & Clinical Transparency',
      desc: 'Affected citizens see reassuring real-time progress on their mobile phones, while Mayo Hospital trauma staff receives advance bed reservation alerts.',
      actor: 'Multi-Stakeholder Sync',
      output: 'Citizen notified via SMS • Hospital ICU bed locked',
    },
    {
      num: '09',
      title: 'Evacuation & Shelter Intake Resolution',
      sub: 'Safe Harbor Transition',
      desc: 'Rescued victims arrive at designated safe shelter (Expo Center S-12) where biometric/demographic intake ensures family unity and ration allocation.',
      actor: 'Shelter Hub Team',
      output: '18 Evacuees Safely Housed & Supplied',
    },
    {
      num: '10',
      title: 'After-Action Review & Policy Intelligence',
      sub: 'Continuous System Learning',
      desc: 'The After-Action Review Agent generates operational debrief scorecards, analyzes bottlenecks, and updates predictive models for subsequent waves.',
      actor: 'After-Action Agent',
      output: 'Mission debrief compiled & logged to database',
    },
  ];

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[55vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.howItWorks.hero}
            alt="Crisis response team analyzing emergency workflow pipeline"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              OPERATIONAL LIFECYCLE &bull; STANDARD OPERATING PROTOCOL
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              How RELIEFGRID Works: From Distress Cry to Safe Harbor.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              Explore the 10-step verified lifecycle showing how Gemini multi-agent intelligence structures chaos into life-saving operational certainty.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE 10-STEP VISUAL JOURNEY */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="space-y-8">
          
          <div className="border-b border-charcoal-200 pb-6">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
              STEP-BY-STEP BREAKDOWN
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              The 10 Operational Stages
            </h2>
          </div>

          <div className="space-y-6">
            {JOURNEY_STEPS.map((st) => (
              <div
                key={st.num}
                className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                  st.highlight
                    ? 'bg-emergency-50/40 border-emergency-300 ring-2 ring-emergency-500/20 shadow-elevated'
                    : 'bg-white border-charcoal-200 shadow-card hover:border-charcoal-300'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Step Number & Actor */}
                  <div className="lg:col-span-3 space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-black font-mono text-navy-950">
                        {st.num}
                      </span>
                      {st.highlight && (
                        <span className="bg-emergency-600 text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                          MANDATORY GATE
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-navy-700 uppercase tracking-wider">
                      {st.actor}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="lg:col-span-6 space-y-1.5">
                    <h3 className="text-xl font-extrabold text-navy-950">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  {/* Concrete Output */}
                  <div className="lg:col-span-3 bg-charcoal-50 p-4 rounded-xl border border-charcoal-200/80">
                    <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500 mb-1">
                      VERIFIED OUTPUT
                    </div>
                    <div className="text-xs font-mono font-semibold text-navy-950 leading-snug">
                      {st.output}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FINAL CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-charcoal-200 pt-16 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950">
            Ready to test the operational pipeline?
          </h2>
          <p className="text-charcoal-600 text-sm">
            Launch our interactive simulator or explore real-time emergency incidents across Pakistan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#demo"
              className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-card"
            >
              Test Response Simulator
            </Link>
            <Link
              to="/emergency-map"
              className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-card"
            >
              Open Operational Map
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
