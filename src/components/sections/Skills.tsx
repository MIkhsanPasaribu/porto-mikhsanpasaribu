'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  logo: string | null;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
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
            logo: '/logos/react.png'
          },
          {
            id: 2,
            name: 'Node.js',
            category: 'Backend',
            proficiency: 85,
            logo: '/logos/nodejs.png'
          },
          {
            id: 3,
            name: 'TypeScript',
            category: 'Languages',
            proficiency: 80,
            logo: '/logos/typescript.png'
          },
          {
            id: 4,
            name: 'MongoDB',
            category: 'Database',
            proficiency: 75,
            logo: '/logos/mongodb.png'
          },
          {
            id: 5,
            name: 'AWS',
            category: 'DevOps',
            proficiency: 70,
            logo: '/logos/aws.png'
          }
        ];
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);
  
  // Group skills by category
  const groupedSkills: Record<string, Skill[]> = {};
  skills.forEach(skill => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }
    groupedSkills[skill.category].push(skill);
  });
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
        }`}></div>
      </div>
    );
  }
  
  if (Object.keys(groupedSkills).length === 0) {
    return <EmptySection title="Skills" message="No skills to display." />;
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
        }`}>Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div
              key={category}
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
              <h3 className={`text-xl font-semibold mb-6 ${
                isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
              }`}>{category}</h3>
              
              <div className="space-y-6">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {skill.logo && (
                          <div className="w-6 h-6 mr-3">
                            <img
                              src={skill.logo}
                              alt={`${skill.name} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <span className={`font-medium ${
                          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                        }`}>{skill.name}</span>
                      </div>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                      }`}>{skill.proficiency}%</span>
                    </div>
                    
                    <div className={`w-full h-2 rounded-full ${
                      isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#E5E7EB]'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${
                          isDarkMode ? 'bg-[#19A7CE]' : 'bg-[#0B409C]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}