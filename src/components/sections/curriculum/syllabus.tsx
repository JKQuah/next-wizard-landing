import { Reveal } from "@/components/motion/reveal";
import { SyllabusExplorer } from "@/components/sections/curriculum/syllabus-explorer";
import type { Dictionary } from "@/i18n/get-dictionary";

export function CurriculumSyllabus({ dict }: { dict: Dictionary }) {
  const { syllabus } = dict.curriculumPage;

  return (
    <section id="syllabus" className="bg-muted py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal as="h2" className="text-3xl leading-tight font-extrabold text-primary md:text-4xl">
          {syllabus.title}
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <SyllabusExplorer syllabus={syllabus} levelLabels={dict.levels.items} />
        </Reveal>
      </div>
    </section>
  );
}
