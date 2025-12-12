"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { useRouter } from "next/navigation";
import LeadTable from "@/components/leads/LeadTable";

interface Lead {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  status: string;
  createdAt: string;
}

export default function DashboardLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      setLoading(true);
      setError(null);
      
      // Verify user is authenticated first
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Please log in to view leads");
        setLoading(false);
        return;
      }
      
      const data = await apiGet("/leads", { auth: true });
      
      let leadsData: Lead[] = [];
      if (data && data.leads) {
        leadsData = data.leads;
      } else if (Array.isArray(data)) {
        leadsData = data;
      }
      
      setLeads(leadsData.map(lead => ({ ...lead, status: lead.status || 'NEW' })));
    } catch (err: any) {
      console.error("Failed to load leads:", err);
      
      // Handle 401 errors specifically
      if (err.response?.status === 401 || err.message?.includes("401")) {
        setError("Please log in to view leads");
        // Don't redirect here - let UserLayout handle it
      } else {
        setError(err.message || "Failed to load leads");
      }
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  const handleRowClick = (lead: Lead) => {
    router.push(`/leads/${lead.id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading leads...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-red-900 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">My Leads</h1>
      
      {leads.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200">
          <p className="text-gray-600 text-lg">No leads found</p>
        </div>
      ) : (
        <LeadTable leads={leads} onRowClick={handleRowClick} />
      )}
    </div>
  );
}
