/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/lib/ThemeContext';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/admin/dashboard');
    } catch (error: any) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full mx-auto p-8 rounded-xl shadow-lg ${
          isDarkMode 
            ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
            : 'bg-white border border-[#0B409C]/10'
        }`}
      >
        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>
            Admin Login
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'}`}>
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] focus:border-[#19A7CE] focus:ring-[#19A7CE]/20' 
                  : 'bg-white border-[#0B409C]/20 text-[#10316B] focus:border-[#0B409C] focus:ring-[#0B409C]/20'
              }`}
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="password" 
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
              }`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] focus:border-[#19A7CE] focus:ring-[#19A7CE]/20' 
                  : 'bg-white border-[#0B409C]/20 text-[#10316B] focus:border-[#0B409C] focus:ring-[#0B409C]/20'
              }`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isDarkMode
                ? 'bg-[#19A7CE] hover:bg-[#146C94] text-white'
                : 'bg-[#0B409C] hover:bg-[#10316B] text-white'
            } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a 
            href="/"
            className={`text-sm hover:underline ${
              isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
            }`}
          >
            Return to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}