"use client";

import Link from "next/link";
import PublicNav from "@/components/PublicNav";

const steps = [
  {
    number: 1,
    title: "Connect Your Ad Accounts",
    description: "Connect Meta, Google Ads, TikTok, LinkedIn, and other advertising platforms to LeadKingApp. Unlike managing separate Meta Ads Manager and Google Ads accounts, LeadKingApp provides unified multi-platform campaign management from one dashboard.",
  },
  {
    number: 2,
    title: "AI Generates Complete Campaigns",
    description: "LeadKingApp's AI automatically creates ad creatives, landing pages, targeting, and campaign strategy. This AI campaign generation replaces the need for media buyers, copywriters, designers, and landing page builders—all handled automatically by AI.",
  },
  {
    number: 3,
    title: "AI Captures & Delivers Leads",
    description: "LeadKingApp automatically captures leads from all platforms, scores lead quality, and delivers qualified leads to your dashboard. This automated lead generation system eliminates manual lead capture and management, providing 24/7 lead generation without human intervention.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicNav />
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h1 className="text-title mb-4 text-gray-900">How LeadKingApp Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            LeadKingApp is an AI-powered lead generation platform that automates the entire lead generation workflow. Unlike traditional ad platforms that require media buyers, copywriters, and designers, LeadKingApp's AI handles campaign creation, optimization, and lead capture automatically.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-20 left-20 right-20 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-cyan-200"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col md:flex-row gap-8 items-center">
                {/* Step Number */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-blue-600 to-purple-600 shadow-premium-medium">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 card-premium">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <Link href="/signup" className="btn-premium text-lg px-8 py-4">
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
}
