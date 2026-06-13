import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/sections/footer";

// Shared shell for the content pages (About / Journal / FAQ): the same nav +
// curtain-reveal footer as the home page, so they feel native. `main` is
// relative z-10 + opaque so the fixed footer reveals as you scroll, exactly
// like the home page. Top padding clears the fixed nav.
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main
        id="main"
        className="relative z-10 min-h-screen bg-paper pt-28 pb-16 sm:pt-32"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
