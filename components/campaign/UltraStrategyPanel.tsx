"use client";

import { useState } from "react";

interface UltraStrategy {
  campaignStrategy?: {
    primaryStrategy?: string;
    secondaryStrategies?: string[];
    budgetRecommendationMatrix?: {
      low?: { daily: number; monthly: number; platforms: string[] };
      medium?: { daily: number; monthly: number; platforms: string[] };
      high?: { daily: number; monthly: number; platforms: string[] };
    };
  };
  platformSuitability?: {
    META?: { score: number; reasoning: string; bestUseCase: string };
    TIKTOK?: { score: number; reasoning: string; bestUseCase: string };
    GOOGLE?: { score: number; reasoning: string; bestUseCase: string };
    YOUTUBE?: { score: number; reasoning: string; bestUseCase: string };
    LINKEDIN?: { score: number; reasoning: string; bestUseCase: string };
  };
  competitiveAngle?: {
    uniqueValueProposition?: string;
    positioning?: string;
    keyMessages?: string[];
  };
  buyerPersona?: {
    demographics?: {
      age?: string;
      gender?: string;
      income?: string;
      location?: string;
    };
    psychographics?: {
      values?: string[];
      interests?: string[];
    };
  };
}

interface UltraStrategyPanelProps {
  strategy: UltraStrategy;
  onApplyStrategy: () => void;
  applying?: boolean;
}

