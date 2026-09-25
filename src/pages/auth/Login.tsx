import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Radio, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { IMAGES, handleImageError } from '../../config/images';

export const Login: React.FC = () => {
  const navigate = useNavigate();
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

    // Redirect to corresponding role portal
    if (selectedRole === 'emergency_coordinator') navigate('/portal/coordinator');
    else if (selectedRole === 'citizen') navigate('/portal/citizen');
    else if (selectedRole === 'responder') navigate('/portal/responder');
    else if (selectedRole === 'hospital_staff') navigate('/portal/hospital');
    else if (selectedRole === 'shelter_manager') navigate('/portal/shelter');
    else if (selectedRole === 'organization_admin') navigate('/portal/ngo');
    else if (selectedRole === 'volunteer') navigate('/portal/volunteer');
    else navigate('/portal/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-stretch">
      
      {/* Left Column: Authentic Humanitarian Photography (Editorial Split) */}
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="max-w-md w-full space-y-8">
          
          <div className="space-y-2">
            <Link to="/" className="inline-flex items-center space-x-2 mb-2 group">
              <span className="font-heading font-black text-2xl text-navy-950 tracking-tight group-hover:text-emergency-600 transition-colors">
                RELIEFGRID
              </span>
            </Link>
            <h1 className="text-3xl font-black font-heading text-navy-950 tracking-tight">
              Sign In to Your Portal
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Select your simulated role profile to access corresponding operations.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Active Operational Role Profile
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

            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Operational Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-emergency-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-card flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating Profile...' : 'Enter Operational Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
            <span>Need a new organization profile?</span>
            <Link to="/register" className="font-bold text-navy-950 hover:text-emergency-600">
              Register Account &rarr;
            </Link>
          </div>

          <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-[11px] text-charcoal-500 font-mono text-center">
            DEMONSTRATION ACCESS &bull; PASSWORDS PRE-FILLED FOR CONVENIENCE
          </div>

        </div>
      </div>

    </div>
  );
};
