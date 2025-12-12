"use client";

import PublicNav from "@/components/PublicNav";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <PublicNav />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-white">Refund Policy</h1>
          
          <div className="space-y-8" style={{ color: "#9ca3af" }}>
            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Refund Eligibility</h2>
              <p>
                We offer refunds for subscription cancellations within 30 days of purchase. Refunds are processed within 5-10 business days.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">How to Request a Refund</h2>
              <p>
                To request a refund, please contact our support team at support@leadking.com with your account details and reason for refund.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Non-Refundable Items</h2>
              <p>
                Custom services, one-time setup fees, and add-on services are non-refundable unless otherwise specified.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
              <p>
                For questions about refunds, please contact us at support@leadking.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

