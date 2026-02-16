"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { fetchUser } from "@/lib/auth-check";
import { Facebook, Music, Search, CheckCircle2, XCircle, ExternalLink } from "lucide-react";

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
        { id: "META", name: "Meta (Facebook & Instagram)", icon: Facebook, color: "blue" },
        { id: "TIKTOK", name: "TikTok Ads", icon: Music, color: "black" },
        { id: "GOOGLE", name: "Google Ads", icon: Search, color: "green" },
      ];

      const connectionsData = platforms.map((platform) => {
        const token = Array.isArray(tokens) 
          ? tokens.find((t: any) => t.platform === platform.id)
          : null;

        return {
          platform: platform.id,
          name: platform.name,
          IconComponent: platform.icon,
          color: platform.color,
          connected: !!token,
          accountId: token?.accountId || null,
          connectedAt: token?.createdAt || null,
        };
      });

      setConnections(connectionsData);
    } catch (err: any) {
      console.error("Failed to load connections:", err);
      const msg = err?.message || "";
      if (msg.includes("401") || msg.toLowerCase().includes("unauthorized") || msg.toLowerCase().includes("authentication required")) {
        setError("Please log in again to view integrations.");
        setTimeout(() => { window.location.href = "/login"; }, 2000);
      } else {
        setError(msg || "Could not load platform connections. Please try again or contact support.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect(platform: string) {
    try {
      setError(null);
      // Get OAuth URL from backend (authenticated request)
      const response = await apiGet(`/auth/${platform.toLowerCase()}/login-url`);
      
      // Check if OAuth is not configured on server
      if (response.error && response.requiresConfiguration) {
        setError(`${response.message} ${response.instructions || ""}`.trim());
        return;
      }
      
      const authUrl = response.authUrl;
      
      if (authUrl) {
        // Redirect to OAuth provider
        window.location.href = authUrl;
      } else {
        setError(`Could not start ${platform} connection. Please try again or contact support.`);
      }
    } catch (err: any) {
      console.error(`Failed to connect ${platform}:`, err);
      const msg = err?.message || "";
      if (msg.includes("401") || msg.toLowerCase().includes("unauthorized") || msg.toLowerCase().includes("authentication required")) {
        setError("Please log in again, then try connecting again.");
        setTimeout(() => { window.location.href = "/login"; }, 2000);
      } else if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
        setError("Integration service could not be reached. Please try again or contact support.");
      } else {
        setError(msg ? `Could not start ${platform} connection: ${msg} If this persists, contact support.` : `Could not start ${platform} connection. Please try again or contact support.`);
      }
    }
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
          Connect your advertising accounts to start creating campaigns and receiving leads. Connect Meta, TikTok, or Google to access all 8 campaign platforms (Meta Facebook, Meta Instagram, Google Search, Google Display, YouTube, LinkedIn, TikTok, and Email).
        </p>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-800 p-6 rounded-xl mb-6 shadow-md">
            <div className="flex items-start gap-3">
              <span className="text-2xl">❌</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">OAuth Connection Error</h3>
                <p className="mb-3">{error}</p>
                {error.includes('not configured') || error.includes('META_CLIENT_ID') || error.includes('GOOGLE_CLIENT_ID') ? (
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">🔧 How to Fix:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>OAuth credentials are missing on the server</li>
                      <li>Contact your administrator to add the required credentials</li>
                      <li>For Meta: META_APP_ID and META_APP_SECRET are needed</li>
                      <li>For Google: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are needed</li>
                    </ol>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((conn: any) => (
            <div
              key={conn.platform}
              className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all duration-200 hover:shadow-lg ${
                conn.connected ? "border-green-300" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    conn.connected 
                      ? "bg-green-100" 
                      : conn.color === "blue" 
                        ? "bg-blue-100" 
                        : conn.color === "black"
                        ? "bg-gray-100"
                        : "bg-green-100"
                  }`}>
                    {conn.IconComponent && (
                      <conn.IconComponent className={`h-6 w-6 ${
                        conn.connected
                          ? "text-green-600"
                          : conn.color === "blue"
                            ? "text-blue-600"
                            : conn.color === "black"
                            ? "text-gray-700"
                            : "text-green-600"
                      }`} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{conn.name}</h3>
                    {conn.connected ? (
                      <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <XCircle className="h-4 w-4" />
                        <span>Not connected</span>
                      </div>
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
                    className={`w-full px-4 py-2 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                      conn.platform === 'META' 
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg' 
                        : conn.platform === 'TIKTOK'
                        ? 'bg-gray-900 hover:bg-black shadow-md hover:shadow-lg'
                        : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Connect {conn.name}</span>
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

