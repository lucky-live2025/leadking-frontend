"use client";

import { useState } from "react";

interface CreativeBlockProps {
  creatives: any;
  platforms: string[];
}

export default function CreativeBlock({ creatives, platforms }: CreativeBlockProps) {
  const [activePlatform, setActivePlatform] = useState<string>(platforms[0] || "META");

  return (
    <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6">Generated Creatives</h2>

      {/* Platform Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activePlatform === platform
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {platform}
          </button>
        ))}
        {creatives.linkedin && (
          <button
            onClick={() => setActivePlatform("linkedin")}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activePlatform === "linkedin"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            LinkedIn
          </button>
        )}
        {creatives.yandex && (
          <button
            onClick={() => setActivePlatform("yandex")}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activePlatform === "yandex"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Yandex
          </button>
        )}
        <button
          onClick={() => setActivePlatform("images")}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activePlatform === "images"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setActivePlatform("videos")}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activePlatform === "videos"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Videos
        </button>
      </div>

      {/* Meta Creatives */}
      {activePlatform === "META" && creatives.adCopy?.meta && (
        <div className="space-y-4">
          {creatives.adCopy.meta.map((copy: any, i: number) => (
            <div key={i} className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="text-lg font-bold text-blue-400 mb-2">{copy.headline || copy.primaryText}</div>
              <div className="text-gray-300 mb-3">{copy.body || copy.primaryText}</div>
              {copy.description && <div className="text-gray-400 text-sm mb-3">{copy.description}</div>}
              <div className="text-purple-400 font-semibold">{copy.cta || "Learn More"}</div>
            </div>
          ))}
        </div>
      )}

      {/* TikTok Creatives */}
      {activePlatform === "TIKTOK" && creatives.adCopy?.tiktok && (
        <div className="space-y-4">
          {creatives.adCopy.tiktok.map((script: any, i: number) => (
            <div key={i} className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">HOOK (0-5s)</div>
                <div className="text-lg font-bold text-pink-400">{script.hook}</div>
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">STORY (5-20s)</div>
                <div className="text-gray-300">{script.story}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">CTA (20-30s)</div>
                <div className="text-purple-400 font-semibold">{script.cta}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Google Creatives */}
      {activePlatform === "GOOGLE" && creatives.adCopy?.google && (
        <div className="space-y-4">
          {creatives.adCopy.google.variations?.map((ad: any, i: number) => (
            <div key={i} className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-1">HEADLINES</div>
                <div className="space-y-1">
                  {ad.headlines?.map((headline: string, j: number) => (
                    <div key={j} className="text-white font-semibold">{headline}</div>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-1">DESCRIPTIONS</div>
                <div className="space-y-1">
                  {ad.descriptions?.map((desc: string, j: number) => (
                    <div key={j} className="text-gray-300">{desc}</div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Path: {ad.path1} / {ad.path2}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Prompts */}
      {activePlatform === "images" && creatives.imagePrompts && (
        <div className="space-y-4">
          {creatives.imagePrompts.map((prompt: string, i: number) => (
            <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <div className="text-xs text-gray-400 mb-2">Prompt {i + 1}</div>
              <div className="text-gray-300 text-sm">{prompt}</div>
            </div>
          ))}
        </div>
      )}

      {/* Video Prompts */}
      {activePlatform === "videos" && creatives.videoPrompts && (
        <div className="space-y-4">
          {creatives.videoPrompts.map((prompt: any, i: number) => (
            <div key={i} className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="text-lg font-bold text-white mb-2">{prompt.concept}</div>
              <div className="text-sm text-gray-400 mb-3">Style: {prompt.style} | Duration: {prompt.duration}</div>
              {prompt.scenes && (
                <div className="space-y-2">
                  {prompt.scenes.map((scene: string, j: number) => (
                    <div key={j} className="text-gray-300 text-sm">• {scene}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* LinkedIn Creatives */}
      {activePlatform === "linkedin" && creatives.linkedin && (
        <div className="space-y-4">
          {creatives.linkedin.linkedinCopy && (
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-3">LinkedIn Ad Copy</h3>
              <div className="text-lg font-bold text-blue-400 mb-2">{creatives.linkedin.linkedinCopy.headline}</div>
              <div className="text-gray-300 mb-3">{creatives.linkedin.linkedinCopy.hook}</div>
              <div className="text-gray-300 mb-3">{creatives.linkedin.linkedinCopy.primaryText}</div>
              <div className="text-purple-400 font-semibold">{creatives.linkedin.linkedinCopy.cta}</div>
            </div>
          )}
          {creatives.linkedin.linkedinCarousel && (
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Carousel Slides</h3>
              {creatives.linkedin.linkedinCarousel.map((slide: any, i: number) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 mb-3">
                  <div className="font-semibold text-white mb-2">Slide {slide.slideNumber}: {slide.title}</div>
                  <div className="text-gray-300 text-sm mb-2">{slide.description}</div>
                  <div className="text-gray-400 text-xs">{slide.imagePrompt}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Yandex Creatives */}
      {activePlatform === "yandex" && creatives.yandex && (
        <div className="space-y-4">
          {creatives.yandex.headlines && (
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Headlines</h3>
              <div className="space-y-2">
                {creatives.yandex.headlines.map((headline: string, i: number) => (
                  <div key={i} className="bg-gray-900/50 rounded-lg p-3 text-gray-300">{headline}</div>
                ))}
              </div>
            </div>
          )}
          {creatives.yandex.descriptions && (
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Descriptions</h3>
              <div className="space-y-2">
                {creatives.yandex.descriptions.map((desc: string, i: number) => (
                  <div key={i} className="bg-gray-900/50 rounded-lg p-3 text-gray-300">{desc}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Headlines (if available) */}
      {creatives.headlines && creatives.headlines.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Headlines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {creatives.headlines.slice(0, 10).map((headline: string, i: number) => (
              <div key={i} className="bg-gray-900/50 rounded-lg p-3 text-gray-300 text-sm">
                {headline}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

