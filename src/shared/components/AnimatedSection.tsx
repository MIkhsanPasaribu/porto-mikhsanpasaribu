"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  // Animasi stagger untuk list items
  stagger?: boolean;
}

// Varian animasi untuk section wrapper
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Varian untuk stagger children
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Wrapper untuk animasi scroll reveal per section
export function AnimatedSection({
  children,
  className,
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainerVariants : sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

// Item untuk stagger list
export function AnimatedItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
