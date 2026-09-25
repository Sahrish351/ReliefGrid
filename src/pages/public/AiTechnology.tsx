import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Lock,
  Cpu,
  Server,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  UserCheck,
  RefreshCw,
  FileSearch,
  Compass,
  Radio,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { Link } from 'react-router-dom';

export const AiTechnology: React.FC = () => {
  const ARCHITECTURE_PILLARS = [
    {
      title: 'Explainability (XAI)',
      sub: 'Transparent Reasoning Vectors',
      icon: FileSearch,
      desc: 'No black-box decisions. Every severity score, boat allocation, and ICU bed lock provides deterministic factor breakdowns (e.g. "+25 severity due to infant hypothermia risk").',
    },
    {
      title: 'Zero-Secret Client Security',
      sub: 'Server-Side Credential Isolation',
      icon: Lock,
      desc: 'Compliant with strict cybersecurity mandates: GEMINI_API_KEY is isolated on the Node/Express backend. Browser clients communicate through authenticated schema-validated proxies.',
    },
    {
      title: 'Mandatory Human Gate',
      sub: 'Consequential Dispatch Safety',
      icon: UserCheck,
      desc: 'No autonomous vehicle launches without explicit coordinator review. Coordinators can approve, modify resource configurations, or reject with logged rationale.',
    },
    {
      title: 'Multi-Tier Model Fallback',
      sub: 'High-Demand Surge Continuity',
      icon: RefreshCw,
      desc: 'Cascade failover engine: gemini-3.6-flash -> gemini-3.5-flash -> gemini-flash-latest -> gemini-3.1-flash-lite -> deterministic rule-engine. Never hangs during global quota spikes.',
    },
    {
      title: 'Tamper-Evident Auditability',
      sub: 'Post-Disaster Review Logs',
      icon: Database,
      desc: 'Every intake, agent execution timestamp, prompt payload, human decision, and telemetry delta is written to an immutable audit ledger for commission inquiries.',
    },
  ];

  const AGENT_CLUSTERS = [
    {
      clusterName: 'CLUSTER A &bull; INTAKE, TRUST & TRIAGE',
      color: 'border-blue-500',
      agents: [
        { name: 'Incident Intelligence Agent', role: 'Gemini NLP entity extraction for victims, age groups & entrapped water levels.' },
        { name: 'Verification & Anti-Spam Agent', role: '500-meter radius spatial clustering to consolidate duplicate calls and detect anomalies.' },
        { name: 'Triage & Severity Scoring Agent', role: 'Life hazard index calculation on 0-100 scale; assigns Critical, High, Medium, or Low.' },
      ],
    },
    {
      clusterName: 'CLUSTER B &bull; SPATIAL MATCHING & LOGISTICS',
      color: 'border-emerald-500',
      agents: [
        { name: 'Resource Matching Agent', role: 'Real-time telemetry queries for shallow-draft zodiacs, USAR units, and ambulances.' },
        { name: 'Response Planning & Routing Agent', role: 'Calculates approach corridors avoiding submerged underpasses and structural bottlenecks.' },
        { name: 'Hospital Coordination Agent', role: 'Pre-alerts trauma surgery wards, reserves ICU beds, and tracks hypothermia incubators.' },
        { name: 'Shelter Coordination Agent', role: 'Allocates dry safe zones, potable water caches, and family quarters with live capacity bars.' },
        { name: 'Logistics Optimization Agent', role: 'Balances food ration caches and water purification kits across decentralized relief hubs.' },
      ],
    },
    {
      clusterName: 'CLUSTER C &bull; CITIZEN COMMS & SITUATION INTELLIGENCE',
      color: 'border-purple-500',
      agents: [
        { name: 'Communication Agent', role: 'Multi-lingual SMS, Urdu voice notes, and citizen progress tracker synchronization.' },
        { name: 'Situation Intelligence Agent', role: 'Aggregates river telemetry, satellite flood masks, and predicts 6-hour resource pressure.' },
      ],
    },
  ];

  return (
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[55vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.ai.hero}
            alt="AI emergency response neural network and telemetry orchestration"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              ENGINEERING SPECIFICATION &bull; RESPONSIBLE AI
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Gemini Multi-Agent Architecture.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              Deep technical inspection of RELIEFGRID AI&apos;s ten discrete reasoning agents, server-side credential isolation, structured JSON schemas, and human authorization safeguards.
            </p>
          </div>
        </div>
      </section>

      {/* 2. VISUAL AI ARCHITECTURE PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-charcoal-200 pb-6 mb-12">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
            END-TO-END PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
            The Multi-Agent Synthesis Pipeline
          </h2>
        </div>

        {/* Diagram Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-charcoal-50 border border-charcoal-200 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500">STAGE 1</div>
            <div className="font-bold text-sm text-navy-950">Intake Data</div>
            <div className="text-xs text-charcoal-600">Voice, SMS, WhatsApp, Web</div>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900 text-white border border-navy-800 space-y-2 shadow-card">
            <div className="text-[10px] font-mono font-bold uppercase text-emerald-400">STAGE 2</div>
            <div className="font-bold text-sm">AI Orchestrator</div>
            <div className="text-xs text-navy-200">Gemini Reasoning Core</div>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-50 border border-charcoal-200 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500">STAGE 3</div>
            <div className="font-bold text-sm text-navy-950">10 Agents</div>
            <div className="text-xs text-charcoal-600">Discrete Schemas</div>
          </div>

          <div className="p-5 rounded-2xl bg-emergency-50 border-2 border-emergency-500 space-y-2 shadow-card">
            <div className="text-[10px] font-mono font-bold uppercase text-emergency-600">STAGE 4</div>
            <div className="font-extrabold text-sm text-emergency-950">Human Gate</div>
            <div className="text-xs text-emergency-800">Coordinator Approval</div>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-50 border border-charcoal-200 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500">STAGE 5</div>
            <div className="font-bold text-sm text-navy-950">Field Action</div>
            <div className="text-xs text-charcoal-600">Turn-by-turn Telemetry</div>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-50 border border-charcoal-200 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase text-charcoal-500">STAGE 6</div>
            <div className="font-bold text-sm text-navy-950">Audit Trail</div>
            <div className="text-xs text-charcoal-600">Immutable State Log</div>
          </div>
        </div>
      </section>

      {/* 3. FIVE ARCHITECTURAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
              SAFETY BY DESIGN
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Five Core Architectural Guarantees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARCHITECTURE_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-navy-950">{p.title}</h3>
                    <div className="text-xs font-mono text-emerald-600 font-semibold">{p.sub}</div>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE 10 AGENTS ORGANIZED IN 3 OPERATIONAL CLUSTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-charcoal-200 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
              SPECIALIZED ROLES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy-950 tracking-tight">
              Functional Clustering of the Ten Agents
            </h2>
            <p className="text-charcoal-600 text-sm mt-1">
              Agents operate with discrete prompt boundaries, validated JSON output schemas, and isolated responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {AGENT_CLUSTERS.map((cl) => (
              <div
                key={cl.clusterName}
                className="bg-white border border-charcoal-200 rounded-2xl p-6 shadow-card space-y-4"
              >
                <div className="text-xs font-mono font-bold tracking-wider text-navy-950 pb-2 border-b border-charcoal-100">
                  {cl.clusterName}
                </div>

                <div className="space-y-4">
                  {cl.agents.map((ag) => (
                    <div key={ag.name} className="space-y-1">
                      <div className="font-bold text-sm text-navy-950">{ag.name}</div>
                      <div className="text-xs text-charcoal-600 leading-relaxed">{ag.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
