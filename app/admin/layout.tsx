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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-lg text-gray-900 mb-2">Checking authentication...</div>
          <div className="text-sm text-gray-600">Verifying admin access</div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Redirect is happening
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-2xl font-bold text-gray-900">
              LeadKing Admin
            </Link>
            <nav className="flex gap-6">
              <Link 
                href="/admin" 
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/admin" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/admin/users" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Users
              </Link>
              <Link
                href="/admin/payments"
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/admin/payments" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Payments
              </Link>
              <Link
                href="/admin/leads"
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/admin/leads" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Leads
              </Link>
              <Link
                href="/admin/ultra-campaigns"
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  pathname === "/admin/ultra-campaigns" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Ultra Campaigns
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
