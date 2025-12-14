"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function PublicNav() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          // Ignore
        }
      }

      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userStr) {
        try {
          const parsedUser = JSON.parse(userStr);
          if (parsedUser?.role?.toUpperCase() === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        } catch {
          router.push("/dashboard");
        }
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <header className={`navbar-premium ${scrolled ? "scrolled" : ""}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Logo href="/" size="md" />
        <nav className="flex gap-8 items-center">
          <Link href="/features" className="link-premium text-gray-700 hover:text-gray-900 font-medium">
            Features
          </Link>
          <Link href="/pricing" className="link-premium text-gray-700 hover:text-gray-900 font-medium">
            Pricing
          </Link>
          <Link href="/how-it-works" className="link-premium text-gray-700 hover:text-gray-900 font-medium">
            How It Works
          </Link>
          {user ? (
            <>
              <Link
                href={user.role?.toUpperCase() === "ADMIN" ? "/admin" : "/dashboard"}
                className="link-premium text-gray-700 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  router.push("/");
                }}
                className="btn-premium-outline text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="link-premium text-gray-700 hover:text-gray-900 font-medium">
                Login
              </Link>
              <Link href="/signup" className="btn-premium text-sm">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
