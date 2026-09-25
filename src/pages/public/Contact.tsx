import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Send,
  ShieldAlert,
  Radio,
  Clock,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { IMAGES, handleImageError } from '../../config/images';
import { Link } from 'react-router-dom';

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
    <div className="space-y-28 sm:space-y-36 pb-24 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroTeamwork}
            alt="Humanitarian coordination liaison desks"
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
              OPERATIONAL LIAISON &bull; CONTACT DESKS
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-[1.08]">
              Contact Regional Emergency Desks.
            </h1>
            <p className="text-navy-100 text-lg sm:text-xl font-normal leading-relaxed">
              Connect with regional humanitarian liaison officers, medical logistics coordinators, and technical engineering staff across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* 2. IMMEDIATE EMERGENCY CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-2xl bg-emergency-50 border border-emergency-300 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6 text-emergency-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-sm text-emergency-950">
                Are you in immediate life-threatening danger?
              </div>
              <div className="text-xs text-emergency-800">
                Do not submit this contact form. Dial emergency services directly for immediate watercraft or medical extraction.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="tel:1122"
              className="bg-emergency-600 text-white font-black px-4 py-2 rounded-xl text-xs shadow-card hover:bg-emergency-700"
            >
              Call Rescue 1122
            </a>
            <a
              href="tel:115"
              className="bg-white text-navy-950 border border-charcoal-300 font-bold px-4 py-2 rounded-xl text-xs hover:bg-charcoal-50"
            >
              Call Edhi 115
            </a>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & LOCATIONS SPLIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-charcoal-200 shadow-card">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold text-navy-950">Inquiry Dispatched</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 max-w-sm mx-auto leading-relaxed">
                  Your message has been assigned to the designated provincial liaison desk. You will receive an operational response within 4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-navy-950 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-navy-900"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-navy-950">Send an Operational Liaison Request</h3>
                  <p className="text-xs text-charcoal-500 mt-1">For agency integration, NGO relief logistics, or academic inquiries.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Tariq Mansoor"
                      className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-navy-900 text-navy-950"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-700">Agency / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Red Crescent / Edhi Foundation"
                      className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-navy-900 text-navy-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-700">Official Email</label>
                    <input
                      type="email"
                      required
                      placeholder="liaison@agency.org"
                      className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-navy-900 text-navy-950"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-700">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="+92 300 0000000"
                      className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-navy-900 text-navy-950"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal-700">Inquiry Description</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding agency coordination, warehouse logistics, or clinical telemetry integration..."
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-navy-900 text-navy-950 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-navy-950 hover:bg-navy-900 text-white font-bold py-3.5 rounded-xl text-sm shadow-card flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Liaison Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Regional Desks */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-navy-600 mb-1">
                PHYSICAL HUBS
              </div>
              <h3 className="text-2xl font-bold font-heading text-navy-950">
                Provincial Operations Desks
              </h3>
            </div>

            <div className="space-y-4">
              {DESKS.map((d) => (
                <div key={d.city} className="p-4 bg-white border border-charcoal-200 rounded-2xl shadow-card space-y-1">
                  <div className="font-bold text-sm text-navy-950">{d.city}</div>
                  <div className="text-xs text-charcoal-600 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0" />
                    <span>{d.location}</span>
                  </div>
                  <div className="text-xs text-charcoal-500 font-mono pt-1">
                    Hotline: <strong className="text-navy-950">{d.phone}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-navy-950 text-white rounded-2xl space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-emerald-400">
                OPERATIONAL TIMINGS
              </div>
              <div className="text-xs text-navy-200">
                Emergency dispatch and Gemini orchestration run 24 hours a day, 7 days a week. Administrative inquiry desks operate Mon–Sat 08:00 to 18:00 PKT.
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
