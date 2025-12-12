"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Please log in to view your dashboard");
        setLoading(false);
        return;
      }

      const [leadsData, campaignsData] = await Promise.all([
        apiGet("/leads").catch(() => ({ leads: [], total: 0 })),
        apiGet("/campaigns").catch(() => []),
      ]);

      setStats({
        leads: Array.isArray(leadsData) ? leadsData.length : leadsData?.leads?.length || 0,
        campaigns: Array.isArray(campaignsData) ? campaignsData.length : 0,
      });
      setError(null);
    } catch (err: any) {
      console.error("Failed to load dashboard:", err);
      setError(err.message || "Failed to load dashboard data");
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
            <div className="text-lg text-white">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-lg p-6" style={{ backgroundColor: "#111827" }}>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Total Leads</h3>
          <p className="text-3xl font-bold text-white">{stats?.leads || 0}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: "#111827" }}>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Active Campaigns</h3>
          <p className="text-3xl font-bold text-white">{stats?.campaigns || 0}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: "#111827" }}>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Conversion Rate</h3>
          <p className="text-3xl font-bold text-white">--</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: "#111827" }}>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Revenue</h3>
          <p className="text-3xl font-bold text-white">--</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/dashboard/leads"
          className="rounded-lg p-6 hover:opacity-90 transition"
          style={{ backgroundColor: "#111827" }}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">View All Leads</h3>
          <p className="text-gray-400">Manage and track your leads</p>
        </Link>
        <Link 
          href="/dashboard/campaigns"
          className="rounded-lg p-6 hover:opacity-90 transition"
          style={{ backgroundColor: "#111827" }}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">Manage Campaigns</h3>
          <p className="text-gray-400">Create and monitor campaigns</p>
        </Link>
        <Link 
          href="/ultra"
          className="rounded-lg p-6 hover:opacity-90 transition"
          style={{ backgroundColor: "#111827" }}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">Ultra Campaign Generator</h3>
          <p className="text-gray-400">Create AI-powered campaigns</p>
        </Link>
        <Link 
          href="/dashboard/billing"
          className="rounded-lg p-6 hover:opacity-90 transition"
          style={{ backgroundColor: "#111827" }}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">Billing & Subscription</h3>
          <p className="text-gray-400">Manage your subscription</p>
        </Link>
      </div>
    </div>
  );
}

