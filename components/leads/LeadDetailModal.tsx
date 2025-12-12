"use client";

import { useState, useEffect } from "react";
import { countries, usStates } from "@/lib/countries";
import LocationAutocomplete from "@/components/LocationAutocomplete";

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

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdate?: (id: number, data: { notes?: string; status?: string; country?: string; state?: string; city?: string; zipCode?: string }) => Promise<void>;
  isAdmin?: boolean;
}

export default function LeadDetailModal({
  lead,
  onClose,
  onUpdate,
  isAdmin = false,
}: LeadDetailModalProps) {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes || "");
      setStatus(lead.status);
      setCountry(lead.country || "");
      setState(lead.state || "");
      setCity(lead.city || "");
      setZipCode(lead.zipCode || "");
    }
  }, [lead]);

  if (!lead) return null;

  async function handleSave() {
    if (!onUpdate || !lead) return;
    
    // Validate: if country is US, state is required
    if (country === 'United States' || country === 'USA' || country === 'US') {
      if (!state || state.length !== 2) {
        alert('State is required and must be a 2-letter code for United States');
        return;
      }
    }
    
    setSaving(true);
    try {
      await onUpdate(lead.id, { notes, status, country, state, city, zipCode });
      onClose();
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Failed to update lead");
    } finally {
      setSaving(false);
    }
  }

  const isUS = country === 'United States' || country === 'USA' || country === 'US';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Lead Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <div className="text-white">{lead.name || "—"}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <div className="text-white">{lead.email || "—"}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
              <div className="text-white">{lead.phone || "—"}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Platform</label>
              <div className="text-white">{lead.platform || "—"}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Source</label>
              <div className="text-white">{lead.source || "—"}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Campaign</label>
              <div className="text-white">{lead.campaign?.name || "—"}</div>
            </div>
            {isAdmin && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">User</label>
                <div className="text-white">{lead.user?.email || "—"}</div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Location (Google Places Autocomplete)
            </label>
            <LocationAutocomplete
              value={`${city ? city + ", " : ""}${state ? state + ", " : ""}${country || ""}`.trim()}
              onChange={(location) => {
                setCountry(location.country);
                setState(location.state);
                setCity(location.city);
                setZipCode(location.zipCode);
              }}
              placeholder="Start typing a location (e.g., Los Angeles, CA, USA)"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Or fill manually below
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                if (e.target.value !== 'United States' && e.target.value !== 'USA' && e.target.value !== 'US') {
                  setState(''); // Clear state if not US
                }
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {isUS && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                State <span className="text-red-400">*</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              >
                <option value="">Select State</option>
                {usStates.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {country && !isUS && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">State/Province</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="State or Province"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              placeholder="City name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">ZIP/Postal Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              placeholder="ZIP or Postal Code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              placeholder="Add notes about this lead..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
