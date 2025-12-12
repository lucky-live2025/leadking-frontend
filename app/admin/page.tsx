"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/lib/api-admin";
import Link from "next/link";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("[ADMIN PAGE] Component mounted - loading stats...");

    async function loadStats() {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        console.log(
          "[ADMIN PAGE] Fetching stats from:",
          process.env.NEXT_PUBLIC_API_URL || "API_BASE",
        );
        const data = await adminGet("/admin/stats");
        console.log("[ADMIN PAGE] ✅ Stats loaded:", data);
        setStats(data);
        setError(null);
      } catch (err: any) {
        console.error("[ADMIN PAGE] ❌ Failed to load admin stats:", err);
        if (
          err.message?.includes("401") ||
          err.message?.includes("403") ||
          err.message?.includes("Unauthorized") ||
          err.message?.includes("Forbidden")
        ) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError(err.message || "Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading admin dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-red-900 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-700">{error}</p>
          <Link
            href="/login"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-md"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>
      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats.users || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                Total Campaigns
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats.campaigns || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                Total Leads
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats.leads || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                Ultra Campaigns
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats.ultraCampaigns || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                Payments
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats.payments || 0}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/admin/users"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Users Management
              </h3>
              <p className="text-gray-600">
                Manage user accounts and permissions
              </p>
            </Link>
            <Link
              href="/admin/payments"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Payments
              </h3>
              <p className="text-gray-600">Review and approve payments</p>
            </Link>
            <Link
              href="/admin/leads"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Leads</h3>
              <p className="text-gray-600">View and manage all leads</p>
            </Link>
            <Link
              href="/admin/ultra-campaigns"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Ultra Campaigns
              </h3>
              <p className="text-gray-600">View all ultra campaigns</p>
            </Link>
            <Link
              href="/admin/publishing-logs"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Publishing Logs
              </h3>
              <p className="text-gray-600">Campaign publishing activity</p>
            </Link>
            <Link
              href="/admin/errors"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Error Logs
              </h3>
              <p className="text-gray-600">System error logs</p>
            </Link>
            <Link
              href="/admin/system-health"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                System Health
              </h3>
              <p className="text-gray-600">Monitor system status</p>
            </Link>
            <Link
              href="/admin/security-logs"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Security Logs
              </h3>
              <p className="text-gray-600">Security events and alerts</p>
            </Link>
            <Link
              href="/admin/usage"
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Usage Stats
              </h3>
              <p className="text-gray-600">System usage statistics</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
