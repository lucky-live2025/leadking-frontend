import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What is LeadKing? — AI Lead Generation Platform Explained',
  description: 'Learn what LeadKing is and how it works. LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads.',
  openGraph: {
    title: 'What is LeadKing? — AI Lead Generation Platform Explained',
    description: 'Learn what LeadKing is and how it works. LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns.',
    type: 'website',
    url: 'https://leadkingapp.com/what-is-leadking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is LeadKing? — AI Lead Generation Platform Explained',
    description: 'Learn what LeadKing is and how it works. LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns.',
  },
};

export default function WhatIsLeadKingPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What is LeadKing?
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">LeadKing Definition</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads for businesses. The platform uses artificial intelligence to handle every aspect of lead generation—from audience analysis and creative generation to campaign execution and performance optimization.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing operates as a Software-as-a-Service (SaaS) platform accessible through web browsers. It integrates directly with major advertising platforms including Meta (Facebook and Instagram), Google Ads, YouTube, TikTok, LinkedIn, and Yandex, allowing businesses to manage campaigns across all these channels from a single dashboard.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform's core differentiator is its use of artificial intelligence to automate tasks that traditionally require human marketers, designers, and analysts. This automation enables businesses to generate leads at scale while reducing costs and time investment compared to traditional marketing methods.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">What LeadKing Does</h2>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Automated Campaign Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing uses AI to create complete advertising campaigns automatically. You provide your business information, target audience, campaign objective, and budget. The AI generates ad creatives—headlines, descriptions, images, and videos—selects targeting parameters, creates landing pages, and sets up campaigns across multiple platforms.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Multi-Platform Management</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing manages campaigns across Meta, Google, TikTok, LinkedIn, Yandex, and other platforms simultaneously. The AI handles platform-specific requirements, optimization rules, and best practices for each platform automatically, presenting a unified interface to users while managing complexity behind the scenes.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Real-Time Optimization</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing's AI continuously monitors campaign performance and makes optimization adjustments in real-time. If an ad starts underperforming, the AI can pause it and shift budget to better performers within minutes. The system tests multiple variations simultaneously, identifying winning strategies much faster than manual methods.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Lead Qualification</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing uses AI to score leads based on conversion probability. The system analyzes hundreds of data points to determine how likely a prospect is to become a customer, helping prioritize sales efforts on the most promising leads and improving overall conversion rates.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Who LeadKing Is For</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing is designed for businesses that need to generate qualified leads efficiently and cost-effectively. The platform is ideal for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Growing Businesses:</strong> Companies that need to scale lead generation quickly without proportional cost increases.</li>
                <li><strong>Tech-Savvy Organizations:</strong> Businesses comfortable with technology and automation who prefer self-service tools over agency relationships.</li>
                <li><strong>Multi-Platform Advertisers:</strong> Companies that need to run campaigns across multiple advertising platforms simultaneously.</li>
                <li><strong>Cost-Conscious Organizations:</strong> Businesses with limited marketing budgets that need to maximize return on investment.</li>
                <li><strong>Data-Driven Marketers:</strong> Marketing teams that value data-driven decision making and want transparent performance metrics.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">How LeadKing Works</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing works by automating the entire lead generation process using artificial intelligence. The process begins when you provide your business information, target audience, campaign objective, and budget. The AI analyzes this information and creates complete advertising campaigns automatically.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The AI generates ad creatives optimized for your target audience and campaign objectives, selects targeting parameters that match your ideal customer profile, and launches campaigns across multiple advertising platforms. As campaigns run, the AI continuously monitors performance and makes optimization adjustments in real-time.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When leads are generated, the AI scores them based on conversion probability and makes them available in LeadKing's dashboard. Sales teams can prioritize high-scoring leads for immediate follow-up, while lower-scoring leads enter nurturing sequences designed to move them further down the funnel.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Throughout this process, the AI learns from performance data, improving its ability to generate qualified leads over time. Every campaign provides data that makes the AI smarter, enabling better results for future campaigns.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Related Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai" className="text-blue-600 hover:underline">
                  LeadKing AI Platform
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  About LeadKing
                </Link>
              </li>
              <li>
                <Link href="/ai-lead-generation" className="text-blue-600 hover:underline">
                  AI Lead Generation — How It Works
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

