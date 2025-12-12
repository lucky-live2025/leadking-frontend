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
  const [activeTab, setActiveTab] = useState<"ai" | "upload" | "external">(
    formData.landingPageType === "uploaded" ? "upload" :
    formData.landingPageType === "external" ? "external" : "ai"
  );

  // AI Generated Form State
  const [aiForm, setAiForm] = useState({
    businessName: "",
    productName: "",
    offer: "",
    benefits: [] as string[],
    ctaText: "Get Started",
    theme: "modern" as "modern" | "clean" | "dark" | "corporate",
    mainImage: "",
    mainVideo: "",
  });

  // Upload State
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  // External URL State
  const [externalUrl, setExternalUrl] = useState("");

  const handleTabChange = (tab: "ai" | "upload" | "external") => {
    setActiveTab(tab);
    const typeMap: Record<"ai" | "upload" | "external", "ai-generated" | "uploaded" | "external"> = {
      ai: "ai-generated",
      upload: "uploaded",
      external: "external",
    };
    onChange({ landingPageType: typeMap[tab] });
  };

  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (formData.landingPageData && formData.landingPageType === "ai-generated") {
      setAiForm(formData.landingPageData);
    }
    if (formData.landingPageData && formData.landingPageType === "external") {
      setExternalUrl(formData.landingPageData.url || "");
    }
  }, [formData]);

  const handleAiFormChange = (field: string, value: any) => {
    const updated = { ...aiForm, [field]: value };
    setAiForm(updated);
    onChange({
      landingPageType: "ai-generated",
      landingPageData: updated,
    });
  };

  const handleGenerate = async () => {
    if (!aiForm.businessName || !aiForm.productName || !aiForm.offer) {
      alert("Please fill in all required fields");
      return;
    }

    setGenerating(true);
    try {
      const response = await apiPost("/landing/generate", aiForm, { auth: true });
      setGeneratedUrl(response.url);
      onChange({
        landingPageType: "ai-generated",
        landingPageData: { ...aiForm, id: response.id, url: response.url },
      });
    } catch (err: any) {
      alert(err.message || "Failed to generate landing page");
    } finally {
      setGenerating(false);
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

  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setUploadFiles([...uploadFiles, ...fileArray]);

    // Preview index.html if present
    const htmlFile = fileArray.find(f => f.name === "index.html" || f.name.endsWith(".html"));
    if (htmlFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadPreview(e.target?.result as string);
      };
      reader.readAsText(htmlFile);
    }

    // Upload to backend
    setUploading(true);
    try {
      const formData = new FormData();
      fileArray.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.leadkingapp.com"}/landing/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedUrl(data.url);
        onChange({
          landingPageType: "uploaded",
          landingPageData: { id: data.id, url: data.url, files: fileArray.map(f => ({ name: f.name, size: f.size })) },
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload landing page");
    } finally {
      setUploading(false);
    }
  };

  const [savingExternal, setSavingExternal] = useState(false);

  const handleExternalUrlChange = async (url: string) => {
    setExternalUrl(url);
    if (url && validateUrl(url)) {
      setSavingExternal(true);
      try {
        const response = await apiPost("/landing/external", { url }, { auth: true });
        onChange({
          landingPageType: "external",
          landingPageData: { id: response.id, url: response.url },
        });
      } catch (err: any) {
        alert(err.message || "Failed to save external landing page");
      } finally {
        setSavingExternal(false);
      }
    }
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Landing Page</h2>

      {/* Tab Selection */}
      <div className="flex gap-4 border-b border-gray-700">
        <button
          onClick={() => handleTabChange("ai")}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === "ai"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          AI Generated
        </button>
        <button
          onClick={() => handleTabChange("upload")}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === "upload"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Upload
        </button>
        <button
          onClick={() => handleTabChange("external")}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === "external"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          External URL
        </button>
      </div>

      {/* AI Generated Tab */}
      {activeTab === "ai" && (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Business Name *</label>
            <input
              type="text"
              value={aiForm.businessName}
              onChange={(e) => handleAiFormChange("businessName", e.target.value)}
              className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
              placeholder="Your Company Name"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Product Name *</label>
            <input
              type="text"
              value={aiForm.productName}
              onChange={(e) => handleAiFormChange("productName", e.target.value)}
              className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
              placeholder="Your Product/Service"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Offer *</label>
            <textarea
              value={aiForm.offer}
              onChange={(e) => handleAiFormChange("offer", e.target.value)}
              className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
              rows={3}
              placeholder="Describe your offer..."
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Benefits</label>
            <div className="space-y-2 mb-2">
              {aiForm.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                  <span className="text-white text-sm">{benefit}</span>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
              placeholder="Get Started"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Theme</label>
            <select
              value={aiForm.theme}
              onChange={(e) => handleAiFormChange("theme", e.target.value)}
              className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
            >
              <option value="modern">Modern</option>
              <option value="clean">Clean</option>
              <option value="dark">Dark</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>

          {(availableImages.length > 0 || availableVideos.length > 0) && (
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Main Image/Video</label>
              <select
                value={aiForm.mainImage || aiForm.mainVideo}
                onChange={(e) => {
                  if (e.target.value.startsWith("image:")) {
                    handleAiFormChange("mainImage", e.target.value.replace("image:", ""));
                    handleAiFormChange("mainVideo", "");
                  } else if (e.target.value.startsWith("video:")) {
                    handleAiFormChange("mainVideo", e.target.value.replace("video:", ""));
                    handleAiFormChange("mainImage", "");
                  }
                }}
                className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
              >
                <option value="">None</option>
                {availableImages.map((url, index) => (
                  <option key={`image-${index}`} value={`image:${url}`}>
                    Image {index + 1}
                  </option>
                ))}
                {availableVideos.map((url, index) => (
                  <option key={`video-${index}`} value={`video:${url}`}>
                    Video {index + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleGenerate}
              disabled={generating || !aiForm.businessName || !aiForm.productName || !aiForm.offer}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? "Generating..." : "Generate Landing Page"}
            </button>
          </div>

          {generatedUrl && (
            <div className="mt-6">
              <h3 className="text-gray-300 font-semibold mb-3">Preview</h3>
              <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4">
                <iframe
                  src={`${process.env.NEXT_PUBLIC_API_URL || "https://api.leadkingapp.com"}${generatedUrl}`}
                  className="w-full h-96 border border-gray-700 rounded"
                  title="Generated Landing Page Preview"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === "upload" && (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-3">Upload Landing Page Files</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept=".html,.css,.js,.jpg,.jpeg,.png,.webp,.svg"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="landing-upload"
              />
              <label
                htmlFor="landing-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="text-4xl mb-4">📁</div>
                <p className="text-white font-semibold mb-2">Drag & drop files here</p>
                <p className="text-gray-400 text-sm mb-4">or</p>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse Files
                </button>
              </label>
              <p className="text-gray-500 text-xs mt-4">
                Supported: HTML, CSS, JS, Images (JPG, PNG, WebP, SVG)
              </p>
            </div>
          </div>

          {uploadFiles.length > 0 && (
            <div>
              <h3 className="text-gray-300 font-semibold mb-3">Uploaded Files ({uploadFiles.length})</h3>
              <div className="space-y-2">
                {uploadFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-800 p-3 rounded"
                  >
                    <span className="text-white text-sm">{file.name}</span>
                    <span className="text-gray-400 text-xs">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-gray-400 mt-2">Uploading files...</p>
            </div>
          )}

          {uploadPreview && (
            <div>
              <h3 className="text-gray-300 font-semibold mb-3">HTML Preview</h3>
              <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 max-h-64 overflow-auto">
                <pre className="text-xs text-gray-300 whitespace-pre-wrap">{uploadPreview}</pre>
              </div>
            </div>
          )}

          {uploadedUrl && (
            <div className="mt-6">
              <h3 className="text-gray-300 font-semibold mb-3">Landing Page Preview</h3>
              <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4">
                <iframe
                  src={`${process.env.NEXT_PUBLIC_API_URL || "https://api.leadkingapp.com"}${uploadedUrl}`}
                  className="w-full h-96 border border-gray-700 rounded"
                  title="Uploaded Landing Page Preview"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* External URL Tab */}
      {activeTab === "external" && (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Landing Page URL *</label>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => handleExternalUrlChange(e.target.value)}
              className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
              placeholder="https://example.com/landing"
            />
            {externalUrl && !validateUrl(externalUrl) && (
              <p className="text-red-400 text-sm mt-2">Please enter a valid URL</p>
            )}
          </div>

          {externalUrl && validateUrl(externalUrl) && (
            <div>
              <h3 className="text-gray-300 font-semibold mb-3">Preview</h3>
              <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4">
                <iframe
                  src={externalUrl}
                  className="w-full h-96 border border-gray-700 rounded"
                  title="Landing Page Preview"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

