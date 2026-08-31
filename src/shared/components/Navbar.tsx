"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/shared/utils/cn";

// Navigasi items untuk one-page portfolio
const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Glassmorphism effect aktif setelah scroll 50px
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-neutral-300/30 dark:border-neutral-300/10 shadow-sm"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link
            href="/"
            className="text-on-surface font-semibold text-base tracking-tight hover:text-primary transition-colors"
          >
            Mikhsan<span className="text-primary">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 hover:text-primary dark:hover:text-primary hover:bg-surface-variant dark:hover:bg-surface-variant rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-md text-neutral-700 hover:text-primary hover:bg-surface-variant transition-colors"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <motion.div
            className="md:hidden pb-4 border-t border-neutral-300/30 dark:border-neutral-300/10 mt-1"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-700 hover:text-primary hover:bg-surface-variant dark:hover:bg-surface-variant rounded-md transition-colors mt-1"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
