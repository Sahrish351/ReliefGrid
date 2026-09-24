import React, { useState } from 'react';
import {
  Cpu,
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
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  Zap,
} from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  shortName: string;
  role: string;
  icon: any;
  color: string;
  outputPreview: string;
  benchmark: string;
}

const AGENTS: AgentNode[] = [
  {
    id: 'incident_intel',
    name: 'Incident Intelligence',
    shortName: 'Incident Intel',
    role: 'Extracts victims, trapped counts, demographics & GPS vectors',
    icon: FileSearch,
    color: 'from-blue-500 to-indigo-600',
    outputPreview: 'Identified: 18 trapped (2 elderly, 1 infant, rising floodwater)',
    benchmark: '< 850ms latency',
  },
  {
    id: 'verification',
    name: 'Verification & Anti-Spam',
    shortName: 'Verification',
    role: 'Synthesizes duplicate calls and detects anomalous distress reports',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-600',
    outputPreview: 'Trust Score 94/100 • 3 corroborating calls within 400m',
    benchmark: 'Zero False Dispatches',
  },
  {
    id: 'triage',
    name: 'Triage & Severity Scoring',
    shortName: 'Triage Scoring',
    role: 'Evaluates life hazard index and urgency on 0–100 scale',
    icon: AlertTriangle,
    color: 'from-rose-500 to-red-600',
    outputPreview: 'Severity 96/100 (CRITICAL) • Immediate Water Rescue Required',
    benchmark: 'Golden Hour Priority',
  },
  {
    id: 'resource_matching',
    name: 'Resource Matching',
    shortName: 'Resource Match',
    role: 'Queries nearest specialized assets with equipment suitability',
    icon: Truck,
    color: 'from-amber-500 to-orange-600',
    outputPreview: 'Matched: Rescue Boat B-03 (1.8km) + Swiftwater Team R-17',
    benchmark: 'Optimal Proximity',
  },
  {
    id: 'response_planning',
    name: 'Response Planning & Routing',
    shortName: 'Response Plan',
    role: 'Computes safe approach corridors avoiding submerged roads',
    icon: Compass,
    color: 'from-indigo-500 to-violet-600',
    outputPreview: 'Calculated Route: G.T. Road bypass avoiding inundated underpass',
    benchmark: '11 Min Projected ETA',
  },
  {
    id: 'hospital_coord',
    name: 'Hospital Coordination',
    shortName: 'Hospital Coord',
    role: 'Pre-alerts trauma wards and reserves ICU beds & infant incubators',
    icon: HeartPulse,
    color: 'from-red-500 to-pink-600',
    outputPreview: 'Reserved: General Hospital ER (3 trauma beds, 1 ped incubator)',
    benchmark: 'Automated Bed Locks',
  },
  {
    id: 'shelter_coord',
    name: 'Shelter Coordination',
    shortName: 'Shelter Coord',
    role: 'Allocates dry safe zones, potable water caches, and family tents',
    icon: Home,
    color: 'from-teal-500 to-emerald-600',
    outputPreview: 'Designated: City Sports Complex (Capacity 450, 18 spaces locked)',
    benchmark: 'Capacity Guaranteed',
  },
  {
    id: 'logistics',
    name: 'Logistics Optimization',
    shortName: 'Relief Logistics',
    role: 'Dispatches ration packs, water purification kits & baby formula',
    icon: Package,
    color: 'from-amber-600 to-yellow-600',
    outputPreview: 'Staged: 20 ration boxes + 50L water purification kit from Hub A',
    benchmark: 'Supply Replenishment',
  },
  {
    id: 'communication',
    name: 'Communication Agent',
    shortName: 'Citizen Comms',
    role: 'Issues multi-lingual SMS, Urdu voice notes & reassurance updates',
    icon: MessageSquare,
    color: 'from-cyan-500 to-blue-600',
    outputPreview: 'Sent: "Boat B-03 dispatched. Stay on roof. Help arrives in 11m."',
    benchmark: '4 Channels Sync',
  },
  {
    id: 'situation_intel',
    name: 'Situation Intelligence',
    shortName: 'Situation Intel',
    role: 'Integrates river telemetry, weather radar & satellite flood masks',
    icon: Activity,
    color: 'from-purple-500 to-indigo-600',
    outputPreview: 'Alert: Ravi river discharge rising 15% / hr upstream',
    benchmark: 'Predictive Horizon',
  },
];

const WORKFLOW_STEPS = [
  { step: '01', label: 'Report', desc: 'Voice/Text Intake' },
  { step: '02', label: 'Understand', desc: 'Entity Extraction' },
  { step: '03', label: 'Verify', desc: 'Trust & Anti-Spam' },
  { step: '04', label: 'Triage', desc: 'Severity 0-100' },
  { step: '05', label: 'Match', desc: 'Resource Search' },
  { step: '06', label: 'Plan', desc: 'Route & Hazard Map' },
  { step: '07', label: 'Human Approval', desc: 'Coordinator Authorizes', highlight: true },
  { step: '08', label: 'Respond', desc: 'Turn-by-turn Telemetry' },
  { step: '09', label: 'Recover', desc: 'Shelter & After-Action' },
];

