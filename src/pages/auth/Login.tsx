import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { IMAGES, handleImageError } from '../../config/images';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('coordinator@reliefgrid.ai');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('emergency_coordinator');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ROLE_EMAILS: Record<UserRole, string> = {
    emergency_coordinator: 'coordinator@reliefgrid.ai',
    citizen: 'citizen@reliefgrid.ai',
    responder: 'responder@reliefgrid.ai',
    hospital_staff: 'hospital@reliefgrid.ai',
    shelter_manager: 'shelter@reliefgrid.ai',
    organization_admin: 'ngo@reliefgrid.ai',
    volunteer: 'volunteer@reliefgrid.ai',
    super_admin: 'admin@reliefgrid.ai',
  };

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole);
    setEmail(ROLE_EMAILS[newRole] || 'coordinator@reliefgrid.ai');
    setPassword('password123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await login(email, password, selectedRole);
    setIsLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    // Role-based portal redirect strictly conforming to requirement
    switch (selectedRole) {
      case 'emergency_coordinator':
        navigate('/portal/coordinator');
        break;
      case 'citizen':
        navigate('/portal/citizen');
        break;
      case 'responder':
        navigate('/portal/responder');
        break;
      case 'hospital_staff':
        navigate('/portal/hospital');
        break;
      case 'shelter_manager':
        navigate('/portal/shelter');
        break;
      case 'organization_admin':
        navigate('/portal/organization');
        break;
      case 'volunteer':
        navigate('/portal/volunteer');
        break;
      case 'super_admin':
        navigate('/portal/admin');
        break;
      default:
        navigate('/portal/citizen');
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      
      {/* Left Column: Authentic Humanitarian Photography (Editorial Split on Desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-navy-950 overflow-hidden">
        <img
          src={IMAGES.commandCenter}
          alt="Emergency coordinator command center"
          onError={handleImageError}
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent"></div>

        <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>AUTHORIZED ACCESS PORTAL</span>
          </div>
          <h2 className="text-3xl font-black font-heading tracking-tight leading-tight">
            One Unified Operating System for Disaster Coordination.
          </h2>
          <p className="text-navy-200 text-xs sm:text-sm leading-relaxed max-w-md">
            Connecting emergency coordinators, rescue boat squads, hospital trauma centers, and shelter hubs across Pakistan under strict human-in-the-loop governance.
          </p>
          <div className="pt-2 flex items-center space-x-4 text-[11px] text-navy-300 font-mono">
            <span>&bull; Role-Based Access Control</span>
            <span>&bull; 256-Bit Transport Encryption</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white min-h-screen">
        <div className="max-w-md w-full space-y-7">
          
          {/* Logo Mark */}
          <div>
            <Link to="/" className="inline-flex items-center space-x-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-navy-950 flex items-center justify-center text-white shadow-xs group-hover:bg-navy-900 transition-colors">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <circle cx="15" cy="15" r="2.5" fill="#D92D20" stroke="none" />
                </svg>
              </div>
              <span className="font-heading font-black text-2xl text-navy-950 tracking-tight group-hover:text-emergency-600 transition-colors">
                RELIEFGRID
              </span>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-black font-heading text-navy-950 tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Sign in to continue to RELIEFGRID.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Role Profile Selector (Demo helper allowing test of all 8 roles) */}
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Operational Role Profile
              </label>
              <select
                value={selectedRole}
                onChange={(e: any) => handleRoleChange(e.target.value as UserRole)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-navy-950 focus:outline-none focus:border-navy-950"
              >
                <option value="emergency_coordinator">Emergency Coordinator (Command Center)</option>
                <option value="citizen">Citizen (Help Request &amp; Live Tracking)</option>
                <option value="responder">Rescue Responder (Field Missions &amp; GPS)</option>
                <option value="hospital_staff">Hospital Staff (Trauma ICU &amp; Pre-Alerts)</option>
                <option value="shelter_manager">Shelter Manager (Beds &amp; Supplies)</option>
                <option value="organization_admin">NGO Relief Administrator (Logistics Hub)</option>
                <option value="volunteer">Community Volunteer (Field Tasks)</option>
                <option value="super_admin">Super Administrator (Governance)</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.org"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950 focus:bg-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-charcoal-600 hover:text-navy-950 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5 flex-shrink-0" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950 focus:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emergency-600 hover:bg-emergency-700 active:scale-98 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-card flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Navigation to Register */}
          <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
            <span>Don&apos;t have an account?</span>
            <Link
              to="/register"
              className="font-bold text-navy-950 hover:text-emergency-600 transition-colors"
            >
              Create an account &rarr;
            </Link>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs text-charcoal-500 hover:text-navy-950 transition-colors"
            >
              &larr; Return to public website
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
