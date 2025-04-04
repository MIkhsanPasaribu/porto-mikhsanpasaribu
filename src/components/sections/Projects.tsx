'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null; 
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  display_order: number;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Update visible count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3); // lg screens
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2); // md screens
      } else {
        setVisibleCount(1); // sm screens
      }
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make sure we're selecting from the correct table name
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (error) {
          console.error('Error fetching projects:', error);
          setError(true);
          throw error;
        }
        
        console.log('Projects data received:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          // Convert technologies from string to array if needed
          const processedData = data.map(project => {
            // Safely handle technologies field
            let techArray = [];
            try {
              if (Array.isArray(project.technologies)) {
                techArray = project.technologies;
              } else if (typeof project.technologies === 'string' && project.technologies) {
                techArray = project.technologies.split(',').map((tech: string) => tech.trim());
              } else if (project.technologies) {
                // Handle case where it might be JSON string
                techArray = JSON.parse(project.technologies);
              }
            } catch (e) {
              console.log('Error parsing technologies:', e);
            }
            
            return {
              ...project,
              technologies: techArray
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
    
    // Set up real-time subscription
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
  
  const nextSlide = () => {
    if (projects.length <= visibleCount) return;
    
    setCurrentIndex(prevIndex => {
      const maxIndex = projects.length - visibleCount;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };
  
  const prevSlide = () => {
    if (projects.length <= visibleCount) return;
    
    setCurrentIndex(prevIndex => {
      const maxIndex = projects.length - visibleCount;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };
  
  // Calculate max number of pages for pagination
  const maxPages = Math.max(1, Math.ceil((projects.length - visibleCount + 1) / 1));
  
  // Get current page number (0-indexed)
  const currentPage = Math.min(
    Math.floor(currentIndex / 1),
    maxPages - 1
  );
  
  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current?.matches(':hover')) {
        nextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [projects.length, visibleCount, currentIndex]);
  
  if (loading) {
    return (
      <section id="projects" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Projects
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
  
  if (error || projects.length === 0) {
    return <EmptySection title="Projects" message="No projects to display yet." />;
  }
  
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Projects
        </h2>
        
        <div className="relative">
          {/* Navigation Arrows - Only show if we have more projects than visible count */}
          {projects.length > visibleCount && (
            <>
              <button 
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94]' 
                    : 'bg-white text-[#10316B] hover:bg-[#0B409C] hover:text-white'
                } shadow-md focus:outline-none transition-colors duration-300`}
                aria-label="Previous project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94]' 
                    : 'bg-white text-[#10316B] hover:bg-[#0B409C] hover:text-white'
                } shadow-md focus:outline-none transition-colors duration-300`}
                aria-label="Next project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Projects Carousel */}
          <div 
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                  className={`w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-4`}
                >
                  <div className={`h-full rounded-lg overflow-hidden ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                      : 'bg-white shadow-md'
                  }`}>
                    {project.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={project.image_url} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h4 className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                      }`}>
                        {project.title}
                      </h4>
                      
                      <p className={`mb-4 ${
                        isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                      }`}>
                        {project.description}
                      </p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className={`text-xs px-2 py-1 rounded ${
                                isDarkMode 
                                  ? 'bg-[#146C94]/20 text-[#19A7CE]' 
                                  : 'bg-[#0B409C]/10 text-[#0B409C]'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-4">
                        {project.github_url && (
                          <a 
                            href={project.github_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`text-sm flex items-center ${
                              isDarkMode ? 'text-[#19A7CE] hover:text-[#146C94]' : 'text-[#0B409C] hover:text-[#10316B]'
                            }`}
                          >
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                        )}
                        
                        {project.live_url && (
                          <a 
                            href={project.live_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`text-sm flex items-center ${
                              isDarkMode ? 'text-[#19A7CE] hover:text-[#146C94]' : 'text-[#0B409C] hover:text-[#10316B]'
                            }`}
                          >
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Pagination Dots - Only show if we have more projects than visible count */}
          {projects.length > visibleCount && (
            <div className="flex justify-center mt-8">
              {Array.from({ length: maxPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`mx-1 h-2 w-2 rounded-full transition-colors duration-300 ${
                    currentPage === index
                      ? isDarkMode ? 'bg-[#19A7CE]' : 'bg-[#0B409C]'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

