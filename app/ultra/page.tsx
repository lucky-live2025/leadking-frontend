"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the actual Ultra Campaign page
    router.replace("/ultra-campaign");
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-lg text-gray-900">Redirecting to Ultra Campaign...</div>
        </div>
      </div>
    </div>
  );
}
