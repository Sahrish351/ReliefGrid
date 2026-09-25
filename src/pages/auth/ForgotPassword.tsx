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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-charcoal-200 shadow-elevated max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-heading text-navy-950">Password Recovery</h1>
          <p className="text-xs text-charcoal-500">Enter your email to receive recovery instructions via Supabase authentication.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {sent ? (
          <div className="p-5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
            <div className="font-semibold text-sm">Recovery Link Dispatched</div>
            <p className="text-charcoal-600">Password reset instructions dispatched to <strong>{email}</strong>. Check your inbox and follow the secure link.</p>
            <Link to="/login" className="inline-flex items-center gap-1.5 text-navy-950 font-bold mt-2 hover:underline">
              Back to Login <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-2 focus:ring-navy-900 focus:bg-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-950 hover:bg-navy-900 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-card flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Transmitting Request...' : 'Send Recovery Link'}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-charcoal-500 pt-2 border-t border-charcoal-100">
          <Link to="/login" className="text-navy-900 font-bold hover:underline">&larr; Return to Sign In</Link>
        </div>
      </div>
    </div>
  );
};
