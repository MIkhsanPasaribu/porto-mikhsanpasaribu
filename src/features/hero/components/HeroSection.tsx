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

// SVG icons untuk sosial media
function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconEmail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

export function HeroSection({ data }: HeroSectionProps) {
  const socialLinks = [
    data.githubUrl && {
      href: data.githubUrl,
      label: "GitHub",
      icon: IconGitHub,
    },
    data.linkedinUrl && {
      href: data.linkedinUrl,
      label: "LinkedIn",
      icon: IconLinkedIn,
    },
    data.email && {
      href: `mailto:${data.email}`,
      label: "Email",
      icon: IconEmail,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ElementType }[];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-surface-variant" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Text side ── */}
          <div className="order-2 lg:order-1">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface leading-[1.1] tracking-tight mb-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.name}
            </motion.h1>

            {/* Title */}
            <motion.p
              className="text-lg sm:text-xl text-primary font-semibold mb-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.title}
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="text-neutral-500 text-base leading-relaxed mb-4 max-w-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.tagline}
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center gap-1.5 text-neutral-500 text-sm mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <MapPinIcon className="w-4 h-4 shrink-0" />
              <span>{data.location}</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <EnvelopeIcon className="w-4 h-4" />
                Hubungi Saya
              </a>
              {data.cvUrl && (
                <a
                  href={data.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300/60 text-on-surface text-sm font-semibold hover:bg-surface-variant transition-colors"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download CV
                </a>
              )}
            </motion.div>

            {/* Social links dengan ikon */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-300/50 text-neutral-500 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}

            </motion.div>
          </div>

          {/* ── Avatar side ── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-xl" />

              {/* Avatar circle */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src={data.avatarPath ?? "/images/ikhsan.jpg"}
                  alt={`${data.name} profile photo`}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Decorative floating badge */}
              <motion.div
                className="absolute -bottom-3 -left-3 bg-surface border border-neutral-300/30 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-lg">🎓</span>
                <div>
                  <p className="text-xs font-semibold text-on-surface leading-tight">Informatics</p>
                  <p className="text-xs text-neutral-500 leading-tight">UNP Padang</p>
                </div>
              </motion.div>

              {/* Decorative dot ring */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-primary/15 -z-10" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-neutral-400 text-xs">scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-neutral-400 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
