"use client";

import PublicNav from "@/components/PublicNav";

const features = [
  {
    title: "AI Lead Generation Platform",
    description: "LeadKingApp is an AI lead generation platform that generates high-quality leads from any country with AI-powered targeting and optimization. Unlike traditional ad platforms, LeadKingApp automates the entire lead generation workflow from campaign creation to lead capture.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
  },
  {
    title: "AI Campaign Generation",
    description: "LeadKingApp's AI automatically generates complete lead-generation campaigns in minutes. The AI creates ad creatives, targeting strategies, landing pages, and campaign optimization—replacing media buyers, copywriters, and designers with automated campaign creation.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    title: "Multi-Channel Ad Automation",
    description: "LeadKingApp provides real-time analytics and AI forecasting for campaigns across multiple platforms. This multi-channel campaign automation eliminates the need to manually manage separate Meta Ads Manager, Google Ads, and TikTok Ads accounts.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
  },
  {
    title: "Automated Lead Generation",
    description: "LeadKingApp automates your entire lead generation process with intelligent AI algorithms. Unlike manual campaign management, LeadKingApp's AI handles campaign creation, optimization, and lead capture automatically—24/7 without human intervention.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
      </svg>
    ),
  },
  {
    title: "AI-Powered Insights",
    description: "LeadKingApp provides comprehensive executive dashboards with AI-powered insights and performance metrics. Unlike traditional ad platforms that require manual analysis, LeadKingApp's AI automatically identifies optimization opportunities and provides actionable recommendations.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
  },
  {
    title: "Enterprise-Grade Security",
    description: "LeadKingApp provides enterprise-grade security with 99.9% uptime guarantee. All ad account connections are encrypted, and LeadKingApp follows industry-standard security practices to protect your data and advertising accounts.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicNav />
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h1 className="text-title mb-4 text-gray-900">LeadKingApp Features</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            LeadKingApp is an AI-powered lead generation platform with features that replace media buyers, copywriters, designers, and landing page builders. Everything you need to scale automated lead generation across multiple advertising platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-premium"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 mb-4 flex items-center justify-center text-blue-600 bg-blue-50 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="/signup" className="btn-premium text-lg px-8 py-4">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
