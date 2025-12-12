"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";
import Link from "next/link";

export default function DashboardBillingPage() {
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBilling();
  }, []);

  async function loadBilling() {
    try {
      setLoading(true);
      setError(null);
      
      const [userData, plansData] = await Promise.all([
        apiGet("/auth/me").catch(() => null),
        apiGet("/subscriptions/plans").catch(() => []),
      ]);

      if (userData) {
        setSubscription(userData.subscription || null);
      }
      setPlans(Array.isArray(plansData) ? plansData : []);
    } catch (err: any) {
      console.error("Failed to load billing:", err);
      setError(err.message || "Failed to load billing information");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading billing information...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Billing & Subscription</h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-6">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {subscription ? (
        <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: "#111827" }}>
          <h2 className="text-xl font-semibold mb-4 text-white">Current Subscription</h2>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-semibold">Plan:</span> {subscription.plan?.name || "N/A"}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Status:</span> {subscription.status || "N/A"}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Price:</span> ${subscription.plan?.price || 0}/month
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: "#111827" }}>
          <h2 className="text-xl font-semibold mb-4 text-white">No Active Subscription</h2>
          <p className="text-gray-300 mb-4">Subscribe to a plan to get started.</p>
          <Link
            href="/pricing"
            className="px-6 py-3 text-white rounded-lg font-semibold inline-block hover:opacity-90 transition"
            style={{ backgroundColor: "#2563eb" }}
          >
            View Plans
          </Link>
        </div>
      )}

      <div className="rounded-lg p-6" style={{ backgroundColor: "#111827" }}>
        <h2 className="text-xl font-semibold mb-4 text-white">Payment Methods</h2>
        <p className="text-gray-300">Payment method management coming soon.</p>
      </div>
    </div>
  );
}

