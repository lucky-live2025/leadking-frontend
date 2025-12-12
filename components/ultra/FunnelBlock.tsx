"use client";

interface FunnelBlockProps {
  funnel: any;
}

export default function FunnelBlock({ funnel }: FunnelBlockProps) {
  return (
    <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6">Conversion Funnel Blueprint</h2>

      {/* Funnel Structure */}
      {funnel.structure && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Funnel Stages</h3>
          <div className="space-y-3">
            {funnel.structure.map((stage: any, i: number) => (
              <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-bold text-white">{stage.name}</div>
                  <div className="text-sm text-gray-400">Conversion: {stage.conversionRate}</div>
                </div>
                <div className="text-gray-300 text-sm mb-2">{stage.description}</div>
                <div className="text-xs text-gray-400">Goal: {stage.goal}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Text */}
      {funnel.heroText && (
        <div className="mb-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/30">
          <h3 className="text-3xl font-bold text-white mb-2">{funnel.heroText.headline}</h3>
          <p className="text-xl text-gray-300 mb-4">{funnel.heroText.subheadline}</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">
            {funnel.heroText.cta}
          </button>
        </div>
      )}

      {/* Landing Page Sections */}
      {funnel.sections && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-purple-400 mb-4">Landing Page Sections</h3>
          <div className="space-y-4">
            {funnel.sections
              .sort((a: any, b: any) => a.order - b.order)
              .map((section: any, i: number) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-white">{section.title}</h4>
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                      {section.type}
                    </span>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{section.content}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Form Fields */}
      {funnel.formFields && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-green-400 mb-4">Form Fields</h3>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="space-y-3">
              {funnel.formFields.map((field: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                  <div>
                    <div className="text-white font-semibold">{field.label}</div>
                    <div className="text-xs text-gray-400">
                      Type: {field.type} {field.required && <span className="text-red-400">*</span>}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{field.placeholder}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTAs */}
      {funnel.cta && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Call-to-Action</h3>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Primary CTA</div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">
                {funnel.cta.primary}
              </button>
            </div>
            {funnel.cta.secondary && (
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Secondary CTA</div>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600">
                  {funnel.cta.secondary}
                </button>
              </div>
            )}
            <div className="text-xs text-gray-400">
              Placement: {funnel.cta.placement?.join(", ")}
            </div>
          </div>
        </div>
      )}

      {/* Positioning */}
      {funnel.positioning && (
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Positioning</h3>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-1">Value Proposition</div>
              <div className="text-white font-semibold">{funnel.positioning.valueProposition}</div>
            </div>
            {funnel.positioning.keyMessages && (
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Key Messages</div>
                <div className="flex flex-wrap gap-2">
                  {funnel.positioning.keyMessages.map((msg: string, i: number) => (
                    <span key={i} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {msg}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-400 mb-1">Tone</div>
              <div className="text-gray-300">{funnel.positioning.tone}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

