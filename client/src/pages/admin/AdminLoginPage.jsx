import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      addToast('Logged in successfully.', 'success');
      navigate('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Invalid credentials.';
      setError(msg);
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-3">
            <img
              src="/assets/logo.png"
              alt="Global Fire Safety Equipments Logo"
              className="h-16 w-auto object-contain drop-shadow-md"
            />
            <div className="text-left">
              <span className="font-heading font-black text-slate-900 text-lg block leading-tight">
                GLOBAL FIRE
              </span>
              <span className="text-[10px] uppercase tracking-wider text-brand-700 font-bold">
                Admin Portal
              </span>
            </div>
          </Link>
          <h2 className="text-2xl font-heading font-black text-slate-900 mt-2">Administrator Sign In</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access business settings and customer enquiry management.
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@globalfire.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-red-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Seed Admin Credentials Helper Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            <p className="font-semibold text-slate-700">Initial Seed Credentials:</p>
            <p className="mt-0.5 font-mono text-slate-600">admin@globalfire.com / Admin@12345</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-brand-700 transition-colors">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
