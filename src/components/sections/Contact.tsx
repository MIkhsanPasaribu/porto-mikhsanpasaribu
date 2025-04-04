/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Here you would normally send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Get In Touch
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${
            isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
          }`}>
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${
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
                  className={`mt-1 block w-full rounded-md shadow-sm py-3 px-4 ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94] text-[#F6F1F1] focus:border-[#19A7CE]' 
                      : 'bg-white border-gray-300 text-[#10316B] focus:border-[#0B409C]'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDarkMode ? 'focus:ring-[#19A7CE]' : 'focus:ring-[#0B409C]'
                  }`}
                />
              </div>
              
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${
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
                  className={`mt-1 block w-full rounded-md shadow-sm py-3 px-4 ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94] text-[#F6F1F1] focus:border-[#19A7CE]' 
                      : 'bg-white border-gray-300 text-[#10316B] focus:border-[#0B409C]'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDarkMode ? 'focus:ring-[#19A7CE]' : 'focus:ring-[#0B409C]'
                  }`}
                />
              </div>
              
              <div>
                <label htmlFor="message" className={`block text-sm font-medium ${
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
                  className={`mt-1 block w-full rounded-md shadow-sm py-3 px-4 ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94] text-[#F6F1F1] focus:border-[#19A7CE]' 
                      : 'bg-white border-gray-300 text-[#10316B] focus:border-[#0B409C]'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDarkMode ? 'focus:ring-[#19A7CE]' : 'focus:ring-[#0B409C]'
                  }`}
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isDarkMode 
                      ? 'bg-[#19A7CE] hover:bg-[#146C94]' 
                      : 'bg-[#0B409C] hover:bg-[#10316B]'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDarkMode ? 'focus:ring-[#19A7CE]' : 'focus:ring-[#0B409C]'
                  } transition-colors duration-200 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-100 text-green-700 rounded-md"
                >
                  Your message has been sent successfully!
                </motion.div>
              )}
              
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-100 text-red-700 rounded-md"
                >
                  {submitError}
                </motion.div>
              )}
            </form>
          </motion.div>
          
          {/* Contact Info & Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`rounded-lg p-6 ${
              isDarkMode 
                ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                : 'bg-white shadow-md'
            }`}
          >
            <h3 className={`text-xl font-semibold mb-6 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              Contact Information
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className={`mt-1 mr-3 ${
                  isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>
                    Email
                  </p>
                  <a 
                    href="mailto:mikhsanpasaribu2@gmail.com" 
                    className={`text-sm ${
                      isDarkMode ? 'text-[#F6F1F1]/80 hover:text-[#19A7CE]' : 'text-[#10316B]/80 hover:text-[#0B409C]'
                    } transition-colors duration-200`}
                  >
                    mikhsanpasaribu2@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`mt-1 mr-3 ${
                  isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>
                    Location
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>
                    Padang, Sumatera Barat, Indonesia
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              Connect With Me
            </h3>
            
            <div className="flex gap-4">
              <motion.a 
                href="https://linkedin.com/in/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </motion.a>
              
              <motion.a 
                href="https://github.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </motion.a>
              
              <motion.a 
                href="https://instagram.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </motion.a>
              
              <motion.a 
                href="https://facebook.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}