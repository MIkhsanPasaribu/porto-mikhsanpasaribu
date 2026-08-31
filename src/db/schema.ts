import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// ============================================================
// HELPER — kolom timestamps standar
// ============================================================
const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

// ============================================================
// HERO INFO — data utama halaman utama
// ============================================================
export const heroInfo = pgTable("hero_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  title: text("title").notNull(),           // "Backend AI Engineering Intern & Software Engineer"
  tagline: text("tagline").notNull(),       // sub-tagline singkat
  bio: text("bio").notNull(),               // paragraf about
  location: text("location").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  websiteUrl: text("website_url"),
  cvUrl: text("cv_url"),                    // link download CV
  avatarPath: text("avatar_path").default("/images/ikhsan.jpg"),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// EXPERIENCES — pengalaman kerja & organisasi
// ============================================================
export const experiences = pgTable("experiences", {
  id: uuid("id").primaryKey().defaultRandom(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  location: text("location"),
  type: text("type").notNull().default("work"), // "work" | "organization"
  startDate: text("start_date").notNull(),      // "Jun 2026"
  endDate: text("end_date"),                    // null = Present
  description: text("description").array().notNull().default([]),
  logoUrl: text("logo_url"),
  companyUrl: text("company_url"),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// EDUCATIONS — riwayat pendidikan
// ============================================================
export const educations = pgTable("educations", {
  id: uuid("id").primaryKey().defaultRandom(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  field: text("field").notNull(),
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  grade: text("grade"),
  description: text("description").array().notNull().default([]),
  logoUrl: text("logo_url"),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// PROJECTS — proyek portfolio
// ============================================================
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  role: text("role"),                           // "Lead Developer", "Full-Stack Engineer", dll
  context: text("context"),                     // "HowArts Studio / GEMASTIK"
  startDate: text("start_date"),
  endDate: text("end_date"),
  techStack: text("tech_stack").array().notNull().default([]),
  highlights: text("highlights").array().notNull().default([]),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false).notNull(),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// RESEARCH PROJECTS — publikasi & riset
// ============================================================
export const researchProjects = pgTable("research_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  role: text("role"),
  event: text("event"),                         // "AMD Developer Hackathon 2026"
  track: text("track"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  description: text("description").notNull(),
  highlights: text("highlights").array().notNull().default([]),
  techStack: text("tech_stack").array().notNull().default([]),
  githubUrl: text("github_url"),
  submissionUrl: text("submission_url"),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// SKILL CATEGORIES — grouping skills
// ============================================================
export const skillCategories = pgTable("skill_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),               // "Programming Languages"
  icon: text("icon"),                         // heroicon name
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// SKILLS — individual skill items
// ============================================================
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => skillCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  level: integer("level"),                    // 1-5, optional
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// CERTIFICATIONS
// ============================================================
export const certifications = pgTable("certifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  credentialId: text("credential_id"),
  issueDate: text("issue_date"),
  expiryDate: text("expiry_date"),
  verifyUrl: text("verify_url"),
  logoUrl: text("logo_url"),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// AWARDS & HONORS
// ============================================================
export const awards = pgTable("awards", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  issuer: text("issuer"),
  date: text("date"),
  description: text("description"),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// VOLUNTEER & COMMUNITY
// ============================================================
export const volunteerActivities = pgTable("volunteer_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  organization: text("organization").notNull(),
  role: text("role").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  description: text("description"),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

// ============================================================
// TYPE EXPORTS — untuk digunakan di server actions & UI
// ============================================================
export type HeroInfo = typeof heroInfo.$inferSelect;
export type NewHeroInfo = typeof heroInfo.$inferInsert;

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;

export type Education = typeof educations.$inferSelect;
export type NewEducation = typeof educations.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type ResearchProject = typeof researchProjects.$inferSelect;
export type NewResearchProject = typeof researchProjects.$inferInsert;

export type SkillCategory = typeof skillCategories.$inferSelect;
export type NewSkillCategory = typeof skillCategories.$inferInsert;

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;

export type Certification = typeof certifications.$inferSelect;
export type NewCertification = typeof certifications.$inferInsert;

export type Award = typeof awards.$inferSelect;
export type NewAward = typeof awards.$inferInsert;

export type VolunteerActivity = typeof volunteerActivities.$inferSelect;
export type NewVolunteerActivity = typeof volunteerActivities.$inferInsert;
