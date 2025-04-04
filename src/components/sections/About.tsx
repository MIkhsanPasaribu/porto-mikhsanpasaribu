'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface AboutData {
  id: number;
  name: string;
  title: string;
  bio: string;
  profile_image: string | null;
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const { data, error } = await supabase
          .from('about')
          .select('*')
          .single();
        
        if (error) {
          console.error('Error fetching about data:', error);
          setError(true);
          throw error;
        }
        
        if (data) {
          setAboutData(data);
        }
      } catch (error) {
        console.error('Error in about fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAboutData();
    
    // Set up real-time subscription
    const aboutSubscription = supabase
      .channel('about-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'about' }, 
        () => {
          console.log('About data changed, refreshing...');
          fetchAboutData();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(aboutSubscription);
    };
  }, []);
  
  if (loading) {
    return (
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
            }`}></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !aboutData) {
    return <EmptySection title="About Me" message="Profile information not available." />;
  }
  
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {aboutData.profile_image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl"
            >
              <img 
                src={aboutData.profile_image} 
                alt={aboutData.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              {aboutData.name}
            </h1>
            <h2 className={`text-xl md:text-2xl mb-6 ${
              isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
            }`}>
              {aboutData.title}
            </h2>
            <div 
              className={`prose max-w-none ${
                isDarkMode ? 'prose-invert' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: aboutData.bio }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}