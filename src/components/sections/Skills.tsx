'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

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
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('category')
          .order('proficiency', { ascending: false });
        
        if (error) {
          console.error('Error fetching skills:', error);
          setError(true);
          throw error;
        }
        
        if (data) {
          setSkills(data);
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(data.map(skill => skill.category)));
          setCategories(uniqueCategories);
        } else {
          setSkills([]);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error in skills fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
    
    // Set up real-time subscription
    const skillsSubscription = supabase
      .channel('skills-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'skills' }, 
        () => {
          console.log('Skills data changed, refreshing...');
          fetchSkills();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(skillsSubscription);
    };
  }, []);
  
  if (loading) {
    return (
      <section id="skills" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Skills & Technologies
          </h2>
          <div className="flex justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
            }`}></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || skills.length === 0) {
    return <EmptySection title="Skills & Technologies" message="No skills to display yet." />;
  }

  // Function to get proficiency level label
  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 9) return 'Expert';
    if (proficiency >= 7) return 'Advanced';
    if (proficiency >= 5) return 'Intermediate';
    if (proficiency >= 3) return 'Basic';
    return 'Beginner';
  };
  
  // Function to get proficiency level color
  const getProficiencyColor = (proficiency: number, isDark: boolean) => {
    if (proficiency >= 9) return isDark ? 'bg-emerald-500' : 'bg-emerald-600';
    if (proficiency >= 7) return isDark ? 'bg-blue-500' : 'bg-blue-600';
    if (proficiency >= 5) return isDark ? 'bg-violet-500' : 'bg-violet-600';
    if (proficiency >= 3) return isDark ? 'bg-amber-500' : 'bg-amber-600';
    return isDark ? 'bg-red-500' : 'bg-red-600';
  };
  
  return (
    <section id="skills" className="py-16 md:py-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Skills & Technologies
        </h2>
        
        <div className="relative">
          {/* ERD-style background lines */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern 
                  id="grid" 
                  width="40" 
                  height="40" 
                  patternUnits="userSpaceOnUse"
                >
                  <path 
                    d="M 40 0 L 0 0 0 40" 
                    fill="none" 
                    stroke={isDarkMode ? 'rgba(25, 167, 206, 0.1)' : 'rgba(11, 64, 156, 0.1)'} 
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            {categories.map((category, categoryIndex) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                className="mb-16"
              >
                <div className={`relative mb-8 ${
                  isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'
                } p-4 rounded-lg shadow-md border-l-4 ${
                  isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
                }`}>
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>
                    {category}
                  </h3>
                  
                  {/* Entity relationship diagram style connector */}
                  <div className={`absolute left-1/2 -bottom-8 w-0.5 h-8 ${
                    isDarkMode ? 'bg-[#19A7CE]/50' : 'bg-[#0B409C]/50'
                  }`}></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: (categoryIndex * 0.2) + (index * 0.1),
                          type: "spring",
                          stiffness: 100
                        }}
                        className={`relative p-5 rounded-lg ${
                          isDarkMode 
                            ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
                            : 'bg-white shadow-md'
                        }`}
                      >
                        {/* Connector lines to show relationships */}
                        {index > 0 && (
                          <div className={`absolute -left-3 top-1/2 w-3 h-0.5 ${
                            isDarkMode ? 'bg-[#19A7CE]/30' : 'bg-[#0B409C]/30'
                          }`}></div>
                        )}
                        
                        <div className="flex items-center mb-3">
                          {skill.icon && (
                            <div className={`text-2xl mr-3 ${
                              isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                            }`}>
                              <i className={skill.icon}></i>
                            </div>
                          )}
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                          }`}>
                            {skill.name}
                          </h4>
                        </div>
                        
                        {/* Proficiency indicator - Circular gauge */}
                        <div className="flex items-center justify-between">
                          <div className="relative w-16 h-16">
                            <svg className="w-16 h-16" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={isDarkMode ? '#2A2A2A' : '#E5E7EB'}
                                strokeWidth="3"
                                strokeDasharray="100, 100"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={getProficiencyColor(skill.proficiency, isDarkMode)}
                                strokeWidth="3"
                                strokeDasharray={`${skill.proficiency * 10}, 100`}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text 
                                x="18" 
                                y="20.5" 
                                textAnchor="middle" 
                                fontSize="10"
                                fill={isDarkMode ? '#F6F1F1' : '#10316B'}
                                fontWeight="bold"
                              >
                                {skill.proficiency}%
                              </text>
                            </svg>
                          </div>
                          
                          <div className="flex-1 ml-4">
                            <div className={`text-sm font-medium mb-1 ${
                              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                            }`}>
                              {getProficiencyLabel(skill.proficiency)}
                            </div>
                            
                            {/* Skill level bars */}
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div 
                                  key={level}
                                  className={`h-1.5 w-5 rounded-full ${
                                    level <= Math.ceil(skill.proficiency / 2)
                                      ? getProficiencyColor(skill.proficiency, isDarkMode)
                                      : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}