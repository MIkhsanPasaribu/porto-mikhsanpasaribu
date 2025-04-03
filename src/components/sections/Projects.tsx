'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('featured', { ascending: false });
        
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
          setProjects(data);
          setFilteredProjects(data); // Initialize filtered projects with all projects
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data
        const fallbackProjects = [
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'A full-featured e-commerce platform with payment processing, inventory management, and analytics.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image_url: '/projects/ecommerce.jpg',
            github_url: 'https://github.com/username/ecommerce',
            live_url: 'https://ecommerce-demo.com',
            featured: true
          },
          {
            id: 2,
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates and team features.',
            technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
            image_url: '/projects/taskapp.jpg',
            github_url: 'https://github.com/username/taskapp',
            live_url: 'https://taskapp-demo.com',
            featured: false
          }
        ];
        setProjects(fallbackProjects);
        setFilteredProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Get all unique technologies for filtering
  const allTechnologies = ['All', ...new Set(projects.flatMap(project => project.technologies))];
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.technologies.includes(filter)
      );
      setFilteredProjects(filtered);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
        }`}></div>
      </div>
    );
  }
  
  if (projects.length === 0) {
    return <EmptySection title="Projects" message="No projects to display." />;
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
        }`}>My Projects</h2>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => handleFilterChange(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tech
                  ? isDarkMode 
                    ? 'bg-[#19A7CE] text-[#F6F1F1]' 
                    : 'bg-[#0B409C] text-[#F2F7FF]'
                  : isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] border border-[#146C94] hover:bg-[#146C94]/30' 
                    : 'bg-[#F2F7FF] text-[#10316B] border border-[#0B409C]/20 hover:bg-[#FDBE34]/20'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
                  : 'bg-[#F2F7FF] border border-[#0B409C]/10'
              }`}
            >
              <div className="relative h-48">
                <Image
                  src={project.image_url || '/placeholder-project.jpg'}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                }`}>{project.title}</h3>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        isDarkMode 
                          ? 'bg-[#146C94]/30 text-[#F6F1F1]' 
                          : 'bg-[#FDBE34]/20 text-[#10316B]'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md ${
                        isDarkMode 
                          ? 'border-[#146C94] text-[#F6F1F1] bg-[#0A0A0A] hover:bg-[#146C94]/30' 
                          : 'border-[#0B409C]/30 text-[#10316B] bg-[#F2F7FF] hover:bg-[#FDBE34]/20'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md ${
                        isDarkMode 
                          ? 'border-[#146C94] text-[#F6F1F1] bg-[#0A0A0A] hover:bg-[#146C94]/30' 
                          : 'border-[#0B409C]/30 text-[#10316B] bg-[#F2F7FF] hover:bg-[#FDBE34]/20'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-10">
            <p className={`${isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'}`}>
              No projects found with the selected technology.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

