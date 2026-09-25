import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await resetPassword(email);
      if (res.error) {
        setError(res.error);
      } else {
        setSent(true);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to dispatch recovery link');
    } finally {
      setLoading(false);
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
            Forgot your password?
          </h1>
          <p className="text-xs text-charcoal-500">
            Enter your official email to receive cryptographic password reset instructions via Supabase authentication.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {sent ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <div className="font-bold text-sm text-navy-950">Reset Instructions Dispatched</div>
            <p className="text-charcoal-600 leading-relaxed">
              We have dispatched a secure authentication recovery link to <strong>{email}</strong>. Check your inbox and follow the instructions.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-navy-950 font-bold hover:underline"
              >
                Back to Login <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                  placeholder="your.email@agency.org"
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-navy-950 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-950 hover:bg-navy-900 disabled:opacity-60 text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-card flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{loading ? 'Transmitting Request...' : 'Send Reset Link'}</span>
            </button>
          </form>
        )}

        <div className="text-center text-xs text-charcoal-500 pt-3 border-t border-charcoal-100">
          <Link to="/login" className="text-navy-900 font-bold hover:underline">
            &larr; Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
