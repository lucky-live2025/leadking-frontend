"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import TargetingStep from "@/components/TargetingStep";
import CreativeUploader from "@/components/campaign/Create/CreativeUploader";
import CreativeTextInputs from "@/components/campaign/Create/CreativeTextInputs";
import CreativePreview from "@/components/campaign/Create/CreativePreview";
import LandingPageStep from "@/app/campaign/create/steps/LandingPageStep";

const platforms = [
  {
    id: "meta-facebook",
    name: "Meta (Facebook)",
    icon: "📘",
    description: "Facebook Ads",
    objectives: ["CONVERSIONS", "TRAFFIC", "ENGAGEMENT", "LEADS", "AWARENESS"],
  },
  {
    id: "meta-instagram",
    name: "Meta (Instagram)",
    icon: "📷",
    description: "Instagram Ads",
    objectives: ["CONVERSIONS", "TRAFFIC", "ENGAGEMENT", "LEADS", "AWARENESS"],
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    icon: "🎵",
    description: "TikTok Advertising",
    objectives: ["CONVERSIONS", "TRAFFIC", "ENGAGEMENT", "LEADS", "VIEWS"],
  },
  {
    id: "google-search",
    name: "Google Search Ads",
    icon: "🔍",
    description: "Google Search Advertising",
    objectives: ["CLICKS", "CONVERSIONS", "TRAFFIC", "LEADS"],
  },
  {
    id: "google-display",
    name: "Google Display Ads",
    icon: "🖼️",
    description: "Google Display Network",
    objectives: ["AWARENESS", "TRAFFIC", "CONVERSIONS", "ENGAGEMENT"],
  },
  {
    id: "youtube",
    name: "YouTube Ads",
    icon: "📺",
    description: "YouTube Advertising",
    objectives: ["VIEWS", "SUBSCRIBERS", "ENGAGEMENT", "AWARENESS"],
  },
  {
    id: "linkedin",
    name: "LinkedIn Ads",
    icon: "💼",
    description: "LinkedIn Advertising",
    objectives: ["LEADS", "CONVERSIONS", "ENGAGEMENT", "AWARENESS"],
  },
  {
    id: "yandex",
    name: "Yandex Ads",
    icon: "🔷",
    description: "Yandex Direct",
    objectives: ["CLICKS", "CONVERSIONS", "TRAFFIC", "LEADS"],
  },
  {
    id: "email",
    name: "Email AI Campaigns",
    icon: "📧",
    description: "AI Email Marketing",
    objectives: ["OPENS", "CLICKS", "CONVERSIONS", "ENGAGEMENT"],
  },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Creative mode: 'ai-only', 'manual-only', 'hybrid'
  const [creativeMode, setCreativeMode] = useState<"ai-only" | "manual-only" | "hybrid">("hybrid");
  
  // Form data
  const [formData, setFormData] = useState({
    platform: "",
    objective: "",
    countries: [] as string[],
    states: [] as string[],
    cities: [] as string[],
    languages: [] as string[],
    interests: [] as string[],
    ageMin: 18,
    ageMax: 65,
    gender: "all",
    dailyBudget: "",
    generateCreative: false,
    // Landing page
    landingPageType: undefined as "ai-generated" | "uploaded" | "external" | undefined,
    landingPageId: undefined as string | undefined,
    landingPageUrl: undefined as string | undefined,
    landingPageData: undefined as any,
    // Manual creative assets
    uploadedImages: [] as File[],
    uploadedVideos: [] as File[],
    manualHeadlines: [] as string[],
    manualPrimaryTexts: [] as string[],
    manualDescriptions: [] as string[],
    manualCTAs: [] as string[],
    // AI-generated creatives (will be populated after AI generation)
    aiHeadlines: [] as string[],
    aiPrimaryTexts: [] as string[],
    aiDescriptions: [] as string[],
    aiCTAs: [] as string[],
  });

  // Uploaded file URLs (after upload to backend)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [uploadedVideoUrls, setUploadedVideoUrls] = useState<string[]>([]);

  const handlePlatformSelect = (platform: any) => {
    setSelectedPlatform(platform);
    setFormData((prev) => ({ ...prev, platform: platform.id }));
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2 && !formData.objective) {
      setError("Please select an objective");
      return;
    }
    if (step === 3) {
      if (formData.countries.length === 0) {
        setError("Please select at least one country");
        return;
      }
      if (formData.languages.length === 0) {
        setError("Please select at least one language");
        return;
      }
    }
    if (step === 4) {
      // Landing page step - validation is optional
    }
    if (step === 5 && !formData.dailyBudget) {
      setError("Please enter a daily budget");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedPlatform(null);
      setFormData((prev) => ({ ...prev, platform: "", objective: "" }));
    }
    setStep(step - 1);
    setError(null);
  };

  const handleFilesChange = async (files: { images: File[]; videos: File[] }) => {
    setFormData((prev) => ({
      ...prev,
      uploadedImages: files.images,
      uploadedVideos: files.videos,
    }));

    // Upload files to backend
    if (files.images.length > 0 || files.videos.length > 0) {
      const formData = new FormData();
      [...files.images, ...files.videos].forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.leadkingapp.com"}/uploads/creative`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrls = data.files.filter((url: string) => 
            url.match(/\.(jpg|jpeg|png|webp)$/i)
          );
          const videoUrls = data.files.filter((url: string) => 
            url.match(/\.(mp4|mov)$/i)
          );
          setUploadedImageUrls(imageUrls);
          setUploadedVideoUrls(videoUrls);
        }
      } catch (err) {
        console.error("Failed to upload files:", err);
      }
    }
  };

  const handleTextsChange = (texts: {
    headlines: string[];
    primaryTexts: string[];
    descriptions: string[];
    ctas: string[];
  }) => {
    setFormData((prev) => ({
      ...prev,
      manualHeadlines: texts.headlines,
      manualPrimaryTexts: texts.primaryTexts,
      manualDescriptions: texts.descriptions,
      manualCTAs: texts.ctas,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Determine which creatives to use based on mode
      let finalHeadlines: string[] = [];
      let finalPrimaryTexts: string[] = [];
      let finalDescriptions: string[] = [];
      let finalCTAs: string[] = [];

      if (creativeMode === "ai-only" || creativeMode === "hybrid") {
        finalHeadlines = [...formData.aiHeadlines];
        finalPrimaryTexts = [...formData.aiPrimaryTexts];
        finalDescriptions = [...formData.aiDescriptions];
        finalCTAs = [...formData.aiCTAs];
      }

      if (creativeMode === "manual-only" || creativeMode === "hybrid") {
        finalHeadlines = [...finalHeadlines, ...formData.manualHeadlines];
        finalPrimaryTexts = [...finalPrimaryTexts, ...formData.manualPrimaryTexts];
        finalDescriptions = [...finalDescriptions, ...formData.manualDescriptions];
        finalCTAs = [...finalCTAs, ...formData.manualCTAs];
      }

      const campaignData = {
        platform: formData.platform,
        objective: formData.objective,
        countries: formData.countries,
        states: formData.states || [],
        cities: formData.cities || [],
        languages: formData.languages,
        interests: formData.interests || [],
        ageMin: formData.ageMin,
        ageMax: formData.ageMax,
        gender: formData.gender,
        dailyBudget: parseFloat(formData.dailyBudget) || 0,
        aiCreative: creativeMode === "ai-only" || creativeMode === "hybrid",
        uploadedImages: uploadedImageUrls,
        uploadedVideos: uploadedVideoUrls,
        manualHeadlines: formData.manualHeadlines,
        manualPrimaryTexts: formData.manualPrimaryTexts,
        manualDescriptions: formData.manualDescriptions,
        manualCTAs: formData.manualCTAs,
        landingPageType: formData.landingPageType,
        landingPageId: formData.landingPageId,
        landingPageUrl: formData.landingPageUrl,
      };

      const response = await apiPost("/campaigns/create", campaignData, { auth: true });
      
      if (response.id || response.campaignId) {
        router.push(`/dashboard/campaigns/${response.id || response.campaignId}`);
      } else {
        router.push("/dashboard/campaigns");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create campaign");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Campaign</h1>
          <p className="text-gray-400">Build and launch your marketing campaign</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
                }`}
              >
                {s}
              </div>
              {s < 6 && (
                <div className={`flex-1 h-1 mx-2 ${step > s ? "bg-blue-600" : "bg-gray-700"}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-[#111827] rounded-lg p-8">
          {/* Step 1: Platform Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Select Platform</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformSelect(platform)}
                    className="bg-[#0A1628] border-2 border-gray-700 rounded-lg p-6 text-left hover:border-blue-500 transition"
                  >
                    <div className="text-4xl mb-3">{platform.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{platform.name}</h3>
                    <p className="text-sm text-gray-400">{platform.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Objective */}
          {step === 2 && selectedPlatform && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Campaign Objective</h2>
              <div className="space-y-3">
                {selectedPlatform.objectives.map((obj: string) => (
                  <button
                    key={obj}
                    onClick={() => setFormData((prev) => ({ ...prev, objective: obj }))}
                    className={`w-full p-4 rounded-lg text-left ${
                      formData.objective === obj
                        ? "bg-blue-600 text-white"
                        : "bg-[#0A1628] text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {obj.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Targeting */}
          {step === 3 && (
            <div>
              <TargetingStep
                platform={formData.platform}
                formData={formData}
                onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
              />
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Landing Page */}
          {step === 4 && (
            <div>
              <LandingPageStep
                formData={formData}
                onChange={(data) => {
                  setFormData((prev) => ({ ...prev, ...data }));
                  // If landing page is created, store the ID/URL
                  if (data.landingPageData?.id) {
                    setFormData((prev) => ({
                      ...prev,
                      landingPageId: data.landingPageData.id,
                      landingPageUrl: data.landingPageData.url,
                    }));
                  }
                }}
                availableImages={uploadedImageUrls}
                availableVideos={uploadedVideoUrls}
              />
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Creative */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Creative Assets</h2>
              
              {/* Creative Mode Selection */}
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-3">Creative Mode</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setCreativeMode("ai-only")}
                    className={`p-4 rounded-lg border-2 ${
                      creativeMode === "ai-only"
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-gray-700 bg-[#0A1628]"
                    }`}
                  >
                    <div className="text-white font-semibold">AI Only</div>
                    <div className="text-gray-400 text-sm">Generate with AI</div>
                  </button>
                  <button
                    onClick={() => setCreativeMode("manual-only")}
                    className={`p-4 rounded-lg border-2 ${
                      creativeMode === "manual-only"
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-gray-700 bg-[#0A1628]"
                    }`}
                  >
                    <div className="text-white font-semibold">Manual Only</div>
                    <div className="text-gray-400 text-sm">Upload your own</div>
                  </button>
                  <button
                    onClick={() => setCreativeMode("hybrid")}
                    className={`p-4 rounded-lg border-2 ${
                      creativeMode === "hybrid"
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-gray-700 bg-[#0A1628]"
                    }`}
                  >
                    <div className="text-white font-semibold">Hybrid</div>
                    <div className="text-gray-400 text-sm">AI + Manual</div>
                  </button>
                </div>
              </div>

              {/* AI Creative Option */}
              {(creativeMode === "ai-only" || creativeMode === "hybrid") && (
                <div className="mb-6">
                  <label className="flex items-center gap-3 text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.generateCreative}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, generateCreative: e.target.checked }))
                      }
                      className="w-5 h-5"
                    />
                    Generate AI Creative (Hooks, Scripts, Headlines)
                  </label>
                </div>
              )}

              {/* Manual Upload */}
              {(creativeMode === "manual-only" || creativeMode === "hybrid") && (
                <div className="space-y-6 mb-6">
                  <CreativeUploader onFilesChange={handleFilesChange} />
                  <CreativeTextInputs onTextsChange={handleTextsChange} />
                </div>
              )}

              {/* Preview */}
              <div className="mb-6">
                <CreativePreview
                  images={uploadedImageUrls}
                  videos={uploadedVideoUrls}
                  headlines={[...formData.manualHeadlines, ...formData.aiHeadlines]}
                  primaryTexts={[...formData.manualPrimaryTexts, ...formData.aiPrimaryTexts]}
                  descriptions={[...formData.manualDescriptions, ...formData.aiDescriptions]}
                  ctas={[...formData.manualCTAs, ...formData.aiCTAs]}
                />
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Review & Generate */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Review & Generate</h2>
              <div className="bg-[#0A1628] rounded-lg p-6 space-y-4 mb-6">
                <div>
                  <span className="text-gray-400">Platform:</span>
                  <span className="text-white ml-2">{selectedPlatform?.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Objective:</span>
                  <span className="text-white ml-2">{formData.objective}</span>
                </div>
                <div>
                  <span className="text-gray-400">Countries:</span>
                  <span className="text-white ml-2">{formData.countries.join(", ")}</span>
                </div>
                {formData.states && formData.states.length > 0 && (
                  <div>
                    <span className="text-gray-400">States:</span>
                    <span className="text-white ml-2">{formData.states.join(", ")}</span>
                  </div>
                )}
                {formData.cities && formData.cities.length > 0 && (
                  <div>
                    <span className="text-gray-400">Cities:</span>
                    <span className="text-white ml-2">{formData.cities.slice(0, 5).join(", ")}{formData.cities.length > 5 ? ` +${formData.cities.length - 5} more` : ""}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">Languages:</span>
                  <span className="text-white ml-2">{formData.languages.join(", ")}</span>
                </div>
                {formData.interests && formData.interests.length > 0 && (
                  <div>
                    <span className="text-gray-400">Interests:</span>
                    <span className="text-white ml-2">{formData.interests.length} selected</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">Age Range:</span>
                  <span className="text-white ml-2">{formData.ageMin} - {formData.ageMax}</span>
                </div>
                <div>
                  <span className="text-gray-400">Gender:</span>
                  <span className="text-white ml-2">{formData.gender}</span>
                </div>
                <div>
                  <span className="text-gray-400">Daily Budget:</span>
                  <span className="text-white ml-2">${formData.dailyBudget}</span>
                </div>
                <div>
                  <span className="text-gray-400">Creative Mode:</span>
                  <span className="text-white ml-2">{creativeMode}</span>
                </div>
                <div>
                  <span className="text-gray-400">Images:</span>
                  <span className="text-white ml-2">{uploadedImageUrls.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">Videos:</span>
                  <span className="text-white ml-2">{uploadedVideoUrls.length}</span>
                </div>
              </div>

              {/* JSON Preview for Debugging */}
              <details className="mb-6">
                <summary className="text-gray-400 cursor-pointer mb-2">View JSON Payload (Debug)</summary>
                <pre className="bg-[#0A1628] p-4 rounded-lg text-xs text-gray-300 overflow-auto max-h-64">
                  {JSON.stringify({
                    platform: formData.platform,
                    objective: formData.objective,
                    countries: formData.countries,
                    states: formData.states,
                    cities: formData.cities,
                    languages: formData.languages,
                    interests: formData.interests,
                    ageMin: formData.ageMin,
                    ageMax: formData.ageMax,
                    gender: formData.gender,
                    dailyBudget: formData.dailyBudget,
                    aiCreative: creativeMode === "ai-only" || creativeMode === "hybrid",
                    uploadedImages: uploadedImageUrls,
                    uploadedVideos: uploadedVideoUrls,
                    manualHeadlines: formData.manualHeadlines,
                    manualPrimaryTexts: formData.manualPrimaryTexts,
                    manualDescriptions: formData.manualDescriptions,
                    manualCTAs: formData.manualCTAs,
                  }, null, 2)}
                </pre>
              </details>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Campaign"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
