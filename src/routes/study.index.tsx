import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowUpRight, MapPin, Clock, GraduationCap, TrendingUp, Sparkles, X } from "lucide-react";
import { courses, type Campus, type CourseLevel } from "@/data/courses";
import { getMeta } from "@/data/course-meta";
import { useCountUp } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/study/")({
  head: () => ({
    meta: [
      { title: "Study at UWA India — Undergraduate & Postgraduate courses" },
      { name: "description", content: "Explore UWA India's full course catalogue — undergraduate and postgraduate programmes across Mumbai and Chennai." },
      { property: "og:title", content: "Study at UWA India" },
      { property: "og:description", content: "Every UWA India course, one elegant explorer. Find your programme in seconds." },
    ],
  }),
  component: StudyExplorer,
});

const categories = ["All", "Technology", "Business"] as const;
const campusOptions: ("All" | Campus)[] = ["All", "Mumbai", "Chennai"];
const levelOptions: ("All" | CourseLevel)[] = ["All", "Undergraduate", "Postgraduate"];

function StudyExplorer() {
  const [level, setLevel] = useState<"All" | CourseLevel>("All");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [campus, setCampus] = useState<"All" | Campus>("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (level !== "All" && c.level !== level) return false;
      if (cat !== "All" && c.category !== cat) return false;
      if (campus !== "All" && !c.campuses.includes(campus)) return false;
      if (q && !`${c.name} ${c.degree} ${c.category} ${c.tagline}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [level, q, cat, campus]);

  const activeFilters = (level !== "All" ? 1 : 0) + (cat !== "All" ? 1 : 0) + (campus !== "All" ? 1 : 0) + (q ? 1 : 0);
  const resetAll = () => { setLevel("All"); setCat("All"); setCampus("All"); setQ(""); };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary pt-40 pb-20 text-primary-foreground lg:pt-52 lg:pb-28">
        <div className="bg-grid-ink pointer-events-none absolute inset-0 opacity-[0.08]" />
        <div className="absolute -right-40 -top-40 size-[520px] rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span>{" "}
            <span className="text-primary-foreground/90">Courses</span>
          </nav>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <Sparkles className="size-3" /> September 2026 intake
              </span>
              <h1 className="mt-6 font-display text-6xl leading-[1.02] text-balance md:text-8xl">
                Find your <em className="text-gold not-italic">flagship</em> course.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-primary-foreground/75">
                Every UWA India programme in one place — filter by level, campus and discipline. Preview salary outcomes and jump straight into detail in a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="sticky top-[72px] z-30 border-y border-border bg-background/95 shadow-soft backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-4 lg:px-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a course, discipline or career…"
                className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-11 text-sm outline-none transition focus:border-primary"
              />
              {q && (
                <button onClick={() => setQ("")} className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground">
                  <X className="size-3.5" />
                </button>
              )}
            </label>
            <FilterPills label="Level" value={level} onChange={setLevel} options={levelOptions} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <FilterPills label="Campus" value={campus} onChange={setCampus} options={campusOptions} />
            <FilterPills label="Discipline" value={cat} onChange={setCat} options={categories} />
            {activeFilters > 0 && (
              <button onClick={resetAll} className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary">
                <X className="size-3" /> Clear ({activeFilters})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-cream/40 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <ResultsHeader count={filtered.length} />
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">
              No courses match those filters. Try clearing them.
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((c, i) => <CourseCard key={c.slug} course={c} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ResultsHeader({ count }: { count: number }) {
  const { value, ref } = useCountUp(count, 800);
  return (
    <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Results</p>
        <p className="mt-2 font-display text-5xl">
          <span ref={ref}>{value}</span>
          <span className="ml-3 text-lg text-muted-foreground">{count === 1 ? "programme" : "programmes"}</span>
        </p>
      </div>
      <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
        <TrendingUp className="size-3.5 text-gold" /> Sorted by relevance & popularity
      </div>
    </div>
  );
}

function FilterPills<T extends string>({
  label, value, onChange, options,
}: { label: string; value: T; onChange: (v: T) => void; options: readonly T[] | T[] }) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground md:inline">{label}</span>
      <div className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-secondary p-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o as T)}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
              value === o ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course, index }: { course: (typeof courses)[number]; index: number }) {
  const meta = getMeta(course.slug);
  const tags = [course.category, course.level, ...course.campuses];
  return (
    <Link
      to="/study/$courseId"
      params={{ courseId: course.slug }}
      className="group relative block overflow-hidden rounded-3xl border border-border bg-background transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="grid gap-0 md:grid-cols-[260px_1fr_260px]">
        {/* Left visual */}
        <div className="relative hidden overflow-hidden bg-primary md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/70" />
          <div className="bg-grid-ink absolute inset-0 opacity-20" />
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-gold/20 blur-2xl transition-all duration-700 group-hover:scale-125" />
          <div className="relative flex h-full flex-col justify-between p-6 text-primary-foreground">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">{course.code}</p>
              <p className="mt-2 font-display text-4xl leading-none text-gold">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
                <Clock className="size-3.5 text-gold" /> {course.duration.split("·")[0].trim()}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-primary-foreground/80">
                <MapPin className="size-3.5 text-gold" /> {course.campuses.join(" · ")}
              </div>
            </div>
          </div>
        </div>

        {/* Middle content */}
        <div className="min-w-0 p-6 md:p-8">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium">{t}</span>
            ))}
          </div>
          <h3 className="mt-4 font-display text-3xl leading-tight text-balance md:text-4xl">{course.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{course.degree}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/80">{course.tagline}</p>

          {/* Salary indicator */}
          <div className="mt-6 max-w-md">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-gold-foreground/80">Graduate salary range</span>
              <span className="font-mono text-foreground/70">₹{meta.salaryMin}–{meta.salaryMax}L / yr</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-gold transition-all duration-1000"
                style={{ width: `${(meta.salaryMax / 45) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{meta.graduateOutcome}% graduate outcomes</span>
              <span className="inline-flex items-center gap-1"><Sparkles className="size-3 text-gold" /> {meta.rating}/5 rating</span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-col justify-between gap-4 border-t border-border p-6 md:border-l md:border-t-0 md:p-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Next intake</p>
            <p className="mt-1 font-display text-2xl">{meta.nextIntake}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <GraduationCap className="size-4 text-gold" />
              {course.careers.slice(0, 2).join(" · ")}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition group-hover:bg-gold group-hover:text-gold-foreground">
              Apply Now <ArrowUpRight className="size-4" />
            </span>
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition group-hover:border-primary">
              Learn more
            </span>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
    </Link>
  );
}
