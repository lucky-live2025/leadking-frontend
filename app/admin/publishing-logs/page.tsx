"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import Link from "next/link";

export default function AdminPublishingLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      setLoading(true);
      const data = await apiGet("/admin/publishing-logs");
      console.log("[ADMIN PUBLISHING] Response:", data);
      if (Array.isArray(data)) {
        setLogs(data);
      } else {
        setLogs([]);
      }
    } catch (err: any) {
      console.error("Failed to load publishing logs:", err);
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
        <h1 className="text-3xl font-bold mb-2">Publishing Logs</h1>
        <p className="text-gray-300">View all campaign publishing activity</p>
      </div>

      {loading ? (
        <div className="text-center text-white py-12">Loading logs...</div>
      ) : logs.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">No publishing logs found</p>
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
                      log.platform === "META"
                        ? "bg-blue-500/20 text-blue-300"
                        : log.platform === "GOOGLE"
                          ? "bg-green-500/20 text-green-300"
                          : log.platform === "YANDEX"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {log.platform}
                  </span>
                  <span className="ml-2 text-gray-400 text-sm">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    log.status === "SUCCESS"
                      ? "bg-green-500/20 text-green-300"
                      : log.status === "ERROR"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {log.status}
                </span>
              </div>
              {log.user && (
                <p className="text-gray-300 text-sm mb-2">
                  User: {log.user.email}
                </p>
              )}
              {log.message && <p className="text-white">{log.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
