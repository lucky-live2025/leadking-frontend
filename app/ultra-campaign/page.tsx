"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UltraCampaignPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to campaign creation with ULTRA mode
    router.replace("/dashboard/campaigns/create?mode=ultra");
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to ULTRA Campaign Builder...</p>
      </div>
    </div>
  );
}
