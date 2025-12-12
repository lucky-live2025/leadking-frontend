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
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    
    if (!token || !userStr) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
    } catch (error) {
      router.push("/login");
      return;
    }

    setIsChecking(false);
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
