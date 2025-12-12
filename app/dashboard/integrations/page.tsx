"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { fetchUser } from "@/lib/auth-check";

interface PlatformConnection {
  platform: string;
  connected: boolean;
  accountId?: string;
  connectedAt?: string;
}

export default function IntegrationsPage() {
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadConnections();
  }, []);

  async function loadConnections() {
    try {
      setLoading(true);
      setError(null);

      // Get user first
      const userData = await fetchUser();
      setUser(userData);

      if (!userData) {
        setError("Please log in to view integrations");
        setLoading(false);
        return;
      }

      // Get platform connections (endpoint uses JWT token, no userId needed)
      const tokens = await apiGet("/auth/platform-tokens");

      const platforms = [
        { id: "META", name: "Meta (Facebook & Instagram)", icon: "📘", color: "blue" },
        { id: "TIKTOK", name: "TikTok Ads", icon: "🎵", color: "black" },
        { id: "GOOGLE", name: "Google Ads", icon: "🔍", color: "green" },
        { id: "YANDEX", name: "Yandex Direct", icon: "🔷", color: "yellow" },
      ];

      const connectionsData = platforms.map((platform) => {
        const token = Array.isArray(tokens) 
          ? tokens.find((t: any) => t.platform === platform.id)
          : null;

        return {
          platform: platform.id,
          name: platform.name,
          icon: platform.icon,
          color: platform.color,
          connected: !!token,
          accountId: token?.accountId || null,
          connectedAt: token?.createdAt || null,
        };
      });

      setConnections(connectionsData);
    } catch (err: any) {
      console.error("Failed to load connections:", err);
      setError(err.message || "Failed to load platform connections");
    } finally {
      setLoading(false);
    }
  }

  function handleConnect(platform: string) {
    // Redirect to backend OAuth endpoint (backend will get userId from JWT token)
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://lead-king-backend-production.up.railway.app";
    window.location.href = `${backendUrl}/auth/${platform.toLowerCase()}/login`;
  }

  async function handleDisconnect(platform: string) {
    try {
      await apiGet(`/auth/platform-tokens/disconnect?platform=${platform}`);
      await loadConnections();
    } catch (err: any) {
      setError(err.message || "Failed to disconnect");
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Platform Integrations</h1>
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            <p className="text-gray-600">Loading connections...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Platform Integrations</h1>
        <p className="text-gray-600 mb-8">
          Connect your advertising accounts to start creating campaigns and receiving leads.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 shadow-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((conn: any) => (
            <div
              key={conn.platform}
              className={`bg-white rounded-xl p-6 shadow-md border-2 ${
                conn.connected ? "border-green-300" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{conn.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{conn.name}</h3>
                    {conn.connected ? (
                      <p className="text-sm text-green-600 font-medium">✓ Connected</p>
                    ) : (
                      <p className="text-sm text-gray-500">Not connected</p>
                    )}
                  </div>
                </div>
              </div>

              {conn.connected ? (
                <div className="space-y-3">
                  {conn.accountId && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Account ID</p>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                        {conn.accountId.split("|")[0]}
                      </p>
                    </div>
                  )}
                  {conn.connectedAt && (
                    <p className="text-xs text-gray-500">
                      Connected: {new Date(conn.connectedAt).toLocaleDateString()}
                    </p>
                  )}
                  <button
                    onClick={() => handleDisconnect(conn.platform)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Connect your {conn.name} account to create campaigns and receive leads.
                  </p>
                  <button
                    onClick={() => handleConnect(conn.platform)}
                    className={`w-full px-4 py-2 bg-${conn.color}-600 text-white rounded-lg font-semibold hover:bg-${conn.color}-700 transition-colors`}
                  >
                    Connect {conn.name}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 How It Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Connect" on any platform you want to use</li>
            <li>You'll be redirected to authorize LeadKing</li>
            <li>Once connected, you can create campaigns on that platform</li>
            <li>Leads will automatically sync to your LeadKing dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

