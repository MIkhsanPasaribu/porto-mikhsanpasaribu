/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { handleAuthError, supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';

interface Award {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string | null;
  issuer_logo: string | null;
}

export default function AwardsSection() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    console.log('AwardsSection mounted');
    
    const fetchAwards = async () => {
      try {
        console.log('Fetching awards data...');
        const { data, error } = await supabase
          .from('awards')
          .select('*')
          .order('date', { ascending: false });
        
        console.log('Awards data response:', { data, error });
        
        // Handle empty error objects
        if (error && (typeof error === 'object' && Object.keys(error).length > 0)) {
          // Try to handle auth error
          if (!await handleAuthError(error)) {
            throw new Error('Authentication error, please refresh the page');
          }
          throw error;
        }
        
        // If we have data, use it
        if (data && Array.isArray(data)) {
          console.log('Setting awards data:', data.length, 'items');
          setAwards(data);
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching awards:', error);
        // Fallback data
        const fallbackAwards = [
          {
            id: 1,
            title: 'Best Web Application',
            issuer: 'Tech Innovation Awards',
            date: '2022-11-15',
            description: 'Awarded for developing an innovative web application that addresses accessibility challenges.',
            issuer_logo: '/logos/tech-innovation.png'
          },
          {
            id: 2,
            title: 'Hackathon Winner',
            issuer: 'Global Code Challenge',
            date: '2021-07-20',
            description: 'First place in a 48-hour hackathon focused on creating solutions for environmental sustainability.',
            issuer_logo: '/logos/global-code.png'
          }
        ];
        console.log('Using fallback awards data');
        setAwards(fallbackAwards);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAwards();
    
    return () => {
      console.log('AwardsSection unmounted');
    };
  }, []);
  
  // Rest of the component remains the same
  
  // Add this debug output
  console.log('AwardsSection render state:', { loading, awardsCount: awards.length, isDarkMode });
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
        }`}></div>
      </div>
    );
  }
  
  // IMPORTANT: Only return null if there are truly no awards
  if (awards.length === 0) {
    console.log('No awards to display, returning null');
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>Awards & Recognition</h2>
        <p className="text-center text-gray-500">No awards to display.</p>
      </div>
    );
  }
  
  // Rest of the component remains the same
}