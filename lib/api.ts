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
  withCredentials: true,
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        // Log in production to debug auth issues
        console.log('[API Interceptor] Added Authorization header:', {
          hasToken: !!token,
          tokenLength: token.length,
          tokenPrefix: token.substring(0, 20) + '...',
          url: config.url,
        });
      } else if (!token && config.url && !config.url.includes('/login') && !config.url.includes('/register')) {
        console.warn('[API Interceptor] No token found for request:', config.url);
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

  // Always try to get token if auth is requested or if no explicit auth: false
  const shouldAuth = options.auth !== false;
  const token = getAuthToken();
  
  if (shouldAuth && token) {
    headers.Authorization = `Bearer ${token}`;
    // Log in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('[API] Adding Authorization header:', {
        hasToken: !!token,
        tokenPrefix: token.substring(0, 20) + '...',
        path: options.path || 'unknown',
      });
    }
  } else if (shouldAuth && !token) {
    console.warn('[API] Auth requested but no token found');
  }

  return headers;
}

export async function apiGet(path: string, options: any = {}) {
  try {
    // Merge headers - interceptor will also add Authorization, but getHeaders ensures it's there
    const customHeaders = getHeaders(options);
    const mergedHeaders = {
      ...customHeaders,
      ...(options.headers || {}),
    };
    
    const response = await apiClient.get(buildUrl(path), {
      ...options,
      headers: mergedHeaders,
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
