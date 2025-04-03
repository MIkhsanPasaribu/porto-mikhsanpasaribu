'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
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
  location: string;
}

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('start_date', { ascending: false });
        
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
          setEducation(data);
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching education:', error);
        // Fallback data
        const fallbackEducation = [
          {
            id: 1,
            institution: 'Stanford University',
            degree: 'Master of Science',
            field: 'Computer Science',
            start_date: '2017-09-01',
            end_date: '2019-06-30',
            description: 'Specialized in Artificial Intelligence and Machine Learning',
            institution_logo: '/logos/stanford.png',
            location: 'Stanford, CA'
          },
          {
            id: 2,
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            start_date: '2013-09-01',
            end_date: '2017-05-30',
            description: 'Minor in Mathematics',
            institution_logo: '/logos/berkeley.png',
            location: 'Berkeley, CA'
          }
        ];
        setEducation(fallbackEducation);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEducation();
  }, []);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
        }`}></div>
      </div>
    );
  }
  
  if (education.length === 0) {
    return <EmptySection title="Education" message="No education history to display." />;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>Education</h2>
        
        <div className="space-y-10">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
                  : 'bg-[#F2F7FF] border border-[#0B409C]/10'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center">
                {edu.institution_logo && (
                  <div className="w-16 h-16 mb-4 md:mb-0 md:mr-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={edu.institution_logo} 
                      alt={edu.institution} 
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                  }`}>{edu.degree} in {edu.field}</h3>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>{edu.institution}</p>
                  
                  <div className="flex flex-wrap items-center mt-2 text-sm">
                    <div className="flex items-center mr-6 mb-2">
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className={isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'}>
                        {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className={isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'}>
                        {edu.location}
                      </span>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className={`mt-3 ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                    }`}>{edu.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}