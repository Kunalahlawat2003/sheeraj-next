import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/components/ui/Reveal";
import ApplyModal from "@/components/careers/ApplyModal";
import { CAREER_API_BASE, type Job } from "@/lib/careerApi";

export const dynamic = "force-dynamic";

async function getJob(jobId: string): Promise<Job | null> {
  try {
    const res = await fetch(`${CAREER_API_BASE}/sheeraj-projects/job/${jobId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  return { title: job ? job.title : "Career", description: job?.description };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-32">
      <div className="container-x">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mist">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span className="text-faint">/</span>
          <Link href="/careers" className="hover:text-gold">Careers</Link>
          <span className="text-faint">/</span>
          <span className="text-silver">{job.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
          {/* main */}
          <Reveal>
            <div>
              <span className="eyebrow">{job.category}</span>
              <h1 className="mt-4 font-serif text-3xl leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                {job.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-wider">
                <span className="rounded-full bg-(--ui-surface-md) px-2.5 py-1 text-mist">
                  {job.jobType}
                </span>
                <span className="rounded-full bg-(--ui-surface-md) px-2.5 py-1 text-mist">
                  {job.workingStatus}
                </span>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/90 sm:mt-7 sm:text-lg">
                {job.description}
              </p>

              <div className="mt-8 lg:mt-10">
                <h2 className="font-serif text-xl sm:text-2xl">What you&apos;ll do</h2>
                <ul className="mt-5 space-y-3">
                  {job.Responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-mist">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 lg:mt-10">
                <h2 className="font-serif text-xl sm:text-2xl">What you&apos;ll bring</h2>
                <ul className="mt-5 space-y-3">
                  {job.Requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-mist">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 lg:hidden">
                <ApplyModal jobTitle={job.title} jobId={job.JobID} />
              </div>
            </div>
          </Reveal>

          {/* sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-6 sm:p-7">
                <div className="text-[0.7rem] uppercase tracking-wider text-gold">
                  Role at a glance
                </div>
                <dl className="mt-5 space-y-4 text-sm">
                  {[
                    ["Department", job.category],
                    ["Type", job.workingStatus],
                    ["Work mode", job.jobType],
                    ["Experience", job.experienceRequired],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between gap-4 border-b border-(--ui-border) pb-3"
                    >
                      <dt className="text-mist">{k}</dt>
                      <dd className="text-right text-silver">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 hidden lg:block">
                  <ApplyModal jobTitle={job.title} jobId={job.JobID} />
                </div>
                <Link
                  href="/careers"
                  className="mt-4 block text-center text-sm text-mist transition-colors hover:text-gold"
                >
                  ← All roles
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
