"use client";

export default function Workflow() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Ad Accounts",
      description: "Connect Meta, Google Ads, TikTok, LinkedIn, and other advertising platforms to LeadKingApp. The platform integrates directly with ad platforms—no need for separate Meta Ads Manager or Google Ads accounts.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      number: "02",
      title: "AI Generates Complete Campaigns",
      description: "LeadKingApp's AI automatically creates ad creatives, landing pages, targeting, and campaign strategy. Unlike traditional ad platforms, LeadKingApp replaces media buyers, copywriters, and designers with AI automation.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "AI Optimizes Targeting & Budget",
      description: "LeadKingApp's AI automatically optimizes audience targeting, budget allocation, and bid strategies across all platforms. This multi-channel campaign automation eliminates manual optimization work.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Launch Across Multiple Platforms",
      description: "Deploy campaigns simultaneously across Meta, Google Ads, TikTok, LinkedIn, YouTube, and other platforms. LeadKingApp's unified dashboard manages all platforms from one interface—no need to switch between Meta Ads Manager and Google Ads.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      number: "05",
      title: "AI Converts Traffic to Leads",
      description: "LeadKingApp automatically captures leads from all platforms, scores lead quality, and delivers qualified leads to your dashboard. This automated lead generation system replaces manual lead capture and management.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="how-it-works">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          How LeadKingApp <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
          LeadKingApp is an AI lead generation platform that automates the entire lead generation workflow. Unlike traditional ad platforms that require media buyers, copywriters, and designers, LeadKingApp's AI handles campaign creation, optimization, and lead capture automatically.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-cyan-200" style={{ height: "calc(100% - 80px)", top: "40px" }}></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  {/* Step Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center md:text-left`}>
                    <div className="inline-block mb-4">
                      <span className="text-6xl font-bold text-blue-100">{step.number}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg relative z-10">
                      {step.icon}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
