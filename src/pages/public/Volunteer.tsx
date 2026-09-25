import React, { useState } from 'react';
import { UserCheck, CheckCircle2, Shield, Heart, MapPin, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Volunteer: React.FC = () => {
  const { volunteers } = useData();
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['First Aid', 'Food Distribution']);

  const SKILL_OPTIONS = [
    'Emergency Medicine',
    'Pediatrics',
    'First Aid',
    'Heavy Driving & Transport',
    'Boat Handling & Water Rescue',
    'Search & Rescue',
    'Food Distribution',
    'Child & Elderly Support',
    'Psychological First Aid',
    'Translation (Urdu, Pashto, Sindhi, Balochi, Punjabi)',
    'Logistics & Warehouse Operations',
    'Radio / Communications',
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 text-emergency-600" />
          <span>Community Humanitarian Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
          Join the RELIEFGRID Volunteer Corps
        </h1>
        <p className="text-charcoal-600 text-sm mt-2">
          Stand alongside professional rescue teams. Offer specialized skills, logistics support, translation, or community care during humanitarian crises across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Application Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200 shadow-card">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-navy-950">Volunteer Application Received</h3>
              <p className="text-sm text-charcoal-600 max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>. Your skills in {selectedSkills.join(', ')} have been registered in the {city} regional logistics registry. You will receive priority mobilization alerts.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-navy-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl mt-4"
              >
                Register Another Volunteer
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-navy-950">Volunteer Registration</h3>
                <p className="text-xs text-charcoal-500">Provide accurate contact details for operational dispatch.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Ayesha Siddiqui"
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">City / Region *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs font-medium"
                  >
                    <option value="Lahore">Lahore (Ravi Basin Sector)</option>
                    <option value="Karachi">Karachi (Coastal &amp; Urban)</option>
                    <option value="Rawalpindi">Rawalpindi (Nullah Lai)</option>
                    <option value="Islamabad">Islamabad (Capital Territory)</option>
                    <option value="Multan">Multan (Chenab Embankment)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ayesha@example.org"
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1112233"
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              {/* Skills Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Select Capabilities &amp; Skills *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {SKILL_OPTIONS.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-navy-900 border-navy-900 text-white shadow-xs'
                            : 'bg-charcoal-50 border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100'
                        }`}
                      >
                        <span>{skill}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-navy-950 hover:bg-navy-900 active:scale-98 text-white font-bold py-3.5 rounded-xl text-sm shadow-card transition-all"
                >
                  Join Humanitarian Volunteer Roster
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Active Volunteer Roster Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-charcoal-50 rounded-2xl p-6 border border-charcoal-200">
            <h3 className="font-bold text-base text-navy-950 mb-1">Active Volunteer Roster</h3>
            <p className="text-xs text-charcoal-500 mb-4">Verified volunteers currently on standby or deployed.</p>

            <div className="space-y-3">
              {volunteers.map((vol) => (
                <div key={vol.id} className="bg-white p-3.5 rounded-xl border border-charcoal-200 shadow-xs flex items-start justify-between">
                  <div>
                    <div className="font-bold text-xs text-navy-950">{vol.name}</div>
                    <div className="text-[11px] text-charcoal-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-charcoal-400" />
                      <span>{vol.city}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2 text-[10px]">
                      {vol.skills.slice(0, 2).map((s) => (
                        <span key={s} className="bg-navy-50 text-navy-800 px-1.5 py-0.5 rounded font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    {vol.availability_status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
