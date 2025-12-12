"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("[AUTH GUARD] Checking authentication...");
    
    // Read from localStorage (client-side only)
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    console.log("[AUTH GUARD] token:", token ? `${token.substring(0, 20)}...` : "null");
    console.log("[AUTH GUARD] user:", userStr || "null");
    
    if (!token) {
      console.log("[AUTH GUARD] ❌ No token found, redirecting to login");
      router.push("/login");
      return;
    }

    if (!userStr) {
      console.log("[AUTH GUARD] ❌ No user found, redirecting to login");
      router.push("/login");
      return;
    }

    let user;
    try {
      user = JSON.parse(userStr);
      console.log("[AUTH GUARD] role:", user?.role || "undefined");
    } catch (error) {
      console.error("[AUTH GUARD] ❌ Failed to parse user:", error);
      router.push("/login");
      return;
    }

    // Check if admin is required
    if (requireAdmin) {
      const role = user?.role?.toUpperCase();
      if (role !== "ADMIN" && role !== "admin") {
        console.log("[AUTH GUARD] ❌ User role is not ADMIN:", role);
        router.push("/login");
        return;
      }
      console.log("[AUTH GUARD] ✅ Admin access granted");
    }

    console.log("[AUTH GUARD] ✅ Authorized");
    setIsAuthorized(true);
    setIsChecking(false);
  }, [router, requireAdmin]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Redirect is happening
  }

  return <>{children}</>;
}

