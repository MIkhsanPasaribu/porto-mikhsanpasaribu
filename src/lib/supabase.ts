/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { 
    authenticated: !!data.session, 
    session: data.session,
    error 
  };
};

// Helper function to handle auth errors
export const handleAuthError = async (error: any) => {
  // Check if error is empty or undefined
  if (!error || (typeof error === 'object' && Object.keys(error).length === 0)) {
    console.error('Auth error: Empty error object');
    // Still sign out if we get an empty error to be safe
    await supabase.auth.signOut();
    return false;
  }
  
  console.error('Auth error:', error);
  
  // If it's a refresh token error, sign out the user to clear invalid tokens
  if (error?.message?.includes('Invalid Refresh Token') || 
      error?.message?.includes('Refresh Token Not Found')) {
    await supabase.auth.signOut();
    return false;
  }
  
  return true;
};