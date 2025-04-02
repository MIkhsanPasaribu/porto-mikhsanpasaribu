'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

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
        const { data, error } = await supabase
          .from('about')
          .select('*')
          .single();
        
        if (error) throw error;
        
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
        // Fallback data if fetch fails
        setAboutData({
          id: 1,
          title: 'Software Developer & AI Enthusiast',
          description: 'I am a passionate software developer with expertise in web development, artificial intelligence, and machine learning. With a strong foundation in computer science and a keen interest in emerging technologies, I strive to create innovative solutions that make a positive impact.\n\nMy journey in technology began with a curiosity about how things work, which evolved into a deep passion for building software that solves real-world problems. I enjoy the challenge of learning new technologies and applying them to create efficient, scalable, and user-friendly applications.',
          image_url: '/profile.jpg',
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
  
  if (!aboutData) return null;
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={aboutData.image_url || '/placeholder-profile.jpg'}
            alt="M. Ikhsan Pasaribu"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <h3 className="text-xl text-blue-600 mb-4">{aboutData.title}</h3>
          
          <div className="text-gray-700 space-y-4">
            {aboutData.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-8">
            <a
              href={aboutData.resume_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download Resume
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}