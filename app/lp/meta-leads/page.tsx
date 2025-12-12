import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Meta Lead Generation — Generate Leads on Facebook & Instagram',
  description: 'Generate leads on Meta (Facebook and Instagram) with AI. LeadKing automates Meta Lead Ad campaigns to generate qualified leads from Facebook and Instagram.',
  openGraph: {
    title: 'Meta Lead Generation — Generate Leads on Facebook & Instagram',
    description: 'Generate leads on Meta (Facebook and Instagram) with AI. LeadKing automates Meta Lead Ad campaigns.',
    type: 'website',
    url: 'https://leadkingapp.com/lp/meta-leads',
  },
};

export default function MetaLeadsLandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
            Generate Leads on Meta (Facebook & Instagram)
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            AI-powered Meta lead generation that creates and optimizes Lead Ad campaigns automatically.
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Meta Lead Ads</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing creates Meta Lead Ad campaigns that collect contact information directly within Facebook and Instagram. Users can submit forms without leaving the platform, improving conversion rates compared to external landing pages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Automated Campaign Management</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The AI creates ad creatives optimized for Facebook and Instagram, targets your ideal customers, and optimizes campaigns for lead quality and cost per lead. All automatically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Real-Time Lead Delivery</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Leads generated through Meta Lead Ads are delivered immediately via webhook. The AI scores each lead and makes them available in your dashboard for immediate follow-up.
              </p>
            </section>
          </div>

          <div className="text-center">
            <Link href="/signup" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md text-lg">
              Start Generating Meta Leads
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

