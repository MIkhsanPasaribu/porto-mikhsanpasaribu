import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import type { SkillCategory, Skill } from "@/db/schema";

interface SkillsSectionProps {
  categories: (SkillCategory & { skills: Skill[] })[];
}

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 bg-surface-variant">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            title="Skills"
            subtitle="Technologies and tools I work with."
          />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <AnimatedItem key={cat.id}>
              <div className="bg-surface rounded-lg p-4 border border-neutral-300/30 h-full">
                <h3 className="font-semibold text-on-surface text-sm mb-3">{cat.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-1 rounded-md bg-surface-variant text-neutral-700 text-xs border border-neutral-300/30 hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
