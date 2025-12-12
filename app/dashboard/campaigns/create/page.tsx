"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";
import { getEngines } from "@/lib/getEngines";

interface Platform {
  id: string;
  name: string;
  icon: string;
  description: string;
  objectives: string[];
}

const platforms: Platform[] = [
  {
    id: "meta-facebook",
    name: "Meta Ads (Facebook)",
    icon: "📘",
    description: "Reach billions on Facebook",
    objectives: ["CONVERSIONS", "TRAFFIC", "ENGAGEMENT", "LEADS", "AWARENESS"],
  },
  {
    id: "meta-instagram",
    name: "Meta Ads (Instagram)",
    icon: "📷",
    description: "Visual storytelling on Instagram",
    objectives: ["CONVERSIONS", "TRAFFIC", "ENGAGEMENT", "LEADS", "REACH"],
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    icon: "🎵",
    description: "Viral video campaigns",
    objectives: ["CONVERSIONS", "TRAFFIC", "ENGAGEMENT", "APP_INSTALLS"],
  },
  {
    id: "google-search",
    name: "Google Search Ads",
    icon: "🔍",
    description: "Targeted search advertising",
    objectives: ["CONVERSIONS", "TRAFFIC", "LEADS", "SALES"],
  },
  {
    id: "google-display",
    name: "Google Display Ads",
    icon: "🖼️",
    description: "Visual display network",
    objectives: ["CONVERSIONS", "TRAFFIC", "AWARENESS", "BRAND_AWARENESS"],
  },
  {
    id: "youtube",
    name: "YouTube Ads",
    icon: "📺",
    description: "Video advertising on YouTube",
    objectives: ["VIEWS", "SUBSCRIBERS", "ENGAGEMENT", "CONVERSIONS"],
  },
  {
    id: "linkedin",
    name: "LinkedIn B2B Ads",
    icon: "💼",
    description: "Professional B2B targeting",
    objectives: ["LEADS", "CONVERSIONS", "ENGAGEMENT", "BRAND_AWARENESS"],
  },
  {
    id: "yandex",
    name: "Yandex Ads (RU/CIS)",
    icon: "🌍",
    description: "Russian and CIS markets",
    objectives: ["CONVERSIONS", "TRAFFIC", "LEADS"],
  },
  {
    id: "email",
    name: "Email AI Campaigns",
    icon: "📧",
    description: "AI-powered email marketing",
    objectives: ["OPENS", "CLICKS", "CONVERSIONS"],
  },
];

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian",
  "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Turkish", "Polish",
];

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
  "Italy", "Spain", "Netherlands", "Belgium", "Sweden", "Norway", "Denmark",
  "Poland", "Russia", "Ukraine", "Brazil", "Mexico", "Argentina", "India",
  "China", "Japan", "South Korea", "Singapore", "United Arab Emirates",
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [engines, setEngines] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    platform: "",
    objective: "",
    countries: [] as string[],
    languages: [] as string[],
    cities: [] as string[],
    zipCodes: [] as string[],
    interests: [] as string[],
    customInterests: "",
    ageMin: 18,
    ageMax: 65,
    gender: "all" as "all" | "male" | "female",
    placement: "all" as string,
    dailyBudget: "",
    generateCreative: true,
  });

  useEffect(() => {
    loadEngines();
  }, []);

  const loadEngines = async () => {
    try {
      const data = await getEngines();
      setEngines(data);
    } catch (err: any) {
      console.error("Failed to load engines:", err);
    }
  };

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setFormData((prev) => ({ ...prev, platform: platform.id, objective: platform.objectives[0] }));
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2 && !formData.objective) {
      setError("Please select an objective");
      return;
    }
    if (step === 3 && formData.countries.length === 0) {
      setError("Please select at least one country");
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

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const campaignData = {
        platform: formData.platform,
        objective: formData.objective,
        targeting: {
          countries: formData.countries,
          languages: formData.languages,
          cities: formData.cities,
          zipCodes: formData.zipCodes,
          interests: [...formData.interests, ...(formData.customInterests ? formData.customInterests.split(",").map((i) => i.trim()) : [])],
          ageRange: { min: formData.ageMin, max: formData.ageMax },
          gender: formData.gender,
          placement: formData.placement,
        },
        budget: {
          daily: parseFloat(formData.dailyBudget) || 0,
        },
        creative: {
          generate: formData.generateCreative,
        },
      };

      const response = await apiPost("/campaigns", campaignData, { auth: true });
      
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
              {s < 5 && (
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
                {selectedPlatform.objectives.map((obj) => (
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
              <h2 className="text-2xl font-bold text-white mb-6">Targeting</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Countries (Multi-select)</label>
                  <select
                    multiple
                    className="w-full p-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                    value={formData.countries}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        countries: Array.from(e.target.selectedOptions, (opt) => opt.value),
                      }))
                    }
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Languages (Multi-select)</label>
                  <select
                    multiple
                    className="w-full p-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                    value={formData.languages}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        languages: Array.from(e.target.selectedOptions, (opt) => opt.value),
                      }))
                    }
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Age Min</label>
                    <input
                      type="number"
                      className="w-full p-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                      value={formData.ageMin}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ageMin: parseInt(e.target.value) || 18 }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Age Max</label>
                    <input
                      type="number"
                      className="w-full p-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                      value={formData.ageMax}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ageMax: parseInt(e.target.value) || 65 }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Gender</label>
                  <select
                    className="w-full p-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, gender: e.target.value as any }))
                    }
                  >
                    <option value="all">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
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

          {/* Step 4: Budget & Creative */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Budget & Creative</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Daily Budget (USD)</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                    value={formData.dailyBudget}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, dailyBudget: e.target.value }))
                    }
                    placeholder="100"
                  />
                </div>

                <div>
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

          {/* Step 5: Review & Generate */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Review & Generate</h2>
              <div className="bg-[#0A1628] rounded-lg p-6 space-y-4">
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
                  <span className="text-white ml-2">{formData.countries.join(", ") || "All"}</span>
                </div>
                <div>
                  <span className="text-gray-400">Daily Budget:</span>
                  <span className="text-white ml-2">${formData.dailyBudget}</span>
                </div>
                <div>
                  <span className="text-gray-400">AI Creative:</span>
                  <span className="text-white ml-2">{formData.generateCreative ? "Yes" : "No"}</span>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
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

