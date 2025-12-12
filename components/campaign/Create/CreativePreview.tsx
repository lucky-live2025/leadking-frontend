"use client";

interface CreativePreviewProps {
  images?: string[];
  videos?: string[];
  headlines?: string[];
  primaryTexts?: string[];
  descriptions?: string[];
  ctas?: string[];
}

export default function CreativePreview({
  images = [],
  videos = [],
  headlines = [],
  primaryTexts = [],
  descriptions = [],
  ctas = [],
}: CreativePreviewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Creative Preview</h3>

      {/* Visual Assets */}
      {(images.length > 0 || videos.length > 0) && (
        <div>
          <h4 className="text-gray-300 font-semibold mb-3">Visual Assets</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Creative ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-700"
                />
              </div>
            ))}
            {videos.map((url, index) => (
              <div key={index} className="relative">
                <video
                  src={url}
                  controls
                  className="w-full h-48 object-cover rounded-lg border border-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Text Content */}
      {(headlines.length > 0 || primaryTexts.length > 0 || descriptions.length > 0 || ctas.length > 0) && (
        <div>
          <h4 className="text-gray-300 font-semibold mb-3">Text Content</h4>
          <div className="bg-[#0A1628] rounded-lg p-4 space-y-4">
            {headlines.length > 0 && (
              <div>
                <div className="text-sm text-gray-400 mb-2">Headlines ({headlines.length})</div>
                <div className="space-y-1">
                  {headlines.map((headline, index) => (
                    <div key={index} className="text-white text-sm bg-gray-800 p-2 rounded">
                      {headline}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {primaryTexts.length > 0 && (
              <div>
                <div className="text-sm text-gray-400 mb-2">Primary Texts ({primaryTexts.length})</div>
                <div className="space-y-1">
                  {primaryTexts.map((text, index) => (
                    <div key={index} className="text-white text-sm bg-gray-800 p-2 rounded">
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {descriptions.length > 0 && (
              <div>
                <div className="text-sm text-gray-400 mb-2">Descriptions ({descriptions.length})</div>
                <div className="space-y-1">
                  {descriptions.map((desc, index) => (
                    <div key={index} className="text-white text-sm bg-gray-800 p-2 rounded">
                      {desc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ctas.length > 0 && (
              <div>
                <div className="text-sm text-gray-400 mb-2">Call-to-Actions ({ctas.length})</div>
                <div className="space-y-1">
                  {ctas.map((cta, index) => (
                    <div key={index} className="text-white text-sm bg-gray-800 p-2 rounded">
                      {cta}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {images.length === 0 && videos.length === 0 && headlines.length === 0 && primaryTexts.length === 0 && descriptions.length === 0 && ctas.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No creative assets added yet
        </div>
      )}
    </div>
  );
}

