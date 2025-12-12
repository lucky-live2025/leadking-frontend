"use client";

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://lead-king-backend-production.up.railway.app";

// Create global axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  // REMOVED withCredentials: true - this was causing Basic auth to be sent instead of Bearer
  // withCredentials: true,
});

// Request interceptor - Add auth token (SINGLE SOURCE OF TRUTH)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      
      // CRITICAL: ALWAYS remove any existing Authorization header first
      // This prevents browser from adding Basic auth automatically
      if (config.headers) {
        delete config.headers.Authorization;
        delete config.headers.authorization;
        // Also remove from common property names
        delete (config.headers as any).Authorization;
        delete (config.headers as any).authorization;
      }
      
      // Remove auth config if present (this can trigger Basic auth)
      if ((config as any).auth) {
        delete (config as any).auth;
      }
      
      // Always set Authorization if token exists (unless explicitly disabled)
      // Don't check for auth: false here - let the caller control via options
      if (token && config.headers) {
        // Ensure we always use "Bearer " prefix (never Basic!)
        const authValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        
        // Set Authorization header directly with explicit Bearer prefix
        config.headers.Authorization = authValue;
        
        // Verify it was set correctly
        const setValue = config.headers.Authorization || (config.headers as any).authorization;
        if (!setValue || !setValue.startsWith('Bearer ')) {
          console.error('[API Interceptor] FAILED to set Bearer token correctly!', {
            setValue: setValue?.substring(0, 20),
            hasHeaders: !!config.headers,
          });
        }
        
        console.log('[API Interceptor] Authorization header set:', {
          hasToken: !!token,
          tokenLength: token.length,
          tokenPrefix: token.substring(0, 30) + '...',
          headerValue: authValue.substring(0, 40) + '...',
          url: config.url,
          headerType: 'Bearer',
          verified: setValue?.startsWith('Bearer ') || false,
        });
      } else if (!token) {
        // Only warn for protected routes
        const isProtectedRoute = config.url && 
          !config.url.includes('/login') && 
          !config.url.includes('/register') &&
          !config.url.includes('/health');
        
        if (isProtectedRoute) {
          console.warn('[API Interceptor] No token found for protected route:', config.url);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh and errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Only clear and redirect if we're not on the login page
      // This prevents redirect loops and allows login to complete
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        
        // Don't redirect if we're already on login or signup pages
        // Also don't redirect if this is a /auth/me call (let UserLayout handle it)
        const isAuthMe = originalRequest.url?.includes('/auth/me');
        
        if (currentPath !== "/login" && currentPath !== "/signup" && !isAuthMe) {
          console.warn("[API Interceptor] 401 error, clearing token and redirecting");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          
          // Use a small delay to prevent race conditions
          setTimeout(() => {
            if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
              window.location.href = "/login";
            }
          }, 100);
        } else if (isAuthMe) {
          // For /auth/me, just clear token but don't redirect
          // Let UserLayout handle the redirect
          console.warn("[API Interceptor] 401 on /auth/me, clearing token (UserLayout will handle redirect)");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

function buildUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return API_BASE + path;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

function getHeaders(options: any = {}): any {
  const headers: any = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  // DON'T set Authorization here - let the interceptor handle it
  // This prevents conflicts and ensures consistent "Bearer " prefix
  // The interceptor will add Authorization header automatically for all requests

  return headers;
}

export async function apiGet(path: string, options: any = {}) {
  try {
    // Get base headers (interceptor will add Authorization automatically)
    const headers = getHeaders(options);
    
    const response = await apiClient.get(buildUrl(path), {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || error.response.statusText || `HTTP ${error.response.status}`);
    }
    throw error;
  }
}

export async function apiPost(path: string, data: any = {}, options: any = {}) {
  try {
    const response = await apiClient.post(buildUrl(path), data, {
      ...options,
      headers: getHeaders(options),
    });
    return response.data;
  } catch (error: any) {
    // Handle network errors
    if (!error.response) {
      const errorMessage = error.message || 'Network error. Please check your connection.';
      throw new Error(errorMessage);
    }
    // Handle HTTP errors - preserve full error object for better error handling
    const errorData = error.response.data;
    
    // If error data is a string (JSON stringified), try to parse it
    if (typeof errorData === 'string') {
      try {
        const parsed = JSON.parse(errorData);
        // Re-throw with full error object including response
        const enhancedError: any = new Error(parsed.message || errorData);
        enhancedError.response = error.response;
        enhancedError.response.data = parsed;
        throw enhancedError;
      } catch {
        // Not JSON, continue with string
      }
    }
    
    // Re-throw with full error object for better error handling
    const enhancedError: any = new Error(errorData?.message || error.response.statusText || `HTTP ${error.response.status}`);
    enhancedError.response = error.response;
    throw enhancedError;
  }
}

export async function apiPut(path: string, data: any = {}, options: any = {}) {
  try {
    const response = await apiClient.put(buildUrl(path), data, {
      ...options,
      headers: getHeaders(options),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || error.response.statusText || `HTTP ${error.response.status}`);
    }
    throw error;
  }
}

export async function apiPatch(path: string, data: any = {}, options: any = {}) {
  try {
    const response = await apiClient.patch(buildUrl(path), data, {
      ...options,
      headers: getHeaders(options),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || error.response.statusText || `HTTP ${error.response.status}`);
    }
    throw error;
  }
}

export async function apiDelete(path: string, options: any = {}) {
  try {
    const response = await apiClient.delete(buildUrl(path), {
      ...options,
      headers: getHeaders(options),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || error.response.statusText || `HTTP ${error.response.status}`);
    }
    throw error;
  }
}

export { apiClient };
