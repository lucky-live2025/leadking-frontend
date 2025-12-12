import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Press & Media — LeadKing AI Lead Generation Platform',
  description: 'Press information about LeadKing, an AI-powered lead generation platform. Product descriptions, company information, and use cases for media and press inquiries.',
  openGraph: {
    title: 'Press & Media — LeadKing AI Lead Generation Platform',
    description: 'Press information about LeadKing, an AI-powered lead generation platform. Product descriptions, company information, and use cases.',
    type: 'website',
    url: 'https://leadkingapp.com/press',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press & Media — LeadKing AI Lead Generation Platform',
    description: 'Press information about LeadKing, an AI-powered lead generation platform. Product descriptions, company information, and use cases.',
  },
};

export default function PressPage() {
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
            Press & Media
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Product Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads for businesses. The platform uses artificial intelligence to handle every aspect of lead generation—from audience analysis and creative generation to campaign execution and performance optimization.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing integrates directly with major advertising platforms including Meta (Facebook and Instagram), Google Ads, YouTube, TikTok, LinkedIn, and Yandex, allowing businesses to manage campaigns across all these channels from a single dashboard. The platform's AI creates ad creatives, optimizes targeting, and qualifies leads automatically, enabling businesses to generate leads at scale while reducing costs and time investment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform operates as a Software-as-a-Service (SaaS) solution accessible through web browsers. LeadKing uses machine learning algorithms to analyze campaign performance data, predict customer behavior, and optimize campaigns continuously based on real-time results.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Company Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing is a technology company focused on making AI-powered lead generation accessible to businesses of all sizes. The company's mission is to democratize access to high-quality lead generation by automating the process through artificial intelligence.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The platform was built to address the challenges businesses face with traditional lead generation methods—high costs, slow campaign creation, difficulty scaling, and inconsistent results. LeadKing's AI automation eliminates these barriers, enabling businesses to generate qualified leads efficiently and cost-effectively.
              </p>
              <p className="text-gray-700 leading-relaxed">
                LeadKing is headquartered and operates as a web-based SaaS platform, serving businesses globally. The company focuses exclusively on AI-powered lead generation through paid advertising campaigns, specializing in this core function rather than attempting to cover all aspects of marketing.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Use Cases</h2>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Marketing Agencies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Marketing agencies use LeadKing to scale client services without proportional increases in staff or costs. The platform's AI automates campaign creation and optimization, enabling agencies to serve more clients while focusing on strategy and client relationships.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">SaaS Companies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SaaS companies use LeadKing to acquire trial users and convert them to paid subscribers. The platform's AI creates product-focused campaigns, targets decision-makers, and optimizes for trial sign-ups and conversions.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">E-commerce Businesses</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Online retailers use LeadKing to acquire new customers through AI-optimized advertising campaigns. The platform creates product-focused ads, targets relevant audiences, and optimizes for conversions across multiple platforms.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Local Businesses</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Local businesses use LeadKing to generate leads within their geographic area through location-targeted campaigns. The AI creates locally relevant messaging and optimizes for local conversions.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Enterprise Organizations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Large enterprises use LeadKing to scale lead generation across multiple products, regions, and business units. The platform's AI handles the complexity of managing hundreds of campaigns simultaneously while maintaining brand consistency and performance standards.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Key Keywords</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing specializes in <strong>AI lead generation</strong>, which refers to the use of artificial intelligence to automate and optimize the process of identifying, attracting, and qualifying potential customers. The platform uses <strong>AI advertising</strong> and <strong>AI ad campaigns</strong> to reach target audiences across multiple platforms, generating <strong>qualified leads</strong> that are more likely to convert into customers.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The platform falls under the category of <strong>marketing automation</strong>, specifically focused on lead generation automation. LeadKing uses machine learning, natural language processing, predictive analytics, and real-time optimization to automate campaign creation, management, and optimization.
              </p>
              <p className="text-gray-700 leading-relaxed">
                LeadKing's focus on AI-powered automation distinguishes it from traditional lead generation methods. While agencies and in-house teams rely on human expertise and manual processes, LeadKing uses artificial intelligence to handle these tasks automatically, enabling faster, more cost-effective, and more scalable lead generation.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Media Contact</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For media inquiries, press releases, or interview requests, please contact LeadKing through our support channels at <Link href="/support" className="text-blue-600 hover:underline">leadkingapp.com/support</Link>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Additional resources including product screenshots, company information, and use case details are available in our <Link href="/media-kit" className="text-blue-600 hover:underline">media kit</Link>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Related Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  About LeadKing
                </Link>
              </li>
              <li>
                <Link href="/media-kit" className="text-blue-600 hover:underline">
                  Media Kit
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-blue-600 hover:underline">
                  LeadKing AI Platform
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

