"use client";

import { useState, useEffect } from "react";
import { adminGet, adminDelete } from "@/lib/api-admin";
import Link from "next/link";

export default function AdminErrorsPage() {
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadErrors();
  }, []);

  async function loadErrors() {
    try {
      setLoading(true);
      const data = await adminGet("/admin/errors?limit=100");
      console.log("[ADMIN ERRORS] Response:", data);
      if (Array.isArray(data)) {
        setErrors(data);
      } else if (data.errors) {
        setErrors(data.errors);
      } else if (data.data) {
        setErrors(data.data);
      } else {
        setErrors([]);
      }
    } catch (err: any) {
      console.error("Failed to load errors:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      setErrors([]);
    } finally {
      setLoading(false);
    }
  }

  async function clearErrors() {
    if (!confirm("Are you sure you want to clear all error logs?")) return;
    try {
      await adminDelete("/admin/errors");
      setErrors([]);
      alert("Error logs cleared");
    } catch (err: any) {
      console.error("Failed to clear errors:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } else {
        alert("Failed to clear errors: " + err.message);
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Error Logs</h1>
          <p className="text-gray-300">
            System error logs and debugging information
          </p>
        </div>
        {errors.length > 0 && (
          <button
            onClick={clearErrors}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center text-white py-12">Loading errors...</div>
      ) : errors.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">No errors found</p>
          <p className="text-gray-400 text-sm mt-2">
            System is running smoothly!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {errors.map((error) => (
            <div
              key={error.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      error.source === "backend"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {error.source || "unknown"}
                  </span>
                  <span className="ml-2 text-gray-400 text-sm">
                    {new Date(error.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-white font-semibold mb-2">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">
                    Stack Trace
                  </summary>
                  <pre className="mt-2 text-xs text-gray-400 bg-black/30 p-3 rounded overflow-x-auto">
                    {error.stack}
                  </pre>
                </details>
              )}
              {error.metadata && (
                <details className="mt-2">
                  <summary className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">
                    Metadata
                  </summary>
                  <pre className="mt-2 text-xs text-gray-400 bg-black/30 p-3 rounded overflow-x-auto">
                    {JSON.stringify(error.metadata, null, 2)}
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
