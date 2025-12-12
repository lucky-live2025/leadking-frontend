"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost } from "@/lib/api";
import PublicNav from "@/components/PublicNav";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError("");
    setLoading(true);

    const loginEmail = email.trim().toLowerCase();
    const loginPassword = password;

    try {
      const response = await apiPost("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      const token = response.accessToken || response.access_token;
      if (token) {
        // Store token and user data
        localStorage.setItem("token", token);
        const userData = response.user || {};
        const user = {
          userId: userData.id || response.userId,
          id: userData.id || response.userId,
          email: userData.email || loginEmail,
          role: userData.role || response.role || "USER",
          status: userData.status || response.status || "PENDING", // CRITICAL: Store status
        };
        localStorage.setItem("user", JSON.stringify(user));

        // Ensure localStorage is written and token is available before redirect
        // Use window.location for a hard redirect to prevent race conditions
        await new Promise(resolve => setTimeout(resolve, 200));

        // Redirect based on role using window.location for reliability
        if (user.role.toUpperCase() === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        setError("Login failed. Please check your credentials.");
        setLoading(false);
      }
    } catch (err: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      // Handle network errors
      if (!err.message || err.message.includes("Network Error") || err.message.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your connection and try again.";
        setError(errorMessage);
        setLoading(false);
        return;
      }
      
      // Check if error has response data (axios error)
      let errorResponse = null;
      if (err.response?.data) {
        errorResponse = err.response.data;
      } else if (err.message) {
        // Try to parse error message as JSON (backend sends JSON stringified errors)
        try {
          errorResponse = JSON.parse(err.message);
        } catch {
          // Not JSON, try to extract from error message string
          if (err.message.includes('ACCOUNT_PENDING') || err.message.includes('ACCOUNT_NOT_APPROVED')) {
            errorResponse = { error: 'ACCOUNT_PENDING', message: 'Your account is pending admin approval.' };
          } else if (err.message.includes('ACCOUNT_SUSPENDED')) {
            errorResponse = { error: 'ACCOUNT_SUSPENDED', message: 'Your account has been suspended.' };
          } else if (err.message.includes('ACCOUNT_REJECTED')) {
            errorResponse = { error: 'ACCOUNT_REJECTED', message: 'Your account registration was rejected.' };
          }
        }
      }
      
      // Handle structured error response
      if (errorResponse) {
        if (typeof errorResponse === 'string') {
          // If it's a JSON string, try parsing again
          try {
            errorResponse = JSON.parse(errorResponse);
          } catch {
            // If still not JSON, use as message
            errorMessage = errorResponse;
          }
        }
        
        if (typeof errorResponse === 'object') {
          if (errorResponse.error === 'ACCOUNT_PENDING' || errorResponse.error === 'ACCOUNT_NOT_APPROVED') {
            errorMessage = errorResponse.message || "Your account is pending admin approval. You will be notified when approved.";
          } else if (errorResponse.error === 'ACCOUNT_SUSPENDED') {
            errorMessage = errorResponse.message || "Your account has been suspended. Please contact support.";
          } else if (errorResponse.error === 'ACCOUNT_REJECTED') {
            errorMessage = errorResponse.message || "Your account registration was rejected. Please contact support.";
          } else if (errorResponse.message) {
            errorMessage = errorResponse.message;
          } else if (errorResponse.error) {
            errorMessage = errorResponse.error;
          }
        }
      } else if (err.message) {
        // Fallback to message parsing
        if (err.message.includes("401") || err.message.includes("Invalid credentials")) {
          errorMessage = "Invalid credentials. Please try again.";
        } else if (err.message.includes("403") || err.message.includes("Access denied")) {
          errorMessage = "Access denied. Your account may not be approved.";
        } else if (err.message.includes("pending") || err.message.includes("approval")) {
          errorMessage = "Your account is pending admin approval. You will be notified when approved.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-premium">
      <PublicNav />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="card-premium max-w-md w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-ai opacity-30"></div>
          <div className="relative">
            <h1 className="text-title mb-6 text-center text-gray-900">Login</h1>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-premium"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password-input"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-premium pr-12"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                id="login-button"
                type="submit"
                disabled={loading}
                className="btn-premium w-full"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 link-premium"
              >
                Forgot password?
              </Link>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 link-premium font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
