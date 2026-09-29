'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { LogoIcon } from '@/components/shared/Logo';
import { loginAdminApi } from '@/lib/mock-service';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const ok = await loginAdminApi(username, password);
      if (ok) {
        router.push('/admin');
      } else {
        setErrorMsg('Invalid admin username or password. Default is admin / admin123.');
      }
    } catch {
      setErrorMsg('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-green-700 via-brand-green-600 to-brand-green-500 px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-brand-gold-400" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-gold-400" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-green-lg">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-brand-gold-200/50 p-1">
              <LogoIcon className="h-14 w-20" />
            </div>
            <h1 className="mt-4 font-sans text-xl font-bold text-brand-green-900">Falak Ride Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-green-700">Username</label>
              <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="h-10 w-full rounded-lg border border-brand-green-100/80 bg-white pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40"
                    />
                  </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-green-700">Password</label>
              <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-10 w-full rounded-lg border border-brand-green-100/80 bg-white pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40"
                    />
                  </div>
            </div>
            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-green-600 to-brand-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-green transition-all hover:shadow-green-lg disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Default credentials: <span className="font-semibold text-brand-green-800">admin</span> / <span className="font-semibold text-brand-green-800">admin123</span>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Falak Ride. All rights reserved.
        </p>
      </div>
    </div>
  );
}
