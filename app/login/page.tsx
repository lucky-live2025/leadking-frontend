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

  // Handle URL parameters on mount (SECURITY: Never read password from URL)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // SECURITY: Immediately remove password from URL if present (do this FIRST, synchronously)
    const currentUrl = window.location.href;
    if (currentUrl.includes("password=") || currentUrl.includes("password%")) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("password");
        const cleanUrl = url.toString();
        window.history.replaceState({}, "", cleanUrl);
      } catch (err) {
        // Fallback: use string replacement if URL parsing fails
        const cleanUrl = currentUrl.split('&password=')[0].split('?password=')[0];
        if (cleanUrl !== currentUrl) {
          window.history.replaceState({}, "", cleanUrl);
        }
      }
    }
    
    // Now read email from cleaned URL (after password is removed)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlEmail = urlParams.get("email");
      if (urlEmail) {
        setEmail(decodeURIComponent(urlEmail));
      }
    } catch (err) {
      // Silently handle decode errors
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setError("");
    setLoading(true);

    // SECURITY: Clear any password from URL before submitting
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("password")) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("password");
        window.history.replaceState({}, "", newUrl.toString());
      }
    }

    const loginEmail = email.trim().toLowerCase();
    const loginPassword = password.trim(); // Trim password to remove accidental whitespace
    
    // Validate inputs
    if (!loginEmail || !loginPassword) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // Add explicit auth: false to skip auth token for login endpoint
      const response = await apiPost("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      }, { auth: false });

      // API may return { data: { accessToken, user } } or { accessToken, user } directly
      const token = response.accessToken || response.access_token || response.data?.accessToken || response.data?.access_token;
      if (token) {
        // CRITICAL: Store token FIRST and verify it's stored
        localStorage.setItem("token", token);
        
          // Verify token was stored
        const storedToken = localStorage.getItem("token");
        if (!storedToken || storedToken !== token) {
          setError("Failed to save authentication token. Please try again.");
          setLoading(false);
          return;
        }
        
        const userData = response.user || response.data?.user || {};
        // Normalize role to uppercase for consistent checking
        const rawRole = userData.role || response.role || "USER";
        const normalizedRole = typeof rawRole === 'string' ? rawRole.toUpperCase() : "USER";
        
        const user = {
          userId: userData.id || response.userId,
          id: userData.id || response.userId,
          email: userData.email || loginEmail,
          role: normalizedRole, // Store as uppercase for consistent checking
          status: userData.status || response.status || "PENDING", // CRITICAL: Store status
        };
        localStorage.setItem("user", JSON.stringify(user));

        // Ensure localStorage is written and token is available before redirect
        // Use window.location for a hard redirect to prevent race conditions
        // Increased delay to ensure localStorage is fully persisted
        await new Promise(resolve => setTimeout(resolve, 300));

        // Double-check token is still there before redirect
        const finalTokenCheck = localStorage.getItem("token");
        const finalUserCheck = localStorage.getItem("user");
        if (!finalTokenCheck || !finalUserCheck) {
          setError("Authentication error. Please try again.");
          setLoading(false);
          return;
        }

        // Redirect based on role using window.location for reliability
        if (normalizedRole === "ADMIN") {
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

            <div className="space-y-5">
              <div>
                <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    e.stopPropagation();
                    setEmail(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  className="input-premium"
                  placeholder="you@example.com"
                  disabled={loading}
                  autoComplete="email"
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
                    onChange={(e) => {
                      e.stopPropagation();
                      setPassword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !loading) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    className="input-premium pr-12"
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPassword((prev) => !prev);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm z-50 cursor-pointer focus:outline-none pointer-events-auto"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                id="login-button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit(e);
                }}
                disabled={loading}
                className="btn-premium w-full"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

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
