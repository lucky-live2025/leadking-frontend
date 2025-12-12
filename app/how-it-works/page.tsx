"use client";

import Link from "next/link";
import PublicNav from "@/components/PublicNav";

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Create your account in seconds. No credit card required to get started.",
  },
  {
    number: 2,
    title: "Create Your Campaign",
    description: "Use our Ultra Campaign Generator to create AI-powered campaigns in minutes.",
  },
  {
    number: 3,
    title: "Launch & Monitor",
    description: "Launch your campaign and watch leads come in. Monitor performance in real-time.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicNav />
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h1 className="text-title mb-4 text-gray-900">How It Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes with our streamlined workflow
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
