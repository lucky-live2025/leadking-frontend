"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/lib/api-admin";
import Link from "next/link";

export default function AdminUsagePage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      setLoading(true);
      const data = await adminGet("/admin/usage?timeRange=7d");
      console.log("[ADMIN USAGE] Response:", data);
      if (data && data.logs) {
        setLogs(data.logs);
      } else if (Array.isArray(data)) {
        setLogs(data);
      } else {
        setLogs([]);
      }
    } catch (err: any) {
      console.error("Failed to load usage logs:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      setLogs([]);
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
        <h1 className="text-3xl font-bold mb-2">Usage Statistics</h1>
        <p className="text-gray-300">View system usage and activity logs</p>
      </div>

      {loading ? (
        <div className="text-center text-white py-12">
          Loading usage logs...
        </div>
      ) : logs.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">No usage logs found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300">
                    {log.action || "Unknown"}
                  </span>
                  <span className="ml-2 text-gray-400 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              {log.userId && (
                <p className="text-gray-300 text-sm mb-2">
                  User ID: {log.userId}
                </p>
              )}
              {log.metadata && (
                <details className="mt-2">
                  <summary className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">
                    Details
                  </summary>
                  <pre className="mt-2 text-xs text-gray-400 bg-black/30 p-3 rounded overflow-x-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
