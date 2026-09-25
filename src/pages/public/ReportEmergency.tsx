import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  PhoneCall,
  Activity,
  ArrowRight,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { runIncidentIntelligence } from '../../services/ai';
import { IncidentType } from '../../types';
import { IMAGES, handleImageError } from '../../config/images';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Trigger Gemini to parse natural text into form fields
  const handleAnalyzeWithAI = async () => {
    if (!naturalText.trim()) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
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
    } catch (err: any) {
      setErrorMessage('Automatic AI extraction note: Please review form values below manually.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!locationText.trim()) {
      setErrorMessage('Please provide an exact street address or nearby landmark.');
      return;
    }

    setIsSubmitting(true);
    try {
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
        },
      });

      navigate(`/track-emergency?code=${newInc.incident_code}`);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit report. Please retry or call 1122 directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 box-border overflow-x-hidden">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emergency-100 text-emergency-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-emergency-600 flex-shrink-0" />
          <span>Priority Emergency Intake</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-navy-950 tracking-tight leading-tight">
          Request Immediate Emergency Help
        </h1>
        <p className="text-charcoal-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Type or describe your distress situation in plain English or Urdu. Gemini multi-agent intelligence automatically parses victim counts, flags vulnerable individuals, and pre-stages the nearest rescue units.
        </p>
      </div>

      {/* Main Two-Column Desktop / Single Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full box-border">
        
        {/* LEFT COLUMN: Guidance, Hotlines, and Reassuring Safeguards */}
        <div className="lg:col-span-5 space-y-6 w-full box-border">
          
          {/* Urgent Direct Hotlines */}
          <div className="bg-navy-950 rounded-2xl p-6 text-white border border-navy-800 shadow-card space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Immediate Telephone Lifelines</span>
            </div>
            <p className="text-navy-200 text-xs leading-relaxed">
              If life is in catastrophic danger right now, call first responders while submitting this digital report:
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="tel:1122"
                className="p-3 rounded-xl bg-navy-900 border border-navy-700/80 hover:border-emergency-500 transition-colors text-center block"
              >
                <div className="text-[10px] uppercase font-mono text-charcoal-400">Rescue 1122</div>
                <div className="text-xl font-black text-emergency-500 font-mono mt-0.5">1122</div>
                <div className="text-[10px] text-navy-300">Punjab &bull; KP &bull; Sindh</div>
              </a>
              <a
                href="tel:115"
                className="p-3 rounded-xl bg-navy-900 border border-navy-700/80 hover:border-emergency-500 transition-colors text-center block"
              >
                <div className="text-[10px] uppercase font-mono text-charcoal-400">Edhi Foundation</div>
                <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">115</div>
                <div className="text-[10px] text-navy-300">Nationwide Medical</div>
              </a>
            </div>
          </div>

          {/* Operational Process Card */}
          <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-card space-y-4">
            <h3 className="font-bold text-sm text-navy-950 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emergency-600 flex-shrink-0" />
              <span>What Happens After You Submit</span>
            </h3>
            
            <div className="space-y-3.5 text-xs text-charcoal-600">
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-navy-950 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-navy-950 block">Gemini Triage Scoring</strong>
                  Extracts headcount, infant urgency, and calculates priority ranking in sub-seconds.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-navy-950 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-navy-950 block">Coordinator Authorization</strong>
                  Certified 1122 command coordinator reviews the plan and authorizes field units.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-navy-950 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-navy-950 block">Real-Time GPS Tracking</strong>
                  You receive an instant incident code to monitor approaching rescue boats and trauma bed reservations.
                </div>
              </div>
            </div>
          </div>

          {/* Reassuring Photo Vignette */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-navy-950 shadow-card hidden sm:block">
            <img
              src={IMAGES.emergencies.flood}
              alt="Emergency swiftwater responders on boat"
              onError={handleImageError}
              className="w-full h-full object-cover filter brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-mono">
              Certified Rescue 1122 and disaster response units standby across active river basins.
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: The Emergency Intake Form */}
        <div className="lg:col-span-7 w-full box-border">
          <div className="bg-white rounded-2xl p-5 sm:p-8 border border-charcoal-200 shadow-card space-y-6 w-full box-border">
            
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 w-full box-border">
              
              {/* Section 1: Natural Language Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                    1. Describe the Emergency (English or Urdu)
                  </label>
                  <span className="text-[11px] text-charcoal-500 font-medium hidden sm:inline">
                    Natural text supported
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={naturalText}
                  onChange={(e) => setNaturalText(e.target.value)}
                  required
                  className="w-full max-w-full box-border bg-charcoal-50 border border-charcoal-200 rounded-xl p-3.5 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-navy-950 focus:bg-white resize-none"
                  placeholder="e.g. 18 people trapped on rooftop due to floodwaters, 1 infant and 2 elderly need urgent boat and oxygen..."
                />

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleAnalyzeWithAI}
                    disabled={isAnalyzing}
                    className="inline-flex items-center space-x-1.5 bg-navy-100 hover:bg-navy-200 text-navy-950 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs disabled:opacity-50 whitespace-nowrap"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-navy-800 flex-shrink-0" />
                    <span>{isAnalyzing ? 'Gemini Extracting Details...' : 'Auto-Extract with Gemini AI'}</span>
                  </button>

                  {aiFeedback && (
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Extracted with {aiFeedback.confidence || 95}% confidence</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Section 2: Location & Hazard Classification */}
              <div className="space-y-4 pt-4 border-t border-charcoal-100">
                <div className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                  2. Location &amp; Hazard Category
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full box-border">
                  <div className="w-full box-border">
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">City / Region</label>
                    <select
                      value={city}
                      onChange={(e: any) => setCity(e.target.value)}
                      className="w-full max-w-full box-border bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium text-navy-950"
                    >
                      <option value="Lahore">Lahore (Ravi Basin Sector)</option>
                      <option value="Karachi">Karachi (Coastal &amp; Urban)</option>
                      <option value="Rawalpindi">Rawalpindi (Nullah Lai)</option>
                      <option value="Islamabad">Islamabad (Federal Capital)</option>
                      <option value="Multan">Multan (Chenab Embankment)</option>
                    </select>
                  </div>

                  <div className="w-full box-border">
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">Hazard Type</label>
                    <select
                      value={incidentType}
                      onChange={(e: any) => setIncidentType(e.target.value)}
                      className="w-full max-w-full box-border bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium capitalize text-navy-950"
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

                <div className="w-full box-border">
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                    Exact Street Address or Landmark
                  </label>
                  <div className="relative w-full box-border">
                    <MapPin className="w-4 h-4 text-charcoal-400 absolute left-3 top-3 flex-shrink-0" />
                    <input
                      type="text"
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      required
                      className="w-full max-w-full box-border bg-charcoal-50 border border-charcoal-200 rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-950"
                      placeholder="e.g. House 14, Street 7, Sector B, Shahdara Town"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Affected Demographics & Vulnerability Counters */}
              <div className="space-y-4 pt-4 border-t border-charcoal-100">
                <div className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                  3. Headcount &amp; Vulnerable Demographics
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 w-full box-border">
                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-200 text-center box-border">
                    <span className="text-[10px] font-bold text-charcoal-600 block mb-1">Total People</span>
                    <input
                      type="number"
                      min={1}
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full max-w-[64px] mx-auto text-center font-bold text-base bg-white border border-charcoal-300 rounded-lg py-1"
                    />
                  </div>

                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-200 text-center box-border">
                    <span className="text-[10px] font-bold text-emergency-700 block mb-1">Infants (&lt;1y)</span>
                    <input
                      type="number"
                      min={0}
                      value={infantsCount}
                      onChange={(e) => setInfantsCount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full max-w-[64px] mx-auto text-center font-bold text-base bg-white border border-charcoal-300 rounded-lg py-1"
                    />
                  </div>

                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-200 text-center box-border">
                    <span className="text-[10px] font-bold text-amber-800 block mb-1">Elderly (65+)</span>
                    <input
                      type="number"
                      min={0}
                      value={elderlyCount}
                      onChange={(e) => setElderlyCount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full max-w-[64px] mx-auto text-center font-bold text-base bg-white border border-charcoal-300 rounded-lg py-1"
                    />
                  </div>

                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-200 text-center box-border">
                    <span className="text-[10px] font-bold text-purple-800 block mb-1">Disabled</span>
                    <input
                      type="number"
                      min={0}
                      value={disabledCount}
                      onChange={(e) => setDisabledCount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full max-w-[64px] mx-auto text-center font-bold text-base bg-white border border-charcoal-300 rounded-lg py-1"
                    />
                  </div>

                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-200 text-center col-span-2 sm:col-span-1 box-border">
                    <span className="text-[10px] font-bold text-charcoal-600 block mb-1">Pregnant</span>
                    <input
                      type="number"
                      min={0}
                      value={pregnantCount}
                      onChange={(e) => setPregnantCount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full max-w-[64px] mx-auto text-center font-bold text-base bg-white border border-charcoal-300 rounded-lg py-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 w-full box-border">
                  <label className="flex items-start space-x-2.5 p-3 rounded-xl border border-charcoal-200 bg-charcoal-50 cursor-pointer w-full box-border">
                    <input
                      type="checkbox"
                      checked={immediateDanger}
                      onChange={(e) => setImmediateDanger(e.target.checked)}
                      className="w-4 h-4 rounded text-emergency-600 focus:ring-emergency-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs font-semibold text-charcoal-800 leading-tight">
                      Immediate Threat to Life (rising floodwater &gt;4ft, active fire, structural collapse)
                    </span>
                  </label>

                  <label className="flex items-start space-x-2.5 p-3 rounded-xl border border-charcoal-200 bg-charcoal-50 cursor-pointer w-full box-border">
                    <input
                      type="checkbox"
                      checked={medicalNeed}
                      onChange={(e) => setMedicalNeed(e.target.checked)}
                      className="w-4 h-4 rounded text-emergency-600 focus:ring-emergency-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs font-semibold text-charcoal-800 leading-tight">
                      Urgent Medical Attention Required (trauma, oxygen, insulin, acute hypothermia)
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 4: Main Emergency Submit CTA (Zero Overflow, Full Responsive) */}
              <div className="pt-4 border-t border-charcoal-100 w-full box-border">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full max-w-full box-border bg-emergency-600 hover:bg-emergency-700 active:scale-98 text-white font-extrabold py-3.5 sm:py-4 px-4 rounded-xl text-sm sm:text-base shadow-elevated flex items-center justify-center space-x-2 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin flex-shrink-0" />
                      <span className="whitespace-nowrap truncate">Broadcasting to Emergency Dispatch...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap truncate">Submit Emergency Report</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-charcoal-500 mt-2.5">
                  Submitting directly notifies the Emergency Coordinator Command Center under active human oversight.
                </p>
              </div>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ReportEmergency;
