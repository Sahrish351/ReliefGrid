import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  Building2,
  Activity,
  Heart,
  UserCheck,
  Bell,
  MapPin,
  Clock,
  ArrowRight,
  AlertTriangle,
  LifeBuoy,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const { incidents, shelters, hospitals, alerts, notifications } = useData();

  // Find citizen's own incidents (or fallback to primary demo incident)
  const myIncidents = incidents.filter((i) => i.reporter_id === user?.id || i.id === 'inc-demo-primary');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Greeting & Active Emergency Status Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200 shadow-card flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-navy-600">Citizen Response Portal</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
            Welcome back, {user?.full_name || 'Tariq Mehmood'}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500">
            Current simulated region: <strong>Lahore (Ravi Basin Sector)</strong>. All systems connected.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/report-emergency"
            className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-card flex items-center space-x-2 transition-all active:scale-95"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Request Emergency Rescue</span>
          </Link>
        </div>
      </div>

      {/* Quick Action Navigation Grid (04_RELIEFGRID_UI_UX.md section 8) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Link
          to="/report-emergency"
          className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-xs hover:border-emergency-500 hover:shadow-card transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emergency-50 text-emergency-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs text-navy-950">Report Emergency</span>
        </Link>

        <Link
          to="/shelters"
          className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-xs hover:border-purple-500 hover:shadow-card transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs text-navy-950">Find Shelter</span>
        </Link>

        <Link
          to="/hospitals"
          className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-xs hover:border-green-500 hover:shadow-card transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs text-navy-950">Find Hospital</span>
        </Link>

        <Link
          to="/missing-person"
          className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-xs hover:border-navy-500 hover:shadow-card transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-emergency-600" />
          </div>
          <span className="font-bold text-xs text-navy-950">Missing Person</span>
        </Link>

        <Link
          to="/volunteer"
          className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-xs hover:border-blue-500 hover:shadow-card transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs text-navy-950">Volunteer</span>
        </Link>
      </div>

      {/* Grid: Active Incidents + Right Column (Alerts & Help) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Emergency Requests */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-950">Your Emergency Submissions</h2>
            <Link to="/track-emergency" className="text-xs font-semibold text-navy-900 hover:underline">
              Enter Tracking Code &rarr;
            </Link>
          </div>

          {myIncidents.length > 0 ? (
            <div className="space-y-4">
              {myIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 space-y-4 hover:shadow-elevated transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold bg-navy-100 text-navy-900 px-2 py-0.5 rounded">
                        {inc.incident_code}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        inc.priority === 'critical' ? 'bg-emergency-100 text-emergency-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inc.priority} PRIORITY
                      </span>
                    </div>
                    <span className="text-[11px] text-charcoal-500 font-mono">
                      Status: <strong className="uppercase text-navy-950">{inc.status.replace('_', ' ')}</strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-navy-950">{inc.title}</h3>
                    <p className="text-xs text-charcoal-600 mt-1">{inc.description}</p>
                    <div className="flex items-center space-x-1.5 text-xs text-charcoal-500 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0" />
                      <span>{inc.location_text}</span>
                    </div>
                  </div>

                  <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-charcoal-400 block">Assigned Unit</span>
                      <span className="font-bold text-navy-950 truncate block">
                        {inc.assigned_resource_name || 'Boat B-03 (Moored 3.1km away)'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-charcoal-400 block">Evacuation Destination</span>
                      <span className="font-bold text-navy-950 truncate block">Expo Center Shelter S-12</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-charcoal-400">18 individuals recorded</span>
                    <Link
                      to={`/track-emergency?code=${inc.incident_code}`}
                      className="bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all"
                    >
                      Track Live Timeline &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-charcoal-200 text-center text-xs text-charcoal-500">
              You have no active emergency requests. "You're all clear right now."
            </div>
          )}
        </div>

        {/* Right Sidebar: Safety Alerts & Live In-App Notifications */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Active Regional Safety Alerts */}
          <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-navy-950 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-emergency-600" />
              <span>Active Regional Safety Alerts</span>
            </div>

            <div className="space-y-3">
              {alerts.map((alt) => (
                <div key={alt.id} className="p-3 bg-charcoal-50 rounded-xl border border-charcoal-100 text-xs space-y-1">
                  <div className="font-bold text-emergency-700">{alt.title}</div>
                  <div className="text-charcoal-600 text-[11px] leading-relaxed">{alt.description}</div>
                  <div className="text-[10px] text-charcoal-400 pt-1">Location: {alt.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* In-App Notifications */}
          <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-navy-950 uppercase tracking-wider">
              <Bell className="w-4 h-4 text-navy-700" />
              <span>Notifications</span>
            </div>

            <div className="space-y-2">
              {notifications.map((n) => (
                <div key={n.id} className="p-2.5 rounded-xl border border-charcoal-100 bg-charcoal-50 text-xs space-y-0.5">
                  <div className="font-bold text-navy-950 text-[11px]">{n.title}</div>
                  <div className="text-charcoal-600 text-[10px]">{n.message}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
