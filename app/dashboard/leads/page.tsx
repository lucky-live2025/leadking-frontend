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
      const data = await apiGet("/leads");
      
      let leadsData: Lead[] = [];
      if (data && data.leads) {
        leadsData = data.leads;
      } else if (Array.isArray(data)) {
        leadsData = data;
      }
      
      setLeads(leadsData.map(lead => ({ ...lead, status: lead.status || 'NEW' })));
    } catch (err: any) {
      console.error("Failed to load leads:", err);
      setError(err.message || "Failed to load leads");
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading leads...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">My Leads</h1>
      
      {leads.length === 0 ? (
        <div className="rounded-lg p-8 text-center" style={{ backgroundColor: "#111827" }}>
          <p className="text-gray-300 text-lg">No leads found</p>
        </div>
      ) : (
        <LeadTable leads={leads} onRowClick={handleRowClick} />
      )}
    </div>
  );
}

