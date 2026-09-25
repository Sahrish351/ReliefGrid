import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    setIsLoading(true);
    const result = await updatePassword(password);
    setIsLoading(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2200);
    } else {
      setErrorMessage(result.error || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-charcoal-200 shadow-elevated max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-2 group">
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
          <h1 className="text-2xl font-black font-heading text-navy-950 tracking-tight">
            Create New Password
          </h1>
          <p className="text-xs text-charcoal-500">
            Enter and confirm your new secure operational password.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-navy-950">Password Updated Successfully</h3>
            <p className="text-xs text-charcoal-600">
              Your credentials have been securely updated in Supabase. Redirecting to login...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                New Password
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
                  placeholder="Repeat new password"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-card flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isLoading ? 'Updating Credentials...' : 'Reset Password'}</span>
            </button>
          </form>
        )}

        <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
          <span>Remembered password?</span>
          <Link to="/login" className="font-bold text-navy-950 hover:text-emergency-600">
            Back to Login &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
