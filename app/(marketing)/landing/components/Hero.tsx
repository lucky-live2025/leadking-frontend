"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-40 min-h-screen flex items-center" style={{ minHeight: '100vh' }}>
      {/* Multi-layer 3D Gradient Background */}
      <div className="absolute inset-0 hero-gradient-3d"></div>
      <div className="absolute inset-0 hero-noise opacity-30"></div>
      
      {/* Floating Light Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hero-orb max-w-[90vw] max-h-[90vh]"></div>
      
      {/* Cinematic Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse max-w-[90vw]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse max-w-[90vw]" style={{ animationDelay: "1s" }}></div>
      
      <div className="relative container mx-auto px-6 text-center z-10">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 animate-fade-in relative inline-block tracking-tight leading-tight">
          <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            AI-Powered Lead Generation Platform
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 font-normal leading-relaxed animate-fade-in" style={{ animationDelay: "0.15s" }}>
          LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across multiple platforms from one unified system. Unlike traditional ad platforms, LeadKingApp replaces the need for media buyers, copywriters, designers, and landing page builders with AI automation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Link 
            href="/signup" 
            className="btn-premium text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            Start Generating Leads
          </Link>
          <Link 
            href="/#pricing"
            className="btn-glass-outline text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
