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
  platforms?: any;
  createdAt: string;
  updatedAt: string;
}

export default function CampaignsPage() {
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
      
      // Handle both array and paginated response
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
        return "bg-green-100 text-green-800";
      case "PAUSED":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "ERROR":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white py-12">Loading campaigns...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Campaigns</h1>
          <p className="text-gray-300">View and manage your campaigns</p>
        </div>
        <Link
          href="/campaigns/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Create Campaign
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg mb-4">No campaigns found</p>
          <Link
            href="/campaigns/create"
            className="text-blue-400 hover:text-blue-300"
          >
            Create your first campaign →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {campaign.name || `Campaign #${campaign.id}`}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                    campaign.status
                  )}`}
                >
                  {campaign.status || "PENDING"}
                </span>
              </div>
              
              {campaign.budget && (
                <p className="text-gray-300 text-sm mb-2">
                  Budget: ${campaign.budget.toLocaleString()}
                </p>
              )}
              
              {campaign.platforms && (
                <p className="text-gray-400 text-xs mb-4">
                  Platforms: {Array.isArray(campaign.platforms) 
                    ? campaign.platforms.join(", ") 
                    : "Multiple"}
                </p>
              )}
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>
                  Created: {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
