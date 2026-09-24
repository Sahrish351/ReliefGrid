import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  HeartPulse,
  LifeBuoy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { runIncidentIntelligence, runResponsePlanning } from '../../services/ai';
import { useData } from '../../context/DataContext';

export const AISimulator: React.FC = () => {
  const [inputText, setInputText] = useState(
    '18 people are trapped in a flooded neighborhood. Two elderly people and one infant need assistance. Medical support may be required.'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [humanApproved, setHumanApproved] = useState(false);
  const { resources, approveRecommendation, recommendations } = useData();

  const STEPS = [
    { title: 'Incident Intelligence', desc: 'Parsing natural language into structured data...', icon: '🧠' },
    { title: 'Information Extraction', desc: 'Identified 18 victims, 1 infant, 2 elderly, active flood.', icon: '📋' },
    { title: 'Spatial Verification', desc: 'Cross-referencing coordinates with Ravi flood telemetry.', icon: '🛡️' },
    { title: 'Vulnerability Assessment', desc: 'Weighting hypothermia & oxygen dependency vectors.', icon: '⚠️' },
    { title: 'Triage Priority Scoring', desc: 'Assigned CRITICAL priority (Score: 96/100).', icon: '🚨' },
    { title: 'Resource Proximity Matching', desc: 'Evaluating shallow-draft boats & swiftwater teams.', icon: '⚓' },
    { title: 'Clinical Routing', desc: 'Pre-alerting Mayo Hospital Trauma & Pediatric units.', icon: '🏥' },
    { title: 'Shelter Capacity Matching', desc: 'Allocating Expo Center Shelter S-12 (330 spots open).', icon: '🏠' },
    { title: 'Tactical Response Plan', desc: 'Synthesizing dispatch recommendation with explanation.', icon: '⚡' },
    { title: 'Awaiting Human Authorization', desc: 'Safety guardrail: requires coordinator approval.', icon: '👤' },
  ];

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setCurrentStepIndex(0);
    setHumanApproved(false);
    setExecutionResult(null);

    for (let i = 0; i < STEPS.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((r) => setTimeout(r, 650));
    }

    try {
      const intel = await runIncidentIntelligence(inputText, 'Shahdara, Ravi Basin', 'Lahore');
      const plan = await runResponsePlanning({
        id: 'inc-demo-primary',
        incident_code: 'RG-1042',
        title: '18 People Trapped in Flooded Neighborhood',
        description: inputText,
        incident_type: 'flood',
        location_text: 'Shahdara, Lahore',
        city: 'Lahore',
        latitude: 31.621,
        longitude: 74.2825,
        affected_people_count: 18,
        priority: 'critical',
        priority_score: 96,
        status: 'awaiting_approval',
        verification_status: 'verified',
        immediate_danger: true,
        medical_need: true,
        synthetic_demo: true,
        vulnerabilities: {
          infants_count: 1,
          children_count: 3,
          elderly_count: 2,
          disabled_count: 1,
          pregnant_count: 0,
          critical_medical_count: 1,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, resources);

      setExecutionResult({ intel: intel.data, plan: plan.data });
    } catch (e) {
      console.warn('Simulation fallback');
    }

    setIsRunning(false);
  };

  const handleApprove = () => {
    setHumanApproved(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
    if (recommendations[0]) {
      approveRecommendation(recommendations[0].id, 'Simulator User');
    }
  };

  return (
    <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-navy-800 shadow-elevated overflow-hidden relative">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-navy-900 border border-navy-700 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Signature Demo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
            AI Multi-Agent Response Simulator
          </h2>
          <p className="text-navy-300 text-sm mt-2 max-w-xl mx-auto">
            Experience how Gemini and RELIEFGRID's 10-agent pipeline converts an unstructured natural-language cry for help into a human-authorized tactical rescue operation.
          </p>
        </div>

        <div className="bg-navy-900/90 border border-navy-700 rounded-2xl p-4 sm:p-5 shadow-card mb-8">
          <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">
            Simulated Emergency Dispatch Input
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-navy-500 font-sans resize-none"
              placeholder="Enter simulated emergency call..."
            />
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="inline-flex items-center justify-center space-x-2 bg-emergency-600 hover:bg-emergency-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-card whitespace-nowrap active:scale-95"
            >
              {isRunning ? (
                <>
                  <Clock className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-white fill-white" />
                  <span>Simulate Response</span>
                </>
              )}
            </button>
          </div>
        </div>

        {currentStepIndex >= 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-xs font-mono text-navy-400 mb-3">
              <span>AGENT PIPELINE EXECUTION</span>
              <span>{Math.min(currentStepIndex + 1, STEPS.length)} / {STEPS.length} STEPS COMPLETED</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {STEPS.map((step, idx) => {
                const isCurrent = idx === currentStepIndex && isRunning;
                const isDone = idx <= currentStepIndex && !isRunning;

                return (
                  <div
                    key={step.title}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isCurrent
                        ? 'bg-navy-800 border-amber-500 shadow-sm scale-102 ring-1 ring-amber-500/50'
                        : isDone
                        ? 'bg-navy-900 border-green-500/40 text-navy-100'
                        : 'bg-navy-950/60 border-navy-900 text-navy-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base">{step.icon}</span>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                    </div>
                    <div className="font-bold text-[11px] truncate text-white">{step.title}</div>
                    <div className="text-[10px] text-navy-300 mt-1 line-clamp-2 leading-tight">{step.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {executionResult && (
          <div className="bg-white text-navy-950 rounded-2xl p-6 shadow-elevated border border-charcoal-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-200 pb-4 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-emergency-100 text-emergency-700 font-extrabold text-xs px-2.5 py-1 rounded-md tracking-wider">
                    CRITICAL PRIORITY (SCORE: 96/100)
                  </span>
                  <span className="text-xs font-mono text-charcoal-500">Incident Code: RG-1042</span>
                </div>
                <h3 className="text-lg font-bold text-navy-950 mt-1">
                  Tactical Response Plan Generated by Gemini Multi-Agent Workflow
                </h3>
              </div>

              <div className="text-right">
                <div className="text-xs text-charcoal-500">Confidence Score</div>
                <div className="text-xl font-extrabold text-navy-900">94.6%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-navy-50 border border-navy-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-navy-800 mb-1">
                  <LifeBuoy className="w-4 h-4 text-emergency-600" />
                  <span>Primary Watercraft</span>
                </div>
                <div className="font-bold text-sm text-navy-950">Boat B-03 + Team R-17</div>
                <div className="text-[11px] text-charcoal-600 mt-1">
                  Shallow water motorized zodiac. 12-person payload. Trained swiftwater divers. ETA 11 mins.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-green-800 mb-1">
                  <HeartPulse className="w-4 h-4 text-green-600" />
                  <span>Medical Facility Pre-Alert</span>
                </div>
                <div className="font-bold text-sm text-navy-950">Mayo Hospital Emergency</div>
                <div className="text-[11px] text-charcoal-600 mt-1">
                  Nearest Level-1 Trauma (4.2 km). 34 beds available, pediatric ICU &amp; hypothermia oxygen readiness.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-800 mb-1">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>Assigned Evacuation Shelter</span>
                </div>
                <div className="font-bold text-sm text-navy-950">Expo Center Shelter S-12</div>
                <div className="text-[11px] text-charcoal-600 mt-1">
                  330 open slots. Dedicated family quarters, baby supplies, 120-hour food supply.
                </div>
              </div>
            </div>

            <div className="bg-charcoal-50 rounded-xl p-4 border border-charcoal-200 mb-6">
              <div className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-navy-700" />
                <span>Explainable AI Rationale — Why This Recommendation?</span>
              </div>
              <ul className="text-xs text-charcoal-700 space-y-1.5 list-disc list-inside">
                <li><strong>18 people affected:</strong> Exceeds single-vehicle carrying capacity; requires two-craft rotation.</li>
                <li><strong>Infant detected:</strong> Critical vulnerability factor; severe hypothermia risk in cold rising water.</li>
                <li><strong>Two elderly persons:</strong> Limited mobility; requires water-borne physical carrier and wheelchair ramp.</li>
                <li><strong>Active flood depth &gt; 4.5 ft:</strong> Road access completely submerged; overland ambulances blocked.</li>
                <li><strong>Resource proximity:</strong> Boat B-03 is currently moored at Shahdara Pier (3.1 km away).</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-charcoal-200">
              <div className="flex items-center space-x-2 text-xs text-charcoal-600">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Human Coordinator Authorization Required Before Consequential Dispatch</span>
              </div>

              <div className="flex items-center space-x-3">
                {humanApproved ? (
                  <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-xl text-xs font-bold shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Authorized &amp; Dispatched (Mission Code: DISP-1042)</span>
                  </div>
                ) : (
                  <button
                    onClick={handleApprove}
                    className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-card flex items-center space-x-2 active:scale-95 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span>Approve &amp; Dispatch Units</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
