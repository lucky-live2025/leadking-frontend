import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How LeadKing Generates Leads for Itself — Self-Feeding Growth',
  description: 'Learn how LeadKing uses its own AI-powered platform to generate leads for itself. A case study on self-feeding growth and automated lead generation.',
  openGraph: {
    title: 'How LeadKing Generates Leads for Itself — Self-Feeding Growth',
    description: 'Learn how LeadKing uses its own AI-powered platform to generate leads for itself. A case study on self-feeding growth.',
    type: 'website',
    url: 'https://leadkingapp.com/ads',
  },
};

export default function AdsPage() {
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
            How LeadKing Generates Leads for Itself
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Self-Feeding Growth Loop</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing uses its own AI-powered platform to generate leads for itself, creating a self-feeding growth loop. This demonstrates the platform's effectiveness while simultaneously growing the business.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The process begins with LeadKing's AI analyzing the ideal customer profile—businesses that need AI-powered lead generation. The AI then creates targeted advertising campaigns across Meta, Google, TikTok, and LinkedIn, generating ad creatives that highlight LeadKing's value proposition and benefits.
              </p>
              <p className="text-gray-700 leading-relaxed">
                As campaigns run, the AI continuously optimizes performance, identifying which messaging, targeting, and creative approaches generate the most qualified leads. The system scales successful campaigns automatically while pausing underperformers, ensuring efficient use of advertising budget.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Campaign Strategy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing's self-promotion campaigns focus on businesses that need lead generation solutions—marketing agencies, SaaS companies, e-commerce businesses, local businesses, and enterprises. The AI creates campaigns that emphasize LeadKing's key benefits: automated campaign creation, multi-platform management, real-time optimization, and cost efficiency.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The campaigns target decision-makers who are likely to need lead generation solutions, using job titles, company sizes, industries, and technology usage patterns to identify ideal prospects. The AI optimizes for lead quality, not just volume, ensuring that generated leads are qualified and likely to convert.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Results and Optimization</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing's AI continuously monitors campaign performance and makes optimization adjustments in real-time. The system tests multiple messaging strategies, ad creatives, and targeting parameters simultaneously, identifying winning combinations and scaling them automatically.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This self-feeding approach enables LeadKing to grow its customer base while simultaneously demonstrating the platform's effectiveness. Every campaign provides data that makes the AI smarter, improving results over time and creating a sustainable growth loop.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link href="/signup" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
              Start Generating Leads
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

