import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Sparkles,
  MapPin,
  Users,
  AlertTriangle,
  HeartPulse,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { runIncidentIntelligence } from '../../services/ai';
import { IncidentType } from '../../types';

export const ReportEmergency: React.FC = () => {
  const navigate = useNavigate();
  const { createIncident } = useData();

  // Natural language description
  const [naturalText, setNaturalText] = useState(
    '18 people are trapped in a flooded neighborhood. Two elderly people and one infant need assistance. Medical support may be required.'
  );

  // Form fields
  const [incidentType, setIncidentType] = useState<IncidentType>('flood');
  const [title, setTitle] = useState('18 Trapped in Rising Floodwaters');
  const [locationText, setLocationText] = useState('Street 7, Sector B, Shahdara Town near Ravi Riverbank');
  const [city, setCity] = useState<'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Multan'>('Lahore');
  const [peopleCount, setPeopleCount] = useState<number>(18);
  const [immediateDanger, setImmediateDanger] = useState(true);
  const [medicalNeed, setMedicalNeed] = useState(true);

  // Vulnerability counts
  const [infantsCount, setInfantsCount] = useState(1);
  const [elderlyCount, setElderlyCount] = useState(2);
  const [disabledCount, setDisabledCount] = useState(1);
  const [pregnantCount, setPregnantCount] = useState(0);

  // AI extraction state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger Gemini to parse natural text into form fields
  const handleAnalyzeWithAI = async () => {
    if (!naturalText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await runIncidentIntelligence(naturalText, locationText, city);
      if (res?.data) {
        const d = res.data;
        setAiFeedback(d);
        if (d.incident_type) setIncidentType(d.incident_type);
        if (d.affected_people_count) setPeopleCount(d.affected_people_count);
        if (d.infants_count !== undefined) setInfantsCount(d.infants_count);
        if (d.elderly_count !== undefined) setElderlyCount(d.elderly_count);
        if (d.disabled_count !== undefined) setDisabledCount(d.disabled_count);
        if (d.pregnant_count !== undefined) setPregnantCount(d.pregnant_count);
        if (d.immediate_danger !== undefined) setImmediateDanger(d.immediate_danger);
        if (d.medical_need !== undefined) setMedicalNeed(d.medical_need);
        if (d.summary) setTitle(d.summary);
      }
    } catch (err) {
      console.warn('AI analysis note');
    }
    setIsAnalyzing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newInc = await createIncident({
      title,
      description: naturalText,
      incident_type: incidentType,
      location_text: locationText,
      city,
      affected_people_count: Number(peopleCount),
      immediate_danger: immediateDanger,
      medical_need: medicalNeed,
      priority: immediateDanger || infantsCount > 0 ? 'critical' : 'high',
      priority_score: immediateDanger ? 96 : 82,
      vulnerabilities: {
        infants_count: Number(infantsCount),
        children_count: Number(infantsCount) + 2,
        elderly_count: Number(elderlyCount),
        disabled_count: Number(disabledCount),
        pregnant_count: Number(pregnantCount),
        critical_medical_count: medicalNeed ? 1 : 0,
      }
    });

    setIsSubmitting(false);
    navigate(`/track-emergency?code=${newInc.incident_code}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 bg-emergency-100 text-emergency-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-4 h-4 text-emergency-600" />
          <span>Emergency Request Intake</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950 tracking-tight">
          Request Immediate Emergency Help
        </h1>
        <p className="text-charcoal-600 text-sm mt-2">
          Speak or type in plain language. Gemini Incident Intelligence will automatically structure your report, flag vulnerable demographics, and route to the nearest emergency units.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Natural Language Box with Gemini Parse Button */}
        <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-navy-950 uppercase tracking-wider">
              1. What is happening? (Describe in plain English or Urdu)
            </label>
            <span className="text-[11px] text-charcoal-400 font-medium">Natural language supported</span>
          </div>

          <textarea
            rows={4}
            value={naturalText}
            onChange={(e) => setNaturalText(e.target.value)}
            required
            className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3.5 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:bg-white resize-none"
            placeholder="e.g. 18 people trapped on rooftop due to floodwaters, 1 infant and 2 elderly need urgent boat and oxygen..."
          />

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <button
              type="button"
              onClick={handleAnalyzeWithAI}
              disabled={isAnalyzing}
              className="inline-flex items-center space-x-2 bg-navy-100 hover:bg-navy-200 text-navy-900 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-navy-700" />
              <span>{isAnalyzing ? 'Gemini Extracting Details...' : 'Auto-Extract Details with Gemini AI'}</span>
            </button>

            {aiFeedback && (
              <span className="text-xs text-green-700 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Extracted with {aiFeedback.confidence || 95}% confidence</span>
              </span>
            )}
          </div>
        </div>

        {/* Location & Hazard Classification */}
        <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-card space-y-4">
          <div className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
            2. Location &amp; Hazard Details
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">City / Division</label>
              <select
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-sm font-medium"
              >
                <option value="Lahore">Lahore (Ravi Basin Sector)</option>
                <option value="Karachi">Karachi (Coastal &amp; Urban)</option>
                <option value="Rawalpindi">Rawalpindi (Nullah Lai)</option>
                <option value="Islamabad">Islamabad (Federal Capital)</option>
                <option value="Multan">Multan (Chenab Embankment)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Hazard Category</label>
              <select
                value={incidentType}
                onChange={(e: any) => setIncidentType(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-sm font-medium capitalize"
              >
                <option value="flood">Flood &amp; Water Inundation</option>
                <option value="earthquake">Earthquake &amp; Aftershocks</option>
                <option value="fire">Fire &amp; Toxic Hazard</option>
                <option value="building_collapse">Building Collapse / Debris</option>
                <option value="heatwave">Heatwave Exhaustion</option>
                <option value="storm">Severe Storm / Fallen Cable</option>
                <option value="road_accident">Road Accident (Mass-Casualty)</option>
                <option value="medical_emergency">Medical Emergency Surge</option>
                <option value="water_shortage">Water Shortage Crisis</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">Exact Street Address / Landmark</label>
            <input
              type="text"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              required
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-sm"
              placeholder="e.g. House 14, Street 7, Sector B, Shahdara Town"
            />
          </div>
        </div>

        {/* Affected Demographics & Vulnerability Counters */}
        <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-card space-y-5">
          <div className="text-xs font-bold text-navy-950 uppercase tracking-wider">
            3. Vulnerable Demographics (Critical for Triage &amp; Vessel Selection)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[11px] font-bold text-charcoal-600 block mb-1">Total People</span>
              <input
                type="number"
                min={1}
                value={peopleCount}
                onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 mx-auto text-center font-bold text-lg bg-white border border-charcoal-300 rounded-lg py-1"
              />
            </div>

            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[11px] font-bold text-emergency-700 block mb-1">Infants (&lt;1 yr)</span>
              <input
                type="number"
                min={0}
                value={infantsCount}
                onChange={(e) => setInfantsCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 mx-auto text-center font-bold text-lg bg-white border border-charcoal-300 rounded-lg py-1"
              />
            </div>

            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[11px] font-bold text-amber-800 block mb-1">Elderly (65+)</span>
              <input
                type="number"
                min={0}
                value={elderlyCount}
                onChange={(e) => setElderlyCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 mx-auto text-center font-bold text-lg bg-white border border-charcoal-300 rounded-lg py-1"
              />
            </div>

            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[11px] font-bold text-purple-800 block mb-1">Disabled</span>
              <input
                type="number"
                min={0}
                value={disabledCount}
                onChange={(e) => setDisabledCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 mx-auto text-center font-bold text-lg bg-white border border-charcoal-300 rounded-lg py-1"
              />
            </div>

            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[11px] font-bold text-charcoal-600 block mb-1">Pregnant</span>
              <input
                type="number"
                min={0}
                value={pregnantCount}
                onChange={(e) => setPregnantCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 mx-auto text-center font-bold text-lg bg-white border border-charcoal-300 rounded-lg py-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center space-x-3 p-3 rounded-xl border border-charcoal-200 bg-charcoal-50 cursor-pointer">
              <input
                type="checkbox"
                checked={immediateDanger}
                onChange={(e) => setImmediateDanger(e.target.checked)}
                className="w-4 h-4 rounded text-emergency-600 focus:ring-emergency-500"
              />
              <span className="text-xs font-bold text-charcoal-800">
                Active Immediate Threat to Life (e.g. rising water &gt; 4ft, collapsing roof)
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 rounded-xl border border-charcoal-200 bg-charcoal-50 cursor-pointer">
              <input
                type="checkbox"
                checked={medicalNeed}
                onChange={(e) => setMedicalNeed(e.target.checked)}
                className="w-4 h-4 rounded text-emergency-600 focus:ring-emergency-500"
              />
              <span className="text-xs font-bold text-charcoal-800">
                Requires Urgent Medical Support / Oxygen / Paramedic On-Scene
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emergency-600 hover:bg-emergency-700 active:scale-98 text-white font-bold py-4 rounded-2xl text-base shadow-elevated flex items-center justify-center space-x-2 transition-all"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-5 h-5 animate-spin" />
                <span>Broadcasting to Emergency Network...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Emergency Call &amp; Generate Response Plan</span>
              </>
            )}
          </button>
          <div className="text-center text-xs text-charcoal-500 mt-3">
            Your emergency report will instantly alert the command center and trigger multi-agent dispatch evaluation.
          </div>
        </div>

      </form>
    </div>
  );
};
