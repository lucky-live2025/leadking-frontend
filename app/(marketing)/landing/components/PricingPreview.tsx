"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { isPricingUnlocked, fetchUser } from "@/lib/auth-check";

export default function PricingPreview() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkPricing() {
      try {
        // Fetch fresh user data to ensure we have latest status
        const unlocked = await isPricingUnlocked();
        setIsUnlocked(unlocked);
      } catch (err) {
        console.error("Failed to check pricing status:", err);
        setIsUnlocked(false);
      } finally {
        setLoading(false);
      }
    }
    checkPricing();
  }, []);

  const pricingTiers = [
    { name: "Starter", price: 250, period: "month" },
    { name: "Professional", price: 750, period: "month" },
    { name: "Enterprise", price: 7500, period: "month" },
    { name: "Custom", price: 15000, period: "month" }
  ];

  const isLocked = !isUnlocked && !loading;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="pricing">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Simple, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transparent</span> Pricing
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
          Choose the plan that fits your business needs. All plans include full platform access.
        </p>

        <div className="relative max-w-6xl mx-auto">
          {/* Blur overlay for locked state */}
          {isLocked && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-20 rounded-3xl flex items-center justify-center">
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

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isLocked ? "blur-sm" : ""}`}>
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
                  index === 1
                    ? "border-blue-500 shadow-xl scale-105"
                    : index === 2
                    ? "border-purple-500 shadow-xl"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">${tier.price.toLocaleString()}</span>
                    <span className="text-gray-600">/{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full Platform Access
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    AI Creative Generation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Multi-Platform Automation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Real-Time Analytics
                  </li>
                </ul>

                <Link
                  href={isUnlocked ? "/dashboard/subscription" : "/signup"}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    index === 1
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : index === 2
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {isUnlocked ? "Upgrade Now" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
