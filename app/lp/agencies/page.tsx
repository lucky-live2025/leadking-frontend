import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lead Generation for Marketing Agencies — Scale Client Services with AI',
  description: 'Marketing agencies use LeadKing to scale client services and generate leads. AI automates campaign creation and optimization, enabling agencies to serve more clients.',
  openGraph: {
    title: 'Lead Generation for Marketing Agencies — Scale Client Services with AI',
    description: 'Marketing agencies use LeadKing to scale client services and generate leads. AI automates campaign creation and optimization.',
    type: 'website',
    url: 'https://leadkingapp.com/lp/agencies',
  },
};

export default function AgenciesLandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
            Lead Generation for Marketing Agencies
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Scale client services and generate leads for your agency with AI-powered automation.
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Scale Client Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing's AI automates campaign creation and optimization for your clients, enabling you to serve more clients with the same team. Focus on strategy and client relationships while AI handles routine campaign management.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Generate Agency Leads</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Use LeadKing to generate leads for your own agency business. The AI creates campaigns that target potential clients, helping you grow your client base efficiently.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Improve Results</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI optimization often produces better campaign results than manual management. Your clients see improved performance while you reduce time spent on routine tasks.
              </p>
            </section>
          </div>

          <div className="text-center">
            <Link href="/signup" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md text-lg">
              Start for Your Agency
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

