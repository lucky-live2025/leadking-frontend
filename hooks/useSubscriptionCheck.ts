"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";

export function useSubscriptionCheck() {
  const router = useRouter();
  const [subscriptionStatus, setSubscriptionStatus] = useState<"ACTIVE" | "INACTIVE" | "EXPIRED" | null>(null);
  const [userStatus, setUserStatus] = useState<"APPROVED" | "PENDING" | "REJECTED" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSubscription() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // Get user info with subscription
        const user = await apiGet("/auth/me");
        setUserStatus(user.status);
        setSubscriptionStatus(user.subscriptionStatus);

        // If user is not approved, redirect to login
        if (user.status !== "APPROVED") {
          alert("Your account is pending approval. Please wait for admin approval.");
          router.push("/login");
          return;
        }

        // If subscription is not active, redirect to pricing
        if (user.subscriptionStatus !== "ACTIVE") {
          router.push("/pricing");
          return;
        }
      } catch (error: any) {
        if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
          router.push("/login");
        } else {
          console.error("Error checking subscription:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();
  }, [router]);

  return { subscriptionStatus, userStatus, loading };
}

