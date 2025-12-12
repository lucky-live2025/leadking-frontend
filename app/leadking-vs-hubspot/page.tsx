import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LeadKing vs HubSpot — Lead Generation Platform Comparison',
  description: 'Compare LeadKing AI lead generation with HubSpot marketing automation. See differences, pros, cons, and which platform fits your needs.',
};

export default function LeadKingVsHubSpotPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            LeadKing vs HubSpot
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Comparing AI-powered lead generation with comprehensive marketing automation platforms.
          </p>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">LeadKing</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">HubSpot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Primary Focus</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">AI-powered ad campaign creation and lead generation</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Complete marketing, sales, and CRM platform</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Ad Campaign Management</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Native, multi-platform campaign creation and optimization</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Limited, primarily for tracking and reporting</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">AI Creative Generation</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Built-in AI for ads, landing pages, and content</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">AI features available in higher tiers</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Platform Integration</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Direct integration with 9+ ad platforms</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Integrations via third-party apps</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">CRM Functionality</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Lead management and scoring</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Full-featured CRM with sales pipeline</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Email Marketing</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">AI email ad generation</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Comprehensive email marketing automation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Pricing</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$250-$15,000/month</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Free tier available, paid plans $45-$1,200+/month</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Learning Curve</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Moderate, focused on lead generation</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Steeper, comprehensive platform</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">LeadKing Pros</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Specialized in AI-powered ad campaign creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Direct integration with major ad platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>AI creative generation built-in</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Real-time campaign optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Focused, streamlined interface</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Multi-platform campaign management</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">LeadKing Cons</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>No full CRM functionality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Limited email marketing features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Focused only on lead generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Less comprehensive than all-in-one platforms</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">HubSpot Pros</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Comprehensive all-in-one platform</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Full-featured CRM with sales pipeline</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Extensive email marketing automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Content management and blogging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Free tier available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Large ecosystem of integrations</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">HubSpot Cons</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Not specialized in ad campaign creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Limited native ad platform integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Steeper learning curve</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Can be overwhelming for simple use cases</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Advanced features require higher tiers</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Use Cases</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Choose LeadKing If:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Your primary need is generating leads through paid advertising</li>
                  <li>• You want AI-powered ad creative generation</li>
                  <li>• You need to manage campaigns across multiple ad platforms</li>
                  <li>• You prefer a focused, specialized tool</li>
                  <li>• You want real-time campaign optimization</li>
                  <li>• You already have a CRM or don't need one</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Choose HubSpot If:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• You need a complete marketing, sales, and CRM solution</li>
                  <li>• You want extensive email marketing automation</li>
                  <li>• You need content management and blogging features</li>
                  <li>• You want to manage the entire customer lifecycle</li>
                  <li>• You prefer an all-in-one platform</li>
                  <li>• You need advanced sales pipeline management</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Who Each Option Is For</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">LeadKing Is Ideal For:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Businesses focused on paid advertising lead generation</li>
                  <li>• Companies that want AI-powered ad creation</li>
                  <li>• Organizations running campaigns across multiple platforms</li>
                  <li>• Businesses that already have a CRM solution</li>
                  <li>• Companies that prefer specialized, focused tools</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">HubSpot Is Ideal For:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Businesses needing complete marketing automation</li>
                  <li>• Companies that want CRM and sales pipeline management</li>
                  <li>• Organizations requiring extensive email marketing</li>
                  <li>• Businesses that want an all-in-one solution</li>
                  <li>• Companies managing complex customer journeys</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Related Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-lead-generation" className="text-blue-600 hover:underline">
                  AI Lead Generation — How It Works
                </Link>
              </li>
              <li>
                <Link href="/leadking-vs-agencies" className="text-blue-600 hover:underline">
                  LeadKing vs Marketing Agencies
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

