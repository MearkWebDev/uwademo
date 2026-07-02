import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { openRoles } from "@/data/site";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Work with UWA India — Careers at a Top 100 university" },
      { name: "description", content: "Join UWA India as we bring world-class Australian education to Mumbai and Chennai. Explore open academic and professional roles." },
      { property: "og:title", content: "Careers at UWA India" },
      { property: "og:description", content: "Help build one of Australia's most respected universities in one of the world's fastest-growing education markets." },
    ],
  }),
  component: Careers,
});

function Careers() {
  return (
    <>
      <section className="relative bg-primary pt-40 pb-16 text-primary-foreground lg:pt-52 lg:pb-24">
        <div className="bg-grid-ink pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span> Careers
          </nav>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-gold">Work with UWA</p>
          <h1 className="mt-3 max-w-4xl font-display text-6xl leading-[1.02] md:text-8xl">
            Join a World Top 100 University <em className="text-gold not-italic">bringing global education to India.</em>
          </h1>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Why UWA India</p>
            <h2 className="mt-3 font-display text-5xl">A career across two campuses. One connected ecosystem.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>UWA India is creating an exciting new chapter in international education, with campuses opening in Mumbai and Chennai. As a World Top 100 university (QS 2025), and a member of Australia's prestigious Group of Eight, UWA is known for its research excellence, industry partnerships and strong student outcomes.</p>
            <p>When you join UWA India, you become part of an integrated global ecosystem connecting Australia and India across education, research, industry, and innovation.</p>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Open roles</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Now hiring across academic and professional teams.</h2>
          <div className="mt-14 space-y-3">
            {openRoles.map((role, i) => (
              <div key={i} className="group flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground"><Briefcase className="size-5" /></span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Full-time · Mumbai / Chennai</p>
                    <p className="mt-1 font-display text-xl leading-tight">{role}</p>
                  </div>
                </div>
                <a href="mailto:uwaindia.talent@uwa.edu.au" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Apply <ArrowUpRight className="size-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Advance across two campuses</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Your career, without borders.</h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Be part of a globally ranked university",
              "Contribute to growth across thriving Indo-Pacific economies",
              "Advance within a two-campus global ecosystem",
              "Build international academic and industry partnerships",
              "Grow in a dynamic, future-focused higher education environment",
              "Help shape the next generation of global leaders",
            ].map((b) => (
              <li key={b} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-lg leading-tight">{b}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 rounded-4xl border border-white/10 bg-white/[0.04] p-10 md:p-14">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Reach out to us</p>
            <h3 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Have a question about a role or an application?
            </h3>
            <a href="mailto:uwaindia.talent@uwa.edu.au" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground">
              uwaindia.talent@uwa.edu.au <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
