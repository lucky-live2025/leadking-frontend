import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About LeadKing — AI Lead Generation Platform',
  description: 'Learn about LeadKing, an AI-powered lead generation platform that creates and optimizes ad campaigns to generate qualified leads across Meta, Google, TikTok, LinkedIn, and Yandex.',
  openGraph: {
    title: 'About LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that creates and optimizes ad campaigns to generate qualified leads.',
    type: 'website',
    url: 'https://leadkingapp.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that creates and optimizes ad campaigns to generate qualified leads.',
  },
};

export default function AboutPage() {
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
            About LeadKing
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Company Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing's mission is to democratize access to high-quality lead generation by making AI-powered advertising automation accessible to businesses of all sizes. We believe that every business, regardless of budget or marketing expertise, should be able to generate qualified leads efficiently and cost-effectively.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Traditional lead generation methods—marketing agencies, in-house teams, or manual campaign management—are expensive, time-consuming, and difficult to scale. LeadKing eliminates these barriers by using artificial intelligence to automate the entire lead generation process, from campaign creation to optimization and lead qualification.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our platform enables businesses to generate leads at scale while reducing costs, saving time, and improving results through data-driven optimization. We're committed to making AI lead generation technology accessible, transparent, and effective for businesses worldwide.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Product Focus</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing is exclusively focused on AI-powered lead generation through paid advertising campaigns. Unlike comprehensive marketing platforms that attempt to cover all aspects of marketing, LeadKing specializes in one core function: generating qualified leads through AI-optimized ad campaigns.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This focused approach allows us to excel at what we do. Our AI systems are specifically trained and optimized for lead generation use cases, enabling superior performance compared to general-purpose marketing tools. Every feature we build, every optimization we make, is designed to improve lead generation outcomes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The platform integrates with major advertising platforms—Meta (Facebook and Instagram), Google Ads, YouTube, TikTok, LinkedIn, and Yandex—allowing businesses to generate leads across all channels from a single interface. Our AI handles the complexity of different platform requirements, optimization rules, and best practices automatically.
              </p>
              <p className="text-gray-700 leading-relaxed">
                LeadKing's AI continuously learns and improves. Every campaign provides data that makes our systems smarter, enabling better results for all users. This network effect means that businesses using LeadKing benefit from the accumulated knowledge gained from all campaigns run on the platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Use Cases</h2>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">B2B Lead Generation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Businesses selling products or services to other businesses use LeadKing to generate qualified leads through targeted advertising campaigns. The platform's AI identifies decision-makers, creates B2B-appropriate messaging, and optimizes campaigns for lead quality and conversion probability.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">E-commerce Customer Acquisition</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Online retailers use LeadKing to acquire new customers through AI-optimized ad campaigns. The platform generates product-focused creatives, targets relevant audiences, and optimizes for conversions across multiple advertising channels simultaneously.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Service Business Lead Generation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Service businesses—consultants, agencies, freelancers, and professional services—use LeadKing to generate leads through targeted campaigns. The AI creates service-appropriate messaging, targets potential clients, and qualifies leads based on fit and intent.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">SaaS Customer Acquisition</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Software-as-a-Service companies use LeadKing to acquire trial users and paid subscribers through AI-powered campaigns. The platform optimizes for sign-ups, trial conversions, and customer acquisition cost (CAC) across multiple advertising channels.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Local Business Lead Generation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Local businesses use LeadKing to generate leads within their geographic area through location-targeted campaigns. The AI creates locally relevant messaging and optimizes for local conversions, helping businesses attract customers in their service area.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Key Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing leverages several advanced AI technologies to deliver automated lead generation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Machine Learning:</strong> Algorithms that learn from campaign performance data to improve targeting, creative generation, and optimization over time.</li>
                <li><strong>Natural Language Processing:</strong> AI that generates ad copy, headlines, and marketing content automatically based on business information and campaign objectives.</li>
                <li><strong>Predictive Analytics:</strong> Systems that forecast which prospects are most likely to convert based on demographic, behavioral, and engagement data.</li>
                <li><strong>Computer Vision:</strong> AI that selects or creates images and videos optimized for engagement and conversion.</li>
                <li><strong>Real-Time Optimization:</strong> Systems that adjust campaigns continuously based on live performance data, making improvements automatically without human intervention.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Keywords and Focus Areas</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing specializes in <strong>AI lead generation</strong>, which refers to the use of artificial intelligence to automate and optimize the process of identifying, attracting, and qualifying potential customers. The platform uses <strong>AI ad campaigns</strong> to reach target audiences across multiple advertising platforms, generating <strong>qualified leads</strong> that are more likely to convert into customers.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our AI systems analyze vast amounts of data to identify the characteristics of ideal customers, create targeted advertising campaigns, and optimize performance continuously. This data-driven approach ensures that businesses generate leads that match their ideal customer profile, improving conversion rates and return on investment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                LeadKing's focus on AI-powered automation distinguishes it from traditional lead generation methods. While agencies and in-house teams rely on human expertise and manual processes, LeadKing uses artificial intelligence to handle these tasks automatically, enabling faster, more cost-effective, and more scalable lead generation.
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
                <Link href="/use-cases" className="text-blue-600 hover:underline">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/ai-lead-generation" className="text-blue-600 hover:underline">
                  How AI Lead Generation Works
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
