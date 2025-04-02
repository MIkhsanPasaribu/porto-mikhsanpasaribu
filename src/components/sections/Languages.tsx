'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Language {
  id: number;
  name: string;
  proficiency: string;
  order: number;
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
          .order('order', { ascending: true });
        
        if (error) throw error;
        
        setLanguages(data || []);
      } catch (error) {
        console.error('Error fetching languages:', error);
        // Fallback data
        const fallbackLanguages = [
          {
            id: 1,
            name: 'English',
            proficiency: 'Professional working proficiency',
            order: 1
          },
          {
            id: 2,
            name: 'Indonesian',
            proficiency: 'Native or bilingual proficiency',
            order: 2
          },
          {
            id: 3,
            name: 'Japanese',
            proficiency: 'Elementary proficiency',
            order: 3
          }
        ];
        setLanguages(fallbackLanguages);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLanguages();
  }, []);
  
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Languages</h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language) => (
              <motion.div
                key={language.id}
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-semibold mb-2">{language.name}</h3>
                <p className="text-gray-600">{language.proficiency}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}