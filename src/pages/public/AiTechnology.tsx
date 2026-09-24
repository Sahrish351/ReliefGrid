import React from 'react';
import { Sparkles, ShieldCheck, Lock, Cpu, Server, Terminal, CheckCircle2 } from 'lucide-react';
import { AI_AGENTS_CATALOG } from '../../services/ai';

export const AiTechnology: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-navy-700" />
          <span>Generative AI Engineering Specification</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy-950 tracking-tight leading-tight">
          Gemini Agentic Architecture &amp; Responsible AI
        </h1>
        <p className="text-charcoal-600 text-base sm:text-lg mt-2 leading-relaxed">
          Deep engineering inspection of RELIEFGRID AI's 10 autonomous reasoning agents, server-side credential isolation, structured JSON validation, and human authorization safeguards.
        </p>
      </div>

      {/* Security & Isolation Callout */}
      <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 shadow-elevated">
        <div className="flex items-center space-x-3 mb-4">
          <Lock className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold font-heading">Zero Secrets in Client-Side Source</h2>
        </div>
        <p className="text-navy-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-2xl">
          Compliant with <strong>02_RELIEFGRID_AGENTIC_AI.md</strong>: <code className="bg-navy-900 px-2 py-0.5 rounded text-amber-300">GEMINI_API_KEY</code> is never prefixed with <code className="bg-navy-900 px-2 py-0.5 rounded text-red-300">VITE_</code> and is strictly accessed via server-side Node/Express proxy endpoints on port 5000.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-amber-400 font-bold block mb-1">Server AI Gateway</span>
            <span className="text-navy-300">Handles rate limits, demand spikes, and schema parsing securely.</span>
          </div>
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-green-400 font-bold block mb-1">Dual-Mode Fallback</span>
            <span className="text-navy-300">Automatic failover to deterministic rule-engine if Gemini encounters 503 surges.</span>
          </div>
          <div className="bg-navy-900 p-3 rounded-xl border border-navy-800">
            <span className="text-blue-400 font-bold block mb-1">Explainable Outputs</span>
            <span className="text-navy-300">Explicit reasoning vectors returned with each recommendation.</span>
          </div>
        </div>
      </div>

      {/* 10 Agents Deep Breakdown */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-navy-950">
          The Ten Dedicated Operational Agents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_AGENTS_CATALOG.map((agent, i) => (
            <div key={agent.id} className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-navy-100 text-navy-900 px-2 py-0.5 rounded">
                  AGENT 0{i + 1}
                </span>
                <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">Active</span>
              </div>
              <h3 className="font-bold text-base text-navy-950">{agent.name}</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">{agent.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guardrails Specification (02_RELIEFGRID_AGENTIC_AI.md section 17) */}
      <div className="bg-charcoal-50 rounded-2xl p-6 sm:p-8 border border-charcoal-200 space-y-4">
        <h3 className="text-lg font-bold text-navy-950">Strict Humanitarian AI Guardrails</h3>
        <ul className="text-xs text-charcoal-700 space-y-2 list-disc list-inside">
          <li><strong>No Autonomous Field Action:</strong> Consequential actions (dispatching boats, ambulances, evacuation orders) require human coordinator approval.</li>
          <li><strong>No Clinical Diagnostic Claims:</strong> AI models assess priority and clinical readiness (e.g. ICU bed, oxygen port) but never diagnose medical conditions or prescribe drugs.</li>
          <li><strong>No Automatic Missing Person Resolution:</strong> AI surfaces potential phenotypic or shelter list matches; human physical verification by relatives/coordinators is mandatory.</li>
          <li><strong>Privacy Safeguard:</strong> Citizen personal identifiable information (PII) is encrypted and excluded from public-facing views.</li>
        </ul>
      </div>

    </div>
  );
};
