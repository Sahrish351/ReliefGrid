import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { OperationalMap } from '../../components/map/OperationalMap';
import { ShieldAlert, Compass, Activity, Building2, LifeBuoy, MapPin, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveNetwork: React.FC = () => {
  const { incidents, resources, hospitals, shelters, reliefHubs } = useData();
  const [selectedIncident, setSelectedIncident] = useState<any>(incidents[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-navy-700" />
            <span>GIS Operational Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
            Live Emergency Response Network
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Real-time geospatial tracking of incidents, rescue craft, clinical trauma capacity, and evacuation shelters.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/report-emergency"
            className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-card flex items-center space-x-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Report Emergency</span>
          </Link>
          <Link
            to="/command"
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-card"
          >
            Coordinator Command Center &rarr;
          </Link>
        </div>
      </div>

      {/* Grid: Map + Right Telemetry Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Map View */}
        <div className="lg:col-span-8">
          <OperationalMap
            incidents={incidents}
            resources={resources}
            hospitals={hospitals}
            shelters={shelters}
            reliefHubs={reliefHubs}
            selectedCity="Lahore"
            height="620px"
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        </div>

        {/* Right Active Incidents & Selected Detail Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Incident Card */}
          {selectedIncident && (
            <div className="bg-white rounded-2xl p-5 border border-charcoal-200 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold bg-navy-100 text-navy-800 px-2 py-0.5 rounded font-mono">
                  {selectedIncident.incident_code}
                </span>
                <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                  selectedIncident.priority === 'critical' ? 'bg-emergency-100 text-emergency-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedIncident.priority} Priority
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-navy-950">{selectedIncident.title}</h3>
                <p className="text-xs text-charcoal-600 mt-1 line-clamp-2">{selectedIncident.description}</p>
                <div className="flex items-center space-x-1 text-[11px] text-charcoal-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-emergency-600 flex-shrink-0" />
                  <span className="truncate">{selectedIncident.location_text} ({selectedIncident.city})</span>
                </div>
              </div>

              <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100 text-xs space-y-1">
                <div><strong>Victims:</strong> {selectedIncident.affected_people_count} individuals</div>
                {selectedIncident.vulnerabilities?.infants_count > 0 && (
                  <div className="text-emergency-700 font-semibold">⚠️ {selectedIncident.vulnerabilities.infants_count} Infant Detected</div>
                )}
                {selectedIncident.vulnerabilities?.elderly_count > 0 && (
                  <div className="text-amber-800 font-semibold">⚠️ {selectedIncident.vulnerabilities.elderly_count} Elderly Detected</div>
                )}
              </div>

              <Link
                to={`/track-emergency?code=${selectedIncident.incident_code}`}
                className="block text-center w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs py-2 rounded-xl transition-colors"
              >
                Track Live Rescue Mission &rarr;
              </Link>
            </div>
          )}

          {/* Quick List of Active Queue */}
          <div className="bg-white rounded-2xl p-4 border border-charcoal-200 shadow-card">
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-3">
              Active Regional Incidents ({incidents.length})
            </h4>
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {incidents.slice(0, 7).map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedIncident?.id === inc.id
                      ? 'bg-navy-50 border-navy-400 font-semibold'
                      : 'bg-charcoal-50 border-charcoal-100 hover:bg-charcoal-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-charcoal-500">{inc.incident_code}</span>
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                      inc.priority === 'critical' ? 'bg-emergency-100 text-emergency-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inc.priority}
                    </span>
                  </div>
                  <div className="text-navy-950 truncate text-[11px] font-bold">{inc.title}</div>
                  <div className="text-[10px] text-charcoal-500 mt-0.5">{inc.city} • {inc.affected_people_count} people</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
