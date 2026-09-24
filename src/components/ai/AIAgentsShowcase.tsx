import React, { useState } from 'react';
import {
  FileSearch,
  ShieldCheck,
  AlertTriangle,
  Truck,
  Compass,
  HeartPulse,
  Home,
  Package,
  MessageSquare,
  Activity,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';
import { AI_AGENTS_CATALOG } from '../../services/ai';

export const AIAgentsShowcase: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  const ICONS: Record<string, any> = {
    FileSearch,
    ShieldCheck,
    AlertTriangle,
    Truck,
    Compass,
    HeartPulse,
    Home,
    Package,
    MessageSquare,
    Activity,
  };

  return (
    <div className="py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-navy-700" />
          <span>Multi-Agent System Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950 tracking-tight">
          Ten Specialized AI Agents Working in Orchestration
        </h2>
        <p className="text-charcoal-600 text-sm sm:text-base mt-3">
          Not a generic chatbot wrapper. RELIEFGRID AI coordinates ten distinct autonomous reasoning agents powered by Google Gemini, each with strict boundaries, schemas, and human oversight.
        </p>
      </div>

      {/* 10 Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {AI_AGENTS_CATALOG.map((agent, idx) => {
          const IconComponent = ICONS[agent.icon] || Sparkles;
          return (
            <div
              key={agent.id}
              className="bg-white border border-charcoal-200 hover:border-navy-400 p-5 rounded-2xl shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 group-hover:bg-navy-900 text-navy-900 group-hover:text-white flex items-center justify-center transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-charcoal-400">0{idx + 1}</span>
                </div>
                <h3 className="font-bold text-sm text-navy-950 mb-2 leading-snug">{agent.name}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed mb-4">{agent.role}</p>
              </div>

              <button
                onClick={() => setSelectedAgent(agent)}
                className="text-xs font-semibold text-navy-900 group-hover:text-emergency-600 flex items-center space-x-1 pt-2 border-t border-charcoal-100 transition-colors"
              >
                <span>See how it works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-float border border-charcoal-200 relative">
            <button
              onClick={() => setSelectedAgent(null)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-950">{selectedAgent.name}</h3>
                <span className="text-xs font-medium text-charcoal-500">Autonomous Gemini AI Agent</span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-charcoal-700">
              <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-200">
                <div className="font-bold text-navy-950 mb-1">Operational Purpose:</div>
                <p className="leading-relaxed">{selectedAgent.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-charcoal-200 bg-white">
                  <div className="font-bold text-navy-950 mb-1">Input Vectors:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-charcoal-600">
                    <li>Natural language audio/text</li>
                    <li>Spatial GIS telemetry</li>
                    <li>Resource state tables</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl border border-charcoal-200 bg-white">
                  <div className="font-bold text-navy-950 mb-1">Output Schema:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-charcoal-600">
                    <li>Structured JSON payload</li>
                    <li>Confidence metrics (0-100)</li>
                    <li>Audit trace &amp; explainability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900">
                <strong>Responsible AI Guardrail:</strong> Output requires coordinator review before triggering consequential field dispatches.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-charcoal-100 flex justify-end">
              <button
                onClick={() => setSelectedAgent(null)}
                className="bg-navy-900 hover:bg-navy-800 text-white font-medium text-xs px-4 py-2 rounded-xl"
              >
                Close Agent Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
