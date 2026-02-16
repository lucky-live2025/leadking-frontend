"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import Footer from "@/app/(marketing)/landing/components/Footer";
import { isPricingUnlocked } from "@/lib/auth-check";

export default function PricingPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    async function checkPricing() {
      try {
        // Fetch fresh user data to ensure we have latest status
        const unlocked = await isPricingUnlocked();
        setIsUnlocked(unlocked);
      } catch (err) {
        console.error("Failed to check pricing status:", err);
        setIsUnlocked(false);
      }
    }
    checkPricing();
  }, []);

  const pricingTiers = [
    {
      name: "Starter",
      price: 99,
      priceDisplay: "$99",
      description: "For founders & small teams validating demand",
      features: [
        "Up to 10 campaigns per month",
        "AI image generation",
        "Multi-platform automation",
        "Real-time analytics",
        "Email support",
        "Basic AI targeting"
      ],
      ctaText: "Subscribe",
      ctaType: "checkout" as const
    },
    {
      name: "Professional",
      price: 499,
      priceDisplay: "$499",
      description: "For businesses running paid traffic seriously",
      popular: true,
      features: [
        "Up to 50 campaigns per month",
        "Full AI ad generation",
        "Limited AI video (3/day)",
        "Limited landing pages (1/day)",
        "Advanced AI targeting",
        "Priority email support"
      ],
      ctaText: "Subscribe",
      ctaType: "checkout" as const
    },
    {
      name: "Ultra",
      price: 4999,
      priceDisplay: "$4,999",
      description: "For agencies & advanced operators scaling aggressively",
      features: [
        "Unlimited campaigns",
        "Unlimited AI video generation",
        "Unlimited landing pages",
        "Priority processing",
        "Dedicated support manager",
        "Advanced analytics & forecasting"
      ],
      ctaText: "Request Access",
      ctaType: "contact" as const
    },
    {
      name: "Enterprise",
      price: null,
      priceDisplay: "Custom",
      description: "For global-scale operations",
      features: [
        "Everything in Ultra",
        "Dedicated infrastructure",
        "White-glove onboarding",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees"
      ],
      ctaText: "Contact Sales",
      ctaType: "enterprise" as const
    }
  ];

  const isLocked = !isUnlocked;

  return (
    <div className="bg-white min-h-screen">
      <PublicNav />

      <section className="pt-24 pb-16 bg-gradient-premium min-h-screen">
        <div className="text-center mb-14">
          <h1 className="text-title mb-4 text-gray-900">LeadKingApp Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            LeadKingApp is an AI-powered lead generation platform that replaces media buyers, copywriters, designers, and landing page builders with AI automation. Our pricing is designed for businesses that want automated lead generation without the cost of hiring marketing teams.
          </p>
          <p className="text-sm text-gray-500">
            Secure payments via card or crypto. Cancel anytime.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Lock overlay - only covers pricing cards, not entire page */}
          {isLocked && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-20 rounded-3xl flex items-center justify-center min-h-[600px] pointer-events-none">
              <div className="text-center p-8 pointer-events-auto bg-white rounded-2xl shadow-xl">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Pricing Unlocked After Account Approval</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Create an account and get approved by our team to view detailed pricing and features for each tier.
                </p>
                <Link
                  href="/signup"
                  className="btn-premium inline-block px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Create Account to Unlock Pricing
                </Link>
              </div>
            </div>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isLocked ? "blur-sm" : ""}`}>
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`card-premium relative ${tier.popular ? "card-ai scale-[1.03]" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-6 text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full shadow-premium-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-sm text-gray-600 mb-6">{tier.description}</p>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  {tier.priceDisplay}
                  {tier.price !== null && <span className="text-lg font-normal text-gray-600">/mo</span>}
                </p>
                <ul className="space-y-3 text-sm text-gray-700 mb-10">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.ctaType === "checkout" ? (
                  <Link
                    href={isUnlocked ? "/dashboard/subscription" : "/signup"}
                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      tier.popular
                        ? "btn-premium"
                        : "btn-premium"
                    }`}
                  >
                    {tier.ctaText}
                  </Link>
                ) : tier.ctaType === "contact" ? (
                  <Link
                    href="/support"
                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      tier.popular
                        ? "btn-premium"
                        : "btn-premium"
                    }`}
                  >
                    {tier.ctaText}
                  </Link>
                ) : (
                  <Link
                    href="/enterprise-request"
                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      tier.popular
                        ? "btn-premium"
                        : "btn-premium-dark"
                    }`}
                  >
                    {tier.ctaText}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional content below pricing to ensure page is scrollable */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Why Choose LeadKingApp?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">No Media Buyers Needed</h3>
              <p className="text-gray-600">LeadKingApp's AI automatically creates campaigns, optimizes targeting, and manages budgets across multiple platforms—replacing the need for media buyers.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">No Copywriters or Designers</h3>
              <p className="text-gray-600">AI automatically generates ad creatives, builds landing pages, and creates all content—eliminating the need for copywriters and designers.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Multi-Platform Automation</h3>
              <p className="text-gray-600">Manage campaigns across Meta, Google Ads, TikTok, LinkedIn, and more from one unified dashboard with AI-powered automation.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
