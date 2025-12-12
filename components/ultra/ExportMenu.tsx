"use client";

import { useState } from "react";
import { API_BASE } from "@/lib/api";

interface ExportMenuProps {
  campaignId: number;
}

export default function ExportMenu({ campaignId }: ExportMenuProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  async function handleExport(format: "pdf" | "docx" | "json") {
    setExporting(format);
    try {
      const token = localStorage.getItem("token");
      const url = `${API_BASE}/ultra/export/${campaignId}?format=${format}`;
      const response = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      if (format === "json") {
        // Download JSON
        const data = await response.json();
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `ultra-campaign-${campaignId}.json`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      } else {
        // Download PDF or DOCX
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `ultra-campaign-${campaignId}.${format}`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error: any) {
      console.error("Export error:", error);
      alert(error.message || "Failed to export. Please try again.");
    } finally {
      setExporting(null);
    }
  }

  return (
    <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-6">
      <h3 className="text-xl font-bold text-white mb-4">Export Campaign</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleExport("pdf")}
          disabled={exporting !== null}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {exporting === "pdf" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Export...
            </>
          ) : (
            <>
              <span>📄</span> Export PDF
            </>
          )}
        </button>
        <button
          onClick={() => handleExport("docx")}
          disabled={exporting !== null}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {exporting === "docx" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Export...
            </>
          ) : (
            <>
              <span>📝</span> Export DOCX
            </>
          )}
        </button>
        <button
          onClick={() => handleExport("json")}
          disabled={exporting !== null}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {exporting === "json" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Export...
            </>
          ) : (
            <>
              <span>📋</span> Export JSON
            </>
          )}
        </button>
      </div>
    </div>
  );
}

