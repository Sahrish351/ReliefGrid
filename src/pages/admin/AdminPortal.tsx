import React from 'react';
import { Lock, Shield, Database, RefreshCw, CheckCircle2, Users, Building2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminPortal: React.FC = () => {
  const { auditLogs, resetDemoData, incidents, resources, hospitals, shelters } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-elevated flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-navy-900 border border-navy-700 px-3 py-1 rounded-full text-xs font-bold text-amber-400 mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Root System Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
            RELIEFGRID AI Super Administrator
          </h1>
          <p className="text-xs text-navy-300">
            System security configuration, Supabase RLS monitoring, and audit verification.
          </p>
        </div>

        <button
          onClick={() => {
            resetDemoData();
            alert('Simulation demo dataset reset to factory baseline.');
          }}
          className="bg-navy-900 hover:bg-navy-800 border border-navy-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset Simulation Dataset</span>
        </button>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-charcoal-500 font-bold block mb-1">Total Incidents</span>
          <span className="text-2xl font-mono font-bold text-navy-950">{incidents.length}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-charcoal-500 font-bold block mb-1">Rescue Resources</span>
          <span className="text-2xl font-mono font-bold text-navy-950">{resources.length}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-charcoal-500 font-bold block mb-1">Hospitals Connected</span>
          <span className="text-2xl font-mono font-bold text-navy-950">{hospitals.length}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card">
          <span className="text-charcoal-500 font-bold block mb-1">Shelters Active</span>
          <span className="text-2xl font-mono font-bold text-navy-950">{shelters.length}</span>
        </div>
      </div>

      {/* Complete Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 space-y-4">
        <h3 className="font-bold text-base text-navy-950">System Audit Trail &amp; Consequential Event Logs</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-50 text-charcoal-600 uppercase font-mono text-[10px] border-b border-charcoal-200">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100 text-charcoal-700 font-mono text-[11px]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-charcoal-50/50">
                  <td className="py-2.5 px-4 text-charcoal-400">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-navy-950">{log.actor_name}</td>
                  <td className="py-2.5 px-4">{log.actor_role}</td>
                  <td className="py-2.5 px-4 font-bold text-emergency-700">{log.action}</td>
                  <td className="py-2.5 px-4">{log.entity_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
