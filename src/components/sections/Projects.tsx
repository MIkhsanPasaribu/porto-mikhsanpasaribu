/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaRobot, FaBrain } from 'react-icons/fa';

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string | null;
  github_url: string | null;
  live_url: string | null;
  order: number;
}

export default function ProjectsSection() {
  // Client-side rendering state
  const [mounted, setMounted] = useState(false);
  
  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Theme
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Set mounted state on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch projects data
  useEffect(() => {
    let isMounted = true;
    
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order', { ascending: true });
        
        if (error) {
          console.error('Error fetching projects:', error);
          if (isMounted) setError(true);
          return;
        }
        
        if (data && Array.isArray(data) && isMounted) {
          // Process technologies to ensure consistent format
          const processedData = data.map(project => {
            let techString = project.technologies;
            
            // Handle null technologies
            if (techString === null || techString === undefined) {
              return { ...project, technologies: null };
            }
            
            // Handle JSON strings safely
            if (typeof techString === 'string') {
              try {
                // Check if it's a JSON string
                if (techString.trim().startsWith('[') || techString.trim().startsWith('{')) {
                  const parsed = JSON.parse(techString);
                  if (Array.isArray(parsed)) {
                    techString = parsed.join(',');
                  } else if (typeof parsed === 'object' && parsed !== null) {
                    techString = Object.values(parsed).join(',');
                  }
                }
              } catch (e) {
                console.error('Error parsing technologies JSON:', e);
                // Keep original string if parsing fails
              }
            } else if (Array.isArray(techString)) {
              // Handle if it's already an array
              techString = techString.join(',');
            } else if (typeof techString === 'object' && techString !== null) {
              // Handle if it's already an object
              techString = Object.values(techString).join(',');
            }
            
            return {
              ...project,
              technologies: typeof techString === 'string' ? techString : null
            };
          });
          
          setProjects(processedData);
        } else if (isMounted) {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error in projects fetch:', err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchProjects();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('projects-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, fetchProjects)
      .subscribe();
    
    return () => {
      isMounted = false;
      supabase.removeChannel(subscription);
    };
  }, []);

  // Helper functions
  const getProjectIcon = (technologies: string | null) => {
    if (!technologies) return <FaRobot className="text-2xl" />;
    
    const techList = technologies.toLowerCase().split(',').map(t => t.trim());
    
    if (techList.some(tech => 
      tech.includes('ai') || 
      tech.includes('ml') || 
      tech.includes('tensorflow') || 
      tech.includes('pytorch')
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

  const categorizeProject = (technologies: string | null) => {
    if (!technologies) return 'Software Engineering';
    
    const techList = technologies.toLowerCase().split(',').map(t => t.trim());
    
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

  // Loading state
  if (!mounted || loading) {
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

  // Error or empty state
  if (error || projects.length === 0) {
    return (
      <section id="projects" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            <span className="font-mono">{''}</span> Projects <span className="font-mono">{''}</span>
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

  // Render projects with horizontal scrolling
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-16 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          <span className="font-mono">{''}</span> Projects <span className="font-mono">{''}</span>
        </h2>
        
        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-8 hide-scrollbar">
            <div className="flex space-x-6 px-4 w-max">
              {projects.map((project) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`flex-shrink-0 w-[300px] md:w-[350px] rounded-xl overflow-hidden ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
                      : 'bg-white shadow-lg'
                  }`}
                >
                  {/* Project Image */}
                  {project.image_url && (
                    <div className="relative w-full h-[180px]">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 300px, 350px"
                        onError={() => console.error(`Failed to load image for project: ${project.title}`)}
                      />
                      <div className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full ${
                        isDarkMode ? 'bg-[#0A0A0A]/90 text-[#19A7CE]' : 'bg-white/90 text-[#0B409C]'
                      }`}>
                        {categorizeProject(project.technologies)}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Project Title */}
                    <h3 className={`text-xl font-bold mb-3 ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-[#0B409C]'
                    }`}>
                      {project.title}
                    </h3>
                    
                    {/* Description - Truncated */}
                    <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.split(',').filter(Boolean).slice(0, 3).map((tech, i) => (
                          <span key={i} className={`px-2 py-1 text-xs rounded-full ${
                            isDarkMode ? 'bg-[#19A7CE]/20 text-[#19A7CE]' : 'bg-[#0B409C]/10 text-[#0B409C]'
                          }`}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Links */}
                    <div className="flex gap-3 mt-4">
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
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          // Implement modal or detailed view here
                          console.log('View details for:', project.title);
                        }}
                        className={`ml-auto p-2 rounded-full ${
                          isDarkMode ? 'bg-[#19A7CE]/20 text-[#19A7CE]' : 'bg-[#0B409C]/10 text-[#0B409C]'
                        } hover:bg-opacity-50 transition-colors`}
                        aria-label="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Add custom scrollbar or navigation arrows here if needed */}
        </div>
        
        {/* Add this CSS to hide the scrollbar but keep functionality */}
        <style jsx global>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}

