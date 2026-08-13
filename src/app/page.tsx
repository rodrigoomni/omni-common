import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { OpeningPitch } from "@/components/opening-pitch";
import { LogoCarousel } from "@/components/logo-carousel";
import { ValueProp, WhyItWorks } from "@/components/value-prop";
import { GrowthRecipe } from "@/components/growth-recipe";
import { ServicesShowcase } from "@/components/services-showcase";
import { GrowthMultiplier } from "@/components/growth-multiplier";
import { FeaturedWork } from "@/components/featured-work";
import { RealPeople } from "@/components/real-people";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Spacer to account for the fixed hero */}
      <div className="h-screen" />
      {/* Content layer scrolls over the hero */}
      <div className="relative z-10 bg-background">
        <Marquee />
        <OpeningPitch />
        <div className="relative z-[2] bg-background">
          <WhyItWorks />
        </div>
        <div className="relative z-[3]">
          <GrowthRecipe />
        </div>
        <div className="relative z-[4] bg-background">
          <ServicesShowcase />
        </div>
        <div className="relative z-[4] bg-background">
          <LogoCarousel />
        </div>
        <div className="relative z-[4] bg-background">
          <GrowthMultiplier />
        </div>
        <div className="relative z-[4] bg-background">
          <FeaturedWork />
        </div>
        <div className="relative z-[5] bg-background">
          <RealPeople />
        </div>
        <div className="relative z-[5] bg-background">
          <ValueProp />
        </div>
        <div className="relative z-[6] bg-background">
          <Footer />
        </div>
      </div>
    </main>
  );
}
