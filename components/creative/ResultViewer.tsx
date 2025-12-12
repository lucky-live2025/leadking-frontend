'use client';

import { useState, useEffect } from 'react';

interface TextCreative {
  id: string;
  headline: string;
  description: string;
  cta: string;
}

interface ImageCreative {
  id: string;
  url: string;
  prompt?: string;
}

interface VideoCreative {
  id: string;
  url?: string;
  script?: string;
  status?: string;
}

interface ResultViewerProps {
  textCreatives?: TextCreative[];
  imageCreatives?: ImageCreative[];
  videoCreatives?: VideoCreative[];
  onSelect?: (type: 'text' | 'image' | 'video', creative: any) => void;
}

export default function ResultViewer({ textCreatives = [], imageCreatives = [], videoCreatives = [], onSelect }: ResultViewerProps) {
  const [videoStatuses, setVideoStatuses] = useState<Record<string, { status: string; url?: string }>>({});

  useEffect(() => {
    // Poll video statuses
    videoCreatives.forEach((video) => {
      if (video.status === 'processing' && video.id) {
        const pollStatus = async () => {
          try {
            const { apiGet } = await import("@/lib/api");
            const response = await apiGet(`/creatives/videos/${video.id}/status`);

            setVideoStatuses((prev) => ({
              ...prev,
              [video.id]: response,
            }));

            if (response.status === 'processing') {
              setTimeout(pollStatus, 5000); // Poll every 5 seconds
            }
          } catch (error) {
            console.error('Error checking video status:', error);
          }
        };

        pollStatus();
      }
    });
  }, [videoCreatives]);

  return (
    <div className="space-y-8">
      {/* Text Ads */}
      {textCreatives.length > 0 && (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Text Ads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {textCreatives.map((creative) => (
              <div
                key={creative.id}
                className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelect?.('text', creative)}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{creative.headline}</h3>
                <p className="text-gray-700 mb-3 text-sm">{creative.description}</p>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {creative.cta}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Ads */}
      {imageCreatives.length > 0 && (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Image Ads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageCreatives.map((creative) => (
              <div
                key={creative.id}
                className="rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onSelect?.('image', creative)}
              >
                <img
                  src={creative.url}
                  alt={creative.prompt || "Generated image"}
                  className="w-full h-auto"
                />
                {creative.prompt && (
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">{creative.prompt}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Ads */}
      {videoCreatives.length > 0 && (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Video Ads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoCreatives.map((creative) => {
              const status = videoStatuses[creative.id] || { status: creative.status || 'pending' };
              const videoUrl = status.url || creative.url;

              return (
                <div
                  key={creative.id}
                  className="rounded-xl overflow-hidden border border-gray-200 shadow-md cursor-pointer"
                  onClick={() => onSelect?.('video', creative)}
                >
                  {videoUrl ? (
                    <video src={videoUrl} controls className="w-full" />
                  ) : (
                    <div className="p-12 bg-gray-50 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Generating video...</p>
                      <p className="text-sm text-gray-500 mt-2">Status: {status.status}</p>
                    </div>
                  )}
                  {creative.script && (
                    <div className="p-4 bg-gray-50">
                      <p className="text-sm text-gray-600">{creative.script}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

