import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, LifeBuoy, HeartPulse, Sparkles, Building2 } from 'lucide-react';

export const Impact: React.FC = () => {
  const INCIDENT_TRENDS = [
    { hour: '00:00', incidents: 4, resolved: 3 },
    { hour: '04:00', incidents: 2, resolved: 2 },
    { hour: '08:00', incidents: 9, resolved: 6 },
    { hour: '12:00', incidents: 16, resolved: 11 },
    { hour: '16:00', incidents: 24, resolved: 18 },
    { hour: '20:00', incidents: 19, resolved: 15 },
  ];

  const CATEGORY_DATA = [
    { name: 'Floods', count: 14, color: '#0284C7' },
    { name: 'Earthquakes', count: 5, color: '#D97706' },
    { name: 'Fires', count: 4, color: '#D92D20' },
    { name: 'Heatwave', count: 6, color: '#F59E0B' },
    { name: 'Building Collapse', count: 3, color: '#7C3AED' },
  ];

  const REGIONAL_RESPONSE_TIME = [
    { city: 'Lahore', avgMinutes: 12.4 },
    { city: 'Rawalpindi', avgMinutes: 14.1 },
    { city: 'Karachi', avgMinutes: 18.2 },
    { city: 'Islamabad', avgMinutes: 10.8 },
    { city: 'Multan', avgMinutes: 15.6 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-navy-700" />
          <span>Operational Analytics &amp; Metrics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
          Relief Impact &amp; Incident Analytics
        </h1>
        <p className="text-charcoal-600 text-sm mt-1 max-w-2xl">
          Aggregated response telemetry, average dispatch times, and AI acceptance rates across all simulated provincial sectors in Pakistan.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Total Rescued</span>
          <div className="text-3xl font-extrabold text-navy-950 font-heading mt-1">18,450</div>
          <span className="text-[11px] text-green-700 font-semibold">+18 added today</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Avg Response Time</span>
          <div className="text-3xl font-extrabold text-emergency-600 font-heading mt-1">13.2 min</div>
          <span className="text-[11px] text-charcoal-500">Target: &lt;15 mins</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Shelter Occupancy</span>
          <div className="text-3xl font-extrabold text-navy-950 font-heading mt-1">68.4%</div>
          <span className="text-[11px] text-charcoal-500">1,240 spaces open</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">AI Plan Acceptance</span>
          <div className="text-3xl font-extrabold text-green-600 font-heading mt-1">94.8%</div>
          <span className="text-[11px] text-charcoal-500">Human-verified dispatches</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Incident Volume by Hour */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-4">
          <h3 className="font-bold text-base text-navy-950">24-Hour Incident Volume &amp; Resolution Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={INCIDENT_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                <XAxis dataKey="hour" stroke="#98A2B3" fontSize={11} />
                <YAxis stroke="#98A2B3" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="#D92D20" strokeWidth={2.5} name="New Reports" />
                <Line type="monotone" dataKey="resolved" stroke="#039855" strokeWidth={2.5} name="Resolved Missions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hazard Category Pie */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-4">
          <h3 className="font-bold text-base text-navy-950">Hazard Categories</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_DATA} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Response Time by City */}
        <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card space-y-4">
          <h3 className="font-bold text-base text-navy-950">Average Responder Mobilization Time by Urban Center (Minutes)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REGIONAL_RESPONSE_TIME}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                <XAxis dataKey="city" stroke="#98A2B3" fontSize={11} />
                <YAxis stroke="#98A2B3" fontSize={11} />
                <Tooltip />
                <Bar dataKey="avgMinutes" fill="#102A43" radius={[6, 6, 0, 0]} name="Minutes to On-Scene Arrival" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
