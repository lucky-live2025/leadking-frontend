"use client";

import { useEffect, useState } from "react";

interface UltraStreamProps {
  isGenerating: boolean;
  currentStep?: string;
  progress?: number;
}

const steps = [
  { id: 1, name: "Persona", icon: "👤" },
  { id: 2, name: "Competitors", icon: "🏆" },
  { id: 3, name: "Creative Blocks", icon: "🎨" },
  { id: 4, name: "Copy", icon: "✍️" },
  { id: 5, name: "Images", icon: "🖼️" },
  { id: 6, name: "Funnel", icon: "🔄" },
  { id: 7, name: "Budget", icon: "💰" },
  { id: 8, name: "CTA System", icon: "🎯" },
  { id: 9, name: "Export Prep", icon: "📦" },
];

export default function UltraStream({ isGenerating, currentStep, progress = 0 }: UltraStreamProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setActiveStep(0);
      return;
    }

    const stepIndex = steps.findIndex(s => s.name.toLowerCase() === currentStep?.toLowerCase());
    if (stepIndex >= 0) {
      setActiveStep(stepIndex);
    } else if (progress > 0) {
      setActiveStep(Math.floor((progress / 100) * steps.length));
    }
  }, [isGenerating, currentStep, progress]);

  if (!isGenerating) {
    return (
      <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Generate</h3>
          <p className="text-gray-400">Fill in the form and click "Generate Campaign" to start</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Generating Your Campaign...</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const isPending = index > activeStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600/20 border-2 border-blue-500"
                  : isCompleted
                  ? "bg-green-600/10 border border-green-500/30"
                  : "bg-gray-800/30 border border-gray-700"
              }`}
            >
              <div className={`text-3xl ${isActive ? "animate-pulse" : ""}`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${isActive ? "text-blue-400" : isCompleted ? "text-green-400" : "text-gray-400"}`}>
                    {step.name}
                  </span>
                  {isActive && (
                    <div className="flex items-center gap-2 text-blue-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Processing...</span>
                    </div>
                  )}
                  {isCompleted && (
                    <span className="text-green-400 text-sm">✓ Complete</span>
                  )}
                  {isPending && (
                    <span className="text-gray-500 text-sm">Waiting...</span>
                  )}
                </div>
                {isActive && (
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 text-gray-400">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Analyzing Market...</span>
        </div>
      </div>
    </div>
  );
}

