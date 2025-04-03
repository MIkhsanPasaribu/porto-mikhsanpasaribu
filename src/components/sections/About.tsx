'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import EmptySection from '@/components/ui/EmptySection';

interface AboutData {
  id: number;
  title: string;
  description: string;
  image_url: string;
  resume_url: string;
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Check if the table exists first
        const { error: tableError } = await supabase
          .from('about')
          .select('count')
          .limit(1)
          .single();
        
        // If there's an error with the table check, use fallback data
        if (tableError) {
          console.log('About table may not exist yet, using fallback data');
          throw new Error('Table not found or empty');
        }
        
        // If table exists, try to get the data
        const { data, error } = await supabase
          .from('about')
          .select('*')
          .single();
        
        if (error) throw error;
        
        if (data) {
          setAboutData(data);
        } else {
          // No data found, use fallback
          throw new Error('No about data found');
        }
      } catch (error) {
        console.error('Using fallback about data:', error);
        // Fallback data if fetch fails
        setAboutData({
          id: 1,
          title: 'Software Developer & AI Enthusiast',
          description: 'I am a passionate software developer with expertise in web development, artificial intelligence, and machine learning. With a strong foundation in computer science and a keen interest in emerging technologies, I strive to create innovative solutions that make a positive impact.\n\nMy journey in technology began with a curiosity about how things work, which evolved into a deep passion for building software that solves real-world problems. I enjoy the challenge of learning new technologies and applying them to create efficient, scalable, and user-friendly applications.',
          image_url: '/placeholder-profile.svg', // Use SVG placeholder
          resume_url: '/resume.pdf'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAboutData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Replace this:
  if (!aboutData) return null;
  
  // With this:
  if (!aboutData) {
    return <EmptySection title="About Me" message="About section information is not available." />;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* Content remains the same */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4">{aboutData.title}</h2>
          <div className="text-gray-600 space-y-4">
            {aboutData.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {aboutData.resume_url && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a 
                href={aboutData.resume_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download Resume
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {aboutData.image_url && (
            <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={aboutData.image_url}
                alt="Profile"
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover"
                priority
                onError={(e) => {
                  // If image fails to load, replace with a fallback
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  target.src = '/placeholder-profile.jpg'; // Use a placeholder image
                }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}