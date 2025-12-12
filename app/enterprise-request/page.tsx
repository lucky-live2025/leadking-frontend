import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Request Enterprise Access | LeadKing',
  description: 'Request enterprise access to LeadKing. Custom pricing, dedicated support, and tailored configurations for agencies, B2B companies, and high-spend teams.',
  openGraph: {
    title: 'Request Enterprise Access | LeadKing',
    description: 'Request enterprise access to LeadKing. Custom pricing, dedicated support, and tailored configurations.',
    type: 'website',
    url: 'https://leadkingapp.com/enterprise-request',
  },
};

export default function EnterpriseRequestPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <nav className="mb-8">
          <Link href="/enterprise" className="text-gray-600 hover:text-gray-900">
            ← Back to Enterprise
          </Link>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Request Enterprise Access
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Complete the form below to request enterprise access. Our team will review your requirements and contact you within 24 hours.
          </p>
        </div>

        <form className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Business Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="monthly-spend" className="block text-sm font-semibold text-gray-900 mb-2">
              Monthly Advertising Spend
            </label>
            <select
              id="monthly-spend"
              name="monthly-spend"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="">Select range</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k-250k">$100,000 - $250,000</option>
              <option value="250k+">$250,000+</option>
            </select>
          </div>

          <div>
            <label htmlFor="platforms" className="block text-sm font-semibold text-gray-900 mb-2">
              Advertising Platforms Used
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" name="platforms" value="meta" className="mr-3" />
                <span className="text-gray-700">Meta (Facebook & Instagram)</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="platforms" value="google" className="mr-3" />
                <span className="text-gray-700">Google Ads</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="platforms" value="tiktok" className="mr-3" />
                <span className="text-gray-700">TikTok</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="platforms" value="linkedin" className="mr-3" />
                <span className="text-gray-700">LinkedIn</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="platforms" value="yandex" className="mr-3" />
                <span className="text-gray-700">Yandex</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-semibold text-gray-900 mb-2">
              Specific Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows={6}
              placeholder="Describe your specific requirements, number of campaigns, regions, business units, or any custom needs..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            Questions? Contact us at{' '}
            <Link href="/support" className="text-gray-900 hover:underline">
              support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

