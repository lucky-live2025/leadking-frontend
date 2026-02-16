"use client";

import Link from "next/link";

export default function WhatIsLeadKing() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
          What is LeadKingApp?
        </h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center leading-relaxed mb-6">
          LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform. Unlike traditional ad platforms like Meta Ads Manager or Google Ads, LeadKingApp combines AI ad creative generation, AI landing page creation, multi-platform campaign automation, and lead capture into one unified system. This all-in-one AI advertising and lead capture system eliminates the need for media buyers, copywriters, designers, and landing page builders by automating the entire lead generation workflow from campaign creation to lead conversion.
        </p>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center leading-relaxed mb-6">
          Businesses use LeadKingApp to generate qualified leads across Meta, Google Ads, YouTube, TikTok, LinkedIn, and other major advertising platforms simultaneously. The platform's AI automatically creates ad creatives, builds landing pages, optimizes targeting, manages budgets, and converts traffic into leads—all without manual intervention.
        </p>
        <div className="text-center">
          <Link 
            href="/ai-lead-generation" 
            className="text-blue-600 hover:underline font-semibold"
          >
            Learn more about AI lead generation →
          </Link>
        </div>
      </div>
    </section>
  );
}

