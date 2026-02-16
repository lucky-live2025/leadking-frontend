"use client";

import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { TableSkeleton } from "@/components/LoadingSkeleton";

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
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

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

  async function handleDelete(campaignId: number, e: React.MouseEvent) {
    e.stopPropagation(); // Prevent card click
    
    if (showDeleteConfirm !== campaignId) {
      setShowDeleteConfirm(campaignId);
      return;
    }

    setDeleting(campaignId);
    setError(null);

    try {
      await apiDelete(`/campaigns/${campaignId}`, { auth: true });
      // Remove from list
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
      setShowDeleteConfirm(null);
    } catch (err: any) {
      console.error("Failed to delete campaign:", err);
      setError(err.message || "Failed to delete campaign");
      setDeleting(null);
      setShowDeleteConfirm(null);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Campaigns</h1>
          <p className="text-gray-600">Manage your advertising campaigns</p>
        </div>
        <TableSkeleton />
      </div>
    );
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
            <div className="ml-3 flex-1">
              <h2 className="text-xl font-bold text-red-900 mb-2">Unable to Load Campaigns</h2>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  loadCampaigns();
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Campaigns</h1>
          <p className="text-gray-600">Manage your advertising campaigns ({campaigns.length} total)</p>
        </div>
        <Link
          href="/dashboard/campaigns/create"
          prefetch={false}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Megaphone className="h-5 w-5" />
          Create Campaign
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {campaigns.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No campaigns found"
          description="Create your first campaign to start generating leads. Our AI will help you create, optimize, and manage your advertising campaigns."
          action={{
            label: "Create Your First Campaign",
            onClick: () => router.push("/dashboard/campaigns/create")
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all relative"
            >
              <div
                onClick={() => {
                  // CRITICAL: Navigate to campaign detail page regardless of status
                  console.log('[CampaignCard] Navigating to campaign:', campaign.id, 'Status:', campaign.status);
                  router.push(`/dashboard/campaigns/${campaign.id}`);
                }}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 pr-2">{campaign.name || `Campaign #${campaign.id}`}</h3>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {formatStatus(campaign.status || "PENDING")}
                  </span>
                  {campaign.status === "PENDING" && (
                    <span className="text-xs text-gray-500">Ready to publish</span>
                  )}
                </div>
                </div>
                {campaign.budget && (
                  <p className="text-gray-600 mb-2">Budget: ${campaign.budget}</p>
                )}
                <p className="text-gray-500 text-sm">
                  Created: {new Date(campaign.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                {/* Publish Button - Show for PENDING campaigns */}
                {campaign.status === "PENDING" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/campaigns/${campaign.id}`);
                    }}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-md"
                  >
                    🚀 Publish Campaign
                  </button>
                )}
                
                {/* Delete Button */}
                {showDeleteConfirm === campaign.id ? (
                  <div className="space-y-2">
                    <p className="text-sm text-red-700 mb-2">Delete this campaign?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleDelete(campaign.id, e)}
                        disabled={deleting === campaign.id}
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleting === campaign.id ? "Deleting..." : "Yes, Delete"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(null);
                        }}
                        disabled={deleting === campaign.id}
                        className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleDelete(campaign.id, e)}
                    disabled={deleting === campaign.id}
                    className="w-full px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    🗑️ Delete Campaign
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
