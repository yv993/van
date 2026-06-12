import { SiteNav } from "@/components/site-nav";
import { Chapter } from "@/components/cinematic/chapter";
import { IntroStage } from "@/components/cinematic/intro-stage";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Menu } from "@/components/sections/menu";
import { Shop } from "@/components/sections/shop";
import { Ingredients } from "@/components/sections/ingredients";
import { ZeroTricks } from "@/components/sections/zero-tricks";
import { Ritual } from "@/components/sections/ritual";
import { Heritage } from "@/components/sections/heritage";
import { WorldMap } from "@/components/sections/world-map";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Visit } from "@/components/sections/visit";
import { Closing } from "@/components/sections/closing";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      {/* relative z-10 + opaque bg: the curtain-reveal footer sits FIXED
          behind this — main must fully cover it until the page scrolls away. */}
      <main id="main" className="relative z-10 bg-paper">
        {/* Ch.1 — Arrival: Earth from space → fly to Van → Hero → Stats.
            noZoom: the intro globe is sticky and the Hero has its own useScroll;
            a transform ancestor would offset both. */}
        <Chapter index={1} chapter="arrival" noZoom>
          <IntroStage />
          <Hero />
          <Stats />
        </Chapter>

        {/* Ch.2 — The Table */}
        <Chapter index={2} chapter="table">
          <Menu />
          <Shop />
        </Chapter>

        {/* Ch.3 — The Ritual */}
        <Chapter index={3} chapter="ritual">
          <Ingredients />
          <ZeroTricks />
          <Ritual />
        </Chapter>

        {/* Ch.4 — Heritage & Map */}
        <Chapter index={4} chapter="heritage">
          <Heritage />
          <WorldMap />
          <Gallery />
        </Chapter>

        {/* Ch.5 — Visit */}
        <Chapter index={5} chapter="visit">
          <Testimonials />
          <Visit />
          <Closing />
        </Chapter>
      </main>
      <Footer />
    </>
  );
}
