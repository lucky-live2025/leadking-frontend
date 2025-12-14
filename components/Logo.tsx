"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ 
  href = "/", 
  className = "", 
  showText = true,
  size = "md" 
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const logoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo-icon.svg"
        alt="LeadKing Logo"
        width={size === "sm" ? 24 : size === "md" ? 32 : 48}
        height={size === "sm" ? 24 : size === "md" ? 32 : 48}
        className={sizeClasses[size]}
        priority
      />
      {showText && (
        <span className={`font-bold text-gray-900 tracking-tight ${textSizes[size]}`}>
          LeadKing
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

