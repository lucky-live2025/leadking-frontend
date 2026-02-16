"use client";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-200"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < stepLabels.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all duration-200 ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
