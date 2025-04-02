'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  gpa: string | null;
  institution_logo: string | null;
}

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) throw error;
        
        setEducation(data || []);
      } catch (error) {
        console.error('Error fetching education:', error);
        // Fallback data
        const fallbackEducation = [
          {
            id: 1,
            institution: 'University of Technology',
            degree: 'Master of Science',
            field: 'Computer Science',
            location: 'Jakarta, Indonesia',
            start_date: '2015-08-01',
            end_date: '2017-05-30',
            description: 'Specialized in Artificial Intelligence and Machine Learning. Thesis on "Deep Learning Approaches for Natural Language Processing".',
            gpa: '3.9/4.0',
            institution_logo: '/logos/university-tech.png'
          },
          {
            id: 2,
            institution: 'National Institute of Engineering',
            degree: 'Bachelor of Engineering',
            field: 'Computer Engineering',
            location: 'Bandung, Indonesia',
            start_date: '2011-08-01',
            end_date: '2015-05-30',
            description: 'Focused on software development and computer architecture. Participated in multiple programming competitions.',
            gpa: '3.8/4.0',
            institution_logo: '/logos/national-institute.png'
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                {edu.institution_logo && (
                  <div className="w-16 h-16 mr-6 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={edu.institution_logo} 
                      alt={edu.institution} 
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="text-blue-600 text-lg">{edu.institution}</p>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-2 mb-4">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                    </span>
                    
                    <svg className="h-4 w-4 ml-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{edu.location}</span>
                    
                    {edu.gpa && (
                      <>
                        <svg className="h-4 w-4 ml-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>GPA: {edu.gpa}</span>
                      </>
                    )}
                  </div>
                  
                  {edu.description && (
                    <p className="text-gray-700">{edu.description}</p>
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