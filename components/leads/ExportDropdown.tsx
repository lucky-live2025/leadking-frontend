"use client";

import { useState } from "react";

interface ExportDropdownProps {
  onExport: (format: "csv" | "excel" | "json" | "pdf") => void;
}

export default function ExportDropdown({ onExport }: ExportDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 flex items-center gap-2"
      >
        Export
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-700">
            <button
              onClick={() => {
                onExport("csv");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg"
            >
              Export as CSV
            </button>
            <button
              onClick={() => {
                onExport("excel");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
            >
              Export as Excel
            </button>
            <button
              onClick={() => {
                onExport("json");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
            >
              Export as JSON
            </button>
            <button
              onClick={() => {
                onExport("pdf");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-b-lg"
            >
              Export as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

