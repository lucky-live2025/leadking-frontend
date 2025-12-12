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
        if (currentPath !== "/login" && currentPath !== "/signup") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          
          // Use a small delay to prevent race conditions
          setTimeout(() => {
            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
          }, 100);
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
    const response = await apiClient.get(buildUrl(path), {
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
    // Handle HTTP errors
    const errorData = error.response.data;
    if (errorData?.message) {
      throw new Error(errorData.message);
    }
    throw new Error(error.response.statusText || `HTTP ${error.response.status}`);
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
