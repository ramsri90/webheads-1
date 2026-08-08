import { Navbar } from "@/components/navbar";
import { WebbheadsHeroAnimated } from "@/components/hero-gradient";
import { ServicesSection } from "@/components/services";
import { VideoShowcase } from "@/components/video-showcase";
import { Benefits3DSection } from "@/components/benefits-3d";
import { ProcessSection } from "@/components/process";
import { PortfolioSection } from "@/components/portfolio";
import { PricingSection } from "@/components/pricing";
import { TestimonialsAndStats } from "@/components/testimonials-stats";
import { FAQSection } from "@/components/faq";
import { Footer } from "@/components/footer";
import { IntroVideo } from "@/components/intro-video";
import { ChatbotWidget } from "@/components/chatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-teal-950 selection:bg-teal-500 selection:text-white">
      <IntroVideo />
      <Navbar />
      <WebbheadsHeroAnimated />
      <ServicesSection />
      <VideoShowcase />
      <Benefits3DSection />
      <ProcessSection />
      <PortfolioSection />
      <PricingSection />
      <TestimonialsAndStats />
      <FAQSection />
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
