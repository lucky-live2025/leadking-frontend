"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPatch } from "@/lib/api";

export default function DashboardProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet("/auth/me");
      setUser(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
      });
    } catch (err: any) {
      console.error("Failed to load profile:", err);
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await apiPatch("/auth/me", formData);
      setSuccess(true);
      await loadProfile();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Profile Settings</h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-6">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-6 mb-6">
          <p className="text-green-300">Profile updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-lg p-6" style={{ backgroundColor: "#111827" }}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-white text-black rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-white text-black rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            style={{ backgroundColor: "#2563eb" }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

