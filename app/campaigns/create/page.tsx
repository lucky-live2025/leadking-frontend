"use client";

import { useState, useEffect } from "react";
import { getEngines } from "@/lib/getEngines";
import { apiGet, apiPost } from "@/lib/api";

interface Engine {
  id: string;
  name: string;
}

interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

interface EngineSchema {
  fields: FormField[];
}

export default function CreateCampaign() {
  const [engine, setEngine] = useState("");
  const [engines, setEngines] = useState<Engine[]>([]);
  const [form, setForm] = useState<EngineSchema | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEngines()
      .then(setEngines)
      .catch((err) => {
        console.error("Failed to load engines:", err);
        setError("Failed to load engines");
      });
  }, []);

  const loadEngineForm = async (engineName: string) => {
    if (!engineName) {
      setEngine("");
      setForm(null);
      setFormData({});
      return;
    }

    setEngine(engineName);
    setLoading(true);
    setError(null);

    try {
      // Try to get schema from backend, or use default schema
      const schema = await apiGet(`/ai/engines/${engineName}/schema`).catch(() => {
        // Return default schema if endpoint doesn't exist
        return getDefaultSchema(engineName);
      });
      setForm(schema);
    } catch (err: any) {
      console.error("Failed to load engine schema:", err);
      // Use default schema as fallback
      setForm(getDefaultSchema(engineName));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSchema = (engineId: string): EngineSchema => {
    const defaultSchemas: Record<string, EngineSchema> = {
      meta: {
        fields: [
          { id: "name", label: "Campaign Name", type: "text", required: true, placeholder: "Enter campaign name" },
          { id: "budget", label: "Budget (USD)", type: "number", required: true, placeholder: "1000" },
          { id: "objective", label: "Campaign Objective", type: "select", required: true, options: ["CONVERSIONS", "TRAFFIC", "ENGAGEMENT", "LEADS"] },
          { id: "audience", label: "Target Audience", type: "textarea", required: true, placeholder: "Describe your target audience" },
        ],
      },
      google: {
        fields: [
          { id: "name", label: "Campaign Name", type: "text", required: true },
          { id: "budget", label: "Daily Budget (USD)", type: "number", required: true },
          { id: "keywords", label: "Keywords", type: "textarea", required: true, placeholder: "Enter keywords separated by commas" },
        ],
      },
      youtube: {
        fields: [
          { id: "name", label: "Campaign Name", type: "text", required: true },
          { id: "budget", label: "Budget (USD)", type: "number", required: true },
          { id: "videoGoal", label: "Video Goal", type: "select", options: ["VIEWS", "SUBSCRIBERS", "ENGAGEMENT"] },
        ],
      },
      yandex: {
        fields: [
          { id: "name", label: "Campaign Name", type: "text", required: true },
          { id: "budget", label: "Budget (RUB)", type: "number", required: true },
          { id: "region", label: "Target Region", type: "text", placeholder: "Russia, CIS" },
        ],
      },
      linkedin: {
        fields: [
          { id: "name", label: "Campaign Name", type: "text", required: true },
          { id: "budget", label: "Budget (USD)", type: "number", required: true },
          { id: "audience", label: "B2B Audience", type: "textarea", placeholder: "Job titles, industries, company size" },
        ],
      },
      email: {
        fields: [
          { id: "name", label: "Campaign Name", type: "text", required: true },
          { id: "subject", label: "Email Subject", type: "text", required: true },
          { id: "content", label: "Email Content", type: "textarea", required: true },
        ],
      },
    };

    return defaultSchemas[engineId] || {
      fields: [
        { id: "name", label: "Campaign Name", type: "text", required: true },
        { id: "budget", label: "Budget", type: "number", required: true },
      ],
    };
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!engine || !form) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await apiPost("/campaigns", {
        engine,
        ...formData,
      }, { auth: true });

      // Redirect to campaign detail page
      window.location.href = `/campaigns/${response.id || response.campaignId}`;
    } catch (err: any) {
      console.error("Failed to create campaign:", err);
      setError(err.message || "Failed to create campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Create Campaign</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* ENGINE SELECT */}
        <div className="bg-[#111827] rounded-lg p-6 mb-6">
          <label className="block text-gray-300 text-sm font-semibold mb-3">
            Select AI Engine
          </label>
          <select
            className="w-full p-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            onChange={(e) => loadEngineForm(e.target.value)}
            value={engine}
          >
            <option value="">-- Select Engine --</option>
            {engines.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-[#111827] rounded-lg p-6 text-center">
            <p className="text-gray-400">Loading engine fields...</p>
          </div>
        )}

        {/* AUTO-FORM RENDER */}
        {form?.fields && form.fields.length > 0 && (
          <form onSubmit={handleSubmit} className="bg-[#111827] rounded-lg p-6 space-y-6">
            {form.fields.map((field) => (
              <div key={field.id} className="flex flex-col">
                <label className="mb-2 text-sm text-gray-300 font-medium">
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    className="p-3 rounded-lg bg-[#0A1628] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    className="p-3 rounded-lg bg-[#0A1628] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    className="p-3 rounded-lg bg-[#0A1628] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                    rows={4}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                )}

                {field.type === "select" && field.options && (
                  <select
                    className="p-3 rounded-lg bg-[#0A1628] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
            >
              {submitting ? "Creating Campaign..." : "Generate Campaign"}
            </button>
          </form>
        )}

        {!engine && !loading && (
          <div className="bg-[#111827] rounded-lg p-6 text-center text-gray-400">
            Select an AI engine above to start creating your campaign
          </div>
        )}
      </div>
    </div>
  );
}

