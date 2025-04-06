/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { supabase } from '@/lib/supabase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert data into Supabase contacts table
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        console.error('Error submitting contact form:', error);
        toast.error('Failed to submit your message. Please try again later.');
        throw error;
      }
      
      // Success
      toast.success('Your message has been sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error in contact form submission:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" theme={isDarkMode ? 'dark' : 'light'} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">Contact Me</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </motion.div>
      
      <div className="max-w-3xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#0A0A0A] rounded-lg shadow-md p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none
                dark:bg-[#1A1A1A] dark:border-[#333] dark:text-white
                focus:ring-blue-500 dark:focus:ring-[#19A7CE]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none
                dark:bg-[#1A1A1A] dark:border-[#333] dark:text-white
                focus:ring-blue-500 dark:focus:ring-[#19A7CE]"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none
              dark:bg-[#1A1A1A] dark:border-[#333] dark:text-white
              focus:ring-blue-500 dark:focus:ring-[#19A7CE]"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none
              dark:bg-[#1A1A1A] dark:border-[#333] dark:text-white
              focus:ring-blue-500 dark:focus:ring-[#19A7CE]"
            ></textarea>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-md text-white font-medium transition-colors duration-300
              ${isDarkMode 
                ? 'bg-[#19A7CE] hover:bg-[#146C94]' 
                : 'bg-[#0B409C] hover:bg-[#10316B]'
              } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Message'}
            </button>
          </div>
        </motion.form>
        
        {/* Social Media Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <h3 className="text-xl font-medium mb-4 font-poppins">Connect With Me</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/mikhsanpasaribu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl transition-colors duration-300 ${
                isDarkMode ? 'text-[#F6F1F1] hover:text-[#19A7CE]' : 'text-[#10316B] hover:text-[#0B409C]'
              }`}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com/mikhsanpasaribu" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl transition-colors duration-300 ${
                isDarkMode ? 'text-[#F6F1F1] hover:text-[#19A7CE]' : 'text-[#10316B] hover:text-[#0B409C]'
              }`}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.instagram.com/mikhsanpasaribu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl transition-colors duration-300 ${
                isDarkMode ? 'text-[#F6F1F1] hover:text-[#19A7CE]' : 'text-[#10316B] hover:text-[#0B409C]'
              }`}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.facebook.com/mikhsanpasaribu" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl transition-colors duration-300 ${
                isDarkMode ? 'text-[#F6F1F1] hover:text-[#19A7CE]' : 'text-[#10316B] hover:text-[#0B409C]'
              }`}
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}