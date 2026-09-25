import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Radio, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-white border-t border-navy-900 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-navy-800 flex items-center justify-center text-white border border-navy-700">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <circle cx="15" cy="15" r="2.5" fill="#D92D20" stroke="none" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">RELIEFGRID AI</span>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed max-w-sm">
              AI-Powered Emergency Response, Rescue &amp; Humanitarian Coordination Platform.
              Connecting citizens, first responders, medical facilities, and relief logistics in one unified ecosystem.
            </p>
            <div className="text-xs text-navy-400 italic">
              "When Every Second Matters, Intelligence Should Move First."
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-300">Public &amp; Help</h4>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link to="/report-emergency" className="hover:text-white transition-colors">Report Emergency</Link></li>
              <li><Link to="/emergency-map" className="hover:text-white transition-colors">Live Response Map</Link></li>
              <li><Link to="/shelters" className="hover:text-white transition-colors">Find Shelters</Link></li>
              <li><Link to="/hospitals" className="hover:text-white transition-colors">Find Hospital Capacity</Link></li>
              <li><Link to="/missing-person" className="hover:text-white transition-colors">Missing Persons</Link></li>
              <li><Link to="/safety" className="hover:text-white transition-colors">Safety Center</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-300">Operational Hubs</h4>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link to="/command" className="hover:text-white transition-colors flex items-center space-x-1"><Radio className="w-3.5 h-3.5 text-emergency-500" /><span>Command Center</span></Link></li>
              <li><Link to="/responder" className="hover:text-white transition-colors">Responder Portal</Link></li>
              <li><Link to="/hospital" className="hover:text-white transition-colors">Hospital Emergency</Link></li>
              <li><Link to="/shelter" className="hover:text-white transition-colors">Shelter Intake</Link></li>
              <li><Link to="/organization" className="hover:text-white transition-colors">Relief Logistics</Link></li>
              <li><Link to="/volunteer" className="hover:text-white transition-colors">Volunteer Corps</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-300">Regional Footprint</h4>
            <ul className="space-y-1.5 text-xs text-navy-300">
              <li className="flex items-center space-x-1.5"><MapPin className="w-3 h-3 text-amber-400" /><span>Lahore (Ravi Basin)</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3 h-3 text-amber-400" /><span>Karachi (Coastal Zone)</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3 h-3 text-amber-400" /><span>Rawalpindi (Nullah Lai)</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3 h-3 text-amber-400" /><span>Islamabad (Federal HQ)</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3 h-3 text-amber-400" /><span>Multan (Chenab Sector)</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-navy-400 gap-4">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-700 text-amber-400 font-semibold text-[11px]">
              SYNTHETIC DEMO PLATFORM
            </span>
            <span>All emergency events and clinical metrics are simulated.</span>
          </div>

          <div className="flex items-center space-x-6 text-navy-300">
            <Link to="/about" className="hover:text-white">About Project</Link>
            <Link to="/resources" className="hover:text-white">API &amp; Docs</Link>
            <Link to="/faq" className="hover:text-white">FAQ</Link>
            <span>&copy; {new Date().getFullYear()} RELIEFGRID AI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

