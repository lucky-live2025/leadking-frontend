"use client";

import PublicNav from "@/components/PublicNav";
import Hero from "@/app/(marketing)/landing/components/Hero";
import WhatIsLeadKing from "@/app/(marketing)/landing/components/WhatIsLeadKing";
import Features from "@/app/(marketing)/landing/components/Features";
import Workflow from "@/app/(marketing)/landing/components/Workflow";
import PricingPreview from "@/app/(marketing)/landing/components/PricingPreview";
import Footer from "@/app/(marketing)/landing/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicNav />
      <Hero />
      <WhatIsLeadKing />
      <Features />
      <Workflow />
      <PricingPreview />
      <Footer />
    </div>
  );
}
