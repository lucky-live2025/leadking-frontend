import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LeadKing — AI Lead Generation Platform',
  description: 'LeadKing is an AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads across Meta, Google, TikTok, LinkedIn, and Yandex.',
  openGraph: {
    title: 'LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that automatically creates and optimizes ad campaigns to generate qualified leads.',
    type: 'website',
    url: 'https://leadkingapp.com/ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that automatically creates and optimizes ad campaigns to generate qualified leads.',
  },
};

export default function AIPage() {
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
            LeadKing — AI Lead Generation Platform
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">What LeadKing Is</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing is an AI-powered lead generation platform that automates the creation, launch, and optimization of advertising campaigns to generate qualified leads for businesses. The platform uses artificial intelligence to handle every aspect of lead generation—from audience analysis and creative generation to campaign execution and performance optimization.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing operates as a Software-as-a-Service (SaaS) platform accessible through web browsers. It integrates directly with major advertising platforms including Meta (Facebook and Instagram), Google Ads, YouTube, TikTok, LinkedIn, and Yandex, allowing businesses to manage campaigns across multiple channels from a single dashboard.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform's core differentiator is its use of artificial intelligence to automate tasks that traditionally require human marketers, designers, and analysts. This automation enables businesses to generate leads at scale while reducing costs and time investment compared to traditional marketing methods.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">What Problems LeadKing Solves</h2>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">High Cost of Lead Generation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Traditional lead generation through marketing agencies or in-house teams is expensive. Agencies charge monthly retainers of $5,000 to $50,000+, plus additional fees for creative work and campaign management. In-house teams require salaries, benefits, and ongoing training. LeadKing provides AI-powered lead generation at a fraction of these costs, with predictable monthly subscriptions starting at $250.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Slow Campaign Creation and Optimization</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Manual campaign creation takes days or weeks. Marketers must research audiences, create ad copy, design visuals, set up campaigns, and wait for results before making optimizations. LeadKing's AI creates and launches campaigns in hours, then optimizes them continuously in real-time based on performance data.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Difficulty Scaling Lead Generation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Scaling traditional lead generation requires hiring more staff or paying agencies more, both of which increase costs proportionally. LeadKing scales instantly without proportional cost increases. Businesses can increase campaign budgets, add new platforms, or expand targeting without additional setup time or fees.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Multi-Platform Management Complexity</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Managing campaigns across multiple advertising platforms requires learning different interfaces, optimization rules, and best practices for each platform. LeadKing provides a unified dashboard that manages campaigns across all major platforms simultaneously, with AI handling platform-specific requirements automatically.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Limited Creative Variations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Human designers can create limited ad variations due to time and cost constraints. This limits A/B testing and optimization opportunities. LeadKing's AI generates unlimited creative variations—headlines, descriptions, images, and videos—automatically, enabling extensive testing to identify what performs best.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Who LeadKing Is For</h2>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Growing Businesses</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Businesses that need to scale lead generation quickly without proportional cost increases. LeadKing's AI automation enables rapid scaling while maintaining cost efficiency, making it ideal for companies experiencing growth or entering new markets.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Tech-Savvy Companies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Organizations comfortable with technology and automation who prefer self-service tools over agency relationships. LeadKing provides direct control over campaigns while automating the complex aspects of optimization and creative generation.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Multi-Platform Advertisers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Businesses that need to run campaigns across multiple advertising platforms simultaneously. LeadKing's unified dashboard and AI optimization make it easier to manage and optimize campaigns across Meta, Google, TikTok, LinkedIn, and other platforms than using each platform's native interface separately.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Cost-Conscious Organizations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Companies with limited marketing budgets that need to maximize return on investment. LeadKing's predictable pricing and AI optimization help businesses generate leads at lower cost per lead than traditional methods, making it accessible to smaller organizations.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Data-Driven Marketers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Marketing teams that value data-driven decision making and want transparent performance metrics. LeadKing provides comprehensive analytics and AI-generated insights, enabling marketers to understand what's working and why.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Key Features</h2>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">AI-Powered Campaign Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing uses artificial intelligence to generate complete advertising campaigns automatically. The AI creates ad headlines, descriptions, images, and videos based on your business information, target audience, and campaign objectives. This eliminates the need for manual creative work and enables rapid campaign launch.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Multi-Platform Integration</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing integrates directly with Meta (Facebook and Instagram), Google Ads, YouTube, TikTok, LinkedIn, and Yandex. You can create and manage campaigns across all these platforms from a single dashboard, with AI handling platform-specific requirements and optimization rules automatically.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Real-Time Optimization</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The platform's AI continuously monitors campaign performance and makes optimization adjustments in real-time. This includes adjusting bids, pausing underperforming ads, shifting budget to better-performing campaigns, and testing new creative variations automatically.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">AI Lead Scoring</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing uses machine learning to score leads based on conversion probability. This helps prioritize sales efforts on the most promising prospects and improves overall conversion rates by focusing resources on high-quality leads.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Automated A/B Testing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The platform automatically creates and tests multiple variations of ad creatives, targeting parameters, and messaging strategies. The AI identifies winning combinations and scales successful variations while pausing underperformers, all without manual intervention.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">Comprehensive Analytics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LeadKing provides detailed dashboards showing campaign performance, lead quality metrics, cost per lead, conversion rates, and ROI. The AI generates insights and recommendations based on this data, explaining what's working and suggesting improvements.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Learn More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-lead-generation" className="text-blue-600 hover:underline">
                  How AI Lead Generation Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  About LeadKing
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-blue-600 hover:underline">
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

