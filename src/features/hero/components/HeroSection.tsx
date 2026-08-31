"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import type { HeroInfo } from "@/db/schema";

interface HeroSectionProps {
  data: HeroInfo;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-surface-variant -z-10" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-on-surface leading-tight mb-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.name}
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-primary font-medium mb-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.title}
            </motion.p>

            <motion.p
              className="text-neutral-500 text-base leading-relaxed mb-6 max-w-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.tagline}
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center gap-1.5 text-neutral-500 text-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <MapPinIcon className="w-4 h-4" aria-hidden="true" />
              <span>{data.location}</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-md shadow-primary/20"
              >
                <EnvelopeIcon className="w-4 h-4" aria-hidden="true" />
                Contact Me
              </Link>

              {data.cvUrl && (
                <a
                  href={data.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-300 text-on-surface rounded-xl text-sm font-medium hover:bg-surface-variant transition-colors"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" aria-hidden="true" />
                  Download CV
                </a>
              )}
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {data.linkedinUrl && (
                <a
                  href={data.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary text-sm transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {data.githubUrl && (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary text-sm transition-colors"
                >
                  GitHub
                </a>
              )}
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="text-neutral-500 hover:text-primary text-sm transition-colors"
                >
                  {data.email}
                </a>
              )}
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-neutral-300/30 shadow-xl">
                <Image
                  src={data.avatarPath ?? "/images/avatar.jpg"}
                  alt={`${data.name} profile photo`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-2xl border border-primary/20 -z-10" />
              <div className="absolute -inset-6 rounded-2xl border border-primary/10 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
