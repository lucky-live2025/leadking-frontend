import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Lead Generation — Generate Qualified Leads with AI',
  description: 'Generate qualified leads automatically with AI. LeadKing creates and optimizes ad campaigns to generate leads across Meta, Google, TikTok, and LinkedIn.',
  openGraph: {
    title: 'AI Lead Generation — Generate Qualified Leads with AI',
    description: 'Generate qualified leads automatically with AI. LeadKing creates and optimizes ad campaigns to generate leads.',
    type: 'website',
    url: 'https://leadkingapp.com/lp/ai-leads',
  },
};

export default function AILeadsLandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
            Generate Qualified Leads with AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            AI-powered lead generation that creates, launches, and optimizes campaigns automatically.
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Automated Campaign Creation</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing's AI creates complete advertising campaigns automatically. Provide your business information, target audience, and budget. The AI generates ad creatives, selects targeting parameters, and launches campaigns across Meta, Google, TikTok, and LinkedIn.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Real-Time Optimization</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The AI continuously monitors campaign performance and makes optimization adjustments in real-time. Underperforming ads are paused automatically, while successful campaigns are scaled to maximize lead generation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Qualified Lead Scoring</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI scores leads based on conversion probability, helping you prioritize the most promising prospects. Focus your sales efforts on leads most likely to convert, improving conversion rates and ROI.
              </p>
            </section>
          </div>

          <div className="text-center">
            <Link href="/signup" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md text-lg">
              Start Generating Leads
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

