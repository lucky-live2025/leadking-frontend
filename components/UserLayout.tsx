"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      // Wait for window to be available
      if (typeof window === "undefined") {
        return;
      }

      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      
      // If no token or user, redirect immediately
      if (!token || !userStr) {
        setIsChecking(false);
        router.push("/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(userStr);
        // Set user immediately from cache to prevent redirect loops
        setUser(parsedUser);
        setIsChecking(false); // Allow page to render with cached user
        
        // Verify token in background (non-blocking)
        // Only redirect if we get a confirmed 401 error AND token was cleared
        try {
          const { fetchUser } = await import("@/lib/auth-check");
          const freshUser = await fetchUser();
          
          if (!freshUser) {
            // fetchUser returned null - check if token still exists
            const currentToken = localStorage.getItem("token");
            if (!currentToken) {
              // Token was cleared = confirmed 401, redirect
              console.warn("[UserLayout] Token invalid (401), redirecting to login");
              router.push("/login");
              return;
            }
            // Token exists but fetchUser failed - likely network issue, keep cached user
            console.warn("[UserLayout] fetchUser failed but token exists, using cached user");
            return;
          }
          
          // Update with fresh user data
          setUser(freshUser);
        } catch (err: any) {
          // Only redirect if it's a confirmed 401 error AND token was cleared
          const is401 = err?.message?.includes("401") || err?.response?.status === 401;
          const tokenStillExists = localStorage.getItem("token");
          
          if (is401 && !tokenStillExists) {
            // Confirmed 401 and token was cleared by interceptor
            console.warn("[UserLayout] 401 error confirmed, redirecting to login");
            router.push("/login");
            return;
          }
          
          // For network errors or unconfirmed 401s, keep using cached user
          // This prevents redirect loops on temporary network issues
          console.warn("[UserLayout] Network error or unconfirmed 401, using cached user:", err?.message);
        }
      } catch (error) {
        console.error("[UserLayout] Failed to parse user:", error);
        setIsChecking(false);
        router.push("/login");
        return;
      }
    }
    
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-900">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
              Lead King
            </Link>
            <nav className="flex gap-6">
              <Link 
                href="/dashboard" 
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/dashboard" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/leads" 
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/dashboard/leads" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Leads
              </Link>
              <Link 
                href="/dashboard/campaigns" 
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/dashboard/campaigns" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Campaigns
              </Link>
              <Link 
                href="/dashboard/billing" 
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/dashboard/billing" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Billing
              </Link>
              <Link 
                href="/dashboard/profile" 
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/dashboard/profile" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-600 text-sm">{user.email}</span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  );
}
