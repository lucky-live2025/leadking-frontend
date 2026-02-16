"use client";

import { useState } from "react";
import { apiPatch } from "@/lib/api";
import { adminPatch } from "@/lib/api-admin";
import { Lead } from "@/types/lead";

interface LeadDetailModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  isAdmin?: boolean;
}

export default function LeadDetailModal({
  lead,
  isOpen,
  onClose,
  onUpdate,
  isAdmin = false,
}: LeadDetailModalProps) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [status, setStatus] = useState(lead.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSaveNotes() {
    setSaving(true);
    setError(null);
    try {
      if (isAdmin) {
        await adminPatch(`/admin/leads/${lead.id}/notes`, { notes });
      } else {
        await apiPatch(`/leads/${lead.id}/notes`, { notes }, { auth: true });
      }
      onUpdate();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save notes");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateStatus() {
    setSaving(true);
    setError(null);
    try {
      if (isAdmin) {
        await adminPatch(`/admin/leads/${lead.id}/status`, { status });
      } else {
        await apiPatch(`/leads/${lead.id}/status`, { status }, { auth: true });
      }
      onUpdate();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    } finally {
      setSaving(false);
    }
  }

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Lead Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{lead.name || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{lead.email || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{lead.phone || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <p className="text-gray-900">{lead.platform || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900">
                  {[lead.city, lead.state, lead.country].filter(Boolean).join(", ") || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quality Score</label>
                {lead.score !== null && lead.score !== undefined ? (
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getScoreBadge(lead.score)}`}>
                    {lead.score}/100
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm">N/A</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
                <p className="text-gray-900">{lead.campaign?.name || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                <p className="text-gray-900">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Status Update */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="CONVERTED">Converted</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={saving || status === lead.status}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Update Status"}
              </button>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add notes about this lead..."
              />
              <button
                onClick={handleSaveNotes}
                disabled={saving}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
