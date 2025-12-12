"use client";

import PublicNav from "@/components/PublicNav";

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <PublicNav />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-white">Terms of Service</h1>
          
          <div className="space-y-8" style={{ color: "#9ca3af" }}>
            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Lead King, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Use License</h2>
              <p>
                Permission is granted to temporarily use Lead King for personal and commercial purposes. This license does not include the right to resell or redistribute the service.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">3. User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Prohibited Uses</h2>
              <p>
                You may not use Lead King for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any local, state, national, or international law or regulation.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">5. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us at legal@leadking.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
