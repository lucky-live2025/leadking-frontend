"use client";

import Link from "next/link";

export default function WhatIsLeadKing() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
          What is LeadKing?
        </h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center leading-relaxed mb-6">
          LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads. Businesses use LeadKing to generate leads across Meta, Google, YouTube, TikTok, LinkedIn, and Yandex using artificial intelligence and real-time optimization.
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

