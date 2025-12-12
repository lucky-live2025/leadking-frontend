"use client";

import PublicNav from "@/components/PublicNav";

export default function PricingPage() {
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

        <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* STARTER */}
          <div className="card-premium">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Starter</h3>
            <p className="text-sm text-gray-600 mb-6">For beginners validating ideas.</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">
              $250<span className="text-lg font-normal text-gray-600">/mo</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-700 mb-10">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                10 campaigns per month
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Global AI targeting
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Starter analytics
              </li>
            </ul>
            <button className="btn-premium w-full">Subscribe (Crypto)</button>
          </div>

          {/* PRO */}
          <div className="card-premium">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Pro</h3>
            <p className="text-sm text-gray-600 mb-6">For marketers scaling globally.</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">
              $750<span className="text-lg font-normal text-gray-600">/mo</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-700 mb-10">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                50 campaigns per month
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                AI optimization engine
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Forecast analytics
              </li>
            </ul>
            <button className="btn-premium w-full">Subscribe (Crypto)</button>
          </div>

          {/* ULTRA — Highlighted */}
          <div className="card-ai relative scale-[1.03]">
            <div className="absolute -top-3 left-6 text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full shadow-premium-medium">
              Most Popular
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Ultra</h3>
            <p className="text-sm text-gray-600 mb-6">For agencies & serious power users.</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">
              $7,500<span className="text-lg font-normal text-gray-600">/mo</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-700 mb-10">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited campaigns
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Full AI Engine access
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Executive analytics dashboard
              </li>
            </ul>
            <button className="btn-premium w-full">Subscribe (Crypto)</button>
          </div>

          {/* ENTERPRISE */}
          <div className="card-premium">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enterprise</h3>
            <p className="text-sm text-gray-600 mb-6">For global-scale operations.</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">
              $15,000<span className="text-lg font-normal text-gray-600">/mo</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-700 mb-10">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited access
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Direct API integration
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Priority support
              </li>
            </ul>
            <button className="btn-premium-dark w-full">Subscribe (Crypto)</button>
          </div>
        </div>
      </section>
    </div>
  );
}
