"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/lib/api-admin";
import Link from "next/link";
import LeadDetailModal from "@/components/leads/LeadDetailModal";

interface Lead {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  platform: string | null;
  status: string;
  score?: number | null;
  quality?: string | null;
  notes?: string | null;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [platformFilter, setPlatformFilter] = useState<string>("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string with filters
      const params = new URLSearchParams();
      params.append("limit", "100");
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (platformFilter) params.append("platform", platformFilter);
      
      const data = await adminGet(`/admin/leads?${params.toString()}`);
      
      // Handle different response formats
      if (data && data.leads && Array.isArray(data.leads)) {
        setLeads(data.leads);
      } else if (Array.isArray(data)) {
        setLeads(data);
      } else if (data && typeof data === 'object') {
        // Try to extract leads from nested structure
        const leadsArray = data.data?.leads || data.results?.leads || [];
        setLeads(Array.isArray(leadsArray) ? leadsArray : []);
      } else {
        setLeads([]);
      }
    } catch (err: any) {
      console.error("Failed to load leads:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Authentication failed. Redirecting to login...");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
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
  }, [search, statusFilter, platformFilter]);

  function getScoreColor(score: number | null | undefined): string {
    if (!score) return "text-gray-400";
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  }

  function getScoreBadge(score: number | null | undefined): string {
    if (!score) return "bg-gray-500/20 text-gray-400";
    if (score >= 80) return "bg-green-500/20 text-green-400";
    if (score >= 60) return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] p-8">
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
      <div className="min-h-screen bg-[#0A1628] p-8">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">Manage Leads</h1>
              <p className="text-gray-300">View all leads in the system</p>
            </div>
            <div className="flex gap-2">
              <a
                href="/api/admin/leads/export/csv"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                📥 Export CSV
              </a>
              <a
                href="/api/admin/leads/export/excel"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📊 Export Excel
              </a>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#111827] rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 bg-[#0A1628] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-[#0A1628] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="CONVERTED">Converted</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full px-4 py-2 bg-[#0A1628] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Platforms</option>
                <option value="META">Meta</option>
                <option value="GOOGLE">Google</option>
                <option value="TIKTOK">TikTok</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#111827] rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#0A1628]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-400">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-[#0A1628] cursor-pointer"
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowModal(true);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {lead.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lead.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lead.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lead.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lead.platform || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {lead.score !== null && lead.score !== undefined ? (
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getScoreBadge(lead.score)}`}>
                          {lead.score}/100
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          lead.status === "NEW"
                            ? "bg-blue-500/20 text-blue-400"
                            : lead.status === "CONTACTED"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : lead.status === "QUALIFIED"
                                ? "bg-green-500/20 text-green-400"
                                : lead.status === "CONVERTED"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Lead Detail Modal */}
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
            isAdmin={true}
          />
        )}
      </div>
    </div>
  );
}
