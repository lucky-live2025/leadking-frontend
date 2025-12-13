"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";
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
  updatedAt?: string;
  language?: string;
  leads?: any[];
  analytics?: any[];
  creatives?: Creative[];
  videos?: Video[];
  landingPage?: LandingPage;
  landingPageId?: string;
}

interface Creative {
  id: number;
  type: string;
  content: string;
  metadata?: any;
  campaignId: number;
}

interface Video {
  id: number;
  videoType: string;
  status: string;
  s3Url?: string;
  campaignId: number;
}

interface LandingPage {
  id: string;
  url?: string;
  businessName?: string;
  productName?: string;
  offer?: string;
  benefits?: any;
  ctaText?: string;
  theme?: string;
  type?: string;
}

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.id as string;
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } else if (err.response?.status === 404) {
        setError("Campaign not found");
      } else {
        setError(err.message || "Failed to load campaign");
      }
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
      case 'LAUNCHED':
      case 'RUNNING':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'PENDING':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'FAILED':
      case 'ERROR':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  function formatStatus(status: string) {
    const statusMap: Record<string, string> = {
      'PENDING': 'Pending',
      'LAUNCHED': 'Published',
      'ACTIVE': 'Active',
      'PAUSED': 'Paused',
      'COMPLETED': 'Completed',
      'FAILED': 'Failed',
      'ERROR': 'Error',
    };
    return statusMap[status?.toUpperCase()] || status || 'Pending';
  }

  function getPlatformName(platform: string) {
    const platformMap: Record<string, string> = {
      'META': 'Meta (Facebook/Instagram)',
      'TIKTOK': 'TikTok',
      'GOOGLE': 'Google Ads',
      'YOUTUBE': 'YouTube',
      'LINKEDIN': 'LinkedIn',
      'YANDEX': 'Yandex',
      'EMAIL': 'Email',
    };
    return platformMap[platform] || platform;
  }

  // Extract creatives from targeting.creativeAssets or from creatives array
  function getCreatives() {
    if (campaign?.creatives && campaign.creatives.length > 0) {
      return campaign.creatives;
    }
    
    // Fallback to targeting.creativeAssets
    const creativeAssets = campaign?.targeting?.creativeAssets;
    if (!creativeAssets) return [];
    
    const creatives: Creative[] = [];
    
    // Headlines
    const headlines = creativeAssets.manualHeadlines || [];
    headlines.forEach((headline: string, index: number) => {
      creatives.push({
        id: index + 1000,
        type: 'headline',
        content: headline,
        campaignId: campaign.id,
        metadata: { index },
      });
    });
    
    // Primary texts
    const primaryTexts = creativeAssets.manualPrimaryTexts || [];
    primaryTexts.forEach((text: string, index: number) => {
      creatives.push({
        id: index + 2000,
        type: 'primaryText',
        content: text,
        campaignId: campaign.id,
        metadata: { index },
      });
    });
    
    // CTAs
    const ctas = creativeAssets.manualCTAs || [];
    ctas.forEach((cta: string, index: number) => {
      creatives.push({
        id: index + 3000,
        type: 'cta',
        content: cta,
        campaignId: campaign.id,
        metadata: { index },
      });
    });
    
    return creatives;
  }

  // Get uploaded images and videos
  function getUploadedAssets() {
    const creativeAssets = campaign?.targeting?.creativeAssets;
    return {
      images: creativeAssets?.uploadedImages || [],
      videos: creativeAssets?.uploadedVideos || [],
    };
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <div className="text-lg text-gray-700">Loading campaign...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-red-200">
            <div className="text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Campaign</h2>
              <p className="text-red-700 mb-6">{error}</p>
              <Link
                href="/dashboard/campaigns"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold inline-block hover:bg-blue-700 transition-colors shadow-md"
              >
                ← Back to Campaigns
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Not Found</h2>
            <p className="text-gray-600 mb-6">The campaign you're looking for doesn't exist or has been deleted.</p>
            <Link
              href="/dashboard/campaigns"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold inline-block hover:bg-blue-700 transition-colors shadow-md"
            >
              Back to Campaigns
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const creatives = getCreatives();
  const assets = getUploadedAssets();
  const platforms = Array.isArray(campaign.platforms) ? campaign.platforms : [];
  const headlines = creatives.filter(c => c.type === 'headline' || c.metadata?.hook);
  const primaryTexts = creatives.filter(c => c.type === 'primaryText' || c.metadata?.script);
  const ctas = creatives.filter(c => c.type === 'cta' || c.metadata?.cta);
  const videos = campaign.videos || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/campaigns"
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back to Campaigns
          </Link>
        </div>

        {/* Campaign Header Card */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {campaign.name || `Campaign #${campaign.id}`}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getStatusColor(campaign.status)}`}>
                  {formatStatus(campaign.status)}
                </span>
                {campaign.budget && (
                  <span className="text-gray-600">
                    <span className="font-medium">Budget:</span> ${campaign.budget.toLocaleString()}
                  </span>
                )}
                {campaign.createdAt && (
                  <span className="text-gray-600">
                    <span className="font-medium">Created:</span> {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Platforms */}
          {platforms.length > 0 && (
            <div className="mb-4">
              <span className="text-gray-600 font-medium mr-2">Platforms:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {platforms.map((platform: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                  >
                    {getPlatformName(platform)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Creatives Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Creatives</h2>
              
              {/* Headlines */}
              {headlines.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Headlines</h3>
                  <div className="space-y-2">
                    {headlines.map((creative, index) => (
                      <div
                        key={creative.id || index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <p className="text-gray-900 font-medium">{creative.content || creative.metadata?.hook}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Texts */}
              {primaryTexts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Primary Texts</h3>
                  <div className="space-y-2">
                    {primaryTexts.map((creative, index) => (
                      <div
                        key={creative.id || index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <p className="text-gray-900">{creative.content || creative.metadata?.script}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              {ctas.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Call-to-Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {ctas.map((creative, index) => (
                      <span
                        key={creative.id || index}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                      >
                        {creative.content || creative.metadata?.cta}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback if no creatives */}
              {(headlines.length === 0 && primaryTexts.length === 0 && ctas.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <p>No creatives available for this campaign.</p>
                  {campaign.headline && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Headline:</p>
                      <p className="text-gray-900">{campaign.headline}</p>
                    </div>
                  )}
                  {campaign.primaryText && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Primary Text:</p>
                      <p className="text-gray-900">{campaign.primaryText}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Uploaded Images */}
            {assets.images.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Uploaded Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {assets.images.map((imageUrl: string, index: number) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imageUrl}
                        alt={`Campaign image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-image.png';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Videos */}
            {(assets.videos.length > 0 || videos.length > 0) && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assets.videos.map((videoUrl: string, index: number) => (
                    <div key={`uploaded-${index}`} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      <video
                        src={videoUrl}
                        controls
                        className="w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-gray-500">Video unavailable</div>';
                        }}
                      />
                    </div>
                  ))}
                  {videos.map((video: Video) => (
                    <div key={video.id} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      {video.s3Url ? (
                        <video
                          src={video.s3Url}
                          controls
                          className="w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLVideoElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `<div class="flex items-center justify-center h-full text-gray-500">Video ${video.status}</div>`;
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎬</div>
                            <p className="text-sm">Status: {video.status}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landing Page Preview */}
            {(campaign.landingPage || campaign.landingPageId) && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Landing Page</h2>
                {campaign.landingPage ? (
                  <div className="space-y-4">
                    {campaign.landingPage.url ? (
                      <div>
                        <a
                          href={campaign.landingPage.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View Landing Page →
                        </a>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                        <div className="text-center">
                          <div className="text-4xl mb-4">🌐</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {campaign.landingPage.businessName || campaign.landingPage.productName || 'Landing Page'}
                          </h3>
                          {campaign.landingPage.offer && (
                            <p className="text-gray-700 mb-2">{campaign.landingPage.offer}</p>
                          )}
                          {campaign.landingPage.ctaText && (
                            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
                              {campaign.landingPage.ctaText}
                            </button>
                          )}
                          {campaign.landingPage.benefits && Array.isArray(campaign.landingPage.benefits) && (
                            <ul className="mt-4 text-left max-w-md mx-auto space-y-2">
                              {campaign.landingPage.benefits.map((benefit: string, index: number) => (
                                <li key={index} className="text-gray-600 flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Landing page ID: {campaign.landingPageId}</p>
                    <p className="text-sm mt-2">Landing page details not available</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">
            {/* Campaign Overview */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Campaign Overview</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 font-medium block mb-1">Status</span>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold border-2 ${getStatusColor(campaign.status)}`}>
                    {formatStatus(campaign.status)}
                  </span>
                </div>
                {campaign.budget && (
                  <div>
                    <span className="text-gray-600 font-medium block mb-1">Budget</span>
                    <span className="text-gray-900 font-semibold">${campaign.budget.toLocaleString()}</span>
                  </div>
                )}
                {campaign.language && (
                  <div>
                    <span className="text-gray-600 font-medium block mb-1">Language</span>
                    <span className="text-gray-900">{campaign.language.toUpperCase()}</span>
                  </div>
                )}
                {campaign.createdAt && (
                  <div>
                    <span className="text-gray-600 font-medium block mb-1">Created</span>
                    <span className="text-gray-900">{new Date(campaign.createdAt).toLocaleString()}</span>
                  </div>
                )}
                {campaign.updatedAt && (
                  <div>
                    <span className="text-gray-600 font-medium block mb-1">Last Updated</span>
                    <span className="text-gray-900">{new Date(campaign.updatedAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Targeting Info */}
            {campaign.targeting && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Targeting</h2>
                <div className="space-y-3 text-sm">
                  {campaign.targeting.selectedCountries && campaign.targeting.selectedCountries.length > 0 && (
                    <div>
                      <span className="text-gray-600 font-medium">Countries:</span>
                      <p className="text-gray-900 mt-1">
                        {Array.isArray(campaign.targeting.selectedCountries)
                          ? campaign.targeting.selectedCountries.join(', ')
                          : 'N/A'}
                      </p>
                    </div>
                  )}
                  {campaign.targeting.selectedLanguages && campaign.targeting.selectedLanguages.length > 0 && (
                    <div>
                      <span className="text-gray-600 font-medium">Languages:</span>
                      <p className="text-gray-900 mt-1">
                        {Array.isArray(campaign.targeting.selectedLanguages)
                          ? campaign.targeting.selectedLanguages.join(', ')
                          : 'N/A'}
                      </p>
                    </div>
                  )}
                  {(campaign.targeting.ageMin || campaign.targeting.ageMax) && (
                    <div>
                      <span className="text-gray-600 font-medium">Age Range:</span>
                      <p className="text-gray-900 mt-1">
                        {campaign.targeting.ageMin || 18} - {campaign.targeting.ageMax || 65}
                      </p>
                    </div>
                  )}
                  {campaign.targeting.gender && (
                    <div>
                      <span className="text-gray-600 font-medium">Gender:</span>
                      <p className="text-gray-900 mt-1 capitalize">{campaign.targeting.gender}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Leads</span>
                  <span className="text-gray-900 font-semibold">
                    {campaign.leads?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Creatives</span>
                  <span className="text-gray-900 font-semibold">
                    {creatives.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Videos</span>
                  <span className="text-gray-900 font-semibold">
                    {videos.length + assets.videos.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Images</span>
                  <span className="text-gray-900 font-semibold">
                    {assets.images.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
