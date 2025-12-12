"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import { isPricingUnlocked, getUserFromStorage } from "@/lib/auth-check";

export default function PricingPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const user = getUserFromStorage();
    setIsUnlocked(isPricingUnlocked(user));
  }, []);

  const pricingTiers = [
    {
      name: "Starter",
      price: 250,
      description: "For beginners validating ideas.",
      features: [
        "10 campaigns per month",
        "Global AI targeting",
        "Starter analytics"
      ]
    },
    {
      name: "Professional",
      price: 750,
      description: "For marketers scaling globally.",
      features: [
        "50 campaigns per month",
        "AI optimization engine",
        "Forecast analytics"
      ]
    },
    {
      name: "Ultra",
      price: 7500,
      description: "For agencies & serious power users.",
      popular: true,
      features: [
        "Unlimited campaigns",
        "Full AI Engine access",
        "Executive analytics dashboard"
      ]
    },
    {
      name: "Enterprise",
      price: 15000,
      description: "For global-scale operations.",
      features: [
        "Unlimited access",
        "Direct API integration",
        "Priority support"
      ]
    }
  ];

  const isLocked = !isUnlocked;

  return (
    <div className="bg-white min-h-screen">
      <PublicNav />

      <section className="pt-24 pb-16 bg-gradient-premium">
        <div className="text-center mb-14">
          <h1 className="text-title mb-4 text-gray-900">Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scalable AI marketing power for teams who demand precision, speed, and global reach.
            <br />
            <span className="text-sm text-gray-500">Crypto-only subscriptions. Cancel anytime.</span>
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-20 rounded-3xl flex items-center justify-center min-h-[600px]">
              <div className="text-center p-8">
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
                  ${tier.price.toLocaleString()}
                  <span className="text-lg font-normal text-gray-600">/mo</span>
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
                <Link
                  href={isUnlocked ? "/dashboard/subscription" : "/signup"}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "btn-premium"
                      : index === 3
                      ? "btn-premium-dark"
                      : "btn-premium"
                  }`}
                >
                  {isUnlocked ? "Subscribe (Crypto)" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
