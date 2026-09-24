import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Incident, Resource, Hospital, Shelter, ReliefHub } from '../../types';
import { Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const createCustomIcon = (bgColor: string, symbol: string, isPulse: boolean = false) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        ${isPulse ? '<div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: ' + bgColor + '; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
        <div style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 13px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25);">
          ${symbol}
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
};

const iconCritical = createCustomIcon('#D92D20', '!', true);
const iconHigh = createCustomIcon('#F79009', '▲');
const iconMedium = createCustomIcon('#0284C7', '●');
const iconResource = createCustomIcon('#102A43', '⚓');
const iconHospital = createCustomIcon('#039855', '+');
const iconShelter = createCustomIcon('#7C3AED', '⌂');

interface OperationalMapProps {
  incidents: Incident[];
  resources: Resource[];
  hospitals: Hospital[];
  shelters: Shelter[];
  reliefHubs: ReliefHub[];
  selectedCity?: string;
  height?: string;
  onSelectIncident?: (incident: Incident) => void;
}

export const OperationalMap: React.FC<OperationalMapProps> = ({
  incidents,
  resources,
  hospitals,
  shelters,
  selectedCity: initialCity = 'Lahore',
  height = '580px',
  onSelectIncident,
}) => {
  const [activeCity, setActiveCity] = useState(initialCity);
  const [filterType, setFilterType] = useState<string>('all');

  const CITIES_COORDS: Record<string, { lat: number; lng: number; zoom: number }> = {
    Lahore: { lat: 31.5650, lng: 74.3200, zoom: 12 },
    Karachi: { lat: 24.8700, lng: 67.0300, zoom: 11 },
    Rawalpindi: { lat: 33.6000, lng: 73.0600, zoom: 12 },
    Islamabad: { lat: 33.7100, lng: 73.0550, zoom: 12 },
    Multan: { lat: 30.2000, lng: 71.4600, zoom: 12 },
  };

  const center = CITIES_COORDS[activeCity] || CITIES_COORDS.Lahore;

  const filteredIncidents = incidents.filter((inc) => {
    if (filterType === 'all') return true;
    if (filterType === 'critical') return inc.priority === 'critical';
    if (filterType === 'flood') return inc.incident_type === 'flood';
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card relative flex flex-col">
      <div className="p-3 bg-white border-b border-charcoal-200 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {Object.keys(CITIES_COORDS).map((c) => (
            <button
              key={c}
              onClick={() => setActiveCity(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCity === c
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-charcoal-500 font-medium hidden sm:inline flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-charcoal-50 border border-charcoal-200 text-charcoal-800 rounded-lg px-2.5 py-1 text-xs focus:ring-navy-900 font-medium"
          >
            <option value="all">Show All Active Entities</option>
            <option value="critical">Critical Incidents Only</option>
            <option value="flood">Flood Inundation Incidents</option>
          </select>
        </div>
      </div>

      <div style={{ height }} className="w-full relative z-10">
        <MapContainer
          key={`${activeCity}-${center.lat}-${center.lng}`}
          center={[center.lat, center.lng]}
          zoom={center.zoom}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredIncidents.map((inc) => {
            const icon = inc.priority === 'critical' ? iconCritical : inc.priority === 'high' ? iconHigh : iconMedium;
            return (
              <Marker key={inc.id} position={[inc.latitude, inc.longitude]} icon={icon}>
                <Popup>
                  <div className="p-3 max-w-[260px]">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded ${
                        inc.priority === 'critical' ? 'bg-emergency-100 text-emergency-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inc.priority} PRIORITY
                      </span>
                      <span className="text-[11px] font-mono text-charcoal-500">{inc.incident_code}</span>
                    </div>
                    <div className="font-bold text-xs text-navy-950 mb-1">{inc.title}</div>
                    <div className="text-[11px] text-charcoal-600 line-clamp-2 mb-2">{inc.description}</div>
                    <div className="text-[10px] bg-charcoal-50 p-1.5 rounded text-charcoal-700 mb-2 space-y-0.5">
                      <div><strong>Affected:</strong> {inc.affected_people_count} people</div>
                      {inc.vulnerabilities.infants_count > 0 && <div className="text-emergency-700">⚠️ {inc.vulnerabilities.infants_count} Infant Detected</div>}
                      {inc.vulnerabilities.elderly_count > 0 && <div className="text-amber-800">⚠️ {inc.vulnerabilities.elderly_count} Elderly Detected</div>}
                    </div>
                    {onSelectIncident ? (
                      <button
                        onClick={() => onSelectIncident(inc)}
                        className="w-full bg-navy-900 hover:bg-navy-800 text-white font-medium text-[11px] py-1 rounded"
                      >
                        Review Incident in AI Queue
                      </button>
                    ) : (
                      <Link
                        to={`/command?incident=${inc.id}`}
                        className="block text-center w-full bg-navy-900 hover:bg-navy-800 text-white font-medium text-[11px] py-1 rounded"
                      >
                        Inspect Incident &rarr;
                      </Link>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {resources.map((res) => (
            <Marker key={res.id} position={[res.latitude, res.longitude]} icon={iconResource}>
              <Popup>
                <div className="p-3 max-w-[240px]">
                  <div className="text-[10px] uppercase font-bold text-navy-700 bg-navy-50 px-1.5 py-0.5 rounded inline-block mb-1">
                    {res.resource_type.toUpperCase()} UNIT
                  </div>
                  <div className="font-bold text-xs text-navy-950">{res.name}</div>
                  <div className="text-[11px] text-charcoal-600 mt-1">{res.capability}</div>
                  <div className="mt-2 text-[10px] font-semibold flex items-center justify-between">
                    <span className="text-charcoal-600">Status:</span>
                    <span className={res.status === 'available' ? 'text-green-600' : 'text-amber-600'}>
                      {res.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {hospitals.map((hosp) => (
            <Marker key={hosp.id} position={[hosp.latitude, hosp.longitude]} icon={iconHospital}>
              <Popup>
                <div className="p-3 max-w-[240px]">
                  <div className="text-[10px] uppercase font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded inline-block mb-1">
                    HOSPITAL FACILITY
                  </div>
                  <div className="font-bold text-xs text-navy-950">{hosp.name}</div>
                  <div className="text-[11px] text-charcoal-600 mt-1">{hosp.location}</div>
                  <div className="mt-2 text-[10px] bg-charcoal-50 p-1.5 rounded space-y-0.5">
                    <div>Available Beds: <strong>{hosp.available_beds}</strong></div>
                    <div>ICU Beds: <strong>{hosp.icu_beds}</strong> | Vents: <strong>{hosp.ventilators}</strong></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {shelters.map((shelter) => (
            <Marker key={shelter.id} position={[shelter.latitude, shelter.longitude]} icon={iconShelter}>
              <Popup>
                <div className="p-3 max-w-[240px]">
                  <div className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded inline-block mb-1">
                    EVACUATION SHELTER
                  </div>
                  <div className="font-bold text-xs text-navy-950">{shelter.name}</div>
                  <div className="text-[11px] text-charcoal-600 mt-1">{shelter.location}</div>
                  <div className="mt-2 text-[10px] bg-charcoal-50 p-1.5 rounded space-y-0.5">
                    <div>Occupancy: <strong>{shelter.current_occupancy} / {shelter.total_capacity}</strong></div>
                    <div>Food Supply: <strong>{shelter.food_hours_remaining}h</strong></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="bg-charcoal-50 px-4 py-2 border-t border-charcoal-200 flex flex-wrap items-center justify-between text-xs text-charcoal-600 gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emergency-600"></span>
            <span className="text-[11px] font-medium">Critical</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-[11px] font-medium">High</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-navy-900"></span>
            <span className="text-[11px] font-medium">Responders</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
            <span className="text-[11px] font-medium">Hospitals</span>
          </span>
        </div>
      </div>
    </div>
  );
};
