import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const DemoBanner: React.FC = () => {
  const { switchRole } = useAuth();
  const { resetDemoData } = useData();
  const navigate = useNavigate();

  const handleLaunchScenario = () => {
    switchRole('emergency_coordinator');
    navigate('/command');
  };

  return (
    <div className="bg-navy-950 text-white border-b border-navy-800 text-xs px-4 py-2 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-bold tracking-wider text-amber-400 uppercase text-[11px]">
            SYNTHETIC DEMO DATA — NOT A LIVE EMERGENCY SERVICE
          </span>
          <span className="hidden md:inline text-navy-300">|</span>
          <span className="hidden md:inline text-navy-200">
            Simulated humanitarian operational response across Pakistan
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleLaunchScenario}
            className="inline-flex items-center space-x-1.5 bg-emergency-600 hover:bg-emergency-700 text-white font-medium px-2.5 py-1 rounded-md text-[11px] transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Launch Primary Scenario (18 People Trapped)</span>
          </button>

          <button
            onClick={resetDemoData}
            title="Reset dataset to initial state"
            className="text-navy-300 hover:text-white p-1 rounded transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
