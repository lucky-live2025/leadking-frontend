/**
 * Centralized authentication and pricing unlock logic
 */

import { apiGet } from "./api";

export interface User {
  userId?: number;
  id?: number;
  email?: string;
  role?: string;
  status?: string;
}

let fetchUserPromise: Promise<User | null> | null = null;

/**
 * Fetch fresh user data from backend and update localStorage
 * This ensures we always have the latest user status (e.g., after admin approval)
 */
export async function fetchUser(): Promise<User | null> {
  if (typeof window === "undefined") return null;

  // If there's already a fetch in progress, return that promise
  if (fetchUserPromise) {
    return fetchUserPromise;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  fetchUserPromise = (async () => {
    try {
      const userData = await apiGet("/auth/me", { auth: true });
      
      // Map backend response to our User interface
      const user: User = {
        userId: userData.id || userData.userId,
        id: userData.id || userData.userId,
        email: userData.email,
        role: userData.role,
        status: userData.status,
      };

      // Update localStorage with fresh user data
      localStorage.setItem("user", JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      console.error("Failed to fetch user:", error);
      
      // Only clear localStorage if it's a 401 (unauthorized) error
      // Don't clear on network errors or other issues
      if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return null;
      }
      
      // For other errors (network, etc.), return cached user from localStorage
      // This prevents immediate redirect on temporary network issues
      const cachedUser = getUserFromStorage();
      if (cachedUser) {
        console.warn("Using cached user data due to fetch error");
        return cachedUser;
      }
      
      return null;
    } finally {
      fetchUserPromise = null;
    }
  })();

  return fetchUserPromise;
}

/**
 * Check if pricing is unlocked for a user
 * Pricing is unlocked only when user is logged in AND status is "APPROVED"
 * This function will fetch fresh user data first if needed
 */
export async function isPricingUnlocked(user: User | null = null): Promise<boolean> {
  if (typeof window === "undefined") return false;

  // If no user provided, fetch fresh data
  if (!user) {
    user = await fetchUser();
  }

  if (!user) return false;
  return user.status?.toUpperCase() === "APPROVED";
}

/**
 * Get user from localStorage (client-side only)
 * Note: This returns cached data. Use fetchUser() for fresh data.
 */
export function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null;
  
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

/**
 * Check if user is logged in (has token)
 * This function will fetch fresh user data first to ensure status is up to date
 */
export async function isLoggedIn(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem("token");
  if (!token) return false;

  // Fetch fresh user data to ensure we have latest status
  const user = await fetchUser();
  return !!user;
}

