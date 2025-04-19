'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaRobot, FaBrain } from 'react-icons/fa';

// Updated interface to match Supabase schema
interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string | null; // Make technologies nullable
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
          // Enhanced logging to debug technologies field
          data.forEach(project => {
            console.log(`Project ${project.id} technologies:`, project.technologies);
            console.log(`Type of technologies:`, typeof project.technologies);
          });
          
          // Process technologies to ensure consistent format
          const processedData = data.map(project => {
            let techData = project.technologies;
            
            // Handle technologies that might be stored as JSON string
            if (typeof project.technologies === 'string' && project.technologies.startsWith('[')) {
              try {
                techData = JSON.parse(project.technologies);
              } catch (e) {
                console.error('Error parsing technologies JSON:', e);
                techData = project.technologies;
              }
            }
            
            return {
              ...project,
              technologies: techData
            };
          });
          
          setProjects(processedData);
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
    
    // Add real-time subscription for projects
    const projectsSubscription = supabase
      .channel('projects-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' }, 
        () => {
          console.log('Projects data changed, refreshing...');
          fetchProjects();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(projectsSubscription);
    };
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
  
  // Function to determine project icon based on technologies
  const getProjectIcon = (technologies: string) => {
    const techList = technologies?.toLowerCase().split(',') || [];
    
    if (techList.some(tech => 
      tech.includes('ai') || 
      tech.includes('ml') || 
      tech.includes('tensorflow') || 
      tech.includes('pytorch') ||
      tech.includes('machine learning')
    )) {
      return <FaBrain className="text-2xl" />;
    } else if (techList.some(tech => 
      tech.includes('react') || 
      tech.includes('vue') || 
      tech.includes('angular') ||
      tech.includes('frontend')
    )) {
      return <FaCode className="text-2xl" />;
    } else if (techList.some(tech => 
      tech.includes('node') || 
      tech.includes('express') || 
      tech.includes('django') ||
      tech.includes('backend')
    )) {
      return <FaDatabase className="text-2xl" />;
    } else {
      return <FaRobot className="text-2xl" />;
    }
  };
  
  // Function to categorize projects
  const categorizeProject = (technologies: string) => {
    const techList = technologies?.toLowerCase().split(',') || [];
    
    if (techList.some(tech => 
      tech.includes('ai') || 
      tech.includes('ml') || 
      tech.includes('tensorflow') || 
      tech.includes('pytorch')
    )) {
      return 'AI & Machine Learning';
    } else if (techList.some(tech => 
      tech.includes('fullstack') || 
      (techList.some(t => t.includes('frontend')) && techList.some(t => t.includes('backend')))
    )) {
      return 'Fullstack';
    } else if (techList.some(tech => 
      tech.includes('react') || 
      tech.includes('vue') || 
      tech.includes('angular') ||
      tech.includes('frontend')
    )) {
      return 'Frontend';
    } else if (techList.some(tech => 
      tech.includes('node') || 
      tech.includes('express') || 
      tech.includes('django') ||
      tech.includes('backend')
    )) {
      return 'Backend';
    } else {
      return 'Software Engineering';
    }
  };
  
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-16 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          <span className="font-mono">{'<'}</span> Projects <span className="font-mono">{'/>'}</span>
        </h2>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${
                isDarkMode ? 'border-l-2 border-[#19A7CE]' : 'border-l-2 border-[#0B409C]'
              } pl-8 pb-8`}
            >
              {/* Category Badge */}
              <div className={`absolute -left-3 top-0 ${
                isDarkMode ? 'bg-[#0E2954] text-[#19A7CE]' : 'bg-white text-[#0B409C]'
              } p-2 rounded-full border ${
                isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
              }`}>
                {getProjectIcon(project.technologies || '')}
              </div>
              
              <div className={`${
                isDarkMode ? 'bg-[#0E2954]/50' : 'bg-white'
              } rounded-lg p-6 shadow-lg border ${
                isDarkMode ? 'border-[#19A7CE]/20' : 'border-gray-100'
              }`}>
                {/* Project Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div>
                    <span className={`text-xs font-mono ${
                      isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                    }`}>
                      {categorizeProject(project.technologies || '')}
                    </span>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-[#0B409C]'
                    }`}>
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="md:ml-auto flex gap-3">
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                          isDarkMode ? 'bg-[#19A7CE]/20 text-[#19A7CE]' : 'bg-[#0B409C]/10 text-[#0B409C]'
                        } hover:bg-opacity-50 transition-colors`}
                        aria-label="View GitHub Repository"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                          isDarkMode ? 'bg-[#19A7CE]/20 text-[#19A7CE]' : 'bg-[#0B409C]/10 text-[#0B409C]'
                        } hover:bg-opacity-50 transition-colors`}
                        aria-label="View Live Demo"
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Project Image */}
                  {project.image_url && (
                    <div className="w-full md:w-2/5 relative rounded-lg overflow-hidden aspect-video">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  )}
                  
                  {/* Project Details */}
                  <div className={`w-full ${project.image_url ? 'md:w-3/5' : ''} space-y-4`}>
                    {/* Code-like description */}
                    <div className={`font-mono text-sm p-4 rounded ${
                      isDarkMode ? 'bg-[#19376D] text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Technologies */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        TECH STACK
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.split(',').map((tech, i) => (
                          <span key={i} className={`px-3 py-1 text-sm rounded-full ${
                            isDarkMode ? 'bg-[#19A7CE]/20 text-[#19A7CE]' : 'bg-[#0B409C]/10 text-[#0B409C]'
                          }`}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* View Project Button */}
                    <div className="pt-2">
                      <a 
                        href={project.live_url || project.github_url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-block px-6 py-3 rounded-lg font-medium ${
                          isDarkMode 
                            ? 'bg-[#19A7CE] text-white hover:bg-[#19A7CE]/90' 
                            : 'bg-[#0B409C] text-white hover:bg-[#0B409C]/90'
                        } transition-colors`}
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

