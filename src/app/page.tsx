import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { HiringCTA } from "@/components/home/HiringCTA";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustBar } from "@/components/home/TrustBar";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatsSection />
      <ServicesPreview />
      <CaseStudiesPreview />
      <TestimonialsSection />
      <FAQSection />
      <BlogPreview />
      <HiringCTA />
      <FinalCTA />
    </>
  );
}
