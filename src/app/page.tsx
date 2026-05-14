import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import HeroSection from "@/components/HeroSection";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <AuroraBackground />
      <ParticleField />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <ShowcaseGallery />
        <FeaturesSection />
        <PricingSection />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
