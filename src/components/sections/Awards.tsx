'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

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
  
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const { data, error } = await supabase
          .from('awards')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) throw error;
        
        setAwards(data || []);
      } catch (error) {
        console.error('Error fetching awards:', error);
        // Fallback data
        const fallbackAwards = [
          {
            id: 1,
            title: 'Best Web Application',
            issuer: 'Tech Innovation Awards',
            date: '2022-11-15',
            description: 'Awarded for developing an innovative web application that addresses accessibility challenges.',
            issuer_logo: '/logos/tech-innovation.png'
          },
          {
            id: 2,
            title: 'Hackathon Winner',
            issuer: 'Global Code Challenge',
            date: '2021-07-20',
            description: 'First place in a 48-hour hackathon focused on creating solutions for environmental sustainability.',
            issuer_logo: '/logos/global-code.png'
          }
        ];
        setAwards(fallbackAwards);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAwards();
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Awards & Recognition</h2>
        <div className="flex justify-center">
          <div className="animate-pulse h-40 w-full max-w-3xl bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (awards.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Awards & Recognition</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {awards.map((award, index) => (
          <motion.div 
            key={award.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start gap-4">
              {award.issuer_logo && (
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src={award.issuer_logo} 
                    alt={award.issuer} 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-bold">{award.title}</h3>
                <p className="text-gray-700">{award.issuer}</p>
                <p className="text-gray-500 mb-2">{formatDate(award.date)}</p>
                {award.description && (
                  <p className="text-gray-600">{award.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}