"use client";

import { useState } from "react";

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
  source?: string;
  campaign?: { name: string };
  user?: { email: string };
  notes?: string;
  createdAt: string;
}

interface LeadTableProps {
  leads: Lead[];
  onRowClick?: (lead: Lead) => void;
  sortable?: boolean;
}

export default function LeadTable({ leads, onRowClick, sortable = true }: LeadTableProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (!sortable) return;
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = (a as any)[sortField];
    const bVal = (b as any)[sortField];
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white"
              onClick={() => handleSort("id")}
            >
              ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white"
              onClick={() => handleSort("name")}
            >
              Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white"
              onClick={() => handleSort("email")}
            >
              Email {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Phone</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Country</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">State</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">City</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">ZIP</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Platform</th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white"
              onClick={() => handleSort("status")}
            >
              Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Campaign</th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white"
              onClick={() => handleSort("createdAt")}
            >
              Created {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-gray-800 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => onRowClick?.(lead)}
            >
              <td className="px-4 py-3 text-sm text-gray-300">{lead.id}</td>
              <td className="px-4 py-3 text-sm text-white">{lead.name || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.email || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.phone || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.country || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.state || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.city || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.zipCode || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.platform || "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead.status === "NEW"
                      ? "bg-blue-500/20 text-blue-300"
                      : lead.status === "CONTACTED"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : lead.status === "QUALIFIED"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-gray-500/20 text-gray-300"
                  }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-300">{lead.campaign?.name || "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-400">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

