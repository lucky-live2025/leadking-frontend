"use client";

import Link from 'next/link';
import { useState } from 'react';
import { apiPost } from '@/lib/api';

export default function EnterpriseRequestPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    monthlySpend: '',
    platforms: [] as string[],
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (platform: string) => {
    setFormData((prev) => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!formData.companyName || !formData.email || !formData.monthlySpend || formData.platforms.length === 0) {
      setError('Please fill in all required fields.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await apiPost('/enterprise/request', formData, { auth: false });
      if (response && response.success) {
        setSuccess(true);
        setFormData({
          companyName: '',
          email: '',
          monthlySpend: '',
          platforms: [],
          message: '',
        });
      } else {
        setError(response.message || 'Failed to submit request. Please try again.');
      }
    } catch (err: any) {
      console.error('Enterprise request error:', err);
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-16 max-w-2xl">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Request Submitted
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Your enterprise access request has been submitted successfully. Our team will review it and contact you within 24 hours.
              </p>
            </div>
            <Link
              href="/enterprise"
              className="inline-block px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Return to Enterprise
            </Link>
          </div>
        </div>
      </div>
    );
  }
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

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Business Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="monthlySpend" className="block text-sm font-semibold text-gray-900 mb-2">
              Monthly Advertising Spend <span className="text-red-500">*</span>
            </label>
            <select
              id="monthlySpend"
              name="monthlySpend"
              value={formData.monthlySpend}
              onChange={handleInputChange}
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
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Advertising Platforms Used <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes('meta')}
                  onChange={() => handlePlatformChange('meta')}
                  className="mr-3"
                />
                <span className="text-gray-700">Meta (Facebook & Instagram)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes('google')}
                  onChange={() => handlePlatformChange('google')}
                  className="mr-3"
                />
                <span className="text-gray-700">Google Ads</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes('tiktok')}
                  onChange={() => handlePlatformChange('tiktok')}
                  className="mr-3"
                />
                <span className="text-gray-700">TikTok</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes('linkedin')}
                  onChange={() => handlePlatformChange('linkedin')}
                  className="mr-3"
                />
                <span className="text-gray-700">LinkedIn</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes('yandex')}
                  onChange={() => handlePlatformChange('yandex')}
                  className="mr-3"
                />
                <span className="text-gray-700">Yandex</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
              Message / Notes
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              placeholder="Describe your specific requirements, number of campaigns, regions, business units, or any custom needs..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
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

