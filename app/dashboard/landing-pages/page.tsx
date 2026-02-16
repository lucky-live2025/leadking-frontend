"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import Link from "next/link";
import { ExternalLink, Plus, FileText } from "lucide-react";
import { TableSkeleton } from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";

interface LandingPage {
  id: number;
  businessName?: string;
  productName?: string;
  url?: string;
  createdAt: string;
}

export default function LandingPagesPage() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLandingPages();
  }, []);

  async function loadLandingPages() {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet("/landing");
      setLandingPages(Array.isArray(data) ? data : data?.landingPages || []);
    } catch (err: any) {
      console.error("Failed to load landing pages:", err);
      setError(err.message || "Failed to load landing pages");
      setLandingPages([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <TableSkeleton />
      </div>
    );
  }

  if (error && landingPages.length === 0) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Landing Pages</h1>
          <p className="text-gray-600">
            Manage your landing pages ({landingPages.length} total)
          </p>
        </div>
        <Link
          href="/dashboard/campaigns/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center gap-2 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Create New Landing Page
        </Link>
      </div>

      {landingPages.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Landing Pages Yet"
          description="Create your first landing page to start capturing leads"
          action={{
            label: "Create Landing Page",
            href: "/dashboard/campaigns/create",
            onClick: () => {},
          }}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {landingPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {page.businessName || page.productName || `Landing Page #${page.id}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={page.url || `/landing/${page.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      {page.url || `/landing/${page.id}`}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(page.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href={page.url || `/landing/${page.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
