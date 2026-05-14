import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import HeroSection from "@/components/HeroSection";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import FeaturesSection from "@/components/FeaturesSection";
import WaitlistSection from "@/components/WaitlistSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <AuroraBackground />
      <ParticleField />
      <Navbar />
      <div className="crt-overlay" />

      <main className="relative z-10">
        <HeroSection />
        <div className="section-divider mx-auto max-w-4xl" />
        <ShowcaseGallery />
        <div className="section-divider mx-auto max-w-4xl" />
        <FeaturesSection />
        <div className="section-divider mx-auto max-w-4xl" />
        <WaitlistSection />
        <div className="section-divider mx-auto max-w-4xl" />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
