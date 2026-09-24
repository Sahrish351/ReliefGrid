import React, { useState } from 'react';
import { Package, Truck, ArrowRight, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const OrganizationPortal: React.FC = () => {
  const { inventory, transferInventory } = useData();
  const [transferred, setTransferred] = useState(false);

  const handleTransfer = (itemId: string, qty: number, zone: string) => {
    transferInventory(itemId, qty, zone);
    setTransferred(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200 shadow-card flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5 text-amber-700" />
            <span>Humanitarian Logistics &amp; NGO Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-950">
            Relief Inventory &amp; Distribution Portal
          </h1>
          <p className="text-xs text-charcoal-500">
            Managing Central Humanitarian Logistics Cache (Edhi Foundation &amp; Red Crescent Federation)
          </p>
        </div>
      </div>

      {/* AI Logistics Recommendation Box (02_RELIEFGRID_AGENTIC_AI.md section 11) */}
      <div className="bg-navy-950 text-white rounded-2xl p-6 border border-navy-800 shadow-elevated space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Truck className="w-4 h-4" />
          <span>AI Logistics Optimization Recommendation (Agent 8)</span>
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-base">
            Transfer 5,000 Liters Drinking Water from Lahore Central Depot &rarr; Multan Chenab Sector
          </h3>
          <p className="text-xs text-navy-300 leading-relaxed max-w-3xl">
            <strong>Urgency Rationale:</strong> Water pipeline contamination in Mochipura (Multan) has created a deficit for 150 families. Lahore Depot currently maintains 24,000L buffer (19,000L above critical threshold). High-capacity transport carrier T-01 is available.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs font-mono text-navy-400">Shortage Window Avoided: 9.4 Hours</span>
          <button
            onClick={() => handleTransfer('inv-1', 5000, 'Multan Mochipura')}
            className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-card transition-all active:scale-95"
          >
            Authorize 5,000L Inter-Hub Transfer &rarr;
          </button>
        </div>
      </div>

      {transferred && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
          <span>Inter-hub transport manifest dispatched. Inventory balance adjusted.</span>
        </div>
      )}

      {/* Real-time Inventory Table */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card p-6 space-y-4">
        <h3 className="font-bold text-base text-navy-950">Provincial Relief Inventory Reserves</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-50 text-charcoal-600 uppercase font-mono text-[10px] border-b border-charcoal-200">
              <tr>
                <th className="py-3 px-4">Supply Category</th>
                <th className="py-3 px-4">Cache Location</th>
                <th className="py-3 px-4">Quantity on Hand</th>
                <th className="py-3 px-4">Min Threshold</th>
                <th className="py-3 px-4">Reserve Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100 text-charcoal-700">
              {inventory.map((item) => {
                const isLow = item.quantity <= item.minimum_threshold;
                return (
                  <tr key={item.id} className="hover:bg-charcoal-50/50">
                    <td className="py-3 px-4 font-bold text-navy-950 capitalize">
                      {item.resource_category.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3 px-4">{item.hub_name || 'Lahore Depot'}</td>
                    <td className="py-3 px-4 font-mono font-bold text-navy-900">
                      {item.quantity.toLocaleString()} {item.unit}
                    </td>
                    <td className="py-3 px-4 font-mono text-charcoal-400">
                      {item.minimum_threshold.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        isLow ? 'bg-emergency-100 text-emergency-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {isLow ? 'Critical Low' : 'Optimal'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
