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
  
  return (
    <section id="skills" className="py-16 md:py-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Skills & Technologies
        </h2>
        
        {categories.map((category, categoryIndex) => (
          <div key={category} className="mb-12">
            <h3 className={`text-xl font-semibold mb-6 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              {category}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {skills
                .filter(skill => skill.category === category)
                .map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    className={`p-3 rounded-lg flex flex-col items-center text-center ${
                      isDarkMode 
                        ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                        : 'bg-white shadow-sm'
                    }`}
                  >
                    {skill.icon && (
                      <div className="text-2xl mb-2">{skill.icon}</div>
                    )}
                    <h4 className={`font-medium text-sm ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                    }`}>
                      {skill.name}
                    </h4>
                    <div className="w-full mt-2 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div 
                        className={`h-1.5 rounded-full ${
                          isDarkMode ? 'bg-[#19A7CE]' : 'bg-[#0B409C]'
                        }`} 
                        style={{ width: `${skill.proficiency * 10}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}