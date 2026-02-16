"use client";

export default function Features() {
  const platforms = [
    {
      name: "Meta",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
        </svg>
      ),
      description: "Launch and optimize campaigns across Facebook and Instagram with AI-powered targeting."
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.78 0 2.89 2.89 0 0 1 5.78 0V10.1a6.26 6.26 0 0 0 4.77 4.94v-3.2a4.85 4.85 0 0 1-1.12-.27 4.83 4.83 0 0 1-3.65-4.64V6.69h7.1z" fill="#000000"/>
        </svg>
      ),
      description: "Reach Gen Z and Millennials with viral video ads powered by AI creative generation."
    },
    {
      name: "Google",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ),
      description: "Maximize ROI with intelligent Google Ads campaigns across Search, Display, and YouTube."
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
        </svg>
      ),
      description: "Drive engagement with video ads that convert on the world's largest video platform."
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/>
        </svg>
      ),
      description: "Target B2B professionals with precision using LinkedIn's powerful ad platform."
    },
    {
      name: "Email AI",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" fill="#2563EB"/>
          <path d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "Automate personalized email campaigns with AI-powered content generation."
    }
  ];

  const features = [
    {
      title: "AI Ad Creative Engine",
      description: "LeadKingApp's AI ad creative engine generates high-converting videos, images, and ad copy automatically. This replaces the need for copywriters and designers by using AI to create unlimited ad variations optimized for each platform.",
      icon: "🎨"
    },
    {
      title: "Global Targeting",
      description: "AI-powered targeting by countries, states, cities, and languages with precision audience segmentation. Unlike traditional ad platforms, LeadKingApp's AI automatically optimizes targeting based on lead quality and conversion data.",
      icon: "🌍"
    },
    {
      title: "Multi-Platform Automation",
      description: "Launch and manage campaigns across 8 major advertising platforms simultaneously from one dashboard. This multi-channel ad automation eliminates the need to manually manage separate Meta Ads, Google Ads, and TikTok Ads accounts.",
      icon: "⚡"
    },
    {
      title: "AI Landing Page Builder",
      description: "Create high-converting landing pages in seconds with AI-powered design and copy. LeadKingApp's AI landing page builder eliminates the need for landing page builders and web designers by automatically generating optimized pages for each campaign.",
      icon: "🚀"
    },
    {
      title: "Smart Budget Allocation",
      description: "AI automatically optimizes budget distribution across platforms for maximum ROI. Unlike manual budget management, LeadKingApp's AI continuously reallocates spend to the highest-performing campaigns and platforms.",
      icon: "💰"
    },
    {
      title: "Predictive Optimization",
      description: "Real-time dashboards with AI forecasting predict and improve campaign performance. This automated lead generation optimization replaces manual campaign management and media buyer oversight.",
      icon: "📊"
    }
  ];

  return (
    <div className="bg-white">
      {/* Platform Grid Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Multi-Channel Campaign Automation
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            LeadKingApp is a multi-channel ad automation platform that launches, optimizes, and scales campaigns across all major advertising platforms from one unified dashboard. Unlike managing separate Meta Ads Manager, Google Ads, and TikTok Ads accounts, LeadKingApp provides unified multi-platform campaign management with AI-powered automation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] card-premium group"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-xl group-hover:from-blue-50 group-hover:via-purple-50 group-hover:to-cyan-50 transition-all duration-300 shadow-md group-hover:shadow-xl border border-gray-100 group-hover:border-blue-200">
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 group-hover:text-blue-600 transition-colors">{platform.name}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Objectives Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Campaign <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Objectives</span>
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Choose the right objective for your campaign goals. Each objective optimizes for different outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "AWARENESS",
                icon: "👁️",
                goal: "Increase brand/product visibility",
                bestFor: "New products, brand launches, reaching new audiences",
                focus: "Impressions, reach, brand recognition",
                example: "Introduce our new product to potential customers"
              },
              {
                name: "TRAFFIC",
                icon: "🚀",
                goal: "Drive visitors to your website or landing page",
                bestFor: "Blog posts, product pages, content marketing",
                focus: "Clicks, website visits, page views",
                example: "Get more people to visit our website"
              },
              {
                name: "CONVERSIONS",
                icon: "💰",
                goal: "Drive specific actions (purchases, sign-ups, downloads)",
                bestFor: "E-commerce, lead generation, app installs",
                focus: "Sales, sign-ups, completed actions",
                example: "Get people to buy our product or sign up"
              },
              {
                name: "ENGAGEMENT",
                icon: "❤️",
                goal: "Increase interactions (likes, comments, shares, video views)",
                bestFor: "Social media, video content, community building",
                focus: "Likes, comments, shares, video views, post engagement",
                example: "Get people to like, comment, and share our posts"
              },
              {
                name: "LEADS",
                icon: "📋",
                goal: "Collect contact information from potential customers",
                bestFor: "B2B, services, email marketing",
                focus: "Form submissions, email sign-ups, contact info",
                example: "Collect email addresses from interested customers"
              }
            ].map((objective, index) => (
              <div
                key={objective.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{objective.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{objective.name}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Goal:</p>
                    <p className="text-gray-600 text-sm">{objective.goal}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Best For:</p>
                    <p className="text-gray-600 text-sm">{objective.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Focus:</p>
                    <p className="text-gray-600 text-sm">{objective.focus}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 italic">"{objective.example}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Powerful <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Everything you need to scale your advertising globally with AI-powered automation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:scale-105 card-premium"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
