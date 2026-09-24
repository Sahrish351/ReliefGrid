import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-charcoal-200 shadow-elevated max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-heading text-navy-950">Password Recovery</h1>
          <p className="text-xs text-charcoal-500">Enter your email to receive recovery instructions.</p>
        </div>

        {sent ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 text-center space-y-2">
            <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
            <div>Password reset instructions dispatched to <strong>{email}</strong>.</div>
            <Link to="/login" className="block text-navy-900 font-bold mt-2 hover:underline">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 text-xs">
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

            <button
              type="submit"
              className="w-full bg-navy-950 hover:bg-navy-900 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-card"
            >
              Send Recovery Link
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
