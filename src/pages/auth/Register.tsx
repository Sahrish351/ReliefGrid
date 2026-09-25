import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { IMAGES, handleImageError } from '../../config/images';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const res = await register(fullName, email, password, selectedRole);
    setIsLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      navigate(selectedRole === 'emergency_coordinator' ? '/portal/coordinator' : '/portal/citizen');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-stretch">
      
      {/* Left: Authentic Photo */}
      <div className="hidden lg:block lg:w-1/2 relative bg-navy-950 overflow-hidden">
        <img
          src={IMAGES.volunteersDistribution}
          alt="Humanitarian volunteer distribution relief"
          onError={handleImageError}
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent"></div>

        <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>HUMANITARIAN NETWORK IDENTITY</span>
          </div>
          <h2 className="text-3xl font-black font-heading tracking-tight leading-tight">
            Register for Coordinated Emergency Response.
          </h2>
          <p className="text-navy-200 text-xs sm:text-sm leading-relaxed max-w-md">
            Whether registering as an affected citizen, certified paramedic, NGO coordinator, or volunteer, your account connects to verified operational resources.
          </p>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="max-w-md w-full space-y-8">
          
          <div className="space-y-2">
            <Link to="/" className="inline-flex items-center space-x-2 mb-2 group">
              <span className="font-heading font-black text-2xl text-navy-950 tracking-tight group-hover:text-emergency-600 transition-colors">
                RELIEFGRID
              </span>
            </Link>
            <h1 className="text-3xl font-black font-heading text-navy-950 tracking-tight">
              Create an Identity
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Join the national humanitarian emergency network.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. / Capt. / Citizen Name"
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Role Profile
              </label>
              <select
                value={selectedRole}
                onChange={(e: any) => setSelectedRole(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-navy-950 focus:outline-none focus:border-navy-950"
              >
                <option value="citizen">Citizen (General Public)</option>
                <option value="responder">Rescue First Responder</option>
                <option value="hospital_staff">Hospital Clinical Staff</option>
                <option value="shelter_manager">Shelter &amp; Evacuation Manager</option>
                <option value="organization_admin">NGO / Relief Organization Admin</option>
                <option value="volunteer">Community Volunteer Corps</option>
                <option value="emergency_coordinator">Emergency Coordinator (Command Center)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@agency.org"
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-card flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Creating Identity...' : 'Register Profile & Enter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
            <span>Already have an account?</span>
            <Link to="/login" className="font-bold text-navy-950 hover:text-emergency-600">
              Sign In &rarr;
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};
