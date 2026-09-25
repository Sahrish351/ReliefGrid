import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Menu,
  X,
  ChevronDown,
  Bell,
  LogOut,
  User,
  ArrowRight,
  Shield,
  Activity,
  Building2,
  LifeBuoy,
  HeartHandshake,
  Sparkles,
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
        return '/portal/ngo';
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
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Logo with generous comfortable spacing */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group mr-8 lg:mr-12 xl:mr-16">
              <div className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center text-white shadow-subtle group-hover:bg-navy-900 transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <circle cx="15" cy="15" r="2.5" fill="#D92D20" stroke="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-navy-950 tracking-tight leading-none group-hover:text-emergency-600 transition-colors">
                  RELIEFGRID
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-charcoal-400 mt-0.5">
                  Humanitarian Network
                </span>
              </div>
            </Link>

            {/* MIDDLE: Primary Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {primaryLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
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
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                    moreDropdownOpen || moreLinks.some((l) => location.pathname === l.path)
                      ? 'text-navy-950 bg-navy-50'
                      : 'text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-50'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
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
                        className={`block px-3 py-2 rounded-xl text-sm transition-colors ${
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

          {/* RIGHT: CTAs & Authentication */}
          <div className="hidden lg:flex items-center space-x-3.5">
            {/* Report Emergency Button (Universal Safety Access) */}
            <Link
              to="/report-emergency"
              className="inline-flex items-center space-x-2 bg-emergency-600 hover:bg-emergency-700 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-card transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Report Emergency</span>
            </Link>

            {/* Authenticated State */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                {/* Go to Portal */}
                <Link
                  to={getPortalPath(user.role)}
                  className="inline-flex items-center space-x-1.5 bg-navy-950 hover:bg-navy-900 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-subtle transition-all"
                >
                  <span>Go to Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-charcoal-100 transition-colors border border-charcoal-200"
                  >
                    <img
                      src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="text-left hidden xl:block pr-1">
                      <div className="text-xs font-bold text-navy-950 line-clamp-1">{user.full_name}</div>
                      <div className="text-[10px] text-charcoal-500 capitalize">{getRoleLabel(user.role)}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-charcoal-500" />
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
                        <Activity className="w-4 h-4 text-emergency-600" />
                        <span>My Operational Portal</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Logged Out State: Strictly Get Started and Sign In */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-charcoal-700 hover:text-navy-950 px-3.5 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center space-x-1.5 bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-subtle transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions: Emergency CTA + Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              to="/report-emergency"
              className="bg-emergency-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-card"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-700 hover:bg-charcoal-100 rounded-xl transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-charcoal-200 px-6 py-6 space-y-6 shadow-xl max-h-[85vh] overflow-y-auto">
          
          {/* Emergency Priority Action */}
          <Link
            to="/report-emergency"
            className="flex items-center justify-between w-full bg-emergency-600 text-white font-bold px-5 py-3.5 rounded-xl text-sm shadow-card"
          >
            <div className="flex items-center space-x-2.5">
              <ShieldAlert className="w-5 h-5" />
              <span>Report Emergency / SOS</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* User state in Mobile */}
          {isAuthenticated && user ? (
            <div className="p-4 rounded-xl bg-navy-50 border border-navy-100 space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                  alt={user.full_name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-navy-950">{user.full_name}</div>
                  <div className="text-xs text-charcoal-500">{user.email}</div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-navy-200 text-navy-950">
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </div>
              <div className="pt-2 flex items-center space-x-2">
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
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-xl border border-charcoal-200 text-sm font-bold text-charcoal-700 hover:bg-charcoal-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-xl bg-navy-950 text-white text-sm font-bold shadow-subtle"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Primary Mobile Navigation */}
          <div className="space-y-1 border-t border-charcoal-100 pt-4">
            <div className="px-2 pb-2 text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-400">
              Primary Navigation
            </div>
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
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
          <div className="space-y-1 border-t border-charcoal-100 pt-4">
            <div className="px-2 pb-2 text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-400">
              Explore Network &amp; Services
            </div>
            {moreLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
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
