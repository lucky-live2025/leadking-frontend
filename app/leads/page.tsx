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
  state?: string;
  city?: string;
  zipCode?: string;
  platform?: string;
  status: string;
  score?: number;
  createdAt: string;
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 50,
    status: "",
    campaignId: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    loadLeads();
  }, [filters]);

  async function loadLeads() {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams();
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.campaignId) queryParams.append("campaignId", filters.campaignId);
      if (filters.country) queryParams.append("country", filters.country);
      if (filters.city) queryParams.append("city", filters.city);

      const data = await apiGet(`/leads?${queryParams.toString()}`);
      
      // Handle both array and paginated response
      let leadsData: Lead[] = [];
      if (data && data.leads) {
        leadsData = data.leads;
      } else if (Array.isArray(data)) {
        leadsData = data;
      }
      // Ensure all leads have a status field
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
        <div className="text-center text-white py-12">Loading leads...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Leads</h1>
        <p className="text-gray-300">Manage and view your leads</p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
            >
              <option value="">All</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Country</label>
            <input
              type="text"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              placeholder="Filter by country"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">City</label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              placeholder="Filter by city"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Campaign ID</label>
            <input
              type="text"
              value={filters.campaignId}
              onChange={(e) => setFilters({ ...filters, campaignId: e.target.value })}
              placeholder="Filter by campaign"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
            />
          </div>
        </div>
      </div>

      {/* Leads Table */}
      {leads.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">No leads found</p>
        </div>
      ) : (
        <LeadTable leads={leads} onRowClick={handleRowClick} />
      )}
    </div>
  );
}