export const AIOrchestratorVisual: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('incident_intel');

  const activeAgent = AGENTS.find((a) => a.id === selectedAgentId) || AGENTS[0];

  return (
    <div className="relative py-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 border border-navy-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-subtle">
          <Sparkles className="w-3.5 h-3.5 text-emergency-600 animate-pulse" />
          <span>AUTONOMOUS MULTI-AGENT ARCHITECTURE</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-navy-950 tracking-tight leading-tight">
          One Emergency. Ten Intelligent Agents. <br className="hidden sm:inline" />
          <span className="text-navy-700 bg-gradient-to-r from-navy-900 via-indigo-900 to-navy-800 bg-clip-text text-transparent">
            One Coordinated Response.
          </span>
        </h2>
        
        <p className="text-charcoal-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          Rather than an unverified chatbot, RELIEFGRID AI deploys ten discrete, purpose-trained Gemini reasoning agents working in strict operational synthesis under human oversight.
        </p>
      </div>

      {/* Main Interactive Orchestration Console */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-6 sm:p-10 text-white shadow-float border border-navy-800 relative overflow-hidden">
        
        {/* Subtle Background Radial & Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emergency-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Central Core + Radial Grid Presentation */}
        <div className="relative z-10">
          
          {/* Top Center: Orchestrator Core Banner */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emergency-600 via-indigo-600 to-emerald-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
              <div className="relative bg-navy-900 border border-white/20 px-8 py-4 rounded-2xl flex items-center space-x-4 shadow-elevated">
                <div className="w-12 h-12 rounded-xl bg-emergency-600 flex items-center justify-center text-white shadow-elevated">
                  <Cpu className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>ACTIVE GEMINI ORCHESTRATOR</span>
                  </div>
                  <div className="text-xl font-black font-heading tracking-tight text-white">
                    RELIEFGRID AI CORE
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-navy-300 font-mono mt-3">
              10 Subsystems &bull; Synchronized via Server-Side API &bull; Tamper-Evident State Log
            </p>
          </div>

          {/* Interactive Agent Tabs / Grid (10 Nodes) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {AGENTS.map((agent, idx) => {
              const Icon = agent.icon;
              const isSelected = agent.id === selectedAgentId;
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group relative ${
                    isSelected
                      ? 'bg-white text-navy-950 border-white shadow-elevated scale-[1.03] z-20'
                      : 'bg-navy-900/80 hover:bg-navy-800 border-navy-700/80 text-navy-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-navy-900 text-white'
                          : 'bg-navy-950 text-navy-300 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isSelected ? 'text-charcoal-500' : 'text-navy-400'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`text-xs font-extrabold leading-tight ${
                        isSelected ? 'text-navy-950' : 'text-white'
                      }`}
                    >
                      {agent.shortName}
                    </div>
                    <div
                      className={`text-[10px] mt-0.5 line-clamp-1 ${
                        isSelected ? 'text-charcoal-600' : 'text-navy-300'
                      }`}
                    >
                      {agent.benchmark}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-emergency-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Agent Live Inspection Card */}
          <div className="bg-navy-900/90 border border-navy-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Agent Identity & Mission */}
              <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-navy-800 pb-4 lg:pb-0 lg:pr-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-emergency-600/20 border border-emergency-500/30 flex items-center justify-center text-emergency-400">
                    <activeAgent.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                      INSPECTING AGENT 0{AGENTS.findIndex((a) => a.id === activeAgent.id) + 1}
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white">{activeAgent.name}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-navy-200 leading-relaxed">
                  {activeAgent.role}
                </p>
                <div className="inline-flex items-center space-x-2 bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800 text-[11px] text-navy-300 font-mono">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>SLA Guarantee: {activeAgent.benchmark}</span>
                </div>
              </div>

              {/* Real-Time Live Synthetic Output Payload */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-navy-300">
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>MISSION PAYLOAD &bull; FLOOD SCENARIO RG-1042</span>
                  </span>
                  <span className="text-charcoal-400">Model: Gemini Flash Engine</span>
                </div>

                <div className="bg-navy-950 rounded-xl p-4 border border-navy-800 font-mono text-xs text-emerald-300 shadow-inner leading-relaxed">
                  <div className="text-navy-400 text-[10px] mb-1">// Real-time deterministic structured agent payload:</div>
                  <div className="font-semibold text-white sm:text-sm">{activeAgent.outputPreview}</div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-navy-300 pt-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Validated against National Emergency Protocol</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Consequential action requires coordinator sign-off</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 9-Step Linear Workflow Ribbon */}
      <div className="mt-8 bg-white border border-charcoal-200 rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-navy-600 font-mono">
              STANDARD PROTOCOL PIPELINE
            </span>
            <h3 className="text-xl font-bold font-heading text-navy-950">
              End-to-End Operational Lifecycle
            </h3>
          </div>
          <span className="text-xs font-semibold text-charcoal-500">
            Strict human governance at Step 07
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.step}
              className={`p-3.5 rounded-2xl border transition-all ${
                step.highlight
                  ? 'bg-emergency-50 border-emergency-300 shadow-elevated ring-2 ring-emergency-500/20'
                  : 'bg-charcoal-50/70 border-charcoal-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-mono font-extrabold ${
                    step.highlight ? 'text-emergency-700' : 'text-charcoal-500'
                  }`}
                >
                  STEP {step.step}
                </span>
                {step.highlight && (
                  <UserCheck className="w-4 h-4 text-emergency-600 animate-pulse" />
                )}
              </div>
              <div
                className={`text-xs font-extrabold ${
                  step.highlight ? 'text-emergency-900' : 'text-navy-950'
                }`}
              >
                {step.label}
              </div>
              <div className="text-[10px] text-charcoal-500 mt-0.5 line-clamp-1">
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
