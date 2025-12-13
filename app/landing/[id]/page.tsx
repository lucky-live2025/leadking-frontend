"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";

interface LandingPage {
  id: string;
  url?: string;
  businessName?: string;
  productName?: string;
  offer?: string;
  benefits?: any;
  ctaText?: string;
  theme?: string;
  type?: string;
  metadata?: any;
}

export default function LandingPageView() {
  const params = useParams();
  const landingPageId = params?.id as string;
  
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (landingPageId) {
      loadLandingPage();
    }
  }, [landingPageId]);

  async function loadLandingPage() {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch landing page from backend
      const data = await apiGet(`/landing/${landingPageId}`, { auth: false });
      setLandingPage(data);
    } catch (err: any) {
      console.error("Failed to load landing page:", err);
      setError(err.message || "Failed to load landing page");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Store lead in database
      await apiPost("/leads/landing", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: "LANDING_PAGE",
        landingPageId: landingPageId,
      }, { auth: false });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
    } catch (err: any) {
      console.error("Failed to submit lead:", err);
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-lg text-gray-900">Loading landing page...</div>
        </div>
      </div>
    );
  }

  if (error && !landingPage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!landingPage) {
    return null;
  }

  // Extract data from landing page
  const businessName = landingPage.businessName || landingPage.metadata?.businessName || "Business";
  const productName = landingPage.productName || landingPage.metadata?.productName || "Product";
  const offer = landingPage.offer || landingPage.metadata?.offer || "Special Offer";
  const benefits = landingPage.benefits || landingPage.metadata?.benefits || [];
  const ctaText = landingPage.ctaText || landingPage.metadata?.ctaText || "Get Started";
  const theme = landingPage.theme || landingPage.metadata?.theme || "modern";

  // Theme colors
  const themes: Record<string, any> = {
    modern: {
      bg: 'bg-gray-900',
      card: 'bg-gray-800',
      text: 'text-white',
      accent: 'bg-blue-600',
      accentHover: 'hover:bg-blue-700',
    },
    clean: {
      bg: 'bg-white',
      card: 'bg-gray-50',
      text: 'text-gray-900',
      accent: 'bg-blue-600',
      accentHover: 'hover:bg-blue-700',
    },
    dark: {
      bg: 'bg-black',
      card: 'bg-gray-900',
      text: 'text-white',
      accent: 'bg-purple-600',
      accentHover: 'hover:bg-purple-700',
    },
    corporate: {
      bg: 'bg-gray-50',
      card: 'bg-white',
      text: 'text-gray-900',
      accent: 'bg-blue-800',
      accentHover: 'hover:bg-blue-900',
    },
  };

  const colors = themes[theme] || themes.modern;

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text}`}>
      {/* Header */}
      <header className={`${colors.card} border-b border-gray-700 py-4`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className={`text-2xl font-bold ${colors.text}`}>{businessName}</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-20 px-4 ${colors.bg}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${colors.text}`}>
                {productName}
              </h1>
              <p className={`text-xl md:text-2xl mb-8 ${colors.text} opacity-90`}>
                {offer}
              </p>
              
              {Array.isArray(benefits) && benefits.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span className={`${colors.text} text-lg`}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}

              <a
                href="#cta"
                className={`inline-block px-8 py-4 ${colors.accent} ${colors.accentHover} text-white font-semibold rounded-lg transition-colors shadow-lg`}
              >
                {ctaText}
              </a>
            </div>
            
            <div className="hidden md:block">
              <div className={`${colors.card} rounded-xl p-8 shadow-2xl`}>
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-4xl">🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section id="cta" className={`py-16 px-4 ${colors.card}`}>
        <div className="container mx-auto max-w-2xl">
          <div className={`${colors.bg} rounded-xl p-8 shadow-lg border border-gray-200`}>
            {submitted ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${colors.text}`}>Thank You!</h2>
                <p className={`${colors.text} opacity-80`}>We'll be in touch soon.</p>
              </div>
            ) : (
              <>
                <h2 className={`text-2xl font-bold mb-6 text-center ${colors.text}`}>
                  {ctaText}
                </h2>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${colors.text}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${colors.text}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-semibold mb-2 ${colors.text}`}>
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full px-8 py-4 ${colors.accent} ${colors.accentHover} text-white font-semibold rounded-lg transition-colors shadow-md disabled:opacity-50`}
                  >
                    {submitting ? "Submitting..." : ctaText}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${colors.card} py-8 px-4 border-t border-gray-700`}>
        <div className="container mx-auto max-w-6xl text-center">
          <p className={`${colors.text} opacity-70`}>
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
