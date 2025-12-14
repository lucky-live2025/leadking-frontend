"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Campaign {
  id: number;
  name: string;
  status: string;
  budget?: number;
  createdAt: string;
}

export default function DashboardCampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      setLoading(true);
      setError(null);
      
      // Verify user is authenticated first
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Please log in to view campaigns");
        setLoading(false);
        return;
      }
      
      const data = await apiGet("/campaigns", { auth: true });
      
      if (data && data.campaigns) {
        setCampaigns(data.campaigns);
      } else if (Array.isArray(data)) {
        setCampaigns(data);
      } else {
        setCampaigns([]);
      }
    } catch (err: any) {
      console.error("Failed to load campaigns:", err);
      
      // Handle 401 errors specifically
      if (err.response?.status === 401 || err.message?.includes("401")) {
        setError("Please log in to view campaigns");
        // Don't redirect here - let UserLayout handle it
      } else if (err.response?.status === 403 || err.message?.includes("403") || err.message?.includes("Forbidden")) {
        // Handle 403 Forbidden - likely user not approved
        const errorMsg = err.response?.data?.message || err.message || "Access denied";
        if (errorMsg.includes("approved") || errorMsg.includes("approval")) {
          setError("Your account is pending approval. Please wait for admin approval to access campaigns.");
        } else {
          setError(errorMsg);
        }
      } else {
        setError(err.message || "Failed to load campaigns");
      }
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-100 text-gray-700 border border-gray-200";
    
    const statusUpper = status.toUpperCase();
    switch (statusUpper) {
      case "ACTIVE":
      case "LAUNCHED":
        return "bg-green-100 text-green-700 border border-green-200";
      case "PAUSED":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "PENDING":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "ERROR":
      case "INVALID":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const formatStatus = (status: string) => {
    if (!status) return "Unknown";
    const statusUpper = status.toUpperCase();
    // Capitalize first letter, rest lowercase
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading campaigns...</div>
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
        <Link
          href="/dashboard/campaigns/create"
          prefetch={false}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Create Campaign
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200">
          <p className="text-gray-600 text-lg mb-4">No campaigns found</p>
          <Link
            href="/dashboard/campaigns/create"
            prefetch={false}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold inline-block hover:bg-blue-700 transition-colors shadow-md"
          >
            Create Your First Campaign
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/dashboard/campaigns/${campaign.id}`}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all block cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{campaign.name || `Campaign #${campaign.id}`}</h3>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(campaign.status)}`}>
                  {formatStatus(campaign.status || "PENDING")}
                </span>
              </div>
              {campaign.budget && (
                <p className="text-gray-600 mb-2">Budget: ${campaign.budget}</p>
              )}
              <p className="text-gray-500 text-sm">
                Created: {new Date(campaign.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
