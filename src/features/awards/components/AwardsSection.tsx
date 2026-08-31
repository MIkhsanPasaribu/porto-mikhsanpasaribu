import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { TrophyIcon } from "@heroicons/react/24/outline";
import type { Award } from "@/db/schema";

interface AwardsSectionProps {
  data: Award[];
}

export function AwardsSection({ data }: AwardsSectionProps) {
  return (
    <section id="awards" className="py-20 bg-surface-variant">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader title="Honors & Awards" subtitle="Recognition and achievements." />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((award) => (
            <AnimatedItem key={award.id}>
              <div className="bg-surface rounded-lg p-4 border border-neutral-300/30 hover:shadow-md transition-shadow flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <TrophyIcon className="w-5 h-5 text-tertiary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface text-sm leading-tight">{award.title}</h3>
                  {(award.issuer || award.date) && (
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {award.issuer}{award.issuer && award.date ? " · " : ""}{award.date}
                    </p>
                  )}
                  {award.description && (
                    <p className="text-neutral-700 text-xs mt-1.5 leading-relaxed">{award.description}</p>
                  )}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
