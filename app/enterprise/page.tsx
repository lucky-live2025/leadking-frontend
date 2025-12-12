import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise AI Advertising Platform | LeadKing',
  description: 'Enterprise AI advertising platform for agencies, B2B companies, and high-spend teams. Unified campaign management, global scale, and AI automation across Meta, Google, TikTok, LinkedIn, and Yandex.',
  openGraph: {
    title: 'Enterprise AI Advertising Platform | LeadKing',
    description: 'Enterprise AI advertising platform for agencies, B2B companies, and high-spend teams. Unified campaign management, global scale, and AI automation.',
    type: 'website',
    url: 'https://leadkingapp.com/enterprise',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI Advertising Platform | LeadKing',
    description: 'Enterprise AI advertising platform for agencies, B2B companies, and high-spend teams. Unified campaign management, global scale, and AI automation.',
  },
};

export default function EnterprisePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Enterprise Hero */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Enterprise AI Advertising Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Unified campaign management, global scale, and AI automation for agencies, B2B companies, and high-spend teams.
            </p>
            <Link
              href="/enterprise-request"
              className="inline-block px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Request Enterprise Access
            </Link>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Marketing Agencies</h3>
              <p className="text-gray-600 leading-relaxed">
                Agencies managing multiple client accounts across platforms. Scale services without proportional cost increases while maintaining performance standards.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">B2B Companies</h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise B2B organizations generating leads across multiple products, regions, and business units. Centralized management with brand consistency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">High-Spend Teams</h3>
              <p className="text-gray-600 leading-relaxed">
                Marketing teams spending $50,000+ monthly on advertising. Require enterprise-grade tools, dedicated support, and custom configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Problems We Solve
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Chaos</h3>
              <p className="text-gray-600 leading-relaxed">
                Managing campaigns across Meta, Google, TikTok, LinkedIn, and Yandex requires multiple interfaces, different optimization rules, and fragmented reporting. Enterprise teams waste time switching between platforms.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Wasted Spend</h3>
              <p className="text-gray-600 leading-relaxed">
                Without unified optimization, budget allocation is inefficient. High-performing campaigns don't receive additional budget, while underperformers continue running. Manual optimization is too slow to respond to market changes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Manual Work</h3>
              <p className="text-gray-600 leading-relaxed">
                Creating campaigns, generating creatives, and optimizing performance requires significant manual effort. Enterprise teams spend too much time on routine tasks instead of strategy and analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Capabilities */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Enterprise Capabilities
          </h2>
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Automation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Artificial intelligence handles campaign creation, creative generation, targeting optimization, and performance management automatically. Enterprise teams define objectives and constraints; AI executes and optimizes continuously.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Machine learning algorithms analyze performance data across all campaigns, identifying patterns and opportunities that human teams would miss. The system improves results over time through continuous learning.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Global Scale</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Manage campaigns across multiple products, regions, and business units from a single dashboard. The platform scales instantly without proportional cost increases, enabling enterprise growth without operational complexity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Support for multiple languages, currencies, and time zones. Campaigns adapt automatically to regional requirements while maintaining brand consistency and performance standards.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Unified Control</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Single dashboard for all advertising platforms. View performance, manage budgets, and optimize campaigns across Meta, Google, TikTok, LinkedIn, and Yandex without switching interfaces.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade permissions, role-based access control, and audit logs. Maintain oversight and control while delegating execution to AI systems and team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why LeadKing vs Agencies & DIY Tools */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Why LeadKing vs Agencies & DIY Tools
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">vs. Marketing Agencies</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Lower cost: No agency retainers or markups on ad spend</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Faster execution: AI creates and launches campaigns in hours, not weeks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Real-time optimization: Continuous AI adjustments vs. weekly agency reviews</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Direct control: Manage campaigns directly without agency intermediaries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Scalability: Scale instantly without proportional cost increases</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">vs. DIY Platform Tools</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Unified interface: One dashboard vs. multiple platform interfaces</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>AI automation: Automated campaign creation and optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Cross-platform optimization: Unified budget allocation and performance management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Enterprise features: Permissions, audit logs, and custom configurations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gray-400">•</span>
                  <span>Dedicated support: Enterprise-grade support and account management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Pricing Philosophy */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Enterprise Pricing Philosophy
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Enterprise pricing is custom and approval-based. Pricing reflects your specific requirements: number of campaigns, platforms, regions, business units, and support needs.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Enterprise plans include dedicated account management, custom integrations, priority support, and tailored configurations. All enterprise accounts require approval to ensure proper setup and alignment with your objectives.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Typical enterprise investment ranges from $5,000 to $15,000 monthly, depending on scale and requirements. Contact us to discuss your specific needs and receive a custom proposal.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Scale Your Advertising Operations?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Request enterprise access to discuss your requirements and receive a custom proposal.
            </p>
            <Link
              href="/enterprise-request"
              className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request Enterprise Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

