"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import Link from "next/link";
import { fetchUser } from "@/lib/auth-check";
import { Users, Megaphone, TrendingUp, DollarSign, FileText, Settings, CreditCard, Sparkles } from "lucide-react";
import { DashboardSkeleton } from "@/components/LoadingSkeleton";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      // Fetch fresh user data to ensure we have latest status
      const user = await fetchUser();
      if (!user) {
        setError("Please log in to view your dashboard");
        setLoading(false);
        return;
      }

      const [leadsData, campaignsData] = await Promise.all([
        apiGet("/leads").catch(() => ({ leads: [], total: 0 })),
        apiGet("/campaigns").catch(() => []),
      ]);

      const leads = Array.isArray(leadsData) ? leadsData.length : leadsData?.leads?.length || 0;
      const campaigns = Array.isArray(campaignsData) ? campaignsData.length : 0;
      
      // Calculate conversion rate (leads / campaigns, if campaigns > 0)
      const conversionRate = campaigns > 0 ? ((leads / campaigns) * 100).toFixed(1) : "0.0";
      
      // Calculate estimated revenue (placeholder - replace with actual revenue calculation)
      const estimatedRevenue = leads * 50; // Example: $50 per lead

      setStats({
        leads,
        campaigns,
        conversionRate: `${conversionRate}%`,
        revenue: `$${estimatedRevenue.toLocaleString()}`,
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
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-red-900 mb-2">Unable to Load Dashboard</h2>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  loadStats();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back! Here's an overview of your account.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.leads || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Megaphone className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Campaigns</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.campaigns || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.conversionRate || "0.0%"}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Estimated Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.revenue || "$0"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/dashboard/leads"
          prefetch={false}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors mr-3">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">View All Leads</h3>
          </div>
          <p className="text-gray-600">Manage and track your leads</p>
        </Link>
        <Link 
          href="/dashboard/campaigns"
          prefetch={false}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors mr-3">
              <Megaphone className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Manage Campaigns</h3>
          </div>
          <p className="text-gray-600">Create and monitor campaigns</p>
        </Link>
        <Link 
          href="/ultra"
          prefetch={false}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors mr-3">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Ultra Campaign Generator</h3>
          </div>
          <p className="text-gray-600">Create AI-powered campaigns</p>
        </Link>
        <Link 
          href="/dashboard/subscription"
          prefetch={false}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors mr-3">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Subscribe Now</h3>
          </div>
          <p className="text-gray-600">Choose a plan and start getting leads</p>
        </Link>
        <Link 
          href="/dashboard/billing"
          prefetch={false}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors mr-3">
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Billing & Subscription</h3>
          </div>
          <p className="text-gray-600">Manage your subscription</p>
        </Link>
      </div>
    </div>
  );
}
