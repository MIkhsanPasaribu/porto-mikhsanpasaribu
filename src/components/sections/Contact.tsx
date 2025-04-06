/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { supabase } from '@/lib/supabase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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
    <div className={`relative ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
      {/* Background particles/network effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path 
                  d="M 20 0 L 0 0 0 20" 
                  fill="none" 
                  stroke={isDarkMode ? '#146C94' : '#0B409C'} 
                  strokeWidth="0.5" 
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </div>
      
      <ToastContainer position="top-right" theme={isDarkMode ? 'dark' : 'light'} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 font-poppins ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Get In Touch
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
          }`}>
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5"
          >
            <form
              onSubmit={handleSubmit}
              className={`rounded-lg p-6 sm:p-8 shadow-md ${
                isDarkMode ? 'bg-[#0A0A0A]/80 border border-[#146C94]/30' : 'bg-white/90 border border-[#0B409C]/10'
              }`}
            >
              <div className="mb-6">
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors
                  ${isDarkMode 
                    ? 'bg-[#1A1A1A] border-[#146C94]/30 text-white focus:ring-[#19A7CE] focus:border-[#19A7CE]' 
                    : 'bg-[#F8FAFF] border-[#0B409C]/20 text-[#10316B] focus:ring-[#0B409C] focus:border-[#0B409C]'
                  }`}
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors
                  ${isDarkMode 
                    ? 'bg-[#1A1A1A] border-[#146C94]/30 text-white focus:ring-[#19A7CE] focus:border-[#19A7CE]' 
                    : 'bg-[#F8FAFF] border-[#0B409C]/20 text-[#10316B] focus:ring-[#0B409C] focus:border-[#0B409C]'
                  }`}
                  placeholder="Your email address"
                />
              </div>
              
              {/* Added Subject Field */}
              <div className="mb-6">
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors
                  ${isDarkMode 
                    ? 'bg-[#1A1A1A] border-[#146C94]/30 text-white focus:ring-[#19A7CE] focus:border-[#19A7CE]' 
                    : 'bg-[#F8FAFF] border-[#0B409C]/20 text-[#10316B] focus:ring-[#0B409C] focus:border-[#0B409C]'
                  }`}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors
                  ${isDarkMode 
                    ? 'bg-[#1A1A1A] border-[#146C94]/30 text-white focus:ring-[#19A7CE] focus:border-[#19A7CE]' 
                    : 'bg-[#F8FAFF] border-[#0B409C]/20 text-[#10316B] focus:ring-[#0B409C] focus:border-[#0B409C]'
                  }`}
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors duration-300
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
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5"
          >
            <div className={`rounded-lg p-6 sm:p-8 h-full shadow-md ${
              isDarkMode ? 'bg-[#0A0A0A]/80 border border-[#146C94]/30' : 'bg-white/90 border border-[#0B409C]/10'
            }`}>
              <h3 className={`text-xl font-bold mb-6 font-poppins ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
              }`}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    isDarkMode ? 'bg-[#146C94]/20 text-[#19A7CE]' : 'bg-[#0B409C]/10 text-[#0B409C]'
                  }`}>
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className={`text-sm font-medium ${
                      isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                    }`}>
                      Email
                    </h4>
                    <a 
                      href="mailto:mikhsanpasaribu2@gmail.com" 
                      className={`text-base hover:underline ${
                        isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                      }`}
                    >
                      mikhsanpasaribu2@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    isDarkMode ? 'bg-[#146C94]/20 text-[#19A7CE]' : 'bg-[#0B409C]/10 text-[#0B409C]'
                  }`}>
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className={`text-sm font-medium ${
                      isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                    }`}>
                      Location
                    </h4>
                    <p className={`text-base ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                    }`}>
                      Padang, Sumatera Barat, Indonesia
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className={`text-xl font-bold mb-6 font-poppins ${
                  isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                }`}>
                  Connect With Me
                </h3>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/mikhsanpasaribu/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                        : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
                    }`}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  
                  <a 
                    href="https://github.com/mikhsanpasaribu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                        : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
                    }`}
                    aria-label="GitHub"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/mikhsanpasaribu/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                        : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
                    }`}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                  
                  <a 
                    href="https://www.facebook.com/mikhsanpasaribu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                        : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
                    }`}
                    aria-label="Facebook"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}