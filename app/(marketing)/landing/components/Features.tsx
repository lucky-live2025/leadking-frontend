"use client";

export default function Features() {
  const platforms = [
    {
      name: "Meta",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      description: "Launch and optimize campaigns across Facebook and Instagram with AI-powered targeting."
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.78 0 2.89 2.89 0 0 1 5.78 0V10.1a6.26 6.26 0 0 0 4.77 4.94v-3.2a4.85 4.85 0 0 1-1.12-.27 4.83 4.83 0 0 1-3.65-4.64V6.69h7.1z"/>
        </svg>
      ),
      description: "Reach Gen Z and Millennials with viral video ads powered by AI creative generation."
    },
    {
      name: "Google",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      description: "Drive engagement with video ads that convert on the world's largest video platform."
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: "Target B2B professionals with precision using LinkedIn's powerful ad platform."
    },
    {
      name: "Yandex",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.24 0C5.4 0 0 5.4 0 12.24c0 6.84 5.4 12.24 12.24 12.24 6.84 0 12.24-5.4 12.24-12.24C24.48 5.4 19.08 0 12.24 0zm-.48 4.8c1.68 0 3.12 1.44 3.12 3.12s-1.44 3.12-3.12 3.12-3.12-1.44-3.12-3.12 1.44-3.12 3.12-3.12zm0 14.4c-2.4 0-4.32-1.92-4.32-4.32v-2.4h8.64v2.4c0 2.4-1.92 4.32-4.32 4.32z"/>
        </svg>
      ),
      description: "Expand into Eastern Europe and Russia with Yandex's dominant search platform."
    },
    {
      name: "Email AI",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: "Automate personalized email campaigns with AI-powered content generation."
    }
  ];

  const features = [
    {
      title: "AI Ad Creative Engine",
      description: "Generate high-converting videos, images, and scripts automatically with AI.",
      icon: "🎨"
    },
    {
      title: "Global Targeting",
      description: "Target by countries, states, cities, and languages with precision targeting.",
      icon: "🌍"
    },
    {
      title: "9-Platform Automation",
      description: "Launch and manage campaigns across 9 major advertising platforms simultaneously.",
      icon: "⚡"
    },
    {
      title: "AI Landing Page Builder",
      description: "Create stunning landing pages in seconds with AI-powered design and copy.",
      icon: "🚀"
    },
    {
      title: "Smart Budget Allocation",
      description: "Automatically optimize budget distribution across platforms for maximum ROI.",
      icon: "💰"
    },
    {
      title: "Predictive Optimization",
      description: "Real-time dashboards with AI forecasting to predict and improve performance.",
      icon: "📊"
    }
  ];

  return (
    <div className="bg-white">
      {/* Platform Grid Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            One Platform. <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Nine Channels.</span>
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Launch, optimize, and scale campaigns across all major advertising platforms from a single dashboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105 card-premium"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-blue-600 bg-blue-50 rounded-xl">
                  {platform.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-900">{platform.name}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{platform.description}</p>
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
