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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A1628" }}>
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <header style={{ backgroundColor: "#111827", borderBottom: "1px solid #1f2937" }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-2xl font-bold text-white">
              Lead King
            </Link>
            <nav className="flex gap-4">
              <Link 
                href="/dashboard" 
                className={`text-gray-300 hover:text-white ${pathname === "/dashboard" ? "text-white font-semibold" : ""}`}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/leads" 
                className={`text-gray-300 hover:text-white ${pathname === "/dashboard/leads" ? "text-white font-semibold" : ""}`}
              >
                Leads
              </Link>
              <Link 
                href="/dashboard/campaigns" 
                className={`text-gray-300 hover:text-white ${pathname === "/dashboard/campaigns" ? "text-white font-semibold" : ""}`}
              >
                Campaigns
              </Link>
              <Link 
                href="/dashboard/billing" 
                className={`text-gray-300 hover:text-white ${pathname === "/dashboard/billing" ? "text-white font-semibold" : ""}`}
              >
                Billing
              </Link>
              <Link 
                href="/dashboard/profile" 
                className={`text-gray-300 hover:text-white ${pathname === "/dashboard/profile" ? "text-white font-semibold" : ""}`}
              >
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-300 text-sm">{user.email}</span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: "#ef4444" }}
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

