"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

export default function SubscriptionGuard({ children }: SubscriptionGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  // Public routes that don't require subscription
  const publicRoutes = ['/login', '/signup', '/pricing', '/account'];
  const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    // Skip check for public routes
    if (isPublicRoute) {
      setAllowed(true);
      setChecking(false);
      return;
    }

    // Admin routes - allow access (admin has full visibility)
    if (isAdminRoute) {
      setAllowed(true);
      setChecking(false);
      return;
    }

    async function checkSubscription() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const { apiGet } = await import("@/lib/api");
        const userRes = await apiGet("/auth/me");

        const user = userRes;
        const subscriptionStatus = user?.subscriptionStatus || "INACTIVE";
        const userStatus = user?.status || "PENDING";

        // Check if user is approved
        if (userStatus !== "APPROVED") {
          router.push("/pricing?message=Your account is pending approval. Please wait for admin approval.");
          return;
        }

        // Check if subscription is active
        if (subscriptionStatus !== "ACTIVE") {
          router.push("/pricing?message=Your subscription is inactive. Please complete payment to continue.");
          return;
        }

        setAllowed(true);
      } catch (error: any) {
        if (error.message?.includes("401") || error.message?.includes("403") || error.message?.includes("Unauthorized")) {
          router.push("/login");
        } else if (error.message?.includes("429") || error.message?.includes("LIMIT_REACHED")) {
          // Show limit reached alert
          router.push(`/pricing?message=${encodeURIComponent(error.message || "Limit reached")}`);
        } else {
          console.error("Error checking subscription:", error);
          // Allow access on error (graceful degradation)
          setAllowed(true);
        }
      } finally {
        setChecking(false);
      }
    }

    checkSubscription();
  }, [router, pathname, isPublicRoute, isAdminRoute]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking subscription status...</p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return null; // Redirect is happening
  }

  return <>{children}</>;
}
