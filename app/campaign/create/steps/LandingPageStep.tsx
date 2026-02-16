"use client";

import { useState, useEffect } from "react";
import { apiPost } from "@/lib/api";

interface LandingPageStepProps {
  formData: {
    landingPageType?: "ai-generated" | "uploaded" | "external";
    landingPageData?: any;
  };
  onChange: (data: Partial<LandingPageStepProps["formData"]>) => void;
  availableImages?: string[];
  availableVideos?: string[];
}

export default function LandingPageStep({
  formData,
  onChange,
  availableImages = [],
  availableVideos = [],
}: LandingPageStepProps) {
  // Always use AI-generated - no tabs needed

  // AI Generated Form State - simplified
  const [aiForm, setAiForm] = useState({
    businessName: "",
    productName: "",
    offer: "",
    benefits: [] as string[],
    ctaText: "Get Started Now",
    theme: "modern" as "modern" | "clean" | "dark" | "corporate",
  });

  // Auto-generate when required fields are filled
  const [autoGenerating, setAutoGenerating] = useState(false);
  const [lastGeneratedHash, setLastGeneratedHash] = useState("");

  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (formData.landingPageData && formData.landingPageType === "ai-generated") {
      setAiForm(formData.landingPageData);
      if (formData.landingPageData.url) {
        setGeneratedUrl(formData.landingPageData.url);
      }
    }
  }, [formData]);

  // Auto-generate when user fills required fields
  useEffect(() => {
    const hash = `${aiForm.businessName}-${aiForm.productName}-${aiForm.offer}`;
    if (
      aiForm.businessName &&
      aiForm.productName &&
      aiForm.offer &&
      hash !== lastGeneratedHash &&
      !generatedUrl &&
      !generating &&
      !autoGenerating
    ) {
      // Debounce auto-generation
      const timer = setTimeout(() => {
        handleGenerate(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [aiForm.businessName, aiForm.productName, aiForm.offer]);

  const handleAiFormChange = (field: string, value: any) => {
    const updated = { ...aiForm, [field]: value };
    setAiForm(updated);
    onChange({
      landingPageType: "ai-generated",
      landingPageData: updated,
    });
  };

  const handleGenerate = async (isAuto = false) => {
    if (!aiForm.businessName || !aiForm.productName || !aiForm.offer) {
      if (!isAuto) {
        alert("Please fill in all required fields");
      }
      return;
    }

    if (isAuto) {
      setAutoGenerating(true);
    } else {
      setGenerating(true);
    }

    const hash = `${aiForm.businessName}-${aiForm.productName}-${aiForm.offer}`;
    setLastGeneratedHash(hash);

    try {
      // Always generate image - no manual upload option
      const response = await apiPost("/landing/generate", {
        ...aiForm,
        // Remove mainImage/mainVideo - always auto-generate
      }, { auth: true });
      
      const fullUrl = `${window.location.origin}${response.url}`;
      setGeneratedUrl(fullUrl);
      
      onChange({
        landingPageType: "ai-generated",
        landingPageData: { ...aiForm, id: response.id, url: response.url, fullUrl },
      });
    } catch (err: any) {
      if (!isAuto) {
        alert(err.message || "Failed to generate landing page");
      }
      console.error("Landing page generation error:", err);
    } finally {
      if (isAuto) {
        setAutoGenerating(false);
      } else {
        setGenerating(false);
      }
    }
  };

  const copyUrl = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      alert("URL copied to clipboard!");
    }
  };

  const openUrl = () => {
    if (generatedUrl) {
      window.open(generatedUrl, '_blank');
    }
  };

  const handleAddBenefit = () => {
    const benefit = prompt("Enter benefit:");
    if (benefit) {
      handleAiFormChange("benefits", [...aiForm.benefits, benefit]);
    }
  };

  const handleRemoveBenefit = (index: number) => {
    handleAiFormChange("benefits", aiForm.benefits.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">✨ AI Landing Page</h2>
        <p className="text-gray-600">Fill in your business info and we'll create a stunning landing page instantly</p>
      </div>

      {/* AI Generated - Always Active */}
      <div className="space-y-6">
          <div>
                  <label className="block text-gray-900 font-semibold mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={aiForm.businessName}
                    onChange={(e) => handleAiFormChange("businessName", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Company Name"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Product Name *</label>
            <input
              type="text"
              value={aiForm.productName}
              onChange={(e) => handleAiFormChange("productName", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Product/Service"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Offer *</label>
            <textarea
              value={aiForm.offer}
              onChange={(e) => handleAiFormChange("offer", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe your offer..."
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Benefits</label>
            <div className="space-y-2 mb-2">
              {aiForm.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                        <span className="text-gray-900 text-sm">{benefit}</span>
                  <button
                    onClick={() => handleRemoveBenefit(index)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddBenefit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-md"
            >
              + Add Benefit
            </button>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">CTA Text</label>
            <input
              type="text"
              value={aiForm.ctaText}
              onChange={(e) => handleAiFormChange("ctaText", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Get Started"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Theme</label>
            <select
              value={aiForm.theme}
              onChange={(e) => handleAiFormChange("theme", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="modern">Modern</option>
              <option value="clean">Clean</option>
              <option value="dark">Dark</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>

          {/* Auto-generation indicator */}
          {autoGenerating && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <p className="text-blue-800 font-medium">✨ Generating your landing page with AI...</p>
              </div>
            </div>
          )}

          {/* Generated Landing Page URL Display */}
          {generatedUrl && (
            <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎉</span>
                <h3 className="text-xl font-bold text-gray-900">Your Landing Page is Ready!</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Landing Page URL:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedUrl}
                    readOnly
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-mono text-sm"
                  />
                  <button
                    onClick={copyUrl}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                  <button
                    onClick={openUrl}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Live Preview:</h4>
                <div className="relative rounded-lg overflow-hidden border-2 border-gray-300" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    src={generatedUrl}
                    className="w-full h-full"
                    title="Generated Landing Page Preview"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Manual Generate Button (if auto-gen didn't work) */}
          {!generatedUrl && !autoGenerating && (
            <div className="mt-6">
              <button
                onClick={() => handleGenerate(false)}
                disabled={generating || !aiForm.businessName || !aiForm.productName || !aiForm.offer}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating...
                  </span>
                ) : (
                  "✨ Generate Landing Page"
                )}
              </button>
            </div>
          )}
        </div>
    </div>
  );
}

