import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, handleImageError } from '../../config/images';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2, LifeBuoy, HeartPulse, Building2, Radio } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const STEPS = [
    {
      num: '01',
      title: 'Emergency Intake & Ingestion',
      desc: 'Reports arrive via web form, phone hotline transcription, or field SMS. Senders can describe their situation in colloquial English, Urdu, or Roman Urdu.',
      tech: 'Fast ingestion layer, IP hashing, spatial geolocation normalization, initial database timestamping.',
    },
    {
      num: '02',
      title: 'Gemini Autonomous Structuring',
      desc: 'The Incident Intelligence Agent transforms messy conversational cries for help into structured demographics: counting vulnerable infants, pregnant women, and trapped elders.',
      tech: 'Gemini 3.6 Flash structured JSON schema enforcement with deterministic parameter verification.',
    },
    {
      num: '03',
      title: 'Verification & Spatial De-duplication',
      desc: 'The Verification Agent cross-references incoming reports against existing incidents within a 500-meter cluster radius to flag duplicate calls and contradictory hazard markers.',
      tech: 'PostGIS spatial bounding boxes, confidence scoring, duplicate link establishment.',
    },
    {
      num: '04',
      title: 'Multi-Factor Triage & Scoring',
      desc: 'The Triage Agent evaluates life-threat urgency: flood depth rising rate, trapped status, medical oxygen requirements, and assigns CRITICAL, HIGH, MEDIUM, or LOW.',
      tech: 'Weighted severity scoring (0-100), automated SLA countdown timers (e.g. 15-minute response target).',
    },
    {
      num: '05',
      title: 'Resource Proximity & Capability Matching',
      desc: 'The Resource Matching Agent queries available watercraft, ambulances, and squads, matching exact capabilities (e.g. shallow water draft for Boat B-03).',
      tech: 'Real-time telemetry queries, vessel payload limits, road traversability checks.',
    },
    {
      num: '06',
      title: 'Explainable AI Response Plan Generation',
      desc: 'The Rescue Planning Agent synthesizes an end-to-end operational plan: assigned vessel, backup unit, receiving trauma hospital, and designated evacuation shelter.',
      tech: 'Multi-agent orchestration, audit trace generation, transparent factor breakdown.',
    },
    {
      num: '07',
      title: 'Mandatory Human Authorization',
      desc: 'No consequential rescue unit or ambulance is ever dispatched autonomously. An emergency coordinator in the command center reviews the factors and clicks Approve or Modify.',
      tech: 'Role-based access control, cryptographic audit logging, modification notes tracking.',
    },
    {
      num: '08',
      title: 'Live Tracking, Coordination & After-Action',
      desc: 'Upon approval, dispatch orders fire to responder mobile terminals, citizen tracking updates with live ETAs, hospitals receive pre-alerts, and after-action summaries are compiled.',
      tech: 'Realtime database event broadcasts, in-app stakeholder alerts, automated after-action debrief reports.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-navy-700" />
            <span>Architecture &amp; Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy-950 tracking-tight leading-tight">
            How RELIEFGRID AI Coordinates Disaster Response
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            From the instant a citizen calls for help to the moment an evacuee is registered safe in a community shelter, every phase is engineered for speed, explainability, and human accountability.
          </p>
        </div>

        <div className="lg:col-span-5 rounded-3xl overflow-hidden aspect-[4/3] bg-navy-950 border border-charcoal-200 shadow-elevated">
          <img
            src={IMAGES.commandCenter}
            alt="Humanitarian emergency operations coordination control room"
            onError={handleImageError}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* 8 Detailed Architecture Steps */}
      <div className="space-y-6">
        <div className="border-b border-charcoal-200 pb-4">
          <h2 className="text-2xl font-bold font-heading text-navy-950">
            End-to-End Operational Workflow
          </h2>
          <p className="text-xs text-charcoal-500 mt-1">Detailed walkthrough of the multi-agent pipeline</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map((stg) => (
            <div
              key={stg.num}
              className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold bg-navy-100 text-navy-900 px-2 py-0.5 rounded">
                    PHASE {stg.num}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-navy-950 mb-2">{stg.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4">{stg.desc}</p>
              </div>

              <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-100 text-[11px] text-charcoal-700">
                <strong>System Implementation:</strong> {stg.tech}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 text-center border border-navy-800 shadow-elevated">
        <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-3">
          Test the Complete Workflow Live
        </h3>
        <p className="text-navy-300 text-sm max-w-xl mx-auto mb-6">
          Experience the 18-person flood trapped scenario running across all agents with live human approval.
        </p>
        <Link
          to="/command"
          className="inline-flex items-center space-x-2 bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-card"
        >
          <span>Open Emergency Command Center</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
