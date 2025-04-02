'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';

interface Language {
  id: number;
  name: string;
  proficiency: string;
  order: number;
}

export default function LanguagesSection() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase
          .from('languages')
          .select('*')
          .order('order', { ascending: true });
        
        // Handle empty error objects or undefined errors
        if (error && (typeof error === 'object' && Object.keys(error).length > 0)) {
        // Try to handle auth error, if it returns false, we've signed out
        if (!await handleAuthError(error)) {
          console.log('Authentication error handled, using fallback data');
          throw new Error('Authentication error, please refresh the page');
        }
        throw error;
      }
      
      // If we have data, use it
      if (data && Array.isArray(data)) {
        setLanguages(data);
      } else {
        // If no data or data is not an array, use fallback
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
      // Fallback data
      const fallbackLanguages = [
        {
          id: 1,
          name: 'English',
          proficiency: 'Professional working proficiency',
          order: 1
        },
        {
          id: 2,
          name: 'Indonesian',
          proficiency: 'Native or bilingual proficiency',
          order: 2
        },
        {
          id: 3,
          name: 'Japanese',
          proficiency: 'Elementary proficiency',
          order: 3
        }
      ];
      setLanguages(fallbackLanguages);
    } finally {
      setLoading(false);
    }
  };
  
  fetchLanguages();
}, []);
  
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`text-3xl font-bold text-center mb-10 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>Languages</h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
            }`}></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language) => (
              <motion.div
                key={language.id}
                className={`p-6 rounded-lg shadow-md ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
                    : 'bg-[#F2F7FF] border border-[#0B409C]/10'
                }`}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                }`}>{language.name}</h3>
                <p className={`${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>{language.proficiency}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}