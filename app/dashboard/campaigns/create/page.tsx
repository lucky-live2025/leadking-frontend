"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost, apiGet } from "@/lib/api";
import { fetchUser } from "@/lib/auth-check";
import TargetingStep from "@/components/TargetingStep";
import CreativeUploader from "@/components/campaign/Create/CreativeUploader";
import CreativeTextInputs from "@/components/campaign/Create/CreativeTextInputs";
import CreativePreview from "@/components/campaign/Create/CreativePreview";
import LandingPageStep from "@/app/campaign/create/steps/LandingPageStep";
import UltraStrategyPanel from "@/components/campaign/UltraStrategyPanel";
import ProgressIndicator from "@/components/ProgressIndicator";

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
    id: "email",
    name: "Email AI Campaigns",
    icon: "📧",
    description: "AI Email Marketing",
    objectives: ["OPENS", "CLICKS", "CONVERSIONS", "ENGAGEMENT"],
  },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // Start at step 0: Choose Campaign Mode
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Campaign Mode: 'standard' or 'ultra'
  const [campaignMode, setCampaignMode] = useState<"standard" | "ultra" | null>(null);
  
  // ULTRA Analysis State
  const [ultraForm, setUltraForm] = useState({
    businessName: "",
    productDescription: "",
    industry: "",
    location: "",
    goal: "leads",
    budget: "",
  });
  const [ultraAnalyzing, setUltraAnalyzing] = useState(false);
  const [ultraStrategy, setUltraStrategy] = useState<any>(null);
  const [ultraCampaignId, setUltraCampaignId] = useState<number | null>(null);
  
  // Creative mode: 'ai-only', 'manual-only', 'hybrid'
  const [creativeMode, setCreativeMode] = useState<"ai-only" | "manual-only" | "hybrid">("hybrid");

  // AI Generation State
  const [aiPrompts, setAiPrompts] = useState({
    imagePrompt: "",
    videoPrompt: "",
    generatingImage: false,
    generatingVideo: false,
    generatedImages: [] as string[],
    generatedVideos: [] as { jobId: string; status: string; url?: string }[],
  });
  
  // Form data
  const [formData, setFormData] = useState({
    platform: "",
    objective: "",
    countries: [] as string[],
    states: [] as string[],
    cities: [] as string[],
    languages: [] as string[],
    interests: [] as string[],
    ageMin: 22,
    ageMax: 88,
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
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [platformConnections, setPlatformConnections] = useState<any>({});
  const [checkingConnections, setCheckingConnections] = useState(false);
  const [aiEngineStatus, setAiEngineStatus] = useState<"checking" | "online" | "offline" | "unknown">("checking");

  // Check user status and platform connections on mount
  useEffect(() => {
    async function checkUserStatus() {
      try {
        setCheckingStatus(true);
        // Always fetch fresh user data to get latest status
        const user = await fetchUser();
        
        if (!user) {
          console.warn("[CreateCampaign] No user found, redirecting to login");
          router.push("/login");
          return;
        }

        const userStatus = user.status?.toUpperCase() || 'PENDING';
        setUserStatus(userStatus);
        
        console.log("[CreateCampaign] User status check:", {
          email: user.email,
          status: userStatus,
          approved: userStatus === "APPROVED"
        });

        // Only block if status is explicitly not APPROVED
        // But show error message instead of redirecting immediately
        if (userStatus !== "APPROVED") {
          console.warn("[CreateCampaign] User not approved, status:", userStatus);
          setError("Your account is pending approval. Please wait for admin approval before creating campaigns.");
          // Don't redirect - let user see the error message
          setCheckingStatus(false);
          return;
        }
      } catch (err: any) {
        console.error("[CreateCampaign] Failed to check user status:", err);
        // Don't redirect on error - let user try to access
        setUserStatus(null);
      } finally {
        setCheckingStatus(false);
      }
    }

    async function checkConnections() {
      try {
        setCheckingConnections(true);
        const tokens = await apiGet("/auth/platform-tokens").catch(() => []);
        const connections: any = {};
        if (Array.isArray(tokens)) {
          tokens.forEach((token: any) => {
            connections[token.platform] = true;
          });
        }
        setPlatformConnections(connections);
      } catch (err) {
        console.warn("Failed to check platform connections:", err);
      } finally {
        setCheckingConnections(false);
      }
    }

    async function checkAiEngine() {
      try {
        // Use the API helper which handles /api prefix correctly
        const data = await apiGet("/health/ai");
        setAiEngineStatus(data.status === "ok" ? "online" : "offline");
      } catch (err) {
        console.warn("Failed to check AI engine status:", err);
        setAiEngineStatus("offline");
      }
    }

    checkUserStatus();
    checkConnections();
    checkAiEngine();
  }, [router]);

  const handlePlatformSelect = (platform: any) => {
    // Map platform ID to backend platform name
    const platformMap: Record<string, string> = {
      'meta-facebook': 'META',
      'meta-instagram': 'META',
      'tiktok': 'TIKTOK',
      'google-search': 'GOOGLE',
      'google-display': 'GOOGLE',
      'youtube': 'GOOGLE',
      'linkedin': 'LINKEDIN',
    };

    const backendPlatform = platformMap[platform.id] || platform.id.toUpperCase();
    const isConnected = platformConnections[backendPlatform];

    if (!isConnected) {
      setError(
        `Please connect your ${platform.name} account first. Go to Integrations page to connect.`
      );
      // Show link to integrations
      setTimeout(() => {
        if (window.confirm(`You need to connect ${platform.name} first. Go to Integrations page?`)) {
          router.push("/dashboard/integrations");
        }
      }, 100);
      return;
    }

    setSelectedPlatform(platform);
    setFormData((prev) => ({ ...prev, platform: platform.id }));
    setStep(2);
  };

  const handleNext = () => {
    if (step === 0 && !campaignMode) {
      setError("Please select a campaign mode");
      return;
    }
    if (step === 1 && !selectedPlatform) {
      setError("Please select a platform");
      return;
    }
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
      // Creative step - validation is optional
    }
    if (step === 5) {
      // Landing page step - validation is optional
    }
    setError(null);
    setStep(step + 1);
  };

  const handleRunUltraAnalysis = async () => {
    if (!ultraForm.businessName || !ultraForm.productDescription || !ultraForm.industry || !ultraForm.location || !ultraForm.budget) {
      setError("Please fill in all required fields");
      return;
    }

    setUltraAnalyzing(true);
    setError(null);
    try {
      const response = await apiPost("/ultra/analyze", ultraForm, { auth: true });
      setUltraStrategy(response.analysis || response);
      setUltraCampaignId(response.campaignId || null);
    } catch (err: any) {
      setError(err.message || "Failed to run ULTRA analysis");
      setUltraAnalyzing(false);
    } finally {
      setUltraAnalyzing(false);
    }
  };

  const handleApplyUltraStrategy = async () => {
    if (!ultraStrategy) return;

    setLoading(true);
    setError(null);

    try {
      // Extract strategy recommendations
      const strategy = ultraStrategy.campaignStrategy || {};
      const platformSuitability = ultraStrategy.platformSuitability || {};
      const competitiveAngle = ultraStrategy.competitiveAngle || {};
      const buyerPersona = ultraStrategy.buyerPersona || {};

      // Auto-fill campaign form based on ULTRA strategy
      // 1. Select best platform (highest score)
      const bestPlatform = Object.entries(platformSuitability)
        .sort(([, a]: [string, any], [, b]: [string, any]) => (b.score || 0) - (a.score || 0))[0];
      
      if (bestPlatform) {
        const platformId = bestPlatform[0].toLowerCase();
        const platformMap: Record<string, string> = {
          'meta': 'meta-facebook',
          'tiktok': 'tiktok',
          'google': 'google-search',
          'youtube': 'youtube',
          'linkedin': 'linkedin',
        };
        const mappedPlatform = platforms.find(p => p.id === platformMap[platformId] || p.id === platformId);
        if (mappedPlatform) {
          setSelectedPlatform(mappedPlatform);
          setFormData((prev) => ({ ...prev, platform: mappedPlatform.id }));
        }
      }

      // 2. Set objective based on goal
      const objectiveMap: Record<string, string> = {
        'leads': 'LEADS',
        'sales': 'CONVERSIONS',
        'traffic': 'TRAFFIC',
        'awareness': 'AWARENESS',
      };
      const objective = objectiveMap[ultraForm.goal] || 'LEADS';
      setFormData((prev) => ({ ...prev, objective }));

      // 3. Set targeting from persona
      if (buyerPersona.demographics) {
        const ageRange = buyerPersona.demographics.age?.match(/(\d+)-(\d+)/);
        if (ageRange) {
          setFormData((prev) => ({
            ...prev,
            ageMin: parseInt(ageRange[1]) || 22,
            ageMax: parseInt(ageRange[2]) || 65,
          }));
        }
      }

      // 4. Set location
      if (ultraForm.location) {
        const countries = ultraForm.location.split(',').map(c => c.trim()).filter(Boolean);
        setFormData((prev) => ({ ...prev, countries }));
      }

      // 5. Set interests from persona
      if (buyerPersona.psychographics?.interests) {
        setFormData((prev) => ({
          ...prev,
          interests: buyerPersona.psychographics.interests.slice(0, 5),
        }));
      }

      // 6. Set budget
      const budgetMatch = ultraForm.budget.match(/\$?(\d+)/);
      if (budgetMatch) {
        setFormData((prev) => ({ ...prev, dailyBudget: budgetMatch[1] }));
      }

      // 7. Generate creatives from strategy
      if (competitiveAngle.keyMessages && competitiveAngle.keyMessages.length > 0) {
        setFormData((prev) => ({
          ...prev,
          aiHeadlines: competitiveAngle.keyMessages.slice(0, 3),
          aiPrimaryTexts: competitiveAngle.keyMessages.slice(0, 2),
        }));
      }

      // Move to next step
      setStep(1);
    } catch (err: any) {
      setError(err.message || "Failed to apply strategy");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      // If going back from platform selection, return to mode selection
      setStep(0);
      return;
    }
    if (step === 2) {
      setSelectedPlatform(null);
      setFormData((prev) => ({ ...prev, platform: "", objective: "" }));
    }
    setStep(step - 1);
    setError(null);
  };

  const handleGenerateImage = async () => {
    if (!aiPrompts.imagePrompt) {
      setError("Please enter an image prompt");
      return;
    }

    setAiPrompts((prev) => ({ ...prev, generatingImage: true }));
    setError(null);
    try {
      const response = await apiPost("/creatives/images", {
        prompt: aiPrompts.imagePrompt,
        businessType: selectedPlatform?.name || "general",
        count: 1,
      }, { auth: true });

      const imageUrls = response.creatives?.map((c: any) => c.url).filter(Boolean) ?? [];
      if (imageUrls.length > 0) {
        setAiPrompts((prev) => ({
          ...prev,
          generatingImage: false,
          generatedImages: [...prev.generatedImages, ...imageUrls],
          imagePrompt: "",
        }));
      } else {
        const msg = response.creatives?.[0]?.placeholder
          ? "Image generation is not available. Please try again later or contact support."
          : "No images generated. Please try again.";
        setError(msg);
        setAiPrompts((prev) => ({ ...prev, generatingImage: false }));
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to generate image. Check your connection and try again.";
      setError(msg);
      setAiPrompts((prev) => ({ ...prev, generatingImage: false }));
    }
  };

  const handleGenerateVideo = async () => {
    if (!aiPrompts.videoPrompt) {
      setError("Please enter a video prompt");
      return;
    }

    setAiPrompts((prev) => ({ ...prev, generatingVideo: true }));
    setError(null);
    try {
      const response = await apiPost("/creatives/videos", {
        script: aiPrompts.videoPrompt,
        businessType: selectedPlatform?.name || "general",
      }, { auth: true });

      const creatives = response.creatives ?? [];
      const hasRealJob = creatives.some((c: any) => c.url || (c.jobId && !String(c.jobId).startsWith("video_")));
      if (creatives.length > 0 && (hasRealJob || creatives.some((c: any) => c.status === "processing"))) {
        setAiPrompts((prev) => ({
          ...prev,
          generatingVideo: false,
          generatedVideos: [...prev.generatedVideos, ...creatives],
          videoPrompt: "",
        }));
      } else {
        const msg = creatives[0]?.message || "Video generation is not available. Please try again later or contact support.";
        setError(msg);
        setAiPrompts((prev) => ({ ...prev, generatingVideo: false }));
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to generate video. Check your connection and try again.";
      setError(msg);
      setAiPrompts((prev) => ({ ...prev, generatingVideo: false }));
    }
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://leadkingapp.com/api";
        const response = await fetch(`${apiUrl}/uploads/creative`, {
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

  // Show loading state while checking user status
  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Campaign</h1>
          <p className="text-gray-600">Build and launch your marketing campaign</p>
        </div>

        {/* Progress Steps */}
        {step > 0 && (
          <ProgressIndicator
            currentStep={step}
            totalSteps={6}
            stepLabels={["Mode", "Platform", "Objective", "Targeting", "Creative", "Landing"]}
          />
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-900 p-4 rounded-xl mb-6 shadow-md">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
          {/* Step 0: Choose Campaign Mode */}
          {step === 0 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Campaign Mode</h2>
                <p className="text-gray-600">Select how you want to create your campaign</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Standard Campaign */}
                <button
                  onClick={() => {
                    setCampaignMode("standard");
                    setStep(1);
                  }}
                  className="p-8 rounded-2xl border-2 border-gray-300 bg-white hover:border-blue-500 hover:shadow-xl transition-all transform hover:scale-105 text-left"
                >
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard Campaign</h3>
                  <p className="text-gray-600 mb-4">Fast AI generation - Get started quickly</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Quick setup
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      AI-powered creatives
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Standard targeting
                    </li>
                  </ul>
                </button>

                {/* ULTRA Campaign */}
                <button
                  onClick={() => {
                    setCampaignMode("ultra");
                    // Stay on step 0 to show ULTRA form
                  }}
                  className={`p-8 rounded-2xl border-2 transition-all transform hover:scale-105 text-left ${
                    campaignMode === "ultra"
                      ? "border-purple-600 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl ring-2 ring-purple-500"
                      : "border-gray-300 bg-white hover:border-purple-500 hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl">✨</div>
                    <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                      PREMIUM
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">ULTRA Campaign</h3>
                  <p className="text-gray-600 mb-4">AI Strategist - Pre-campaign analysis & strategy</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">✓</span>
                      Market & competitor analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">✓</span>
                      Buyer persona building
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">✓</span>
                      Platform recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">✓</span>
                      Budget optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">✓</span>
                      Strategy before spending
                    </li>
                  </ul>
                </button>
              </div>

              {/* ULTRA Form (shown when ULTRA is selected) */}
              {campaignMode === "ultra" && (
                <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 ULTRA Strategy Analysis</h3>
                  <p className="text-gray-700 mb-6">
                    Tell us about your business and we'll analyze the market, competitors, and create a winning strategy before you spend a dollar.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={ultraForm.businessName}
                        onChange={(e) => setUltraForm({ ...ultraForm, businessName: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Industry *
                      </label>
                      <input
                        type="text"
                        value={ultraForm.industry}
                        onChange={(e) => setUltraForm({ ...ultraForm, industry: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., SaaS, E-commerce, Real Estate"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Product / Service Description *
                      </label>
                      <textarea
                        value={ultraForm.productDescription}
                        onChange={(e) => setUltraForm({ ...ultraForm, productDescription: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={3}
                        placeholder="Describe what you're selling and who it's for..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Target Location *
                      </label>
                      <input
                        type="text"
                        value={ultraForm.location}
                        onChange={(e) => setUltraForm({ ...ultraForm, location: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., United States, New York, London"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Goal *
                      </label>
                      <select
                        value={ultraForm.goal}
                        onChange={(e) => setUltraForm({ ...ultraForm, goal: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="leads">Generate Leads</option>
                        <option value="sales">Drive Sales</option>
                        <option value="traffic">Increase Traffic</option>
                        <option value="awareness">Brand Awareness</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Budget (Daily or Monthly) *
                      </label>
                      <input
                        type="text"
                        value={ultraForm.budget}
                        onChange={(e) => setUltraForm({ ...ultraForm, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., $50/day or $1500/month"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleRunUltraAnalysis}
                      disabled={
                        ultraAnalyzing ||
                        !ultraForm.businessName ||
                        !ultraForm.productDescription ||
                        !ultraForm.industry ||
                        !ultraForm.location ||
                        !ultraForm.budget
                      }
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-xl"
                    >
                      {ultraAnalyzing ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Analyzing Strategy...
                        </span>
                      ) : (
                        "🚀 Run ULTRA Analysis"
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setCampaignMode("standard");
                        setUltraStrategy(null);
                      }}
                      className="px-6 py-4 bg-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Use Standard Mode
                    </button>
                  </div>

                  {/* ULTRA Strategy Results */}
                  {ultraStrategy && (
                    <div className="mt-8">
                      <UltraStrategyPanel
                        strategy={ultraStrategy}
                        onApplyStrategy={handleApplyUltraStrategy}
                        applying={loading}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Navigation for Standard Mode */}
              {campaignMode === "standard" && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
                  >
                    Continue to Platform Selection →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Platform Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Platform</h2>
              {checkingConnections && (
                <div className="mb-4 text-sm text-gray-600">Checking platform connections...</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform) => {
                  const platformMap: Record<string, string> = {
                    'meta-facebook': 'META',
                    'meta-instagram': 'META',
                    'tiktok': 'TIKTOK',
                    'google-search': 'GOOGLE',
                    'google-display': 'GOOGLE',
                    'youtube': 'GOOGLE',
                    'linkedin': 'LINKEDIN',
                  };
                  const backendPlatform = platformMap[platform.id] || platform.id.toUpperCase();
                  const isConnected = platformConnections[backendPlatform];
                  
                  return (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformSelect(platform)}
                      className={`bg-white border-2 rounded-xl p-6 text-left transition-all relative ${
                        isConnected
                          ? "border-green-300 hover:border-green-500 hover:shadow-md"
                          : "border-gray-300 hover:border-yellow-500 hover:shadow-md opacity-75"
                      }`}
                    >
                      {isConnected && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          ✓ Connected
                        </div>
                      )}
                      {!isConnected && !checkingConnections && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          ⚠ Not Connected
                        </div>
                      )}
                      <div className="text-4xl mb-3">{platform.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{platform.name}</h3>
                      <p className="text-sm text-gray-600">{platform.description}</p>
                      {!isConnected && (
                        <p className="text-xs text-yellow-600 mt-2 font-medium">
                          Connect account required
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
              {!checkingConnections && Object.keys(platformConnections).length === 0 && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-800 text-sm mb-2">
                    ⚠️ No platforms connected. Please connect at least one platform before creating campaigns.
                  </p>
                  <Link
                    href="/dashboard/integrations"
                    className="text-yellow-900 font-semibold underline hover:text-yellow-700"
                  >
                    Go to Integrations →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Objective */}
          {step === 2 && selectedPlatform && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Objective</h2>
              <div className="space-y-3">
                {selectedPlatform.objectives.map((obj: string) => (
                  <button
                    key={obj}
                    onClick={() => setFormData((prev) => ({ ...prev, objective: obj }))}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      formData.objective === obj
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {obj.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors shadow-md"
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
                  className="px-6 py-2 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors shadow-md"
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
                  className="px-6 py-2 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors shadow-md"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Creative Assets - Premium Redesign */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">✨ Creative Assets</h2>
                <p className="text-gray-600">Generate stunning visuals with AI or upload your own</p>
              </div>
              
              {/* Creative Mode Selection - Premium Cards */}
              <div className="mb-8">
                <label className="block text-gray-900 font-bold text-lg mb-4">Choose Your Creative Mode</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setCreativeMode("ai-only")}
                    className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                      creativeMode === "ai-only"
                        ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl ring-2 ring-blue-500"
                        : "border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg"
                    }`}
                  >
                    <div className="text-4xl mb-3">🤖</div>
                    <div className="text-gray-900 font-bold text-lg mb-1">AI Only</div>
                    <div className="text-gray-600 text-sm">Fully AI-generated content</div>
                    {creativeMode === "ai-only" && (
                      <div className="mt-3 text-xs text-blue-600 font-semibold">✓ Selected</div>
                    )}
                  </button>
                  <button
                    onClick={() => setCreativeMode("manual-only")}
                    className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                      creativeMode === "manual-only"
                        ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl ring-2 ring-blue-500"
                        : "border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg"
                    }`}
                  >
                    <div className="text-4xl mb-3">📤</div>
                    <div className="text-gray-900 font-bold text-lg mb-1">Manual Only</div>
                    <div className="text-gray-600 text-sm">Upload your own assets</div>
                    {creativeMode === "manual-only" && (
                      <div className="mt-3 text-xs text-blue-600 font-semibold">✓ Selected</div>
                    )}
                  </button>
                  <button
                    onClick={() => setCreativeMode("hybrid")}
                    className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                      creativeMode === "hybrid"
                        ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl ring-2 ring-blue-500"
                        : "border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg"
                    }`}
                  >
                    <div className="text-4xl mb-3">⚡</div>
                    <div className="text-gray-900 font-bold text-lg mb-1">Hybrid</div>
                    <div className="text-gray-600 text-sm">AI + Your Content</div>
                    {creativeMode === "hybrid" && (
                      <div className="mt-3 text-xs text-blue-600 font-semibold">✓ Selected</div>
                    )}
                  </button>
                </div>
              </div>

              {/* AI Generation Section - Premium Design */}
              {(creativeMode === "ai-only" || creativeMode === "hybrid") && (
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">🎨 AI Generation</h3>
                      <p className="text-gray-600">Describe what you want and AI will create it</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {aiEngineStatus === "online" && (
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          AI Engine Online
                        </span>
                      )}
                      {aiEngineStatus === "offline" && (
                        <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          AI Engine Offline
                        </span>
                      )}
                    </div>
                  </div>

                  {/* AI Image Generation */}
                  <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">🖼️</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-gray-900">Generate Images</h4>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden />
                            AI
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Create stunning visuals with AI</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Image Prompt *
                        </label>
                        <textarea
                          value={aiPrompts.imagePrompt}
                          onChange={(e) => setAiPrompts({ ...aiPrompts, imagePrompt: e.target.value })}
                          placeholder="e.g., A modern tech product on a sleek background, professional photography style, vibrant colors..."
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                          disabled={aiEngineStatus === "offline"}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Be specific: style, colors, mood, composition
                        </p>
                      </div>
                      <button
                        onClick={handleGenerateImage}
                        disabled={!aiPrompts.imagePrompt || aiPrompts.generatingImage || aiEngineStatus === "offline"}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                      >
                        {aiPrompts.generatingImage ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Generating Image...
                          </span>
                        ) : (
                          "✨ Generate Image"
                        )}
                      </button>
                      {aiPrompts.generatedImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {aiPrompts.generatedImages.map((url, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={url}
                                alt={`Generated ${idx + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
                              />
                              <button
                                onClick={() => {
                                  setUploadedImageUrls([...uploadedImageUrls, url]);
                                  setAiPrompts({ ...aiPrompts, generatedImages: aiPrompts.generatedImages.filter((_, i) => i !== idx) });
                                }}
                                className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                + Add
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Video Generation */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">🎬</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-gray-900">Generate Videos</h4>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden />
                            AI
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Create engaging videos with AI</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Video Prompt *
                        </label>
                        <textarea
                          value={aiPrompts.videoPrompt}
                          onChange={(e) => setAiPrompts({ ...aiPrompts, videoPrompt: e.target.value })}
                          placeholder="e.g., A dynamic product showcase with smooth camera movement, modern aesthetic, professional lighting..."
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                          disabled={aiEngineStatus === "offline"}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Describe the video: motion, style, mood, duration
                        </p>
                      </div>
                      <button
                        onClick={handleGenerateVideo}
                        disabled={!aiPrompts.videoPrompt || aiPrompts.generatingVideo || aiEngineStatus === "offline"}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                      >
                        {aiPrompts.generatingVideo ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Generating Video...
                          </span>
                        ) : (
                          "🎬 Generate Video"
                        )}
                      </button>
                      {aiPrompts.generatedVideos.length > 0 && (
                        <div className="space-y-3 mt-4">
                          {aiPrompts.generatedVideos.map((video, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-gray-900">Video {idx + 1}</p>
                                  <p className="text-xs text-gray-600">Status: {video.status}</p>
                                </div>
                                {video.url && (
                                  <button
                                    onClick={() => {
                                      setUploadedVideoUrls([...uploadedVideoUrls, video.url!]);
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                                  >
                                    + Add Video
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Text Generation Toggle */}
                  <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">Generate AI Text Creatives</div>
                        <div className="text-sm text-gray-600">Headlines, descriptions, CTAs, hooks</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.generateCreative}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, generateCreative: e.target.checked }))
                        }
                        className="w-12 h-6 bg-gray-200 rounded-full appearance-none checked:bg-blue-600 transition-colors relative cursor-pointer"
                        disabled={aiEngineStatus === "offline"}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Manual Upload Section - Enhanced */}
              {(creativeMode === "manual-only" || creativeMode === "hybrid") && (
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">📤 Upload Your Assets</h3>
                  <div className="space-y-6">
                    <CreativeUploader onFilesChange={handleFilesChange} />
                    <CreativeTextInputs onTextsChange={handleTextsChange} />
                  </div>
                </div>
              )}

              {/* Preview Section - Enhanced */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-200 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">👁️ Preview</h3>
                <CreativePreview
                  images={[...uploadedImageUrls, ...aiPrompts.generatedImages]}
                  videos={uploadedVideoUrls}
                  headlines={[...formData.manualHeadlines, ...formData.aiHeadlines]}
                  primaryTexts={[...formData.manualPrimaryTexts, ...formData.aiPrimaryTexts]}
                  descriptions={[...formData.manualDescriptions, ...formData.aiDescriptions]}
                  ctas={[...formData.manualCTAs, ...formData.aiCTAs]}
                />
              </div>

              {/* Navigation */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleBack}
                  className="px-8 py-3 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 font-bold transition-all transform hover:scale-105 shadow-md"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-bold transition-all transform hover:scale-105 shadow-xl ml-auto"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Review & Generate */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Generate</h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4 mb-6 border border-gray-200">
                <div>
                  <span className="text-gray-600">Platform:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{selectedPlatform?.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Objective:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{formData.objective}</span>
                </div>
                <div>
                  <span className="text-gray-600">Countries:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{formData.countries.join(", ")}</span>
                </div>
                {formData.states && formData.states.length > 0 && (
                  <div>
                    <span className="text-gray-600">States:</span>
                    <span className="text-gray-900 ml-2 font-semibold">{formData.states.join(", ")}</span>
                  </div>
                )}
                {formData.cities && formData.cities.length > 0 && (
                  <div>
                    <span className="text-gray-600">Cities:</span>
                    <span className="text-gray-900 ml-2 font-semibold">{formData.cities.slice(0, 5).join(", ")}{formData.cities.length > 5 ? ` +${formData.cities.length - 5} more` : ""}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Languages:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{formData.languages.join(", ")}</span>
                </div>
                {formData.interests && formData.interests.length > 0 && (
                  <div>
                    <span className="text-gray-600">Interests:</span>
                    <span className="text-gray-900 ml-2 font-semibold">{formData.interests.length} selected</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Age Range:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{formData.ageMin} - {formData.ageMax}</span>
                </div>
                <div>
                  <span className="text-gray-600">Gender:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{formData.gender}</span>
                </div>
                <div>
                  <span className="text-gray-600">Daily Budget:</span>
                  <span className="text-gray-900 ml-2 font-semibold">${formData.dailyBudget}</span>
                </div>
                <div>
                  <span className="text-gray-600">Creative Mode:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{creativeMode}</span>
                </div>
                <div>
                  <span className="text-gray-600">Images:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{uploadedImageUrls.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Videos:</span>
                  <span className="text-gray-900 ml-2 font-semibold">{uploadedVideoUrls.length}</span>
                </div>
              </div>

              {/* JSON Preview for Debugging */}
              <details className="mb-6">
                <summary className="text-gray-600 cursor-pointer mb-2 font-semibold">View JSON Payload (Debug)</summary>
                <pre className="bg-gray-50 p-4 rounded-xl text-xs text-gray-700 overflow-auto max-h-64 border border-gray-200">
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
                  className="px-6 py-2 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 font-semibold transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors shadow-md disabled:opacity-50"
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
