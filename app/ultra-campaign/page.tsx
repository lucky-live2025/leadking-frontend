"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import AnalysisBlock from "@/components/ultra/AnalysisBlock";
import CreativeBlock from "@/components/ultra/CreativeBlock";
import FunnelBlock from "@/components/ultra/FunnelBlock";

export default function UltraCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "analysis" | "creatives" | "funnel">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    businessName: "",
    productDescription: "",
    industry: "",
    location: "",
    goal: "",
    budget: "",
  });

  // Results
  const [analysis, setAnalysis] = useState<any>(null);
  const [creatives, setCreatives] = useState<any>(null);
  const [funnel, setFunnel] = useState<any>(null);
  const [campaignId, setCampaignId] = useState<number | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiPost("/ultra/analyze", {
        businessName: formData.businessName,
        productDescription: formData.productDescription,
        industry: formData.industry,
        location: formData.location,
        goal: formData.goal,
        budget: formData.budget,
      });
      setAnalysis(result.analysis);
      setCampaignId(result.campaignId);
      setStep("analysis");
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError(err.message || "Failed to analyze campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCreatives = async () => {
    if (!campaignId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiPost("/ultra/generate-creatives", {
        campaignId,
        style: "modern",
        platforms: analysis?.platformSuitability ? Object.keys(analysis.platformSuitability) : ["META", "GOOGLE", "TIKTOK"],
      });
      setCreatives(result.creatives);
      setStep("creatives");
    } catch (err: any) {
      console.error("Creative generation failed:", err);
      setError(err.message || "Failed to generate creatives");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFunnel = async () => {
    if (!campaignId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiPost("/ultra/funnel", {
        campaignId,
      });
      setFunnel(result.funnel);
      setStep("funnel");
    } catch (err: any) {
      console.error("Funnel generation failed:", err);
      setError(err.message || "Failed to generate funnel");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    if (campaignId) {
      router.push(`/ultra-campaign/${campaignId}/publish`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">ULTRA Campaign Builder</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {step === "form" && (
          <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8 shadow-2xl max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Campaign Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Enter your business name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Product Description</label>
                <textarea
                  value={formData.productDescription}
                  onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  rows={4}
                  placeholder="Describe your product or service"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., E-commerce, SaaS, Real Estate"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Country, City"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Goal</label>
                <input
                  type="text"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Generate leads, Increase sales"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Budget</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., $1000/month"
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !formData.businessName || !formData.productDescription}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Analyzing..." : "Start Analysis"}
              </button>
            </div>
          </div>
        )}

        {step === "analysis" && analysis && (
          <div className="space-y-8">
            <AnalysisBlock analysis={analysis} />
            <div className="flex gap-4">
              <button
                onClick={() => setStep("form")}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                ← Back
              </button>
              <button
                onClick={handleGenerateCreatives}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Creatives →"}
              </button>
            </div>
          </div>
        )}

        {step === "creatives" && creatives && (
          <div className="space-y-8">
            <CreativeBlock creatives={creatives} platforms={analysis?.platformSuitability ? Object.keys(analysis.platformSuitability) : []} />
            <div className="flex gap-4">
              <button
                onClick={() => setStep("analysis")}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                ← Back
              </button>
              <button
                onClick={handleGenerateFunnel}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Funnel →"}
              </button>
            </div>
          </div>
        )}

        {step === "funnel" && funnel && (
          <div className="space-y-8">
            <FunnelBlock funnel={funnel} />
            <div className="flex gap-4">
              <button
                onClick={() => setStep("creatives")}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                ← Back
              </button>
              <button
                onClick={handlePublish}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700"
              >
                Publish Campaign →
              </button>
              {campaignId && (
                <button
                  onClick={() => router.push(`/ultra-campaign/assets?campaignId=${campaignId}`)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700"
                >
                  View AI Assets →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
