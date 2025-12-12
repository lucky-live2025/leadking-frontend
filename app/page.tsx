"use client";

import PublicNav from "@/components/PublicNav";
import Hero from "./(marketing)/landing/components/Hero";
import Features from "./(marketing)/landing/components/Features";
import Workflow from "./(marketing)/landing/components/Workflow";
import PricingPreview from "./(marketing)/landing/components/PricingPreview";
import Footer from "./(marketing)/landing/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicNav />
      <Hero />
      <Features />
      <Workflow />
      <PricingPreview />
      <Footer />
    </div>
  );
}
