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
      const data = await apiGet("/campaigns");
      
      if (data && data.campaigns) {
        setCampaigns(data.campaigns);
      } else if (Array.isArray(data)) {
        setCampaigns(data);
      } else {
        setCampaigns([]);
      }
    } catch (err: any) {
      console.error("Failed to load campaigns:", err);
      setError(err.message || "Failed to load campaigns");
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
      case "LAUNCHED":
        return "bg-green-500/20 text-green-400";
      case "PAUSED":
        return "bg-yellow-500/20 text-yellow-400";
      case "COMPLETED":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading campaigns...</div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">My Campaigns</h1>
        <Link
          href="/dashboard/campaigns/create"
          className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: "#2563eb" }}
        >
          Create Campaign
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="rounded-lg p-8 text-center" style={{ backgroundColor: "#111827" }}>
          <p className="text-gray-300 text-lg mb-4">No campaigns found</p>
          <Link
            href="/dashboard/campaigns/create"
            className="px-6 py-3 text-white rounded-lg font-semibold inline-block hover:opacity-90 transition"
            style={{ backgroundColor: "#2563eb" }}
          >
            Create Your First Campaign
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/campaigns/${campaign.id}`}
              className="rounded-lg p-6 hover:opacity-90 transition"
              style={{ backgroundColor: "#111827" }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{campaign.name}</h3>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              {campaign.budget && (
                <p className="text-gray-400 mb-2">Budget: ${campaign.budget}</p>
              )}
              <p className="text-gray-400 text-sm">
                Created: {new Date(campaign.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

