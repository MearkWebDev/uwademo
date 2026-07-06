import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { events } from "@/data/site";

function News() {
  usePageMeta({ title: "What's new — UWA India events & announcements", description: 'Stay up to date with the latest happenings at UWA India — masterclasses, webinars, and strategic announcements.' });
  const [featured, ...rest] = events;
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-cream to-white pt-36 pb-16 text-foreground lg:pt-44 lg:pb-24">
        <div className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-[480px] rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span> What's new
          </nav>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[1.02] text-primary md:text-7xl">
            Events & <em className="text-gold not-italic">announcements.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            From exclusive forums with university leadership to strategic initiatives strengthening Indo-Pacific ties — explore our upcoming events, key announcements, and opportunities to connect with the UWA community in India.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <article className="group grid gap-8 rounded-4xl border border-border bg-cream p-8 md:grid-cols-[1.4fr_1fr] md:p-14">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] text-gold-foreground">Featured</span>
                <Calendar className="size-3.5" /> {featured.date}
              </div>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">{featured.title}</h2>
              <p className="mt-6 text-lg text-muted-foreground">{featured.excerpt}</p>
              <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                Read more <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="hidden self-stretch rounded-3xl bg-primary p-8 text-primary-foreground md:block">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Category</p>
              <p className="mt-2 font-display text-4xl">{featured.tag}</p>
            </div>
          </article>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((e, i) => (
              <article key={i} className="group flex min-h-[280px] flex-col justify-between rounded-3xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Calendar className="size-3.5" /> {e.date}
                  <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 text-[10px]">{e.tag}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Read more <ArrowRight className="size-3.5" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
