'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Language {
  id: number;
  name: string;
  proficiency: string;
}

export default function LanguagesSection() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase
          .from('languages')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;
        
        setLanguages(data || []);
      } catch (error) {
        console.error('Error fetching languages:', error);
        // Fallback data
        const fallbackLanguages = [
          {
            id: 1,
            name: 'English',
            proficiency: 'Professional working proficiency'
          },
          {
            id: 2,
            name: 'Indonesian',
            proficiency: 'Native or bilingual proficiency'
          },
          {
            id: 3,
            name: 'Japanese',
            proficiency: 'Elementary proficiency'
          }
        ];
        setLanguages(fallbackLanguages);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLanguages();
  }, []);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Languages</h2>
        <div className="flex justify-center">
          <div className="animate-pulse h-40 w-full max-w-3xl bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (languages.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Languages</h2>
      
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages.map((language, index) => (
            <motion.div 
              key={language.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{language.name}</h3>
              <p className="text-gray-600">{language.proficiency}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}