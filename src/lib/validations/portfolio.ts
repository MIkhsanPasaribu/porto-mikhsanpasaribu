import { z } from "zod";

// ============================================================
// EXPERIENCE SCHEMA
// ============================================================
export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().optional(),
  type: z.enum(["work", "organization"]).default("work"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.array(z.string()).default([]),
  logoUrl: z.string().url().optional().or(z.literal("")),
  companyUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// EDUCATION SCHEMA
// ============================================================
export const educationSchema = z.object({
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  grade: z.string().optional(),
  description: z.array(z.string()).default([]),
  logoUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// PROJECT SCHEMA
// ============================================================
export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  subtitle: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  role: z.string().optional(),
  context: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// RESEARCH PROJECT SCHEMA
// ============================================================
export const researchProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  role: z.string().optional(),
  event: z.string().optional(),
  track: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  highlights: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  submissionUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// SKILL CATEGORY SCHEMA
// ============================================================
export const skillCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// SKILL SCHEMA
// ============================================================
export const skillSchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  name: z.string().min(1, "Skill name is required"),
  level: z.number().int().min(1).max(5).optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// CERTIFICATION SCHEMA
// ============================================================
export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  credentialId: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  verifyUrl: z.string().url().optional().or(z.literal("")),
  logoUrl: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// AWARD SCHEMA
// ============================================================
export const awardSchema = z.object({
  title: z.string().min(1, "Award title is required"),
  issuer: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// VOLUNTEER SCHEMA
// ============================================================
export const volunteerSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

// ============================================================
// HERO INFO SCHEMA
// ============================================================
export const heroInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  tagline: z.string().min(1, "Tagline is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  cvUrl: z.string().url().optional().or(z.literal("")),
  avatarPath: z.string().optional(),
  isVisible: z.boolean().default(true),
});

// ============================================================
// LOGIN SCHEMA
// ============================================================
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Inferred types dari schema
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ResearchProjectInput = z.infer<typeof researchProjectSchema>;
export type SkillCategoryInput = z.infer<typeof skillCategorySchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type AwardInput = z.infer<typeof awardSchema>;
export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type HeroInfoInput = z.infer<typeof heroInfoSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
