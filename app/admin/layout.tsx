"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    console.log("[AUTH GUARD] ========== ADMIN LAYOUT CHECK ==========");
    console.log("[AUTH GUARD] Path:", pathname);

    // Read from localStorage (client-side only)
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    console.log(
      "[AUTH GUARD] token:",
      token ? `${token.substring(0, 20)}...` : "null",
    );
    console.log("[AUTH GUARD] user:", userStr || "null");

    if (!token) {
      console.log("[AUTH GUARD] ❌ No token found, redirecting to login");
      router.push("/login");
      setIsChecking(false);
      return;
    }

    if (!userStr) {
      console.log("[AUTH GUARD] ❌ No user found, redirecting to login");
      router.push("/login");
      setIsChecking(false);
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(userStr);
      console.log("[AUTH GUARD] role:", parsedUser?.role || "undefined");
      setUser(parsedUser);
    } catch (error) {
      console.error("[AUTH GUARD] ❌ Failed to parse user:", error);
      router.push("/login");
      setIsChecking(false);
      return;
    }

    // Check if user is admin (handle both ADMIN and admin)
    const role = parsedUser?.role?.toUpperCase();
    console.log("[AUTH GUARD] role (normalized):", role);

    if (role !== "ADMIN") {
      console.log("[AUTH GUARD] ❌ User is not admin, role:", role);
      router.push("/login");
      setIsChecking(false);
      return;
    }

    console.log("[AUTH GUARD] ✅ Admin access granted");
    setIsAuthorized(true);
    setIsChecking(false);
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-2">Checking authentication...</div>
          <div className="text-sm text-gray-400">Verifying admin access</div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Redirect is happening
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Admin Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-2xl font-bold text-white">
              LeadKing Admin
            </Link>
            <nav className="flex gap-4">
              <Link href="/admin" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-300 hover:text-white"
              >
                Users
              </Link>
              <Link
                href="/admin/payments"
                className="text-gray-300 hover:text-white"
              >
                Payments
              </Link>
              <Link
                href="/admin/leads"
                className="text-gray-300 hover:text-white"
              >
                Leads
              </Link>
              <Link
                href="/admin/ultra-campaigns"
                className="text-gray-300 hover:text-white"
              >
                Ultra Campaigns
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-300 text-sm">{user.email}</span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
