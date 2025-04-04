'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Language {
  id: number;
  name: string;
  proficiency: string;
  flag_icon?: string;
  display_order?: number; // Add display_order field to the interface
}

export default function LanguagesSection() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase
          .from('languages')
          .select('*')
          .order('display_order', { ascending: true }); // Changed from 'id' to 'display_order'
        
        if (error) {
          console.error('Error fetching languages:', error);
          setError(true);
          throw error;
        }
        
        // Add debugging to see what data is returned
        console.log('Languages data received:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setLanguages(data);
        } else {
          console.log('No languages data found or empty array');
          setLanguages([]);
        }
      } catch (error) {
        console.error('Error in languages fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLanguages();
    
    // Set up real-time subscription
    const languagesSubscription = supabase
      .channel('languages-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'languages' }, 
        () => {
          console.log('Languages data changed, refreshing...');
          fetchLanguages();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(languagesSubscription);
    };
  }, []);
  
  if (loading) {
    return (
      <section id="languages" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Languages
          </h2>
          <div className="flex justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
            }`}></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || languages.length === 0) {
    return <EmptySection title="Languages" message="No languages to display yet." />;
  }
  
  return (
    <section id="languages" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Languages
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {languages.map((language, index) => (
            <motion.div
              key={language.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-lg ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                  : 'bg-white shadow-md'
              }`}
            >
              <div className="flex items-center mb-3">
                {language.flag_icon && (
                  <span className="text-2xl mr-2">{language.flag_icon}</span>
                )}
                <h3 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>
                  {language.name}
                </h3>
              </div>
              <p className={`${
                isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
              }`}>
                {language.proficiency}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}