"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublicHeader() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn) {
    return null; // Don't show public header if logged in
  }

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Lead King
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-gray-300 hover:text-white transition-colors ${
                pathname === "/" ? "text-white font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`text-gray-300 hover:text-white transition-colors ${
                pathname === "/pricing" ? "text-white font-semibold" : ""
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`text-gray-300 hover:text-white transition-colors ${
                pathname === "/about" ? "text-white font-semibold" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/rules"
              className={`text-gray-300 hover:text-white transition-colors ${
                pathname === "/rules" ? "text-white font-semibold" : ""
              }`}
            >
              Rules
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

