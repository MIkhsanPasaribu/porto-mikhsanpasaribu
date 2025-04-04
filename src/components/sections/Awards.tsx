/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

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
    const fetchAwards = async () => {
      try {
        // Improved query with better error handling
        const { data, error } = await supabase
          .from('awards')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) {
          console.error('Error fetching awards:', error);
          throw error;
        }
        
        if (data) {
          setAwards(data);
        } else {
          setAwards([]);
        }
      } catch (error) {
        console.error('Error in awards fetch:', error);
        setAwards([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAwards();
    
    // Set up real-time subscription for awards
    const awardsSubscription = supabase
      .channel('awards-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'awards' }, 
        () => {
          console.log('Awards data changed, refreshing...');
          fetchAwards();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(awardsSubscription);
    };
  }, []);
  
  // Always render the section title, even if there's no data
  return (
    <section id="awards" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Awards & Recognition
        </h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
            }`}></div>
          </div>
        ) : awards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                    : 'bg-white shadow-md'
                }`}
              >
                <div className="flex items-start">
                  {award.issuer_logo && (
                    <div className="flex-shrink-0 mr-4">
                      <img 
                        src={award.issuer_logo} 
                        alt={`${award.issuer} logo`} 
                        className="h-12 w-12 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className={`text-xl font-semibold ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                    }`}>
                      {award.title}
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                    }`}>
                      {award.issuer}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'
                    }`}>
                      {new Date(award.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                    {award.description && (
                      <p className={`mt-2 text-sm ${
                        isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                      }`}>
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className={`${isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'}`}>
              No awards to display yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}