"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";
import Link from "next/link";

interface Campaign {
  id: number;
  name: string;
  status: string;
  budget?: number;
  platforms?: any;
  targeting?: any;
  headline?: string;
  primaryText?: string;
  offer?: string;
  createdAt: string;
  leads?: any[];
  analytics?: any[];
}

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.id as string;
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId]);

  async function loadCampaign() {
    try {
      setLoading(true);
      setError(null);
      
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Please log in to view campaign");
        setLoading(false);
        return;
      }
      
      const data = await apiGet(`/campaigns/${campaignId}`, { auth: true });
      setCampaign(data);
    } catch (err: any) {
      console.error("Failed to load campaign:", err);
      if (err.response?.status === 401) {
        setError("Please log in to view campaign");
      } else if (err.response?.status === 403) {
        setError("Access denied");
      } else {
        setError(err.message || "Failed to load campaign");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLaunch() {
    if (!campaign) return;
    
    if (!confirm(`Are you sure you want to launch "${campaign.name}"? This will create real ads on the selected platforms.`)) {
      return;
    }

    setLaunching(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare launch payload
      const platforms = Array.isArray(campaign.platforms) ? campaign.platforms : [];
      const platformMap: Record<string, boolean> = {};
      
      platforms.forEach((p: string) => {
        if (p === 'META') platformMap.meta = true;
        if (p === 'TIKTOK') platformMap.tiktok = true;
        if (p === 'GOOGLE') platformMap.google = true;
        if (p === 'YANDEX') platformMap.yandex = true;
      });

      const payload = {
        campaignId: campaign.id,
        name: campaign.name,
        budget: campaign.budget || 0,
        language: campaign.targeting?.languages?.[0] || 'en',
        platforms: platformMap,
        targeting: campaign.targeting || {},
        objective: campaign.offer || 'CONVERSIONS',
        headline: campaign.headline || '',
        primaryText: campaign.primaryText || '',
        offer: campaign.offer || '',
      };

      const result = await apiPost("/campaigns/launch", payload, { auth: true });
      
      setSuccess(`Campaign launched successfully! ${result.message || ''}`);
      
      // Reload campaign to get updated status
      setTimeout(() => {
        loadCampaign();
      }, 1000);
    } catch (err: any) {
      console.error("Failed to launch campaign:", err);
      setError(err.response?.data?.message || err.message || "Failed to launch campaign");
    } finally {
      setLaunching(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
      case 'RUNNING':
        return 'bg-green-100 text-green-800';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING':
        return 'bg-gray-100 text-gray-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'FAILED':
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function formatStatus(status: string) {
    return status?.toUpperCase() || 'PENDING';
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading campaign...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !campaign) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
          <p className="text-red-700">{error}</p>
          <Link
            href="/dashboard/campaigns"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200">
          <p className="text-gray-600 text-lg mb-4">Campaign not found</p>
          <Link
            href="/dashboard/campaigns"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold inline-block hover:bg-blue-700 transition-colors shadow-md"
          >
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  const canLaunch = campaign.status === 'PENDING' || campaign.status === 'PAUSED';
  const platforms = Array.isArray(campaign.platforms) ? campaign.platforms : [];

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/campaigns"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Campaigns
        </Link>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.name || `Campaign #${campaign.id}`}</h1>
            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(campaign.status)}`}>
              {formatStatus(campaign.status)}
            </span>
          </div>
          
          {canLaunch && (
            <button
              onClick={handleLaunch}
              disabled={launching}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {launching ? "Launching..." : "🚀 Launch Campaign"}
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Details</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium">Budget:</span>
                <span className="ml-2 text-gray-900">${campaign.budget || 0}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Platforms:</span>
                <span className="ml-2 text-gray-900">
                  {platforms.length > 0 ? platforms.join(', ') : 'None selected'}
                </span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Created:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Content</h2>
            <div className="space-y-3">
              {campaign.headline && (
                <div>
                  <span className="text-gray-600 font-medium">Headline:</span>
                  <p className="mt-1 text-gray-900">{campaign.headline}</p>
                </div>
              )}
              {campaign.primaryText && (
                <div>
                  <span className="text-gray-600 font-medium">Primary Text:</span>
                  <p className="mt-1 text-gray-900">{campaign.primaryText}</p>
                </div>
              )}
              {campaign.offer && (
                <div>
                  <span className="text-gray-600 font-medium">Objective:</span>
                  <p className="mt-1 text-gray-900">{campaign.offer}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {campaign.targeting && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Targeting</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(campaign.targeting, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {campaign.leads && campaign.leads.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Leads ({campaign.leads.length})</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">View all leads in the <Link href="/dashboard/leads" className="text-blue-600 hover:underline">Leads Dashboard</Link></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

