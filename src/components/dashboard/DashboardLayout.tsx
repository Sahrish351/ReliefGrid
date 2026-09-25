import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Radio,
  Users,
  LifeBuoy,
  Activity,
  Building2,
  HeartHandshake,
  UserCheck,
  Lock,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  LogOut,
  ShieldAlert,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const { user, role, switchRole, logout } = useAuth();
  const { incidents, notifications } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const ROLE_CONFIG: Record<
    UserRole,
    {
      title: string;
      department: string;
      badgeColor: string;
      primaryRoute: string;
      icon: any;
      nav: { label: string; path: string; icon: any; badge?: string }[];
    }
  > = {
    emergency_coordinator: {
      title: 'Emergency Coordinator',
      department: 'Provincial Disaster Management Authority (PDMA)',
      badgeColor: 'bg-red-500/10 text-red-700 border-red-200',
      primaryRoute: '/portal/coordinator',
      icon: Radio,
      nav: [
        { label: 'Command Center', path: '/portal/coordinator', icon: Radio },
        { label: 'Live Operational Map', path: '/emergency-map', icon: MapPin },
        { label: 'Find Shelters', path: '/shelters', icon: Building2 },
        { label: 'Emergency Hospitals', path: '/hospitals', icon: Activity },
        { label: 'NGO Relief Operations', path: '/portal/ngo', icon: HeartHandshake },
        { label: 'Global Audit & RBAC', path: '/portal/admin', icon: Lock },
      ],
    },
    citizen: {
      title: 'Citizen Responder',
      department: 'Community Emergency Network',
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-200',
      primaryRoute: '/portal/citizen',
      icon: Users,
      nav: [
        { label: 'My Emergency Portal', path: '/portal/citizen', icon: Users },
        { label: 'Report Emergency Aid', path: '/report-emergency', icon: ShieldAlert, badge: 'SOS' },
        { label: 'Track My Rescue', path: '/track-emergency', icon: Clock },
        { label: 'Emergency Map', path: '/emergency-map', icon: MapPin },
        { label: 'Find Nearby Shelter', path: '/shelters', icon: Building2 },
        { label: 'Find Open Hospital', path: '/hospitals', icon: Activity },
        { label: 'Missing Persons Registry', path: '/missing-person', icon: Users },
      ],
    },
    responder: {
      title: 'Rescue Responder',
      department: 'Rescue 1122 Tactical Unit Console',
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-200',
      primaryRoute: '/portal/responder',
      icon: LifeBuoy,
      nav: [
        { label: 'Rescue Mission Queue', path: '/portal/responder', icon: LifeBuoy },
        { label: 'Live Grid Map', path: '/emergency-map', icon: MapPin },
        { label: 'Hospital Handover', path: '/portal/hospital', icon: Activity },
        { label: 'Shelter Evacuations', path: '/portal/shelter', icon: Building2 },
      ],
    },
    hospital_staff: {
      title: 'Hospital Trauma Staff',
      department: 'Mayo Hospital Emergency Trauma Center',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
      primaryRoute: '/portal/hospital',
      icon: Activity,
      nav: [
        { label: 'Trauma & Bed Center', path: '/portal/hospital', icon: Activity },
        { label: 'Ambulance Pre-Alerts', path: '/portal/coordinator', icon: Radio },
        { label: 'Public Hospital Directory', path: '/hospitals', icon: MapPin },
      ],
    },
    shelter_manager: {
      title: 'Shelter Director',
      department: 'Shahdara Relief Camp #4 Operations',
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-200',
      primaryRoute: '/portal/shelter',
      icon: Building2,
      nav: [
        { label: 'Camp Management Console', path: '/portal/shelter', icon: Building2 },
        { label: 'Supply Chain & NGO Aid', path: '/portal/ngo', icon: HeartHandshake },
        { label: 'Public Shelter Directory', path: '/shelters', icon: MapPin },
      ],
    },
    organization_admin: {
      title: 'Relief Organization Admin',
      department: 'Edhi International Humanitarian Logistics',
      badgeColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-200',
      primaryRoute: '/portal/ngo',
      icon: HeartHandshake,
      nav: [
        { label: 'NGO Operations Console', path: '/portal/ngo', icon: HeartHandshake },
        { label: 'Field Volunteers Registry', path: '/portal/volunteer', icon: UserCheck },
        { label: 'Command Coordination', path: '/portal/coordinator', icon: Radio },
      ],
    },
    volunteer: {
      title: 'Volunteer Specialist',
      department: 'Flood Rescue & First Aid Division',
      badgeColor: 'bg-teal-500/10 text-teal-700 border-teal-200',
      primaryRoute: '/portal/volunteer',
      icon: UserCheck,
      nav: [
        { label: 'Volunteer Console', path: '/portal/volunteer', icon: UserCheck },
        { label: 'Field Missions Map', path: '/emergency-map', icon: MapPin },
        { label: 'Safety Protocols', path: '/safety', icon: ShieldAlert },
      ],
    },
    super_admin: {
      title: 'Super Administrator',
      department: 'RELIEFGRID Global Control Room',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
      primaryRoute: '/portal/admin',
      icon: Lock,
      nav: [
        { label: 'Admin Command Matrix', path: '/portal/admin', icon: Lock },
        { label: 'Coordinator Console', path: '/portal/coordinator', icon: Radio },
        { label: 'Live Network Telemetry', path: '/emergency-map', icon: MapPin },
        { label: 'Field Responder Hub', path: '/portal/responder', icon: LifeBuoy },
        { label: 'Medical Operations', path: '/portal/hospital', icon: Activity },
        { label: 'Shelter Network', path: '/portal/shelter', icon: Building2 },
      ],
    },
  };

  const currentConfig = ROLE_CONFIG[role] || ROLE_CONFIG.emergency_coordinator;
  const RoleIcon = currentConfig.icon;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if query matches incident ID directly
    const trimmed = searchQuery.trim().toLowerCase();
    const matchedIncident = incidents.find(
      (inc) =>
        inc.id.toLowerCase() === trimmed ||
        inc.title.toLowerCase().includes(trimmed) ||
        (inc.location_text || inc.location_name || '').toLowerCase().includes(trimmed)
    );

    if (matchedIncident) {
      navigate(`/portal/incident/${matchedIncident.id}`);
    } else {
      // Default to first active incident or navigate to command center with query
      navigate(`/portal/coordinator?q=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery('');
  };

  const criticalIncidentsCount = incidents.filter((i) => i.priority === 'critical').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-charcoal-900 flex flex-col font-sans">
      
      {/* Top Operational Status Ribbon */}
      <div className="bg-navy-950 text-white text-[11px] px-4 sm:px-6 py-1.5 flex items-center justify-between border-b border-navy-900">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            LIVE GRID OPERATIONAL
          </span>
          <span className="hidden md:inline text-navy-400">|</span>
          <span className="hidden md:inline text-navy-200">
            Sector: <strong>Punjab Ravi Basin Flood Zone A-1</strong>
          </span>
          <span className="hidden lg:inline text-navy-400">|</span>
          <span className="hidden lg:inline text-navy-300">
            AI Orchestration: <strong>Gemini 2.5 Flash Autonomous Agents Active</strong>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-emergency-400 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{criticalIncidentsCount} Critical Emergencies</span>
          </div>
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1 text-navy-300 hover:text-white transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Operational Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-navy-950 text-white transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col justify-between border-r border-navy-900 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Brand Header */}
            <div className="p-5 border-b border-navy-900 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emergency-600 flex items-center justify-center text-white shadow-card">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                    <span>RELIEFGRID</span>
                    <span className="text-[10px] font-bold bg-navy-800 text-white px-1.5 py-0.2 rounded">AI</span>
                  </div>
                  <div className="text-[10px] tracking-wider uppercase text-navy-400 font-mono">
                    Tactical Operations
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-navy-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active Persona & Division Card */}
            <div className="p-4 mx-4 mt-4 bg-navy-900/80 rounded-2xl border border-navy-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-400">
                  Active Console Role
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-amber-400 border border-navy-700">
                  <RoleIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{currentConfig.title}</div>
                  <div className="text-[10px] text-navy-300 truncate">{currentConfig.department}</div>
                </div>
              </div>

              {/* Role Quick Switch Trigger for Evaluators */}
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="w-full mt-2 py-1.5 px-2 bg-navy-800 hover:bg-navy-750 text-[11px] font-semibold text-navy-200 rounded-lg flex items-center justify-between transition-colors border border-navy-700"
              >
                <span>Switch Console Persona</span>
                <ChevronDown className="w-3.5 h-3.5 text-navy-400" />
              </button>

              {roleSwitcherOpen && (
                <div className="space-y-1 pt-2 border-t border-navy-800">
                  {(Object.keys(ROLE_CONFIG) as UserRole[]).map((r) => {
                    const cfg = ROLE_CONFIG[r];
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setRoleSwitcherOpen(false);
                          navigate(cfg.primaryRoute);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          role === r ? 'bg-navy-800 text-white font-bold' : 'text-navy-300 hover:bg-navy-850 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <Icon className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                          <span className="truncate">{cfg.title}</span>
                        </div>
                        {role === r && <span className="text-[9px] bg-emerald-900/60 text-emerald-300 px-1 rounded">Active</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation Links Tailored to Active Role */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-navy-400">
                Navigation & Modules
              </div>
              {currentConfig.nav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-navy-850 text-white font-semibold border-l-4 border-emergency-500 pl-2.5 shadow-sm'
                        : 'text-navy-300 hover:bg-navy-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emergency-400' : 'text-navy-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold bg-emergency-600 text-white px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-navy-400">
                System Quick Jumps
              </div>
              <Link
                to="/portal/incident/inc-demo-primary"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-navy-300 hover:bg-navy-900 hover:text-white transition-all"
              >
                <Layers className="w-4 h-4 text-navy-400" />
                <span>Incident Inspector</span>
              </Link>
              <Link
                to="/report-emergency"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-emergency-400 hover:bg-emergency-950/40 transition-all font-semibold"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Report Critical Emergency</span>
              </Link>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-navy-900 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 truncate">
                  <div className="w-7 h-7 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-xs font-bold text-navy-200">
                    {user?.full_name ? user.full_name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-white truncate text-[11px]">
                      {user?.full_name || 'Operational User'}
                    </div>
                    <div className="text-[10px] text-navy-400 truncate">{user?.email || 'authenticated'}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 text-navy-400 hover:text-red-400 hover:bg-navy-900 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-navy-400 pt-1 border-t border-navy-900/60">
                <span>ReliefGrid AI v2.5</span>
                <Link to="/" className="text-navy-300 hover:underline flex items-center gap-1">
                  Public Website &rarr;
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for Mobile Sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 lg:hidden"
          ></div>
        )}

        {/* Main Content Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Operational Header Bar */}
          <header className="bg-white border-b border-charcoal-200 sticky top-0 z-30 shadow-subtle px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-charcoal-700 hover:bg-charcoal-100 rounded-xl"
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-bold font-heading text-navy-950 truncate">
                  {title || currentConfig.title}
                </h1>
                {subtitle && <p className="text-xs text-charcoal-500 truncate">{subtitle}</p>}
              </div>
            </div>

            {/* Incident Fast Lookup Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick lookup incident ID (e.g. inc-demo-primary), unit or sector..."
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-1.5 pl-9 pr-3 text-xs focus:ring-2 focus:ring-navy-900 focus:bg-white outline-none transition-all"
                />
              </div>
            </form>

            {/* Right Tools: Role Badge, Notifications & Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Evaluator Role Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${currentConfig.badgeColor}`}
                >
                  <RoleIcon className="w-3.5 h-3.5" />
                  <span>{currentConfig.title}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>
              </div>

              {/* Real-time Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-charcoal-600 hover:text-navy-950 hover:bg-charcoal-100 rounded-xl relative transition-colors"
                  title="Notifications & Alerts"
                >
                  <Bell className="w-4 h-4" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-emergency-600 rounded-full ring-2 ring-white"></span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-charcoal-200 rounded-2xl shadow-elevated p-4 z-50 space-y-3">
                    <div className="flex items-center justify-between border-b border-charcoal-100 pb-2">
                      <div className="font-bold text-xs text-navy-950 flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-navy-700" />
                        <span>Live Operational Stream ({notifications.length})</span>
                      </div>
                      <span className="text-[10px] text-charcoal-500">Auto-synced</span>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-xl bg-charcoal-50 hover:bg-navy-50 border border-charcoal-100 text-xs transition-colors"
                        >
                          <div className="flex items-center justify-between font-semibold text-navy-950 mb-0.5">
                            <span className="truncate">{n.title}</span>
                            <span className="text-[10px] text-charcoal-400 shrink-0">Just now</span>
                          </div>
                          <p className="text-[11px] text-charcoal-600">{n.message}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/portal/incident/inc-demo-primary"
                      onClick={() => setNotificationsOpen(false)}
                      className="block text-center text-xs font-bold text-navy-900 hover:underline pt-1"
                    >
                      View All Incident Telemetry &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* User Profile Pill & Logout */}
              <div className="flex items-center space-x-2 pl-2 border-l border-charcoal-200">
                <div className="w-8 h-8 rounded-full bg-navy-950 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {user?.full_name ? user.full_name[0].toUpperCase() : 'U'}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-navy-950 truncate max-w-[120px]">
                    {user?.full_name || 'Tariq Mehmood'}
                  </div>
                  <div className="text-[10px] text-charcoal-400 capitalize">{role.replace('_', ' ')}</div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-charcoal-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          </header>

          {/* Page Workspace Body */}
          <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

