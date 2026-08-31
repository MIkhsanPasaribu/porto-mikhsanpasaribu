import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import type { Education } from "@/db/schema";

interface EducationSectionProps {
  data: Education[];
}

export function EducationSection({ data }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader title="Education" />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((edu) => (
            <AnimatedItem key={edu.id}>
              <div className="bg-surface rounded-lg p-5 border border-neutral-300/30 hover:shadow-md transition-shadow h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-on-surface text-base">{edu.institution}</h3>
                    <p className="text-primary text-sm font-medium mt-0.5">
                      {edu.degree}, {edu.field}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-neutral-500 text-xs">
                      {edu.startDate} — {edu.endDate ?? "Present"}
                    </p>
                    {edu.location && (
                      <p className="text-neutral-500 text-xs mt-0.5">{edu.location}</p>
                    )}
                  </div>
                </div>

                {edu.grade && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/10 text-success text-xs font-medium mb-3">
                    GPA / Score: {edu.grade}
                  </div>
                )}

                {edu.description.length > 0 && (
                  <ul className="space-y-1 mt-2">
                    {edu.description.map((item, i) => (
                      <li key={i} className="flex gap-2 text-neutral-700 text-sm">
                        <span className="text-primary mt-1 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
