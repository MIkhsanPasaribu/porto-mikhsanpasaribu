/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaDownload } from 'react-icons/fa';
import { HiCode, HiDatabase, HiChip } from 'react-icons/hi';

export default function AboutSection() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background code pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 text-xs md:text-sm font-mono">
          {Array(20).fill(0).map((_, i) => (
            <div key={i} className="opacity-20">
              {'{'}
              {Array(Math.floor(Math.random() * 10) + 1).fill(0).map((_, j) => (
                <span key={j} className="ml-4">const {String.fromCharCode(97 + Math.floor(Math.random() * 26))} = {Math.random().toString(36).substring(2, 8)};</span>
              ))}
              {'}'}
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          {/* Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-2/5 flex justify-center"
          >
            <div className={`relative rounded-xl overflow-hidden w-64 h-80 md:w-80 md:h-96 ${
              isDarkMode ? 'shadow-[0_0_30px_rgba(25,167,206,0.3)]' : 'shadow-[0_0_30px_rgba(11,64,156,0.2)]'
            }`}>
              <Image
                src="/profile.jpg" 
                alt="M. Ikhsan Pasaribu"
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating tech icons */}
              <motion.div 
                className="absolute -top-5 -left-5 p-3 rounded-full bg-blue-500 text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <HiCode size={24} />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-5 -left-5 p-3 rounded-full bg-purple-500 text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              >
                <HiDatabase size={24} />
              </motion.div>
              
              <motion.div 
                className="absolute -top-5 -right-5 p-3 rounded-full bg-green-500 text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              >
                <HiChip size={24} />
              </motion.div>
            </div>
          </motion.div>
          
          {/* About Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-3/5"
          >
            <motion.h2 
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-green-400 font-light mb-6"
            >
              Hello!
            </motion.div>
            
            <div className="space-y-4 mb-8">
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="font-semibold min-w-24">Name:</span>
                <span>M. Ikhsan Pasaribu</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="font-semibold min-w-24">Email:</span>
                <span>mikhsanpasaribu2@gmail.com</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="font-semibold min-w-24">Location:</span>
                <span>Padang, Sumatera Barat, Indonesia</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="font-semibold min-w-24">Status:</span>
                <span>College Student at Universitas Negeri Padang</span>
              </motion.div>
            </div>
            
            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <a 
                href="/resume.pdf" 
                download
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#19A7CE] hover:bg-[#146C94] text-white' 
                    : 'bg-[#0B409C] hover:bg-[#10316B] text-white'
                } transition-colors duration-300`}
              >
                <FaDownload />
                Download CV
              </a>
            </motion.div>
            
            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex gap-4"
            >
              <motion.a 
                href="https://linkedin.com/in/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94]' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white'
                } transition-colors duration-300`}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </motion.a>
              
              <motion.a 
                href="https://github.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94]' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white'
                } transition-colors duration-300`}
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </motion.a>
              
              <motion.a 
                href="https://instagram.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94]' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white'
                } transition-colors duration-300`}
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </motion.a>
              
              <motion.a 
                href="https://facebook.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94]' 
                    : 'bg-[#F2F7FF] text-[#10316B] hover:bg-[#0B409C] hover:text-white'
                } transition-colors duration-300`}
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Developer Role Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`px-6 py-4 rounded-lg ${
              isDarkMode 
                ? 'bg-[#0A0A0A] border border-[#146C94]' 
                : 'bg-white shadow-md'
            }`}
          >
            <div className="text-blue-500 mb-2">
              <HiCode size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-1">Software Developer</h3>
            <p className="text-sm opacity-75">Building robust applications with clean, efficient code</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className={`px-6 py-4 rounded-lg ${
              isDarkMode 
                ? 'bg-[#0A0A0A] border border-[#146C94]' 
                : 'bg-white shadow-md'
            }`}
          >
            <div className="text-purple-500 mb-2">
              <HiDatabase size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-1">Full-Stack Developer</h3>
            <p className="text-sm opacity-75">Creating seamless experiences from frontend to backend</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`px-6 py-4 rounded-lg ${
              isDarkMode 
                ? 'bg-[#0A0A0A] border border-[#146C94]' 
                : 'bg-white shadow-md'
            }`}
          >
            <div className="text-green-500 mb-2">
              <HiChip size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-1">AI Engineer & Enthusiast</h3>
            <p className="text-sm opacity-75">Exploring the frontiers of artificial intelligence</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}