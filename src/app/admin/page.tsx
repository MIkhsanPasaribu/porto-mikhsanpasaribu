import { db } from "@/db";
import {
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
import { sql } from "drizzle-orm";
import Link from "next/link";

async function getStats() {
  const [
    expCount,
    eduCount,
    projCount,
    resCount,
    catCount,
    skillCount,
    certCount,
    awardCount,
    volCount,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(experiences),
    db.select({ count: sql<number>`count(*)` }).from(educations),
    db.select({ count: sql<number>`count(*)` }).from(projects),
    db.select({ count: sql<number>`count(*)` }).from(researchProjects),
    db.select({ count: sql<number>`count(*)` }).from(skillCategories),
    db.select({ count: sql<number>`count(*)` }).from(skills),
    db.select({ count: sql<number>`count(*)` }).from(certifications),
    db.select({ count: sql<number>`count(*)` }).from(awards),
    db.select({ count: sql<number>`count(*)` }).from(volunteerActivities),
  ]);

  return {
    experiences: Number(expCount[0].count),
    educations: Number(eduCount[0].count),
    projects: Number(projCount[0].count),
    research: Number(resCount[0].count),
    skillCategories: Number(catCount[0].count),
    skills: Number(skillCount[0].count),
    certifications: Number(certCount[0].count),
    awards: Number(awardCount[0].count),
    volunteer: Number(volCount[0].count),
  };
}

const sections = [
  { label: "Hero Info", href: "/admin/hero", key: null },
  { label: "Pengalaman", href: "/admin/experience", key: "experiences" },
  { label: "Pendidikan", href: "/admin/education", key: "educations" },
  { label: "Proyek", href: "/admin/projects", key: "projects" },
  { label: "Riset", href: "/admin/research", key: "research" },
  { label: "Keahlian", href: "/admin/skills", key: "skills" },
  { label: "Sertifikasi", href: "/admin/certifications", key: "certifications" },
  { label: "Penghargaan", href: "/admin/awards", key: "awards" },
  { label: "Relawan", href: "/admin/volunteer", key: "volunteer" },
];

export default async function HalamanDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-on-surface">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Kelola konten portfolio Anda.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Pengalaman", count: stats.experiences },
          { label: "Pendidikan", count: stats.educations },
          { label: "Proyek", count: stats.projects },
          { label: "Riset", count: stats.research },
          { label: "Kategori Keahlian", count: stats.skillCategories },
          { label: "Keahlian", count: stats.skills },
          { label: "Sertifikasi", count: stats.certifications },
          { label: "Penghargaan", count: stats.awards },
          { label: "Relawan", count: stats.volunteer },
        ].map(({ label, count }) => (
          <div
            key={label}
            className="bg-surface border border-neutral-300/30 rounded-lg p-4"
          >
            <p className="text-2xl font-bold text-primary">{count}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
        Kelola Konten
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sections.map(({ label, href, key }) => (
          <Link
            key={href}
            href={href}
            className="bg-surface border border-neutral-300/30 rounded-lg p-4 hover:border-primary/30 hover:shadow-sm transition-all flex items-center justify-between group"
          >
            <div>
              <p className="font-medium text-on-surface text-sm">{label}</p>
              {key && (
                <p className="text-xs text-neutral-500 mt-0.5">
                  {stats[key as keyof typeof stats]} item
                </p>
              )}
            </div>
            <span className="text-neutral-400 group-hover:text-primary transition-colors text-lg">
              →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-sm text-on-surface font-medium mb-1">
          Lihat Portfolio
        </p>
        <p className="text-xs text-neutral-500 mb-3">
          Buka halaman publik untuk melihat hasil perubahan.
        </p>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          Buka Portfolio ↗
        </Link>
      </div>
    </div>
  );
}
