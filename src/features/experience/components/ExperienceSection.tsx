import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { cn } from "@/shared/utils/cn";
import type { Experience } from "@/db/schema";

interface ExperienceSectionProps {
  data: Experience[];
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const isPresent = !exp.endDate;
  return (
    <AnimatedItem>
      <div className="relative pl-6 pb-8 last:pb-0 border-l-2 border-neutral-300/40 dark:border-neutral-300/20 ml-3">
        {/* Timeline dot */}
        <div
          className={cn(
            "absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-surface",
            isPresent ? "bg-primary" : "bg-neutral-300"
          )}
        />

        <div className="bg-surface rounded-lg p-4 border border-neutral-300/30 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
            <div>
              <h3 className="font-semibold text-on-surface text-base">{exp.role}</h3>
              <p className="text-primary text-sm font-medium">{exp.company}</p>
            </div>
            <div className="flex flex-col sm:items-end gap-1 shrink-0">
              <span className="text-neutral-500 text-xs">
                {exp.startDate} — {exp.endDate ?? "Present"}
              </span>
              {exp.location && (
                <span className="text-neutral-500 text-xs">{exp.location}</span>
              )}
              {isPresent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                  <span className="w-1 h-1 rounded-full bg-success" />
                  Current
                </span>
              )}
            </div>
          </div>

          {exp.description.length > 0 && (
            <ul className="mt-2 space-y-1">
              {exp.description.map((item, i) => (
                <li key={i} className="flex gap-2 text-neutral-700 text-sm leading-relaxed">
                  <span className="text-primary mt-1.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AnimatedItem>
  );
}

export function ExperienceSection({ data }: ExperienceSectionProps) {
  const workExp = data.filter((e) => e.type === "work");
  const orgExp = data.filter((e) => e.type === "organization");

  return (
    <section id="experience" className="py-20 bg-surface-variant">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            title="Experience"
            subtitle="Professional work experience and organizational roles."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work experience */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
              Work
            </h3>
            <AnimatedSection stagger>
              {workExp.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </AnimatedSection>
          </div>

          {/* Organization */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
              Organizations
            </h3>
            <AnimatedSection stagger>
              {orgExp.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
