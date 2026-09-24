import React, { useState } from 'react';
import { Building2, MapPin, Users, Droplets, Utensils, HeartPulse, Check, Filter, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FindShelter: React.FC = () => {
  const { shelters } = useData();
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [familyOnly, setFamilyOnly] = useState<boolean>(false);

  const filteredShelters = shelters.filter((s) => {
    if (selectedCity !== 'All' && s.city !== selectedCity) return false;
    if (familyOnly && !s.family_area) return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) && !s.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Building2 className="w-3.5 h-3.5 text-purple-700" />
          <span>Shelter &amp; Evacuation Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
          Find Safe Evacuation Shelters
        </h1>
        <p className="text-charcoal-600 text-sm mt-2">
          Real-time shelter capacity, remaining drinking water, food hours, and accessibility accommodations across Pakistan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by shelter name or locality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-transparent focus:outline-none text-charcoal-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-charcoal-500 font-semibold">City:</span>
            {['All', 'Lahore', 'Karachi', 'Rawalpindi', 'Islamabad', 'Multan'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedCity === c ? 'bg-navy-900 text-white' : 'bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="flex items-center space-x-2 text-xs font-medium text-charcoal-700 cursor-pointer pl-2 border-l border-charcoal-200">
            <input
              type="checkbox"
              checked={familyOnly}
              onChange={(e) => setFamilyOnly(e.target.checked)}
              className="rounded text-navy-900 focus:ring-navy-900"
            />
            <span>Family / Infant Areas Only</span>
          </label>
        </div>

      </div>

      {/* Shelters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShelters.map((shelter) => {
          const occupancyRate = Math.round((shelter.current_occupancy / shelter.total_capacity) * 100);
          const isNearCap = occupancyRate >= 80;

          return (
            <div
              key={shelter.id}
              className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 flex flex-col justify-between hover:shadow-elevated transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-navy-700 bg-navy-50 px-2 py-0.5 rounded">
                    {shelter.city}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    shelter.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {shelter.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="font-bold text-base text-navy-950 mb-1">{shelter.name}</h3>
                <div className="flex items-center space-x-1.5 text-xs text-charcoal-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-charcoal-400" />
                  <span className="truncate">{shelter.location}</span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1.5 mb-5 bg-charcoal-50 p-3 rounded-xl border border-charcoal-100">
                  <div className="flex justify-between text-xs font-semibold text-charcoal-700">
                    <span>Occupancy</span>
                    <span>{shelter.current_occupancy} / {shelter.total_capacity} ({occupancyRate}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-charcoal-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isNearCap ? 'bg-amber-500' : 'bg-green-600'
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-charcoal-500 text-right">
                    {shelter.total_capacity - shelter.current_occupancy} available spots
                  </div>
                </div>

                {/* Supplies Gauges */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100 flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-charcoal-400">Drinking Water</div>
                      <div className="font-bold text-charcoal-800">{shelter.water_hours_remaining} Hours</div>
                    </div>
                  </div>

                  <div className="bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-100 flex items-center space-x-2">
                    <Utensils className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-charcoal-400">Food Rations</div>
                      <div className="font-bold text-charcoal-800">{shelter.food_hours_remaining} Hours</div>
                    </div>
                  </div>
                </div>

                {/* Amenity Badges */}
                <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-charcoal-600 mb-4">
                  {shelter.family_area && <span className="bg-charcoal-100 px-2 py-0.5 rounded">Family Quarters</span>}
                  {shelter.medical_support && <span className="bg-charcoal-100 px-2 py-0.5 rounded">Medical Desk</span>}
                  {shelter.accessibility_support && <span className="bg-charcoal-100 px-2 py-0.5 rounded">Wheelchair Access</span>}
                </div>
              </div>

              <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs">
                <span className="text-charcoal-400 text-[11px]">Free emergency admission</span>
                <button
                  onClick={() => alert(`Directions for ${shelter.name}: Located at ${shelter.location}. Emergency hotline available.`)}
                  className="font-bold text-navy-900 hover:text-emergency-600 transition-colors"
                >
                  Get Directions &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
