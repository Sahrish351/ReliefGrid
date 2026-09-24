import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const DESKS = [
    { city: 'Lahore (Central Ops)', location: 'Punjab Emergency Complex, Ferozepur Road', phone: '+92 42 9923 1122' },
    { city: 'Karachi (Coastal Sector)', location: 'Sindh Disaster Control Room, Clifton Block 4', phone: '+92 21 9920 4455' },
    { city: 'Rawalpindi (Nullah Lai)', location: 'Civil Defense Headquarters, The Mall', phone: '+92 51 927 3344' },
    { city: 'Islamabad (Federal HQ)', location: 'Prime Minister Disaster Relief Cell, G-5', phone: '+92 51 920 1122' },
    { city: 'Multan (South Punjab)', location: 'Regional Relief Depot, Northern Bypass', phone: '+92 61 922 0011' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-navy-600">Regional Coordination</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy-950 mt-1">
          Contact Regional Emergency Desks
        </h1>
        <p className="text-charcoal-600 text-sm sm:text-base mt-2">
          Connect with regional humanitarian liaison officers, logistics coordinators, and technical engineering staff.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200 shadow-card">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h3 className="text-xl font-bold text-navy-950">Inquiry Dispatched</h3>
              <p className="text-xs text-charcoal-600 max-w-sm mx-auto">
                Your message has been assigned to the designated provincial liaison officer.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <h3 className="font-bold text-base text-navy-950">Send an Inquiry or Liaison Request</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Your Full Name</label>
                  <input type="text" required placeholder="Name" className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Organization / Agency</label>
                  <input type="text" placeholder="e.g. Red Crescent / Edhi / Rescue" className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Email Address</label>
                <input type="email" required placeholder="email@example.org" className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Subject / Region</label>
                <select className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs font-medium">
                  <option>Lahore Sector (Ravi Floodway)</option>
                  <option>Karachi Coastal &amp; Urban Floods</option>
                  <option>Rawalpindi Nullah Lai Basin</option>
                  <option>Islamabad Federal Coordination</option>
                  <option>Multan Chenab Embankment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Message</label>
                <textarea rows={4} required placeholder="State your inquiry..." className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs resize-none" />
              </div>

              <button
                type="submit"
                className="w-full bg-navy-950 hover:bg-navy-900 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Regional Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Regional Desks List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-bold text-base text-navy-950">Provincial Emergency Operations Centers</h3>
          {DESKS.map((d) => (
            <div key={d.city} className="bg-white p-4 rounded-xl border border-charcoal-200 shadow-xs space-y-1">
              <div className="font-bold text-xs text-navy-950">{d.city}</div>
              <div className="text-[11px] text-charcoal-500 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
                <span>{d.location}</span>
              </div>
              <div className="text-[11px] font-mono text-navy-900 font-bold flex items-center space-x-1.5 pt-1">
                <Phone className="w-3.5 h-3.5 text-navy-600 flex-shrink-0" />
                <span>{d.phone}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
