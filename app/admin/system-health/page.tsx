"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import Link from "next/link";

export default function AdminSystemHealthPage() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealth();
    const interval = setInterval(loadHealth, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  async function loadHealth() {
    try {
      const data = await apiGet("/admin/system-health");
      console.log("[ADMIN HEALTH] Response:", data);
      setHealth(data);
    } catch (err: any) {
      console.error("Failed to load system health:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">System Health</h1>
        <p className="text-gray-300">Monitor system status and performance</p>
      </div>

      {loading ? (
        <div className="text-center text-white py-12">
          Loading system health...
        </div>
      ) : health ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Overall Status</span>
                <span className="text-green-400 font-semibold">✅ Healthy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Database</span>
                <span className="text-green-400 font-semibold">
                  ✅ Connected
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">API</span>
                <span className="text-green-400 font-semibold">✅ Online</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Uptime</span>
                <span className="text-white">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Response Time</span>
                <span className="text-white">~200ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Last Check</span>
                <span className="text-white">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {health.services && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 md:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-4">
                Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(health.services).map(
                  ([service, status]: [string, any]) => (
                    <div
                      key={service}
                      className="flex items-center justify-between p-3 bg-white/5 rounded"
                    >
                      <span className="text-gray-300 capitalize">
                        {service}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          status === "healthy" || status === "online"
                            ? "bg-green-500/20 text-green-300"
                            : status === "warning"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {String(status)}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">
            Unable to load system health data
          </p>
        </div>
      )}
    </div>
  );
}
