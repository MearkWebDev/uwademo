import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight, MapPin, Filter } from "lucide-react";
import { courses, type Campus, type CourseLevel } from "@/data/courses";
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

function StudyExplorer() {
  const [level, setLevel] = useState<CourseLevel>("Undergraduate");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [campus, setCampus] = useState<"All" | Campus>("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (c.level !== level) return false;
      if (cat !== "All" && c.category !== cat) return false;
      if (campus !== "All" && !c.campuses.includes(campus)) return false;
      if (q && !`${c.name} ${c.degree} ${c.category}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [level, q, cat, campus]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary pt-40 pb-16 text-primary-foreground lg:pt-48 lg:pb-24">
        <div className="bg-grid-ink pointer-events-none absolute inset-0 opacity-[0.08]" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span> Study
          </nav>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[1.02] text-balance md:text-8xl">
            Course <em className="text-gold not-italic">explorer.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/75">
            Every UWA India programme, one elegant explorer. Filter by level, campus and discipline — then jump straight to the detail you need.
          </p>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="sticky top-[72px] z-30 border-y border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:px-10">
          <div className="inline-flex rounded-full border border-border bg-secondary p-1">
            {(["Undergraduate", "Postgraduate"] as CourseLevel[]).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all",
                  level === l ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses, degrees, disciplines…"
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-5 text-sm focus:border-primary focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            {campusOptions.map((c) => (
              <button
                key={c}
                onClick={() => setCampus(c)}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                  campus === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary",
                )}
              >
                {c}
              </button>
            ))}
            <span className="mx-1 h-4 w-px bg-border" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                  cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-baseline justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> {level.toLowerCase()} {filtered.length === 1 ? "course" : "courses"}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">
              No courses match those filters. Try clearing them.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <Link
                  key={c.slug}
                  to="/study/$courseId"
                  params={{ courseId: c.slug }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="rounded-full bg-secondary px-2.5 py-1">{c.category}</span>
                    <span>{c.duration.split("·")[0].trim()}</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl leading-tight text-balance">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.degree}</p>
                  <p className="mt-4 text-sm text-foreground/80">{c.tagline}</p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs">
                    {c.campuses.map((cp) => (
                      <span key={cp} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-medium">
                        <MapPin className="size-3" /> {cp}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
