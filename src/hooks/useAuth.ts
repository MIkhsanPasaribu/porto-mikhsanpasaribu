/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, handleAuthError } from '@/lib/supabase';

export function useAuth(redirectTo = '/admin') {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getUser();
        
        // Handle empty error objects
        if (error && (typeof error === 'object' && Object.keys(error).length > 0)) {
          await handleAuthError(error);
          if (redirectTo) router.push(redirectTo);
          return;
        }
        
        if (!data || !data.user) {
          if (redirectTo) router.push(redirectTo);
          return;
        }
        
        setUser(data.user);
      } catch (err) {
        console.error('Auth check error:', err);
        if (redirectTo) router.push(redirectTo);
      } finally {
        setLoading(false);
      }
    };
    
    // Initial check
    checkAuth();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user || null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          if (redirectTo) router.push(redirectTo);
        } else if (event === 'TOKEN_REFRESHED') {
          setUser(session?.user || null);
        }
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router, redirectTo]);

  return { user, loading, isAuthenticated: !!user };
}