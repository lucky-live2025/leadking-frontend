"use client";

import { useState } from "react";
import Link from "next/link";
import { apiPost } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiPost("/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-md w-full rounded-lg p-8 text-center" style={{ backgroundColor: "#111827" }}>
          <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
          <p className="text-gray-300 mb-6">
            We've sent a password reset link to {email}
          </p>
          <Link href="/login" className="text-white hover:opacity-90" style={{ color: "#2563eb" }}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#0A1628" }}>
      <div className="max-w-md w-full rounded-lg p-8" style={{ backgroundColor: "#111827" }}>
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white text-black rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#2563eb" }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            {loading ? "Sending..." : "Send Reset Link"}
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
