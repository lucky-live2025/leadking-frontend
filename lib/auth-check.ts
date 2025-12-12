/**
 * Centralized authentication and pricing unlock logic
 */

export interface User {
  userId?: number;
  email?: string;
  role?: string;
  status?: string;
}

/**
 * Check if pricing is unlocked for a user
 * Pricing is unlocked only when user is logged in AND status is "APPROVED"
 */
export function isPricingUnlocked(user: User | null): boolean {
  if (!user) return false;
  return user.status?.toUpperCase() === "APPROVED";
}

/**
 * Get user from localStorage (client-side only)
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
 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

