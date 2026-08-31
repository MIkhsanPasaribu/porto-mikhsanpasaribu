import { db } from "@/db";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { ExperienceSection } from "@/features/experience/components/ExperienceSection";
import { EducationSection } from "@/features/education/components/EducationSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ResearchSection } from "@/features/research/components/ResearchSection";
import { SkillsSection } from "@/features/skills/components/SkillsSection";
import { CertificationsSection } from "@/features/certifications/components/CertificationsSection";
import { AwardsSection } from "@/features/awards/components/AwardsSection";
import { VolunteerSection } from "@/features/volunteer/components/VolunteerSection";
import { ContactSection } from "@/features/contact/components/ContactSection";
import {
  heroInfo,
  experiences,
  educations,
  projects,
  researchProjects,
  skillCategories,
  skills,
  certifications,
  awards,
  volunteerActivities,
} from "@/db/schema";
import { eq, asc } from "drizzle-orm";

// Selalu render dinamis — data portfolio diambil dari DB saat request
export const dynamic = "force-dynamic";

async function getPortfolioData() {
  const [
    hero,
    exps,
    edus,
    projs,
    research,
    cats,
    skillItems,
    certs,
    awardItems,
    vols,
  ] = await Promise.all([
    db.query.heroInfo.findFirst({ where: eq(heroInfo.isVisible, true) }),
    db.query.experiences.findMany({
      where: eq(experiences.isVisible, true),
      orderBy: asc(experiences.order),
    }),
    db.query.educations.findMany({
      where: eq(educations.isVisible, true),
      orderBy: asc(educations.order),
    }),
    db.query.projects.findMany({
      where: eq(projects.isVisible, true),
      orderBy: asc(projects.order),
    }),
    db.query.researchProjects.findMany({
      where: eq(researchProjects.isVisible, true),
      orderBy: asc(researchProjects.order),
    }),
    db.query.skillCategories.findMany({
      where: eq(skillCategories.isVisible, true),
      orderBy: asc(skillCategories.order),
    }),
    db.query.skills.findMany({
      where: eq(skills.isVisible, true),
      orderBy: asc(skills.order),
    }),
    db.query.certifications.findMany({
      where: eq(certifications.isVisible, true),
      orderBy: asc(certifications.order),
    }),
    db.query.awards.findMany({
      where: eq(awards.isVisible, true),
      orderBy: asc(awards.order),
    }),
    db.query.volunteerActivities.findMany({
      where: eq(volunteerActivities.isVisible, true),
      orderBy: asc(volunteerActivities.order),
    }),
  ]);

  // Gabungkan skills ke kategori masing-masing
  const categoriesWithSkills = cats.map((cat) => ({
    ...cat,
    skills: skillItems.filter((s) => s.categoryId === cat.id),
  }));

  return { hero, exps, edus, projs, research, categoriesWithSkills, certs, awardItems, vols };
}

export default async function HalamanUtama() {
  const { hero, exps, edus, projs, research, categoriesWithSkills, certs, awardItems, vols } =
    await getPortfolioData();

  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-on-surface mb-2">Portfolio</h1>
          <p className="text-neutral-500 text-sm">
            Database belum di-seed. Jalankan{" "}
            <code className="font-mono bg-surface-variant px-1.5 py-0.5 rounded text-xs">
              npm run db:seed
            </code>{" "}
            setelah setup DATABASE_URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection data={hero} />
        <ExperienceSection data={exps} />
        <EducationSection data={edus} />
        <ProjectsSection data={projs} />
        <ResearchSection data={research} />
        <SkillsSection categories={categoriesWithSkills} />
        <CertificationsSection data={certs} />
        <AwardsSection data={awardItems} />
        <VolunteerSection data={vols} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
