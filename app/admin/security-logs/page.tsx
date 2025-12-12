"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/lib/api-admin";
import Link from "next/link";

export default function AdminSecurityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      setLoading(true);
      const data = await adminGet("/admin/security-logs");
      console.log("[ADMIN SECURITY] Response:", data);
      if (Array.isArray(data)) {
        setLogs(data);
      } else {
        setLogs([]);
      }
    } catch (err: any) {
      console.error("Failed to load security logs:", err);
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
        <h1 className="text-3xl font-bold mb-2">Security Logs</h1>
        <p className="text-gray-300">
          Monitor suspicious activities and security events
        </p>
      </div>

      {loading ? (
        <div className="text-center text-white py-12">
          Loading security logs...
        </div>
      ) : logs.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">No security events found</p>
          <p className="text-gray-400 text-sm mt-2">All clear!</p>
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
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      log.severity === "HIGH"
                        ? "bg-red-500/20 text-red-300"
                        : log.severity === "MEDIUM"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {log.severity || "INFO"}
                  </span>
                  <span className="ml-2 text-gray-400 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-white font-semibold mb-2">
                {log.type || "Security Event"}
              </p>
              {log.description && (
                <p className="text-gray-300 text-sm">{log.description}</p>
              )}
              {log.ipAddress && (
                <p className="text-gray-400 text-xs mt-2">
                  IP: {log.ipAddress}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
