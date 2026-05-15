import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { HiringCTA } from "@/components/home/HiringCTA";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustBar } from "@/components/home/TrustBar";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <ProcessSection />
      <CaseStudiesPreview />
      <HiringCTA />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
