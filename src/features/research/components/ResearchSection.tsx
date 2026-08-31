import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import type { ResearchProject } from "@/db/schema";

interface ResearchSectionProps {
  data: ResearchProject[];
}

export function ResearchSection({ data }: ResearchSectionProps) {
  return (
    <section id="research" className="py-20 bg-surface-variant">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            title="Research & Competitions"
            subtitle="Academic projects, hackathons, and competition submissions."
          />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.map((res) => (
            <AnimatedItem key={res.id}>
              <div className="bg-surface rounded-lg p-5 border border-neutral-300/30 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-on-surface text-sm leading-tight">{res.title}</h3>
                    {res.event && (
                      <p className="text-secondary text-xs mt-0.5">{res.event}</p>
                    )}
                    {res.role && (
                      <p className="text-neutral-500 text-xs mt-0.5">{res.role}</p>
                    )}
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {res.githubUrl && (
                      <a
                        href={res.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                        className="p-1.5 rounded-md text-neutral-500 hover:text-primary hover:bg-surface-variant transition-colors"
                      >
                        <CodeBracketIcon className="w-4 h-4" />
                      </a>
                    )}
                    {res.submissionUrl && (
                      <a
                        href={res.submissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Submission link"
                        className="p-1.5 rounded-md text-neutral-500 hover:text-primary hover:bg-surface-variant transition-colors"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-neutral-700 text-sm leading-relaxed mb-3 flex-1">
                  {res.description}
                </p>

                {res.highlights.length > 0 && (
                  <ul className="space-y-1 mb-3">
                    {res.highlights.map((h, i) => (
                      <li key={i} className="flex gap-1.5 text-xs text-neutral-700">
                        <span className="text-secondary mt-0.5 shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {res.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-neutral-300/20 mt-auto">
                    {res.techStack.slice(0, 5).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
