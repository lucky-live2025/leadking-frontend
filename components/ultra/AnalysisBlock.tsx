"use client";

interface AnalysisBlockProps {
  analysis: any;
}

export default function AnalysisBlock({ analysis }: AnalysisBlockProps) {
  return (
    <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6">Market Analysis</h2>

      {/* Buyer Persona */}
      {analysis.buyerPersona && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Buyer Persona</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Demographics</h4>
              <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                {JSON.stringify(analysis.buyerPersona.demographics, null, 2)}
              </pre>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Psychographics</h4>
              <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                {JSON.stringify(analysis.buyerPersona.psychographics, null, 2)}
              </pre>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Behaviors</h4>
              <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                {JSON.stringify(analysis.buyerPersona.behaviors, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Pain Points & Desires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-red-400 mb-4">Pain Points</h3>
          <ul className="space-y-2">
            {analysis.painPoints?.map((point: string, i: number) => (
              <li key={i} className="bg-gray-900/50 rounded-lg p-3 text-gray-300">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4">Desires</h3>
          <ul className="space-y-2">
            {analysis.desires?.map((desire: string, i: number) => (
              <li key={i} className="bg-gray-900/50 rounded-lg p-3 text-gray-300">
                {desire}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Platform Suitability */}
      {analysis.platformSuitability && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-purple-400 mb-4">Platform Suitability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(analysis.platformSuitability).map(([platform, data]: [string, any]) => (
              <div key={platform} className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-lg font-bold text-white mb-2">{platform}</h4>
                <div className="text-3xl font-bold text-blue-400 mb-2">{data.score}/10</div>
                <p className="text-gray-300 text-sm mb-2">{data.reasoning}</p>
                <p className="text-gray-400 text-xs">Best Use: {data.bestUseCase}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitive Angle */}
      {analysis.competitiveAngle && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Competitive Angle</h3>
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Differentiation</h4>
              <p className="text-gray-300">{analysis.competitiveAngle.differentiation}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Value Proposition</h4>
              <p className="text-gray-300">{analysis.competitiveAngle.uniqueValueProposition}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Positioning</h4>
              <p className="text-gray-300">{analysis.competitiveAngle.positioning}</p>
            </div>
            {analysis.competitiveAngle.keyMessages && (
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Messages</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {analysis.competitiveAngle.keyMessages.map((msg: string, i: number) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Campaign Strategy */}
      {analysis.campaignStrategy && (
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Campaign Strategy</h3>
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Primary Strategy</h4>
              <p className="text-gray-300">{analysis.campaignStrategy.primaryStrategy}</p>
            </div>
            {analysis.campaignStrategy.budgetAllocation && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Budget Allocation</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(analysis.campaignStrategy.budgetAllocation).map(([platform, budget]: [string, any]) => (
                    <div key={platform} className="bg-gray-800/50 rounded p-2 text-center">
                      <div className="text-xs text-gray-400">{platform}</div>
                      <div className="text-white font-semibold">{budget}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {analysis.campaignStrategy.kpis && (
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Performance Indicators</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.campaignStrategy.kpis.map((kpi: string, i: number) => (
                    <span key={i} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

