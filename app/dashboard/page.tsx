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
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-red-900 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-600">Total Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.leads || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-600">Active Campaigns</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.campaigns || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-600">Conversion Rate</h3>
          <p className="text-3xl font-bold text-gray-900">--</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">--</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/dashboard/leads"
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900">View All Leads</h3>
          <p className="text-gray-600">Manage and track your leads</p>
        </Link>
        <Link 
          href="/dashboard/campaigns"
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Manage Campaigns</h3>
          <p className="text-gray-600">Create and monitor campaigns</p>
        </Link>
        <Link 
          href="/ultra"
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Ultra Campaign Generator</h3>
          <p className="text-gray-600">Create AI-powered campaigns</p>
        </Link>
        <Link 
          href="/dashboard/billing"
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Billing & Subscription</h3>
          <p className="text-gray-600">Manage your subscription</p>
        </Link>
      </div>
    </div>
  );
}
