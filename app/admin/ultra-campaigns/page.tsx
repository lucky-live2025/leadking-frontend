"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/lib/api-admin";
import Link from "next/link";

export default function AdminUltraCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      setLoading(true);
      const data = await adminGet("/admin/ultra-campaigns");
      console.log("[ADMIN ULTRA] Response:", data);
      if (data && data.campaigns) {
        setCampaigns(data.campaigns);
      } else if (Array.isArray(data)) {
        setCampaigns(data);
      } else {
        setCampaigns([]);
      }
    } catch (err: any) {
      console.error("Failed to load ultra campaigns:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Ultra Campaigns</h1>
        <p className="text-gray-300">View all ultra campaigns</p>
      </div>

      {loading ? (
        <div className="text-center text-white py-12">Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">No ultra campaigns found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {campaign.product || "Untitled"}
              </h3>
              <p className="text-gray-300 text-sm mb-4">{campaign.industry}</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">Budget: {campaign.budget}</p>
                <p className="text-gray-400">
                  Created: {new Date(campaign.createdAt).toLocaleDateString()}
                </p>
                <Link
                  href={`/ultra-campaign/${campaign.id}`}
                  className="inline-block text-blue-400 hover:text-blue-300"
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
