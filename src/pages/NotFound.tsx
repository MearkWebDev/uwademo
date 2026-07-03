import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";

function NotFound() {
  usePageMeta({ title: "Page not found — UWA India" });
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 pt-24 text-center">
      <div className="max-w-md">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">404</p>
        <h1 className="mt-3 font-display text-6xl">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
