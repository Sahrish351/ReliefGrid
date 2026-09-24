import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await register(fullName, email, selectedRole);
    setIsLoading(false);
    navigate(selectedRole === 'emergency_coordinator' ? '/command' : '/app');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-charcoal-200 shadow-elevated max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-heading text-navy-950">Register Profile</h1>
          <p className="text-xs text-charcoal-500">Create an authenticated identity on RELIEFGRID AI.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-2.5 pl-9 pr-3 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.org"
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-2.5 pl-9 pr-3 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Primary Role</label>
            <select
              value={selectedRole}
              onChange={(e: any) => setSelectedRole(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs font-semibold text-navy-950"
            >
              <option value="citizen">Citizen (Help Requests &amp; Tracking)</option>
              <option value="responder">Rescue Responder (Rescue 1122)</option>
              <option value="hospital_staff">Hospital Emergency Staff</option>
              <option value="shelter_manager">Evacuation Shelter Manager</option>
              <option value="organization_admin">NGO / Relief Organization</option>
              <option value="volunteer">Humanitarian Volunteer</option>
              <option value="emergency_coordinator">Emergency Coordinator</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-2.5 pl-9 pr-3 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-navy-950 hover:bg-navy-900 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-card flex items-center justify-center space-x-2"
          >
            <span>{isLoading ? 'Creating...' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-charcoal-500 pt-2 border-t border-charcoal-100">
          <span>Already registered? </span>
          <Link to="/login" className="text-navy-900 font-bold hover:underline">Sign In</Link>
        </div>

      </div>
    </div>
  );
};
