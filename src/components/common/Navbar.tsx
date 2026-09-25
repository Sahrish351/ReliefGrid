import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const getPortalPath = (role?: UserRole): string => {
    switch (role) {
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
        return '/portal/organization';
      case 'volunteer':
        return '/portal/volunteer';
      case 'super_admin':
        return '/portal/admin';
      default:
        return '/portal/citizen';
    }
  };

  const getRoleLabel = (role?: UserRole): string => {
    switch (role) {
      case 'emergency_coordinator':
        return 'Coordinator';
      case 'citizen':
        return 'Citizen';
      case 'responder':
        return 'Responder';
      case 'hospital_staff':
        return 'Hospital Staff';
      case 'shelter_manager':
        return 'Shelter Manager';
      case 'organization_admin':
        return 'Relief NGO';
      case 'volunteer':
        return 'Volunteer';
      case 'super_admin':
        return 'Super Admin';
      default:
        return 'User';
    }
  };

  // Primary navigation links strictly matching requirement
  const primaryLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Network', path: '/emergency-map' },
    { label: 'Emergencies', path: '/emergency-types' },
    { label: 'Resources', path: '/resources' },
  ];

  // Secondary items nested under "More ▾"
  const moreLinks = [
    { label: 'Safety', path: '/safety', description: 'Crisis preparedness & evacuation guides' },
    { label: 'Hospitals', path: '/hospitals', description: 'Emergency trauma & ICU bed availability' },
    { label: 'Shelters', path: '/shelters', description: 'Temporary humanitarian housing & capacity' },
    { label: 'AI Technology', path: '/ai-technology', description: 'Agentic workflows & predictive intelligence' },
    { label: 'Impact', path: '/impact', description: 'Verified relief metrics & response data' },
    { label: 'FAQ', path: '/faq', description: 'Operational guidelines & platform questions' },
    { label: 'Contact', path: '/contact', description: 'Emergency coordination desk & inquiries' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-charcoal-200/90 sticky top-0 z-50 transition-all shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 lg:h-[72px]">
          
          {/* LEFT: Logo with comfortable spacing */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 group mr-6 lg:mr-8 xl:mr-12 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-navy-950 flex items-center justify-center text-white shadow-subtle group-hover:bg-navy-900 transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <circle cx="15" cy="15" r="2.5" fill="#D92D20" stroke="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl lg:text-2xl text-navy-950 tracking-tight leading-none group-hover:text-emergency-600 transition-colors whitespace-nowrap">
                  RELIEFGRID
                </span>
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-charcoal-400 mt-0.5 whitespace-nowrap">
                  Humanitarian Network
                </span>
              </div>
            </Link>

            {/* MIDDLE: Primary Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-0.5">
              {primaryLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-navy-950 bg-navy-50 shadow-xs'
                        : 'text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* More ▾ Dropdown */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onMouseEnter={() => setMoreDropdownOpen(true)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all flex items-center space-x-1 whitespace-nowrap ${
                    moreDropdownOpen || moreLinks.some((l) => location.pathname === l.path)
                      ? 'text-navy-950 bg-navy-50'
                      : 'text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreDropdownOpen && (
                  <div
                    onMouseLeave={() => setMoreDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-charcoal-200 shadow-elevated rounded-2xl p-2 z-50 animate-fadeIn"
                  >
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-100 mb-1">
                      Platform Directory
                    </div>
                    {moreLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-3 py-2 rounded-xl text-xs transition-colors ${
                          location.pathname === item.path
                            ? 'bg-navy-50 text-navy-950 font-bold'
                            : 'text-charcoal-700 hover:bg-charcoal-50 hover:text-navy-950'
                        }`}
                      >
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-[11px] text-charcoal-500 font-normal leading-tight">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Compact, Elegant CTA Group (Fits in One Line) */}
          <div className="hidden lg:flex items-center space-x-2.5 flex-shrink-0">
            {/* Compact Report Emergency Button */}
            <Link
              to="/report-emergency"
              className="inline-flex items-center space-x-1.5 bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-bold h-9 px-3.5 rounded-lg text-xs tracking-wide whitespace-nowrap shadow-xs transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">Report Emergency</span>
            </Link>

            {/* Authenticated State */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                {/* Go to Portal */}
                <Link
                  to={getPortalPath(user.role)}
                  className="inline-flex items-center space-x-1.5 bg-navy-950 hover:bg-navy-900 text-white font-semibold h-9 px-3.5 rounded-lg text-xs whitespace-nowrap shadow-xs transition-all"
                >
                  <span className="whitespace-nowrap">Go to Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 h-9 p-1 rounded-lg hover:bg-charcoal-100 transition-colors border border-charcoal-200"
                  >
                    <img
                      src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={user.full_name}
                      className="w-7 h-7 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="text-left hidden xl:block pr-1">
                      <div className="text-xs font-bold text-navy-950 line-clamp-1 whitespace-nowrap">{user.full_name}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 flex-shrink-0" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-charcoal-200 rounded-2xl shadow-elevated p-2 z-50 animate-fadeIn">
                      <div className="px-3 py-2 border-b border-charcoal-100 mb-1">
                        <p className="text-xs font-bold text-navy-950">{user.full_name}</p>
                        <p className="text-[11px] text-charcoal-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-navy-100 text-navy-900">
                          {getRoleLabel(user.role)}
                        </span>
                      </div>

                      <Link
                        to={getPortalPath(user.role)}
                        className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-navy-950 hover:bg-navy-50 rounded-lg transition-colors"
                      >
                        <Activity className="w-4 h-4 text-emergency-600 flex-shrink-0" />
                        <span>My Operational Portal</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 flex-shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Logged Out State: Compact Sign In and Get Started (All on 1 Line) */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center text-xs font-semibold text-charcoal-700 hover:text-navy-950 h-9 px-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center space-x-1 bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-bold h-9 px-3.5 rounded-lg text-xs whitespace-nowrap shadow-xs transition-all"
                >
                  <span className="whitespace-nowrap">Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions: Emergency CTA + Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              to="/report-emergency"
              className="bg-emergency-600 text-white h-9 px-3 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-card whitespace-nowrap"
            >
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>SOS</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-700 hover:bg-charcoal-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-charcoal-200 px-5 py-6 space-y-5 shadow-xl max-h-[85vh] overflow-y-auto">
          
          {/* Emergency Priority Action */}
          <Link
            to="/report-emergency"
            className="flex items-center justify-between w-full bg-emergency-600 text-white font-bold px-4 py-3 rounded-xl text-sm shadow-card"
          >
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Report Emergency</span>
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>

          {/* User state in Mobile */}
          {isAuthenticated && user ? (
            <div className="p-3.5 rounded-xl bg-navy-50 border border-navy-100 space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                  alt={user.full_name}
                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-xs text-navy-950">{user.full_name}</div>
                  <div className="text-[11px] text-charcoal-500">{user.email}</div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-navy-200 text-navy-950">
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </div>
              <div className="pt-1 flex items-center space-x-2">
                <Link
                  to={getPortalPath(user.role)}
                  className="flex-1 bg-navy-950 text-white text-center py-2 rounded-lg text-xs font-bold"
                >
                  Go to Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 border border-charcoal-300 text-charcoal-700 rounded-lg text-xs font-semibold"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-700 hover:bg-charcoal-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-xl bg-navy-950 text-white text-xs font-bold shadow-subtle"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Primary Mobile Navigation */}
          <div className="space-y-1 border-t border-charcoal-100 pt-3">
            <div className="px-2 pb-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal-400">
              Primary Navigation
            </div>
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  location.pathname === link.path
                    ? 'text-navy-950 bg-navy-50 font-bold'
                    : 'text-charcoal-700 hover:text-navy-950 hover:bg-charcoal-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Secondary Mobile Navigation */}
          <div className="space-y-1 border-t border-charcoal-100 pt-3">
            <div className="px-2 pb-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal-400">
              Explore Network &amp; Services
            </div>
            {moreLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-navy-950 bg-navy-50 font-bold'
                    : 'text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
