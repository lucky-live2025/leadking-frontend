"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
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
        const data = await apiGet("/admin/stats");
        console.log("[ADMIN PAGE] ✅ Stats loaded:", data);
        setStats(data);
        setError(null);
      } catch (err: any) {
        console.error("[ADMIN PAGE] ❌ Failed to load admin stats:", err);
        if (
          err.message?.includes("401") ||
          err.message?.includes("Unauthorized")
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading admin dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-400 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-300">{error}</p>
          <Link
            href="/login"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>
      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-white">
                {stats.users || 0}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Total Campaigns
              </h3>
              <p className="text-3xl font-bold text-white">
                {stats.campaigns || 0}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Total Leads
              </h3>
              <p className="text-3xl font-bold text-white">
                {stats.leads || 0}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Ultra Campaigns
              </h3>
              <p className="text-3xl font-bold text-white">
                {stats.ultraCampaigns || 0}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Payments
              </h3>
              <p className="text-3xl font-bold text-white">
                {stats.payments || 0}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/users"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Users Management
              </h3>
              <p className="text-gray-400">
                Manage user accounts and permissions
              </p>
            </Link>
            <Link
              href="/admin/payments"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Payments
              </h3>
              <p className="text-gray-400">Review and approve payments</p>
            </Link>
            <Link
              href="/admin/leads"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">Leads</h3>
              <p className="text-gray-400">View and manage all leads</p>
            </Link>
            <Link
              href="/admin/ultra-campaigns"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Ultra Campaigns
              </h3>
              <p className="text-gray-400">View all ultra campaigns</p>
            </Link>
            <Link
              href="/admin/publishing-logs"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Publishing Logs
              </h3>
              <p className="text-gray-400">Campaign publishing activity</p>
            </Link>
            <Link
              href="/admin/errors"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Error Logs
              </h3>
              <p className="text-gray-400">System error logs</p>
            </Link>
            <Link
              href="/admin/system-health"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                System Health
              </h3>
              <p className="text-gray-400">Monitor system status</p>
            </Link>
            <Link
              href="/admin/security-logs"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Security Logs
              </h3>
              <p className="text-gray-400">Security events and alerts</p>
            </Link>
            <Link
              href="/admin/usage"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Usage Stats
              </h3>
              <p className="text-gray-400">System usage statistics</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
