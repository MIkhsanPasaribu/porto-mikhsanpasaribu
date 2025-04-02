/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('proficiency', { ascending: false });
        
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
          setSkills(data);
          // Extract unique categories
          const uniqueCategories = [...new Set(data.map(skill => skill.category))];
          setCategories(uniqueCategories);
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback data
        const fallbackSkills = [
          {
            id: 1,
            name: 'React',
            category: 'Frontend',
            proficiency: 90,
            icon: '/icons/react.svg'
          },
          {
            id: 2,
            name: 'Node.js',
            category: 'Backend',
            proficiency: 85,
            icon: '/icons/nodejs.svg'
          },
          {
            id: 3,
            name: 'TypeScript',
            category: 'Languages',
            proficiency: 80,
            icon: '/icons/typescript.svg'
          },
          {
            id: 4,
            name: 'MongoDB',
            category: 'Database',
            proficiency: 75,
            icon: '/icons/mongodb.svg'
          }
        ];
        setSkills(fallbackSkills);
        
        // Extract unique categories from fallback data
        const uniqueCategories = [...new Set(fallbackSkills.map(skill => skill.category))];
        setCategories(uniqueCategories);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);
  
const [activeCategory, setActiveCategory] = useState('All');
const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);
  
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
        <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <i className={`${skill.icon} text-3xl text-blue-600 mr-3`}></i>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Proficiency</span>
                <span>{skill.proficiency}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}