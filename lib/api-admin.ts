"use client";

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

// Get API base URL - should be just the domain (e.g., https://leadkingapp.com)
// We'll add /api in the path normalization
const API_BASE_RAW = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://leadkingapp.com/api";
// Remove /api suffix if present - we add it in path normalization
let API_BASE = API_BASE_RAW.replace(/\/api\/?$/, '');
// If it's still a full URL with path, extract just the origin
if (API_BASE.includes('://') && API_BASE.split('/').length > 3) {
  const url = new URL(API_BASE);
  API_BASE = `${url.protocol}//${url.host}`;
}

// Create admin-specific axios instance
export const adminApi: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - Add JWT token to every request
adminApi.interceptors.request.use(
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

// Response interceptor - Handle 401/403 errors and redirect to login
adminApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized or 403 Forbidden
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear invalid token
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Redirect to login if not already there
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Helper function to handle admin API errors
export function handleAdminError(error: any): never {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || error.response.statusText || `HTTP ${status}`;
    
    if (status === 401 || status === 403) {
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    throw new Error(message);
  }
  
  // Handle network errors (no response)
  if (error.request) {
    const message = error.message || "Network error. Please check your connection and ensure the backend is running.";
    throw new Error(message);
  }
  
  throw error;
}

// Backend wraps all responses as { success, data }. Unwrap so pages get the payload.
function unwrap(res: any): any {
  if (res && typeof res === "object" && "success" in res && res.success === true && "data" in res) {
    return res.data;
  }
  return res;
}

// Admin API methods
export async function adminGet(path: string, config?: any) {
  try {
    let normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (!normalizedPath.startsWith('/api/')) {
      normalizedPath = `/api${normalizedPath}`;
    }
    const response = await adminApi.get(normalizedPath, config);
    return unwrap(response.data);
  } catch (error) {
    handleAdminError(error);
  }
}

export async function adminPost(path: string, data?: any, config?: any) {
  try {
    let normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (!normalizedPath.startsWith('/api/')) {
      normalizedPath = `/api${normalizedPath}`;
    }
    const response = await adminApi.post(normalizedPath, data, config);
    return unwrap(response.data);
  } catch (error) {
    handleAdminError(error);
  }
}

export async function adminPut(path: string, data?: any, config?: any) {
  try {
    let normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (!normalizedPath.startsWith('/api/')) {
      normalizedPath = `/api${normalizedPath}`;
    }
    const response = await adminApi.put(normalizedPath, data, config);
    return unwrap(response.data);
  } catch (error) {
    handleAdminError(error);
  }
}

export async function adminPatch(path: string, data?: any, config?: any) {
  try {
    let normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (!normalizedPath.startsWith('/api/')) {
      normalizedPath = `/api${normalizedPath}`;
    }
    const response = await adminApi.patch(normalizedPath, data, config);
    return unwrap(response.data);
  } catch (error) {
    handleAdminError(error);
  }
}

export async function adminDelete(path: string, config?: any) {
  try {
    let normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (!normalizedPath.startsWith('/api/')) {
      normalizedPath = `/api${normalizedPath}`;
    }
    const response = await adminApi.delete(normalizedPath, config);
    return unwrap(response.data);
  } catch (error) {
    handleAdminError(error);
  }
}

