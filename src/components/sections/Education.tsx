/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  institution_logo: string | null;
  current: boolean;
}

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) {
          console.error('Error fetching education:', error);
          setError(true);
          throw error;
        }
        
        if (data) {
          setEducation(data);
        } else {
          setEducation([]);
        }
      } catch (error) {
        console.error('Error in education fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEducation();
    
    // Set up real-time subscription
    const educationSubscription = supabase
      .channel('education-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'education' }, 
        () => {
          console.log('Education data changed, refreshing...');
          fetchEducation();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(educationSubscription);
    };
  }, []);
  
  if (loading) {
    return (
      <section id="education" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Education
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
  
  if (error || education.length === 0) {
    return <EmptySection title="Education" message="No education entries to display yet." />;
  }
  
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Education
        </h2>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
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
                {edu.institution_logo && (
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={edu.institution_logo} 
                      alt={`${edu.institution} logo`} 
                      className="h-16 w-16 object-contain"
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
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>
                    {edu.institution}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'
                  }`}>
                    {new Date(edu.start_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })} - {
                      edu.current 
                        ? 'Present' 
                        : edu.end_date 
                          ? new Date(edu.end_date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            }) 
                          : 'Present'
                    }
                  </p>
                  {edu.description && (
                    <p className={`mt-2 ${
                      isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                    }`}>
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}