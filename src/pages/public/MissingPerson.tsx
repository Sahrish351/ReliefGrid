import React, { useState } from 'react';
import { Users, Search, Plus, MapPin, Calendar, ShieldCheck, Heart, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { MissingPersonReport } from '../../types';

export const MissingPerson: React.FC = () => {
  const { missingPersons, reportMissingPerson } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [city, setCity] = useState('Lahore');
  const [clothing, setClothing] = useState('');
  const [description, setDescription] = useState('');
  const [medicalNotes, setMedicalNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportMissingPerson({
      name,
      age: parseInt(age) || 20,
      last_seen_location: lastSeenLocation,
      city,
      clothing,
      description,
      medical_notes_optional: medicalNotes,
    });
    setModalOpen(false);
    setName('');
    setAge('');
    setLastSeenLocation('');
    setClothing('');
    setDescription('');
    setMedicalNotes('');
  };

  const filtered = missingPersons.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.last_seen_location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-emergency-600" />
            <span>Family Reunification &amp; Missing Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
            Missing Persons &amp; Reunification Board
          </h1>
          <p className="text-charcoal-600 text-sm mt-1 max-w-xl">
            Compassionate, verified tracking of displaced and separated persons during emergencies.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-5 py-3 rounded-xl text-xs shadow-card transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Report a Missing Person</span>
        </button>
      </div>

      {/* Ethical AI Notice */}
      <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-navy-900">
        <ShieldCheck className="w-5 h-5 text-navy-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Responsible Humanitarian Protocol:</strong> AI assists by scanning shelter intake lists for potential phonetic and demographic matches, but <em>never</em> automatically declares a person found. Mandatory physical verification by coordinators and authorized family members is required.
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-card flex items-center space-x-3">
        <Search className="w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          placeholder="Search by full name, age, or last seen landmark..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs bg-transparent focus:outline-none text-charcoal-800"
        />
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((person) => {
          return (
            <div
              key={person.id}
              className="bg-white rounded-2xl border border-charcoal-200 shadow-card overflow-hidden flex flex-col justify-between hover:shadow-elevated transition-all"
            >
              <div className="p-5 space-y-4">
                
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-navy-50 text-navy-800 px-2 py-0.5 rounded">
                      {person.city}
                    </span>
                    <h3 className="font-bold text-lg text-navy-950 mt-1">{person.name}</h3>
                    <div className="text-xs text-charcoal-500">Age: <strong>{person.age} years</strong></div>
                  </div>

                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    person.status === 'verified_found'
                      ? 'bg-green-100 text-green-800'
                      : person.status === 'possible_match'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-navy-100 text-navy-800'
                  }`}>
                    {person.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-charcoal-700 bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-100">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Last seen:</strong> {person.last_seen_location}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0 mt-0.5" />
                    <span>{new Date(person.last_seen_at).toLocaleDateString()} at {new Date(person.last_seen_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {person.clothing && (
                    <div><strong>Clothing:</strong> {person.clothing}</div>
                  )}
                  {person.description && (
                    <div className="text-charcoal-600 line-clamp-2">{person.description}</div>
                  )}
                </div>

                {person.status === 'possible_match' && (
                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    <span>Potential match identified at Rawalpindi Liaquat Camp. Human confirmation in progress.</span>
                  </div>
                )}

              </div>

              <div className="p-4 bg-charcoal-50 border-t border-charcoal-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-charcoal-500 font-mono">Case #{person.id}</span>
                <button
                  onClick={() => alert(`Coordinator inquiry dispatched for case ${person.name}. We will notify registered contacts.`)}
                  className="font-bold text-navy-900 hover:text-emergency-600 transition-colors"
                >
                  I Have Information &rarr;
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* New Report Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-float border border-charcoal-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-navy-950 mb-1">Report Missing Person</h3>
            <p className="text-xs text-charcoal-500 mb-4">
              Enter details carefully. All reports are immediately synced with shelter reception registries.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sahrish Fatima"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 19"
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">City / Region *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Multan">Multan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Last Known Location &amp; Landmark *</label>
                <input
                  type="text"
                  required
                  value={lastSeenLocation}
                  onChange={(e) => setLastSeenLocation(e.target.value)}
                  placeholder="e.g. Shahdara Bridge checkpoint during evacuation"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Clothing &amp; Identifiable Features</label>
                <input
                  type="text"
                  value={clothing}
                  onChange={(e) => setClothing(e.target.value)}
                  placeholder="e.g. Blue shalwar kameez, brown shoes, glasses"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Medical Notes / Vulnerabilities (Optional)</label>
                <input
                  type="text"
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  placeholder="e.g. Diabetic, needs insulin daily"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-charcoal-600 hover:bg-charcoal-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
                >
                  Submit Missing Person Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
