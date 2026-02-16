"use client";

import PublicNav from "@/components/PublicNav";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <PublicNav />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-white">Privacy Policy</h1>
          
          <div className="space-y-8" style={{ color: "#9ca3af" }}>
            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
              <p>
                Lead King ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Information We Collect</h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including your name, email address, and any other information you choose to provide when using our service.
              </p>
              <p className="mb-4">
                When you connect third-party advertising platforms (such as Meta, TikTok, Google, LinkedIn, or ) through our Service, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Basic profile information (name, email) through platform OAuth authentication</li>
                <li>Campaign data and performance metrics</li>
                <li>Ad account information necessary for campaign management</li>
                <li>Lead data generated through your campaigns</li>
              </ul>
              <p>
                <strong className="text-white">TikTok Data Usage:</strong> When you connect your TikTok account, we use TikTok Login Kit to access basic profile information. We do not sell your data to third parties. Your TikTok data is used solely for lead generation and ad campaign management purposes within our Service.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage your account</li>
                <li>Create and manage advertising campaigns on your behalf</li>
                <li>Generate leads and facilitate lead capture</li>
                <li>Integrate with CRM systems as configured by you</li>
                <li>Communicate with you about your account and our services</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
              </ul>
              <p className="mt-4">
                <strong className="text-white">We do not sell your personal data.</strong> Your data is used only for the purposes described above and in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@leadking.com
              </p>
            </section>

            <section className="rounded-lg p-8 mt-8" style={{ backgroundColor: "#111827" }}>
              <p className="text-sm text-gray-400">
                LeadKing is a product operated by LeadKingapp OÜ, a company incorporated in Estonia.<br />
                Registry code: 17409590.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

