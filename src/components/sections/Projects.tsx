'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  order: number;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order', { ascending: true });
        
        if (error) throw error;
        
        setProjects(data || []);
        setFilteredProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data
        const fallbackProjects = [
          {
            id: 1,
            title: 'AI-Powered Chatbot',
            description: 'A conversational AI chatbot built with natural language processing capabilities.',
            image_url: '/projects/chatbot.jpg',
            technologies: ['Python', 'TensorFlow', 'NLP', 'Flask'],
            github_url: 'https://github.com/example/chatbot',
            live_url: 'https://example.com/chatbot',
            order: 1
          },
          {
            id: 2,
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform with payment integration and inventory management.',
            image_url: '/projects/ecommerce.jpg',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github_url: 'https://github.com/example/ecommerce',
            live_url: 'https://example.com/ecommerce',
            order: 2
          },
          {
            id: 3,
            title: 'Data Visualization Dashboard',
            description: 'Interactive dashboard for visualizing complex datasets with filtering capabilities.',
            image_url: '/projects/dashboard.jpg',
            technologies: ['D3.js', 'React', 'TypeScript', 'Firebase'],
            github_url: 'https://github.com/example/dashboard',
            live_url: 'https://example.com/dashboard',
            order: 3
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
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => handleFilterChange(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tech
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
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
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded"
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
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Code
                    </a>
                  )}
                  
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
            <p className="text-gray-500">No projects found with the selected technology.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}