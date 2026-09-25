import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  LogOut,
  User,
  Shield,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  // Primary navigation items requested in specification
  const primaryLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Network', path: '/emergency-map' },
    { label: 'Emergencies', path: '/emergency-types' },
    { label: 'Resources', path: '/resources' },
  ];

  // Secondary items in the "More ▾" dropdown
  const moreLinks = [
    { label: 'Safety Center', path: '/safety', desc: 'Evacuation guidelines & preparedness' },
    { label: 'Hospitals', path: '/hospitals', desc: 'Live trauma & ICU capacity directory' },
    { label: 'Shelters', path: '/shelters', desc: 'Emergency accommodation & rations' },
    { label: 'AI Technology', path: '/ai-technology', desc: 'Autonomous triage & dispatch architecture' },
    { label: 'Impact', path: '/impact', desc: 'Operational metrics & humanitarian reach' },
    { label: 'FAQ', path: '/faq', desc: 'Frequently asked technical & public questions' },
    { label: 'Contact', path: '/contact', desc: 'Humanitarian response desk & coordination' },
  ];

  // Portal routing mapping based on user role
  const getPortalRoute = (userRole: UserRole): string => {
    switch (userRole) {
      case 'emergency_coordinator':
        return '/portal/coordinator';
      case 'citizen':
        return '/portal/citizen';
      case 'responder':
        return '/portal/responder';
      case 'hospital_staff':
        return '/portal/hospital';
      case 'shelter_manager':
        return '/portal/shelter';
      case 'organization_admin':
        return '/portal/ngo';
      case 'volunteer':
        return '/portal/volunteer';
      case 'super_admin':
        return '/portal/admin';
      default:
        return '/portal/citizen';
    }
  };

  const currentPortalPath = getPortalRoute(user?.role || role || 'citizen');

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-charcoal-200/80 sticky top-0 z-40 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: RELIEFGRID Logo with generous right margin */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group mr-8 lg:mr-12">
              <div className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center text-white shadow-subtle group-hover:bg-navy-900 transition-colors">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <circle cx="15" cy="15" r="2.5" fill="#D92D20" stroke="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-navy-950 tracking-tight leading-none">
                  RELIEFGRID
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-charcoal-400 font-mono mt-0.5">
                  Humanitarian Coordination
                </span>
              </div>
            </Link>
          </div>

          {/* MIDDLE: Desktop Navigation with comfortable horizontal spacing */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {primaryLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-navy-950 font-bold bg-charcoal-100/70 shadow-xs'
                      : 'text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* "More ▾" Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center space-x-1.5 transition-all ${
                  moreDropdownOpen
                    ? 'text-navy-950 bg-charcoal-100 font-semibold'
                    : 'text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50'
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180 text-navy-950' : 'text-charcoal-400'
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-charcoal-200/90 rounded-2xl shadow-elevated p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-100 mb-1">
                    Platform & Resources
                  </div>
                  {moreLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-navy-50 text-navy-950 font-semibold'
                            : 'hover:bg-charcoal-50 text-charcoal-700'
                        }`}
                      >
                        <div className="text-xs font-semibold text-navy-950">{link.label}</div>
                        <div className="text-[11px] text-charcoal-500 leading-snug">{link.desc}</div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Clear Authentication CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              // LOGGED-IN STATE
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-navy-950 text-white flex items-center justify-center font-bold text-[10px]">
                    {user.full_name ? user.full_name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="truncate max-w-[120px] font-semibold text-navy-950 text-xs">
                    {user.full_name || 'Authenticated'}
                  </div>
                </div>

                <Link
                  to={currentPortalPath}
                  className="inline-flex items-center space-x-2 bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-card transition-all"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Go to Portal</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-charcoal-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // LOGGED-OUT STATE: Clear primary authentication entry point
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-charcoal-700 hover:text-navy-950 px-3 py-2 rounded-xl transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-card transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-navy-950 hover:bg-charcoal-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE FULL DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-charcoal-200 px-4 py-6 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 px-3 pb-1">
              Primary Navigation
            </div>
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-navy-50 text-navy-950 font-bold'
                    : 'text-charcoal-700 hover:bg-charcoal-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-charcoal-100 pt-4 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 px-3 pb-1">
              Safety, Facilities & Platform
            </div>
            {moreLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-xs font-medium ${
                  location.pathname === link.path
                    ? 'bg-navy-50 text-navy-950 font-semibold'
                    : 'text-charcoal-600 hover:bg-charcoal-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="border-t border-charcoal-100 pt-4">
            {user ? (
              <div className="space-y-2">
                <Link
                  to={currentPortalPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-navy-950 text-white font-bold py-3 rounded-xl text-center text-sm shadow-card flex items-center justify-center space-x-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>Go to My Portal</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-navy-950 text-white font-bold py-3.5 rounded-xl text-center text-sm shadow-card flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block bg-charcoal-100 hover:bg-charcoal-200 text-navy-950 font-semibold py-2.5 rounded-xl text-center text-xs"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
