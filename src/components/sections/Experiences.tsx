/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Experience {
  technologies: string[];
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
  company_logo: string | null;
  location: string;
}

export default function ExperiencesSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
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
          setExperiences(data);
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
        // Fallback data
        const fallbackExperiences = [
          {
            id: 1,
            company: 'Tech Innovations Inc.',
            position: 'Senior Full Stack Developer',
            start_date: '2021-03-01',
            end_date: null,
            description: 'Leading development of web applications using React, Node.js, and AWS.',
            company_logo: '/logos/tech-innovations.png',
            location: 'San Francisco, CA'
          },
          {
            id: 2,
            company: 'Digital Solutions Ltd.',
            position: 'Full Stack Developer',
            start_date: '2019-06-01',
            end_date: '2021-02-28',
            description: 'Developed and maintained web applications using React, Express, and MongoDB.',
            company_logo: '/logos/digital-solutions.png',
            location: 'New York, NY'
          }
        ];
        setExperiences(fallbackExperiences.map(exp => ({
          ...exp,
          technologies: [] // Add empty technologies array to match Experience interface
        })));
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (experiences.length === 0) {
    return <EmptySection title="Experience" message="No work experience to display." />;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
          
          {/* Experience items */}
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 md:mb-8 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-8 md:ml-1/2'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
              
              <div className="ml-8 md:ml-0 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {experience.company_logo && (
                    <div className="w-12 h-12 mr-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img 
                        src={experience.company_logo} 
                        alt={experience.company} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-xl font-bold">{experience.position}</h3>
                    <p className="text-blue-600">{experience.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                  </span>
                  
                  <svg className="h-4 w-4 ml-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{experience.location}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{experience.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
