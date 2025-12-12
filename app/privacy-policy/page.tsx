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
              <p>
                We collect information that you provide directly to us, including your name, email address, and any other information you choose to provide when using our service.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
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
          </div>
        </div>
      </div>
    </div>
  );
}

