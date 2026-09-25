import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { IMAGES, handleImageError } from '../../config/images';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Allowed public registration roles (excluding super_admin and emergency_coordinator)
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setIsLoading(true);
    const res = await register(fullName, email, password, selectedRole);
    setIsLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      // Direct to corresponding registered portal
      switch (selectedRole) {
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
        default:
          navigate('/portal/citizen');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      
      {/* Left: Authentic Humanitarian Photography (Editorial Split on Desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-navy-950 overflow-hidden">
        <img
          src={IMAGES.volunteersDistribution}
          alt="Humanitarian volunteer relief team"
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
          <div className="pt-2 flex items-center space-x-4 text-[11px] text-navy-300 font-mono">
            <span>&bull; Role-Specific Permissions</span>
            <span>&bull; Cryptographic Supabase Auth</span>
          </div>
        </div>
      </div>

      {/* Right: Registration Form */}
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
              Create an Identity
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Join the national humanitarian emergency network.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5 flex-shrink-0" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. / Capt. / Citizen Full Name"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950 focus:bg-white"
                />
              </div>
            </div>

            {/* Role Profile (Safe Roles Only, strictly excluding super_admin and coordinator) */}
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Role Profile
              </label>
              <select
                value={selectedRole}
                onChange={(e: any) => setSelectedRole(e.target.value as UserRole)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-navy-950 focus:outline-none focus:border-navy-950"
              >
                <option value="citizen">Citizen (General Public &bull; Report &amp; Track)</option>
                <option value="responder">Rescue First Responder (Field Unit &bull; 1122)</option>
                <option value="hospital_staff">Hospital Clinical Staff (Trauma &amp; Bed Capacity)</option>
                <option value="shelter_manager">Shelter &amp; Evacuation Manager (Relief Hub)</option>
                <option value="organization_admin">NGO / Relief Organization Admin (Logistics)</option>
                <option value="volunteer">Community Volunteer Corps (Civic Aid)</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Email Address
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
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5 flex-shrink-0" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950 focus:bg-white"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5 flex-shrink-0" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950 focus:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-navy-950 hover:bg-navy-900 active:scale-98 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-card flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Network Identity...</span>
                  </>
                ) : (
                  <>
                    <span>CREATE ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Navigation to Login */}
          <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-bold text-navy-950 hover:text-emergency-600 transition-colors"
            >
              Sign in &rarr;
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

export default Register;
