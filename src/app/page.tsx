import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { LogoCarousel } from "@/components/logo-carousel";
import { ValueProp } from "@/components/value-prop";
import { ServicesSection } from "@/components/services-section";
import { FeaturedWork } from "@/components/featured-work";
import { Footer } from "@/components/footer";
import { InfoSections } from "@/components/info-sections";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Spacer to account for the fixed hero */}
      <div className="h-screen" />
      {/* Content layer scrolls over the hero */}
      <div className="relative z-10 bg-background">
        <Marquee />
        <ServicesSection />
        <ValueProp />
        <LogoCarousel />
        <FeaturedWork />
        <InfoSections />
        <Footer />
      </div>
    </main>
  );
}
