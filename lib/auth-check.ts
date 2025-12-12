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
    console.log("[fetchUser] No token found");
    return null;
  }

  fetchUserPromise = (async () => {
    try {
      console.log("[fetchUser] Fetching fresh user profile from backend...");
      const userData = await apiGet("/auth/me", { auth: true });
      
      // Validate response has required fields
      if (!userData || (!userData.id && !userData.userId)) {
        console.warn("[fetchUser] Invalid response from /auth/me:", userData);
        // Return cached user if available
        const cachedUser = getUserFromStorage();
        if (cachedUser) {
          console.warn("[fetchUser] Using cached user due to invalid response");
          return cachedUser;
        }
        return null;
      }
      
      // Map backend response to our User interface
      const user: User = {
        userId: userData.id || userData.userId,
        id: userData.id || userData.userId,
        email: userData.email || '',
        role: userData.role || 'USER',
        status: userData.status || 'PENDING', // Use actual status from backend
      };

      console.log("[fetchUser] Successfully fetched user:", {
        id: user.id,
        email: user.email,
        status: user.status,
        role: user.role
      });

      // Update localStorage with fresh user data
      localStorage.setItem("user", JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      console.error("[fetchUser] Failed to fetch user:", error);
      
      // Check if it's a 401 error (token invalid/expired)
      const is401 = error.message?.includes("401") || 
                   error.message?.includes("Unauthorized") ||
                   error.response?.status === 401;
      
      if (is401) {
        console.log("[fetchUser] 401 Unauthorized - token invalid or expired");
        // Only clear if we're sure it's a 401
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return null;
      }
      
      // For network errors or other issues, return cached user
      // This prevents redirect loops on temporary network issues
      const cachedUser = getUserFromStorage();
      if (cachedUser) {
        console.warn("[fetchUser] Using cached user data due to fetch error (non-401):", error.message);
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

