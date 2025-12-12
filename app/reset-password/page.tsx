"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { apiPost } from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset token");
    }
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      setLoading(false);
      return;
    }

    try {
      await apiPost("/auth/reset-password", {
        token,
        password: formData.password,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-md w-full rounded-lg p-8 text-center" style={{ backgroundColor: "#111827" }}>
          <h1 className="text-3xl font-bold text-white mb-4">Password Reset!</h1>
          <p className="text-gray-300 mb-6">Your password has been reset successfully.</p>
          <p className="text-gray-400 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#0A1628" }}>
      <div className="max-w-md w-full rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
              className="w-full px-4 py-2 bg-white text-black rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              minLength={8}
              className="w-full px-4 py-2 bg-white text-black rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full px-6 py-3 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#2563eb" }}
            onMouseEnter={(e) => !loading && !token && (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => !loading && !token && (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          <Link href="/login" className="hover:opacity-90" style={{ color: "#2563eb" }}>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
