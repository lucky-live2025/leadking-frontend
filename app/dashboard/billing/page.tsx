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
      
      // Import fetchUser to update localStorage with fresh user data
      const { fetchUser } = await import("@/lib/auth-check");
      const user = await fetchUser();
      
      if (!user) {
        setError("Please log in to view billing information");
        setLoading(false);
        return;
      }

      // Check if user is approved
      if (user.status?.toUpperCase() !== "APPROVED") {
        setError("Your account is pending approval. Please wait for admin approval before accessing billing.");
        setLoading(false);
        return;
      }

      const [userData, plansData] = await Promise.all([
        apiGet("/auth/me").catch(() => null),
        apiGet("/subscriptions/plans").catch(() => []),
      ]);

      if (userData) {
        setSubscription(userData.subscription || null);
        // Update localStorage with fresh user data
        localStorage.setItem("user", JSON.stringify({
          userId: userData.id || userData.userId,
          id: userData.id || userData.userId,
          email: userData.email,
          role: userData.role,
          status: userData.status,
        }));
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
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading billing information...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Billing & Subscription</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {subscription ? (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Current Subscription</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Plan:</span> {subscription.plan?.name || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Status:</span> {subscription.status || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Price:</span> ${subscription.plan?.price || 0}/month
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">No Active Subscription</h2>
          <p className="text-gray-600 mb-4">Subscribe to a plan to get started.</p>
          <Link
            href="/pricing"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold inline-block hover:bg-blue-700 transition-colors shadow-md"
          >
            View Plans
          </Link>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Payment Methods</h2>
        <p className="text-gray-600">Payment method management coming soon.</p>
      </div>
    </div>
  );
}
