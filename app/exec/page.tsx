"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";

export default function ExecPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);
      setError(null);
      // Try executive feed endpoint, fallback to analytics
      try {
        const data = await apiGet("/apb-plus/report");
        setStats(data);
      } catch {
        // Fallback to analytics
        const data = await apiGet("/analytics");
        setStats(data);
      }
    } catch (err: any) {
      console.error("Failed to load executive data:", err);
      setError(err.message || "Failed to load executive dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white py-12">Loading executive dashboard...</div>
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
        <h1 className="text-3xl font-bold text-white mb-2">Executive Dashboard</h1>
        <p className="text-gray-300">High-level performance metrics</p>
      </div>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stats).map(([key, value]: [string, any]) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-sm text-gray-400 mb-2 uppercase">{key}</h3>
              <p className="text-2xl font-bold text-white">
                {typeof value === "number" ? value.toLocaleString() : String(value)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">No executive data available</p>
        </div>
      )}
    </div>
  );
}
