/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import EmptySection from '@/components/ui/EmptySection';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string;
  github_url: string | null;
  live_url: string | null;
  order: number;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects...');
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, description, image_url, technologies, github_url, live_url, order')
          .order('order', { ascending: true });
        
        if (error) {
          console.error('Error fetching projects:', error);
          setError(true);
          throw error;
        }
        
        console.log('Projects data received:', data);
        
        if (data && Array.isArray(data)) {
          setProjects(data);
        } else {
          console.log('No projects data found or empty array');
          setProjects([]);
        }
      } catch (error) {
        console.error('Error in projects fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  if (loading) {
    return (
      <section id="projects" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Projects
          </h2>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || projects.length === 0) {
    return (
      <section id="projects" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Projects
          </h2>
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="text-5xl mb-4">📁</div>
            <p className={`text-lg ${isDarkMode ? 'text-[#F6F1F1]/80' : 'text-gray-600'}`}>
              {error ? "Failed to load projects. Please try again later." : "No projects found."}
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold mb-12 text-center ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-lg overflow-hidden ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                  : 'bg-white shadow-lg'
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 w-full overflow-hidden">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className={`h-full w-full flex items-center justify-center ${
                    isDarkMode ? 'bg-[#146C94]/20' : 'bg-gray-100'
                  }`}>
                    <span className="text-4xl">🖥️</span>
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`mb-4 text-sm ${
                  isDarkMode ? 'text-[#F6F1F1]/80' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.split(',').map((tech, i) => (
                    <span 
                      key={i}
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode 
                          ? 'bg-[#146C94]/20 text-[#19A7CE]' 
                          : 'bg-[#0B409C]/10 text-[#0B409C]'
                      }`}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-4 mt-4">
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-sm ${
                        isDarkMode 
                          ? 'text-[#19A7CE] hover:text-[#F6F1F1]' 
                          : 'text-[#0B409C] hover:text-[#10316B]'
                      }`}
                    >
                      <FaGithub /> Code
                    </a>
                  )}
                  
                  {project.live_url && (
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-sm ${
                        isDarkMode 
                          ? 'text-[#19A7CE] hover:text-[#F6F1F1]' 
                          : 'text-[#0B409C] hover:text-[#10316B]'
                      }`}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