export default function UltraStrategyPanel({ strategy, onApplyStrategy, applying = false }: UltraStrategyPanelProps) {
  const [activeTab, setActiveTab] = useState<"strategy" | "platforms" | "audience" | "messaging">("strategy");

  const campaignStrategy = strategy.campaignStrategy || {};
  const platformSuitability = strategy.platformSuitability || {};
  const competitiveAngle = strategy.competitiveAngle || {};
  const buyerPersona = strategy.buyerPersona || {};

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-purple-200 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">✨ ULTRA Strategy Analysis</h3>
          <p className="text-gray-600">AI-powered campaign strategy recommendations</p>
        </div>
        <button
          onClick={onApplyStrategy}
          disabled={applying}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-xl"
        >
          {applying ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Applying...
            </span>
          ) : (
            "🚀 Apply Strategy to Campaign"
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-300">
        {[
          { id: "strategy", label: "Strategy", icon: "🎯" },
          { id: "platforms", label: "Platforms", icon: "📱" },
          { id: "audience", label: "Audience", icon: "👥" },
          { id: "messaging", label: "Messaging", icon: "💬" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-semibold transition-all ${
              activeTab === tab.id
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Strategy Tab */}
      {activeTab === "strategy" && (
        <div className="space-y-6">
          {campaignStrategy.primaryStrategy && (
            <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-3">🎯 Primary Strategy</h4>
              <p className="text-gray-700 text-lg">{campaignStrategy.primaryStrategy}</p>
            </div>
          )}

          {campaignStrategy.secondaryStrategies && campaignStrategy.secondaryStrategies.length > 0 && (
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-3">💡 Secondary Strategies</h4>
              <ul className="space-y-2">
                {campaignStrategy.secondaryStrategies.map((strategy, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">{idx + 1}.</span>
                    <span className="text-gray-700">{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {campaignStrategy.budgetRecommendationMatrix && (
            <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">💰 Budget Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {campaignStrategy.budgetRecommendationMatrix.low && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h5 className="font-bold text-yellow-800 mb-2">Low Budget</h5>
                    <p className="text-sm text-yellow-700">
                      ${campaignStrategy.budgetRecommendationMatrix.low.daily}/day
                      <br />
                      ${campaignStrategy.budgetRecommendationMatrix.low.monthly}/month
                    </p>
                    {campaignStrategy.budgetRecommendationMatrix.low.platforms && (
                      <p className="text-xs text-yellow-600 mt-2">
                        Platforms: {campaignStrategy.budgetRecommendationMatrix.low.platforms.join(", ")}
                      </p>
                    )}
                  </div>
                )}
                {campaignStrategy.budgetRecommendationMatrix.medium && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h5 className="font-bold text-blue-800 mb-2">Medium Budget</h5>
                    <p className="text-sm text-blue-700">
                      ${campaignStrategy.budgetRecommendationMatrix.medium.daily}/day
                      <br />
                      ${campaignStrategy.budgetRecommendationMatrix.medium.monthly}/month
                    </p>
                    {campaignStrategy.budgetRecommendationMatrix.medium.platforms && (
                      <p className="text-xs text-blue-600 mt-2">
                        Platforms: {campaignStrategy.budgetRecommendationMatrix.medium.platforms.join(", ")}
                      </p>
                    )}
                  </div>
                )}
                {campaignStrategy.budgetRecommendationMatrix.high && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h5 className="font-bold text-green-800 mb-2">High Budget</h5>
                    <p className="text-sm text-green-700">
                      ${campaignStrategy.budgetRecommendationMatrix.high.daily}/day
                      <br />
                      ${campaignStrategy.budgetRecommendationMatrix.high.monthly}/month
                    </p>
                    {campaignStrategy.budgetRecommendationMatrix.high.platforms && (
                      <p className="text-xs text-green-600 mt-2">
                        Platforms: {campaignStrategy.budgetRecommendationMatrix.high.platforms.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === "platforms" && (
        <div className="space-y-4">
          {Object.entries(platformSuitability).map(([platform, data]: [string, any]) => (
            <div key={platform} className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{platform}</h4>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-purple-600">{data.score || 0}/10</div>
                  <div className={`w-24 h-3 bg-gray-200 rounded-full overflow-hidden`}>
                    <div
                      className={`h-full ${
                        (data.score || 0) >= 8
                          ? "bg-green-500"
                          : (data.score || 0) >= 6
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${((data.score || 0) / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              {data.reasoning && (
                <p className="text-gray-700 mb-2">{data.reasoning}</p>
              )}
              {data.bestUseCase && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Best for:</span> {data.bestUseCase}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Audience Tab */}
      {activeTab === "audience" && (
        <div className="space-y-4">
          {buyerPersona.demographics && (
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4">👤 Demographics</h4>
              <div className="grid grid-cols-2 gap-4">
                {buyerPersona.demographics.age && (
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Age:</span>
                    <p className="text-gray-900">{buyerPersona.demographics.age}</p>
                  </div>
                )}
                {buyerPersona.demographics.gender && (
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Gender:</span>
                    <p className="text-gray-900">{buyerPersona.demographics.gender}</p>
                  </div>
                )}
                {buyerPersona.demographics.income && (
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Income:</span>
                    <p className="text-gray-900">{buyerPersona.demographics.income}</p>
                  </div>
                )}
                {buyerPersona.demographics.location && (
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Location:</span>
                    <p className="text-gray-900">{buyerPersona.demographics.location}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {buyerPersona.psychographics && (
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4">🧠 Psychographics</h4>
              {buyerPersona.psychographics.values && buyerPersona.psychographics.values.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-semibold text-gray-600 block mb-2">Values:</span>
                  <div className="flex flex-wrap gap-2">
                    {buyerPersona.psychographics.values.map((value: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {buyerPersona.psychographics.interests && buyerPersona.psychographics.interests.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-600 block mb-2">Interests:</span>
                  <div className="flex flex-wrap gap-2">
                    {buyerPersona.psychographics.interests.map((interest: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Messaging Tab */}
      {activeTab === "messaging" && (
        <div className="space-y-4">
          {competitiveAngle.uniqueValueProposition && (
            <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-3">💎 Unique Value Proposition</h4>
              <p className="text-gray-700 text-lg">{competitiveAngle.uniqueValueProposition}</p>
            </div>
          )}

          {competitiveAngle.positioning && (
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-3">📍 Positioning</h4>
              <p className="text-gray-700">{competitiveAngle.positioning}</p>
            </div>
          )}

          {competitiveAngle.keyMessages && competitiveAngle.keyMessages.length > 0 && (
            <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4">💬 Key Messages</h4>
              <ul className="space-y-3">
                {competitiveAngle.keyMessages.map((message: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">{idx + 1}.</span>
                    <span className="text-gray-700">{message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

