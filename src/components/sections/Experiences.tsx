/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  company_logo: string | null;
  current: boolean;
}

export default function ExperiencesSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) {
          console.error('Error fetching experiences:', error);
          setError(true);
          throw error;
        }
        
        if (data) {
          setExperiences(data);
        } else {
          setExperiences([]);
        }
      } catch (error) {
        console.error('Error in experiences fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
    
    // Set up real-time subscription
    const experiencesSubscription = supabase
      .channel('experiences-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'experiences' }, 
        () => {
          console.log('Experiences data changed, refreshing...');
          fetchExperiences();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(experiencesSubscription);
    };
  }, []);
  
  if (loading) {
    return (
      <section id="experience" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Professional Experience
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
  
  if (error || experiences.length === 0) {
    return <EmptySection title="Professional Experience" message="No experience entries to display yet." />;
  }
  
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Professional Experience
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div 
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                
                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} p-6 rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                    : 'bg-white shadow-md'
                }`}>
                  <div className="flex items-start">
                    {experience.company_logo && (
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={experience.company_logo} 
                          alt={`${experience.company} logo`} 
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
                        {experience.title}
                      </h3>
                      <p className={`${
                        isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                      }`}>
                        {experience.company} • {experience.location}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'
                      }`}>
                        {new Date(experience.start_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })} - {
                          experience.current 
                            ? 'Present' 
                            : experience.end_date 
                              ? new Date(experience.end_date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short' 
                                }) 
                              : 'Present'
                        }
                      </p>
                      <p className={`mt-2 ${
                        isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                      }`}>
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
