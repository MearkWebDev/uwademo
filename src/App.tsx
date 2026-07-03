import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader, SiteFooter } from "@/components/site-frame";

const Home = lazy(() => import("@/pages/Home"));
const Study = lazy(() => import("@/pages/Study"));
const CourseDetail = lazy(() => import("@/pages/CourseDetail"));
const Campuses = lazy(() => import("@/pages/Campuses"));
const CampusDetail = lazy(() => import("@/pages/CampusDetail"));
const About = lazy(() => import("@/pages/About"));
const Careers = lazy(() => import("@/pages/Careers"));
const Collaborate = lazy(() => import("@/pages/Collaborate"));
const News = lazy(() => import("@/pages/News"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Fallback() {
  return <div className="min-h-[60vh]" aria-hidden />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="min-h-[60vh]">
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<Study />} />
            <Route path="/study/:courseId" element={<CourseDetail />} />
            <Route path="/campuses" element={<Campuses />} />
            <Route path="/campuses/:campus" element={<CampusDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
