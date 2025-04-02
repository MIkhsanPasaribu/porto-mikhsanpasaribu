'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Skill {
  id: number;
  name: string;
  proficiency: number;
  category: string;
  icon: string;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('proficiency', { ascending: false });
        
        if (error) throw error;
        
        setSkills(data || []);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data?.map(skill => skill.category) || [])];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback data
        const fallbackSkills = [
          { id: 1, name: 'JavaScript', proficiency: 90, category: 'Frontend', icon: 'devicon-javascript-plain' },
          { id: 2, name: 'React', proficiency: 85, category: 'Frontend', icon: 'devicon-react-original' },
          { id: 3, name: 'Node.js', proficiency: 80, category: 'Backend', icon: 'devicon-nodejs-plain' },
          { id: 4, name: 'Python', proficiency: 85, category: 'Programming', icon: 'devicon-python-plain' },
          { id: 5, name: 'TensorFlow', proficiency: 75, category: 'AI/ML', icon: 'devicon-tensorflow-original' },
          { id: 6, name: 'SQL', proficiency: 80, category: 'Database', icon: 'devicon-mysql-plain' },
          { id: 7, name: 'TypeScript', proficiency: 85, category: 'Programming', icon: 'devicon-typescript-plain' },
          { id: 8, name: 'Next.js', proficiency: 80, category: 'Frontend', icon: 'devicon-nextjs-original' },
          { id: 9, name: 'Docker', proficiency: 70, category: 'DevOps', icon: 'devicon-docker-plain' },
          { id: 10, name: 'AWS', proficiency: 75, category: 'Cloud', icon: 'devicon-amazonwebservices-original' },
          { id: 11, name: 'PyTorch', proficiency: 70, category: 'AI/ML', icon: 'devicon-pytorch-original' },
          { id: 12, name: 'MongoDB', proficiency: 75, category: 'Database', icon: 'devicon-mongodb-plain' },
        ];
        setSkills(fallbackSkills);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(fallbackSkills.map(skill => skill.category))];
        setCategories(uniqueCategories);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);
  
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