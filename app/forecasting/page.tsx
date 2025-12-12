"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";

interface Forecast {
  id: number;
  campaignId: number;
  predictedCPM?: number;
  predictedCTR?: number;
  predictedCPL?: number;
  predictedLeads?: number;
  risk?: string;
  timestamp: string;
}

export default function ForecastingPage() {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForecasts();
  }, []);

  async function loadForecasts() {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet("/forecasting");
      
      if (data && data.forecasts) {
        setForecasts(data.forecasts);
      } else if (Array.isArray(data)) {
        setForecasts(data);
      } else {
        setForecasts([]);
      }
    } catch (err: any) {
      console.error("Failed to load forecasts:", err);
      setError(err.message || "Failed to load forecasts");
      setForecasts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white py-12">Loading forecasts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Forecasting</h1>
        <p className="text-gray-300">View campaign performance forecasts</p>
      </div>

      {forecasts.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg mb-4">No forecasts available</p>
          <p className="text-gray-400 text-sm">
            Run a forecast on a campaign to see predictions
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forecasts.map((forecast) => (
            <div
              key={forecast.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Campaign #{forecast.campaignId}
              </h3>
              
              <div className="space-y-2 text-sm">
                {forecast.predictedCPM && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted CPM:</span>
                    <span className="text-white">${forecast.predictedCPM.toFixed(2)}</span>
                  </div>
                )}
                {forecast.predictedCTR && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted CTR:</span>
                    <span className="text-white">{(forecast.predictedCTR * 100).toFixed(2)}%</span>
                  </div>
                )}
                {forecast.predictedCPL && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted CPL:</span>
                    <span className="text-white">${forecast.predictedCPL.toFixed(2)}</span>
                  </div>
                )}
                {forecast.predictedLeads && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted Leads:</span>
                    <span className="text-white">{forecast.predictedLeads}</span>
                  </div>
                )}
                {forecast.risk && (
                  <div className="mt-4">
                    <span className="text-gray-400">Risk Level: </span>
                    <span
                      className={`font-semibold ${
                        forecast.risk.toLowerCase() === "high"
                          ? "text-red-400"
                          : forecast.risk.toLowerCase() === "medium"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {forecast.risk}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-xs text-gray-400">
                {new Date(forecast.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
