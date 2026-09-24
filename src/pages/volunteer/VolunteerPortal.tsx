import React, { useState } from 'react';
import { UserCheck, Clock, CheckCircle2, MapPin, Award, Heart, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VolunteerPortal: React.FC = () => {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);

  const TASKS = [
    { id: 'task-1', title: 'Infant Warming & Pediatric Triage Intake', location: 'Expo Center Shelter S-12', time: 'Immediate (Shift A)', status: 'Assigned' },
    { id: 'task-2', title: 'Drinking Water Bottling & Palletizing', location: 'Lahore Logistics Depot', time: 'Tomorrow 09:00 AM', status: 'Open' },
    { id: 'task-3', title: 'Pashto & Urdu Translation Desk', location: 'Shahdara Reception Camp', time: 'Today 04:00 PM', status: 'Open' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200 shadow-card flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-emergency-600" />
            <span>Community Volunteer Corps</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
            Welcome, {user?.full_name || 'Dr. Ayesha Siddiqui'}
          </h1>
          <p className="text-xs text-charcoal-500">
            Registered Skills: Emergency Medicine, Pediatrics, Triage • City: Lahore
          </p>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center space-x-3 bg-charcoal-50 p-2.5 rounded-2xl border border-charcoal-200">
          <span className="text-xs font-semibold text-charcoal-700">Deployment Status:</span>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isAvailable ? 'bg-green-600 text-white' : 'bg-charcoal-300 text-charcoal-700'
            }`}
          >
            {isAvailable ? 'Available for Dispatch' : 'Unavailable (Off Duty)'}
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-1">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Hours Contributed</span>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">64 Hours</div>
          <span className="text-[11px] text-green-700 font-semibold">Active Tier-1 Responder</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-1">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Missions Supported</span>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">12 Deployments</div>
          <span className="text-[11px] text-charcoal-500">Floodway &amp; shelter clinics</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card space-y-1">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Evacuees Assisted</span>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">218 People</div>
          <span className="text-[11px] text-charcoal-500">Pediatric checkups &amp; aid</span>
        </div>
      </div>

      {/* Assigned and Available Tasks */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 space-y-4">
        <h3 className="font-bold text-base text-navy-950">Field Volunteer Tasking Queue</h3>

        <div className="space-y-3">
          {TASKS.map((t) => (
            <div key={t.id} className="p-4 rounded-xl border border-charcoal-200 bg-charcoal-50 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="font-bold text-navy-950 text-sm">{t.title}</div>
                <div className="flex items-center space-x-3 text-charcoal-500 text-[11px]">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-emergency-600" />
                    <span>{t.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-charcoal-400" />
                    <span>{t.time}</span>
                  </span>
                </div>
              </div>

              <div>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  t.status === 'Assigned' ? 'bg-green-100 text-green-800' : 'bg-navy-100 text-navy-800'
                }`}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
