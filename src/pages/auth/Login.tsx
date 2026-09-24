import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('coordinator@reliefgrid.ai');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('emergency_coordinator');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, selectedRole);
    setIsLoading(false);

    // Redirect to corresponding portal
    if (selectedRole === 'emergency_coordinator') navigate('/command');
    else if (selectedRole === 'citizen') navigate('/app');
    else if (selectedRole === 'responder') navigate('/responder');
    else if (selectedRole === 'hospital_staff') navigate('/hospital');
    else if (selectedRole === 'shelter_manager') navigate('/shelter');
    else if (selectedRole === 'organization_admin') navigate('/organization');
    else if (selectedRole === 'volunteer') navigate('/volunteer/dashboard');
    else navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-charcoal-200 shadow-elevated max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center mx-auto shadow-card">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-navy-950">Welcome to RELIEFGRID</h1>
          <p className="text-xs text-charcoal-500">Sign in to access your designated operational portal.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Select Active Role Profile</label>
            <select
              value={selectedRole}
              onChange={(e: any) => setSelectedRole(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-2.5 text-xs font-semibold text-navy-950"
            >
              <option value="emergency_coordinator">Emergency Coordinator (Command Center)</option>
              <option value="citizen">Citizen (Help &amp; Tracking)</option>
              <option value="responder">Rescue Responder (Field Missions)</option>
              <option value="hospital_staff">Hospital Staff (Trauma Reception)</option>
              <option value="shelter_manager">Shelter Manager (Intake &amp; Supplies)</option>
              <option value="organization_admin">NGO / Logistics Admin</option>
              <option value="volunteer">Volunteer (Community Corps)</option>
              <option value="super_admin">Super Administrator</option>
            </select>
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
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-2.5 pl-9 pr-3 text-xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-charcoal-700">Password</label>
              <Link to="/forgot-password" className="text-navy-700 hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-2.5 pl-9 pr-3 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-navy-950 hover:bg-navy-900 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-card flex items-center justify-center space-x-2"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-charcoal-500 pt-2 border-t border-charcoal-100">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-navy-900 font-bold hover:underline">Create Account</Link>
        </div>

      </div>
    </div>
  );
};
