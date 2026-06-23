import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { media } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Highways, canals, bridges, government EPC and our flagship Andaman island resort.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }]}
        title={<>Built to <span className="text-gold-gradient italic">outlast</span> us.</>}
        subtitle="A portfolio spanning national corridors, canals and bridges — and a new chapter of island hospitality."
        image={media.heroImage}
      >
        <MagneticButton href="/contact">Start a project</MagneticButton>
      </PageHero>

      <section className="pb-16 sm:pb-24 lg:pb-28">
        <div className="container-x">
          <ProjectsExplorer />
        </div>
      </section>
    </>
  );
}
