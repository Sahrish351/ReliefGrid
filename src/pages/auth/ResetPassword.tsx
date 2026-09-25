import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { IMAGES, handleImageError } from '../../config/images';

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
      }, 2500);
    } else {
      setErrorMessage(result.error || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-stretch">
      
      {/* Left Column: Humanitarian Visual */}
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
            <span>ACCOUNT SECURITY &bull; SUPABASE AUTH</span>
          </div>
          <h2 className="text-3xl font-black font-heading tracking-tight leading-tight">
            Secure Credential Rotation.
          </h2>
          <p className="text-navy-200 text-xs sm:text-sm leading-relaxed max-w-md">
            Cryptographic authentication ensures that authorized emergency responders and coordinators can securely regain access to critical command consoles.
          </p>
        </div>
      </div>

      {/* Right Column: Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="max-w-md w-full space-y-8">
          
          <div className="space-y-2">
            <Link to="/" className="inline-flex items-center space-x-2 mb-2 group">
              <span className="font-heading font-black text-2xl text-navy-950 tracking-tight group-hover:text-emergency-600 transition-colors">
                RELIEFGRID
              </span>
            </Link>
            <h1 className="text-3xl font-black font-heading text-navy-950 tracking-tight">
              Create New Password
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Enter and confirm your new secure operational password.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-3 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-navy-950">Password Updated Successfully</h3>
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
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-navy-950 hover:bg-navy-900 active:scale-95 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-card flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-2"
              >
                <span>{isLoading ? 'Updating Credentials...' : 'Save New Password & Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
            <span>Remembered your password?</span>
            <Link to="/login" className="font-bold text-navy-950 hover:text-emergency-600">
              Return to Login &rarr;
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

