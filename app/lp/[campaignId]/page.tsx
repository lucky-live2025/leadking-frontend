"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";

interface LandingPageData {
  headline: string;
  subheadline: string;
  sections: Array<{ title: string; content: string }>;
  cta: string;
}

export default function DynamicLandingPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.campaignId as string;
  const [landingPage, setLandingPage] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (campaignId) {
      loadLandingPage();
    }
  }, [campaignId]);

  async function loadLandingPage() {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet(`/ai-assets/campaign/${campaignId}`, { auth: false });
      if (data.landingPage) {
        setLandingPage({
          headline: data.landingPage.headline,
          subheadline: data.landingPage.subheadline,
          sections: data.landingPage.sections as Array<{ title: string; content: string }>,
          cta: data.landingPage.cta,
        });
      } else {
        setError("Landing page not found");
      }
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
        source: "AI_LANDING",
        campaignId: parseInt(campaignId),
      }, { auth: false });

      setSubmitted(true);
      setFormData({ name: "", email: "" });
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
          <div className="text-lg text-gray-900">Loading...</div>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{landingPage.headline}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{landingPage.subheadline}</p>
        </div>
      </section>

      {/* Benefits Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {landingPage.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            {submitted ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-gray-600">We'll be in touch soon.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{landingPage.cta}</h2>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : landingPage.cta}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} LeadKing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

