"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";
import TwoFactorSection from "@/components/TwoFactorSection";

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
      
      // Verify user is authenticated first
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Please log in to view your profile");
        setLoading(false);
        return;
      }
      
      const data = await apiGet("/auth/me", { auth: true });
      setUser(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
      });
    } catch (err: any) {
      console.error("Failed to load profile:", err);
      
      // Handle 401 errors specifically
      if (err.response?.status === 401 || err.message?.includes("401")) {
        setError("Please log in to view your profile");
        // Don't redirect here - let UserLayout handle it
      } else if (err.response?.status === 403 || err.message?.includes("403") || err.message?.includes("Forbidden")) {
        // Handle 403 Forbidden - likely user not approved
        const errorMsg = err.response?.data?.message || err.message || "Access denied";
        if (errorMsg.includes("approved") || errorMsg.includes("approval")) {
          setError("Your account is pending approval. Please wait for admin approval to access your profile.");
        } else {
          setError(errorMsg);
        }
      } else {
        setError(err.message || "Internal server error");
      }
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
      await apiPost("/auth/me", formData, { auth: true });
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
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Profile Settings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 shadow-md">
          <p className="text-green-700">Profile updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-900 font-semibold mb-3">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold mb-3">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Two-Factor Authentication Section */}
      {user && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
          <TwoFactorSection user={user} />
        </div>
      )}
    </div>
  );
}
