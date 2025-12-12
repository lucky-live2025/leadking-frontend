import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Media Kit — LeadKing Brand Assets & Resources',
  description: 'Download LeadKing brand assets, logos, screenshots, and product information for media and press use.',
  openGraph: {
    title: 'Media Kit — LeadKing Brand Assets & Resources',
    description: 'Download LeadKing brand assets, logos, screenshots, and product information for media and press use.',
    type: 'website',
    url: 'https://leadkingapp.com/media-kit',
  },
};

export default function MediaKitPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Media Kit</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Product Summary</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads for businesses. The platform uses artificial intelligence to handle every aspect of lead generation—from audience analysis and creative generation to campaign execution and performance optimization.
              </p>
              <p className="text-gray-700 leading-relaxed">
                LeadKing integrates with Meta (Facebook and Instagram), Google Ads, YouTube, TikTok, LinkedIn, and Yandex, allowing businesses to manage campaigns across all these channels from a single dashboard.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Brand Assets</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Brand assets including logos, screenshots, and product images are available upon request. Please contact us through our support channels for access to high-resolution brand assets.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Product Screenshots</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Product screenshots showcasing LeadKing's dashboard, campaign creation interface, and analytics are available for media use. Contact us for access to the latest screenshots.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/press" className="text-blue-600 hover:underline">
              ← Press Information
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

