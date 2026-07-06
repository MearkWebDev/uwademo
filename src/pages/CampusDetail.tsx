import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Calendar, MapPin, Plane, Train } from "lucide-react";
import mumbaiImg from "@/assets/mumbai-campus.jpg";
import chennaiImg from "@/assets/chennai-campus.jpg";
import { usePageMeta } from "@/hooks/use-page-meta";

interface CampusData {
  slug: "mumbai" | "chennai";
  city: string;
  headline: string;
  tag: string;
  img: string;
  intro: string;
  highlights?: { icon: React.ComponentType<{ className?: string }>; text: string }[];
}

const campuses: Record<string, CampusData> = {
  mumbai: {
    slug: "mumbai",
    city: "Mumbai",
    tag: "Global Education in India's Financial Capital",
    headline: "UWA Mumbai Campus",
    img: mumbaiImg,
    intro: "Located in Andheri, one of Mumbai's key commercial and education hubs, UWA India sits at the heart of a vibrant business ecosystem. With close proximity to major corporate offices, start-ups and strong transport connectivity, students are immersed in a dynamic professional environment from day one. The location provides direct access to industry networks, internship pathways and career-building opportunities, all while earning a globally recognised degree close to home.",
    highlights: [
      { icon: Plane, text: "5 minutes from the airport" },
      { icon: Train, text: "1 minute to Marol Naka Metro station" },
      { icon: MapPin, text: "3 km to Western Express Highway" },
      { icon: MapPin, text: "5.7 km to Eastern Express Highway" },
    ],
  },
  chennai: {
    slug: "chennai",
    city: "Chennai",
    tag: "World-Class Education in India's Industrial Powerhouse",
    headline: "UWA Chennai Campus",
    img: chennaiImg,
    intro: "UWA India will be located in Chennai, one of India's major centres for education, industry, and innovation. Further details will be shared once finalised.",
  },
};

function CampusDetail() {
  const { campus } = useParams<{ campus: string }>();
  const c = campus ? campuses[campus] : undefined;
  usePageMeta({
    title: c ? `${c.headline} — UWA India` : "Campus — UWA India",
    description: c?.tag,
  });
  if (!c) return <NotFoundCampus />;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary pt-40 pb-16 text-primary-foreground lg:pt-52 lg:pb-24">
        <img src={c.img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span>
            <Link to="/campuses" className="story-link">Campuses</Link> <span className="mx-2">/</span>
            {c.city}
          </nav>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-gold">{c.tag}</p>
          <h1 className="mt-3 max-w-4xl font-display text-6xl leading-[1.02] md:text-8xl">{c.headline}</h1>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The location</p>
            <h2 className="mt-3 font-display text-5xl">Where you'll study.</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-foreground/85">{c.intro}</p>
            {c.highlights && (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Location highlights</p>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {c.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5">
                      <h.icon className="size-5 shrink-0 text-gold" />
                      <span className="text-sm">{h.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Opening & admissions</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Inaugural intake · September 2026</h2>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/75">
            Registrations for our inaugural intake are now open. UWA India campuses will commence operations in September 2026. Apply early to secure your seat in this historic first cohort.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { l: "Applications", v: "Now accepting" },
              { l: "Priority deadline", v: "To be announced" },
              { l: "Final deadline", v: "To be announced" },
              { l: "Teaching commences", v: "September 2026" },
            ].map((x) => (
              <div key={x.l} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">{x.l}</p>
                <p className="mt-3 font-display text-2xl text-gold">{x.v}</p>
              </div>
            ))}
          </div>
          <Link to="/enquire" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-gold-foreground">
            Register Now <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-2">
          <div className="rounded-4xl border border-border bg-cream p-10">
            <Calendar className="size-8 text-gold" />
            <h3 className="mt-6 font-display text-4xl">Virtual Campus Tour</h3>
            <p className="mt-4 text-muted-foreground">
              Discover a campus designed for global learning — advanced labs, modern classrooms, vibrant student spaces, and innovation-driven environments. (360° tour — coming soon)
            </p>
          </div>
          <div className="rounded-4xl bg-primary p-10 text-primary-foreground">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Careers</p>
            <h3 className="mt-3 font-display text-4xl">Build your career at UWA India.</h3>
            <p className="mt-4 text-primary-foreground/70">
              Be part of bringing world-class Australian education to India. Join our inaugural team as we launch in September 2026.
            </p>
            <Link to="/careers" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground">
              Work with UWA <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default CampusDetail;

function NotFoundCampus() {
  return (
    <div className="grid min-h-screen place-items-center pt-24 text-center">
      <div>
        <h1 className="font-display text-5xl">Campus not found</h1>
        <Link to="/campuses" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground">Back</Link>
      </div>
    </div>
  );
}
