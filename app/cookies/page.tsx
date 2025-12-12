"use client";

import PublicNav from "@/components/PublicNav";

export default function CookiesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <PublicNav />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-white">Cookie Policy</h1>
          
          <div className="space-y-8" style={{ color: "#9ca3af" }}>
            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">How We Use Cookies</h2>
              <p>
                We use cookies to remember your preferences, analyze site traffic, and improve our services. We do not use cookies to collect personally identifiable information.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our service.
              </p>
            </section>

            <section className="rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
              <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
              <p>
                If you have questions about our use of cookies, please contact us at privacy@leadking.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

