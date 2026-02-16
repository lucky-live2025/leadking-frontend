"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { useRouter } from "next/navigation";
import LeadTable from "@/components/leads/LeadTable";
import LeadDetailModal from "@/components/leads/LeadDetailModal";
import { Lead } from "@/types/lead";
import { Download, FileSpreadsheet, Search, Filter, Users } from "lucide-react";
import { TableSkeleton } from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";

export default function DashboardLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showModal, setShowModal] = useState(false);

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
      
      // Build query string with filters
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      
      const queryString = params.toString();
      const data = await apiGet(`/leads${queryString ? `?${queryString}` : ""}`, { auth: true });
      
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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadLeads();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, statusFilter]);

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Leads</h1>
          <p className="text-gray-600">Manage and track your leads</p>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h2 className="text-xl font-bold text-red-900 mb-2">Unable to Load Leads</h2>
              <p className="text-red-700 mb-4">{error}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setError(null);
                    setLoading(true);
                    loadLeads();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                {error.includes("log in") && (
                  <button
                    onClick={() => router.push("/login")}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Go to Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Leads</h1>
          <p className="text-gray-600">Manage and track your leads ({leads.length} total)</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/api/leads/export/csv"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center gap-2 font-semibold"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </a>
          <a
            href="/api/leads/export/excel"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center gap-2 font-semibold"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </a>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CONVERTED">Converted</option>
            </select>
          </div>
        </div>
      </div>
      
      {leads.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No leads found"
          description={search || statusFilter 
            ? "Try adjusting your filters to see more results." 
            : "Start creating campaigns to generate leads. Connect your advertising accounts and launch your first campaign."}
          action={!search && !statusFilter ? {
            label: "Create Campaign",
            onClick: () => router.push("/dashboard/campaigns/create")
          } : undefined}
        />
      ) : (
        <>
          <LeadTable leads={leads} onRowClick={handleRowClick} />
          {selectedLead && (
            <LeadDetailModal
              lead={selectedLead}
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
                setSelectedLead(null);
              }}
              onUpdate={() => {
                loadLeads();
              }}
              isAdmin={false}
            />
          )}
        </>
      )}
    </div>
  );
}
