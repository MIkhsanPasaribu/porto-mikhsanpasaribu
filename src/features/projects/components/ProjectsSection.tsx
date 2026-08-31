"use client";

import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { cn } from "@/shared/utils/cn";
import type { Project } from "@/db/schema";

interface ProjectsSectionProps {
  data: Project[];
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
      {name}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <AnimatedItem>
      <motion.div
        className={cn(
          "bg-surface rounded-lg p-5 border border-neutral-300/30 h-full flex flex-col",
          "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        )}
        whileHover={{ scale: 1.005 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-on-surface text-base leading-tight">
                {project.title}
              </h3>
              {project.featured && (
                <span className="px-1.5 py-0.5 rounded-md bg-tertiary/20 text-tertiary text-xs font-semibold">
                  Featured
                </span>
              )}
            </div>
            {project.subtitle && (
              <p className="text-neutral-500 text-xs mt-0.5">{project.subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="p-1.5 rounded-md text-neutral-500 hover:text-primary hover:bg-surface-variant transition-colors"
              >
                <CodeBracketIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="p-1.5 rounded-md text-neutral-500 hover:text-primary hover:bg-surface-variant transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Meta */}
        {(project.role || project.context || project.startDate) && (
          <div className="flex flex-wrap gap-2 mb-3 text-xs text-neutral-500">
            {project.role && <span>{project.role}</span>}
            {project.context && <span>· {project.context}</span>}
            {project.startDate && (
              <span>· {project.startDate}{project.endDate ? ` — ${project.endDate}` : " — Present"}</span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-neutral-700 text-sm leading-relaxed mb-3 flex-1">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <ul className="mb-3 space-y-1">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex gap-1.5 text-neutral-700 text-xs">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-neutral-300/20">
            {project.techStack.slice(0, 6).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
            {project.techStack.length > 6 && (
              <span className="text-neutral-500 text-xs py-0.5">
                +{project.techStack.length - 6} more
              </span>
            )}
          </div>
        )}
      </motion.div>
    </AnimatedItem>
  );
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const featured = data.filter((p) => p.featured);
  const others = data.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            title="Projects"
            subtitle="A selection of projects I've built — from AI systems to web platforms."
          />
        </AnimatedSection>

        {featured.length > 0 && (
          <>
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Featured
            </h3>
            <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatedSection>
          </>
        )}

        {others.length > 0 && (
          <>
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Other Projects
            </h3>
            <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatedSection>
          </>
        )}
      </div>
    </section>
  );
}
