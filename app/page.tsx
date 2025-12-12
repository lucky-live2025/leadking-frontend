"use client";

import PublicNav from "@/components/PublicNav";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      title: "AI Leads from any country",
      desc: "Generate consistent, high-quality global leads using AI-powered targeting.",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      title: "One-click Ultra Campaigns",
      desc: "Launch complete marketing funnels in seconds, not hours.",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      title: "Real-time Forecasting",
      desc: "Predict performance with live analytics dashboards & AI forecasting.",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      ),
      title: "Executive-Level Reporting",
      desc: "Monitor results with enterprise-grade performance reporting.",
    },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <PublicNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-32 hero-premium">
        {/* 3D Gradient Background with Noise */}
        <div className="absolute inset-0 hero-gradient-3d"></div>
        <div className="absolute inset-0 hero-noise"></div>
        
        {/* Floating Light Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hero-orb"></div>
        
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 text-gray-900 animate-fade-in relative inline-block tracking-tight leading-tight">
            <span className="relative z-10">Lead King</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 font-normal leading-relaxed animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Enterprise AI marketing automation that scales globally. Precision targeting, real-time intelligence, unlimited reach.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/dashboard" className="btn-glass-primary text-base px-8 py-3.5">
              Go to Dashboard
            </Link>
            <Link 
              href="/ultra"
              className="btn-glass-outline hover:scale-[1.02] transition-transform">
              Ultra Campaign Generator
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 pb-32 bg-white">
        <h2 className="text-title text-center mb-4 text-gray-900">Powerful Features</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Everything you need to scale your lead generation globally
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="card-premium text-center"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center text-blue-600 bg-blue-50 rounded-xl">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
