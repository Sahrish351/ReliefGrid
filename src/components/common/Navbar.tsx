import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Menu,
  X,
  ChevronDown,
  UserCheck,
  Radio,
  Building2,
  HeartHandshake,
  Activity,
  Users,
  Lock,
  LifeBuoy,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const { role, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const ROLE_OPTIONS: { role: UserRole; label: string; portalPath: string; icon: any }[] = [
    { role: 'emergency_coordinator', label: 'Emergency Coordinator', portalPath: '/command', icon: Radio },
    { role: 'citizen', label: 'Citizen', portalPath: '/app', icon: Users },
    { role: 'responder', label: 'Rescue Responder', portalPath: '/responder', icon: LifeBuoy },
    { role: 'hospital_staff', label: 'Hospital Staff', portalPath: '/hospital', icon: Activity },
    { role: 'shelter_manager', label: 'Shelter Manager', portalPath: '/shelter', icon: Building2 },
    { role: 'organization_admin', label: 'NGO / Relief Admin', portalPath: '/organization', icon: HeartHandshake },
    { role: 'volunteer', label: 'Volunteer', portalPath: '/volunteer/dashboard', icon: UserCheck },
    { role: 'super_admin', label: 'Super Admin', portalPath: '/admin', icon: Lock },
  ];

  const currentRoleConfig = ROLE_OPTIONS.find((r) => r.role === role) || ROLE_OPTIONS[0];

  const navLinks = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Live Network', path: '/emergency-map' },
    { label: 'Emergency Types', path: '/emergency-types' },
    { label: 'Find Shelter', path: '/shelters' },
    { label: 'Find Hospital', path: '/hospitals' },
    { label: 'Missing Persons', path: '/missing-person' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'Safety Center', path: '/safety' },
    { label: 'Impact', path: '/impact' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-charcoal-200 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-subtle group-hover:bg-navy-800 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
                <circle cx="15" cy="15" r="2.5" fill="#D92D20" stroke="none" />
              </svg>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="font-heading font-extrabold text-xl text-navy-950 tracking-tight">RELIEFGRID</span>
              <span className="text-xs font-bold bg-navy-100 text-navy-900 px-1.5 py-0.5 rounded tracking-wide font-sans">AI</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-navy-950 bg-navy-50 font-semibold'
                    : 'text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group">
              <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50 flex items-center space-x-1">
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-white border border-charcoal-200 shadow-elevated rounded-xl py-2 mt-1 z-50">
                {navLinks.slice(6).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 text-sm text-charcoal-700 hover:bg-navy-50 hover:text-navy-950 font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-charcoal-100 my-1"></div>
                <Link to="/ai-technology" className="block px-4 py-2 text-sm text-charcoal-700 hover:bg-navy-50 hover:text-navy-950 font-medium">
                  AI &amp; Agent Architecture
                </Link>
                <Link to="/resources" className="block px-4 py-2 text-sm text-charcoal-700 hover:bg-navy-50 hover:text-navy-950 font-medium">
                  Resources &amp; Docs
                </Link>
                <Link to="/faq" className="block px-4 py-2 text-sm text-charcoal-700 hover:bg-navy-50 hover:text-navy-950 font-medium">
                  FAQ
                </Link>
                <Link to="/contact" className="block px-4 py-2 text-sm text-charcoal-700 hover:bg-navy-50 hover:text-navy-950 font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-navy-50 hover:bg-navy-100 text-navy-900 border border-navy-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-semibold text-navy-950">{currentRoleConfig.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-navy-600" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-charcoal-200 rounded-xl shadow-elevated py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-100">
                    Switch Demo Persona
                  </div>
                  {ROLE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.role}
                        onClick={() => {
                          switchRole(opt.role);
                          setRoleDropdownOpen(false);
                          navigate(opt.portalPath);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-navy-50 text-xs transition-colors ${
                          role === opt.role ? 'bg-navy-50/80 text-navy-900 font-semibold' : 'text-charcoal-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className="w-4 h-4 text-navy-700" />
                          <span>{opt.label}</span>
                        </div>
                        {role === opt.role && <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">Active</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to={currentRoleConfig.portalPath}
              className="text-xs font-semibold text-navy-800 hover:text-navy-950 bg-charcoal-100 hover:bg-charcoal-200 px-3 py-2 rounded-lg transition-colors"
            >
              Open Dashboard
            </Link>

            <Link
              to="/report-emergency"
              className="inline-flex items-center space-x-1.5 bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-medium px-4 py-2 rounded-xl text-xs shadow-card transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Report Emergency</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              to="/report-emergency"
              className="bg-emergency-600 text-white p-2 rounded-lg"
              title="Report Emergency"
            >
              <ShieldAlert className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-700 hover:bg-charcoal-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
