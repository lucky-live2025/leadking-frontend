"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";
import Link from "next/link";

interface LandingPage {
  headline: string;
  subheadline: string;
  sections: Array<{ title: string; content: string }>;
  cta: string;
  url: string;
}

interface AdCopy {
  headlines: string[];
  primaryText: string[];
  cta: string[];
}

interface ImageAsset {
  id: number;
  imageUrl: string;
  data: { prompt: string };
}

interface VideoScript {
  duration: string;
  hook: string;
  body: string;
  cta: string;
  scenes?: any[];
  onScreenText?: string[];
  voiceover?: string;
}

export default function AssetPreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignId = searchParams.get("campaignId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [adCopy, setAdCopy] = useState<AdCopy | null>(null);
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [videoScripts, setVideoScripts] = useState<VideoScript[]>([]);

  useEffect(() => {
    if (campaignId) {
      loadAssets();
    } else {
      setError("Campaign ID is required");
      setLoading(false);
    }
  }, [campaignId]);

  async function loadAssets() {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet(`/ai-assets/campaign/${campaignId}`);
      
      if (data.landingPage) {
        setLandingPage(data.landingPage);
      }
      if (data.adCopy) {
        setAdCopy(data.adCopy);
      }
      if (data.images) {
        setImages(data.images);
      }
      if (data.videoScripts) {
        setVideoScripts(data.videoScripts);
      }
    } catch (err: any) {
      console.error("Failed to load assets:", err);
      setError(err.message || "Failed to load assets");
    } finally {
      setLoading(false);
    }
  }

  function downloadCopy() {
    if (!adCopy) return;
    
    const content = `
AD COPY FOR CAMPAIGN ${campaignId}

HEADLINES:
${adCopy.headlines.map((h, i) => `${i + 1}. ${h}`).join("\n")}

PRIMARY TEXT:
${adCopy.primaryText.map((p, i) => `${i + 1}. ${p}`).join("\n")}

CALL-TO-ACTION:
${adCopy.cta.map((c, i) => `${i + 1}. ${c}`).join("\n")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ad-copy-campaign-${campaignId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportVideoScript(script: VideoScript) {
    const content = `
VIDEO SCRIPT - ${script.duration}

HOOK:
${script.hook}

BODY:
${script.body}

CALL-TO-ACTION:
${script.cta}

${script.scenes ? `SCENES:\n${script.scenes.map((s: any, i: number) => `${i + 1}. ${JSON.stringify(s, null, 2)}`).join("\n\n")}` : ""}

${script.onScreenText ? `ON-SCREEN TEXT:\n${script.onScreenText.join("\n")}` : ""}

${script.voiceover ? `VOICEOVER:\n${script.voiceover}` : ""}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `video-script-${script.duration}-campaign-${campaignId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading assets...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
          <p className="text-red-700">{error}</p>
          <Link href="/ultra-campaign" className="mt-4 inline-block text-blue-600 hover:underline">
            ← Back to Ultra Campaign
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="mb-8">
        <Link href="/ultra-campaign" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Ultra Campaign
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generated Assets</h1>
        <p className="text-gray-600">Campaign ID: {campaignId}</p>
      </div>

      {/* Landing Page Section */}
      {landingPage && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Landing Page</h2>
            <a
              href={landingPage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Landing Page
            </a>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Headline</h3>
              <p className="text-gray-700">{landingPage.headline}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Subheadline</h3>
              <p className="text-gray-700">{landingPage.subheadline}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sections</h3>
              <div className="space-y-3">
                {landingPage.sections.map((section, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{section.title}</h4>
                    <p className="text-gray-700 mt-1">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Call-to-Action</h3>
              <p className="text-gray-700">{landingPage.cta}</p>
            </div>
          </div>
        </div>
      )}

      {/* Ad Copy Section */}
      {adCopy && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Ad Copy</h2>
            <button
              onClick={downloadCopy}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Download Copy
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Headlines</h3>
              <ul className="list-disc list-inside space-y-1">
                {adCopy.headlines.map((headline, i) => (
                  <li key={i} className="text-gray-700">{headline}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Primary Text</h3>
              <ul className="list-disc list-inside space-y-1">
                {adCopy.primaryText.map((text, i) => (
                  <li key={i} className="text-gray-700">{text}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Call-to-Action</h3>
              <ul className="list-disc list-inside space-y-1">
                {adCopy.cta.map((cta, i) => (
                  <li key={i} className="text-gray-700">{cta}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Images Section */}
      {images.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.data.prompt}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 bg-gray-50">
                  <p className="text-sm text-gray-600 line-clamp-2">{image.data.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Scripts Section */}
      {videoScripts.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Video Scripts</h2>
          <div className="space-y-6">
            {videoScripts.map((script, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{script.duration} Video</h3>
                  <button
                    onClick={() => exportVideoScript(script)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Export Script
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Hook</h4>
                    <p className="text-gray-700">{script.hook}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Body</h4>
                    <p className="text-gray-700">{script.body}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call-to-Action</h4>
                    <p className="text-gray-700">{script.cta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate Again Button */}
      <div className="mt-8 text-center">
        <Link
          href="/ultra-campaign"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
        >
          Generate New Campaign
        </Link>
      </div>
    </div>
  );
}

