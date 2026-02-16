"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";
import { fetchUser } from "@/lib/auth-check";

interface CrmConfig {
  provider: 'aureoncrm' | 'hubspot' | 'salesforce' | 'zoho' | 'pipedrive' | 'custom';
  apiKey?: string;
  apiUrl?: string;
  webhookUrl?: string;
  enabled: boolean;
}

export default function CrmSettingsPage() {
  const [config, setConfig] = useState<CrmConfig>({
    provider: 'aureoncrm',
    enabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    try {
      setLoading(true);
      const data = await apiGet("/crm/config", { auth: true });
      if (data) {
        setConfig(data);
      }
    } catch (err: any) {
      console.error("Failed to load CRM config:", err);
    } finally {
      setLoading(false);
    }
  }

  async function saveConfig() {
    try {
      setSaving(true);
      setMessage(null);
      await apiPost("/crm/config", config, { auth: true });
      setMessage("✅ CRM configuration saved successfully!");
    } catch (err: any) {
      setMessage(`❌ Failed to save: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function testConnection() {
    try {
      setTesting(true);
      setTestResult(null);
      const result = await apiPost("/crm/test", config, { auth: true });
      setTestResult(result.success ? "✅ Connection successful!" : "❌ Connection failed");
    } catch (err: any) {
      setTestResult(`❌ Test failed: ${err.message}`);
    } finally {
      setTesting(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg text-gray-900">Loading CRM settings...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CRM Integration</h1>
        <p className="text-gray-600 mb-8">
          Automatically sync leads to your CRM system. Leads will be sent in real-time when captured.
        </p>

        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.includes('✅') ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 space-y-6">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Enable CRM Sync</h3>
              <p className="text-sm text-gray-600">Automatically send leads to your CRM</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* CRM Provider */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">CRM Provider</label>
            <select
              value={config.provider}
              onChange={(e) => setConfig({ ...config, provider: e.target.value as any })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="aureoncrm">AureonCRM</option>
              <option value="hubspot">HubSpot</option>
              <option value="salesforce">Salesforce</option>
              <option value="zoho">Zoho CRM</option>
              <option value="pipedrive">Pipedrive</option>
              <option value="custom">Custom Webhook</option>
            </select>
          </div>

          {/* API Key */}
          {config.provider !== 'custom' && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">API Key *</label>
              <input
                type="password"
                value={config.apiKey || ''}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your CRM API key"
              />
              <p className="text-xs text-gray-500 mt-1">
                {config.provider === 'aureoncrm' && 'Get your API key from AureonCRM Settings → API'}
                {config.provider === 'hubspot' && 'Get your API key from HubSpot Settings → Integrations → Private Apps'}
                {config.provider === 'salesforce' && 'Get your access token from Salesforce Setup → API'}
                {config.provider === 'zoho' && 'Get your OAuth token from Zoho Developer Console'}
                {config.provider === 'pipedrive' && 'Get your API token from Pipedrive Settings → Personal → API'}
              </p>
            </div>
          )}

          {/* API URL (for AureonCRM, Salesforce) */}
          {(config.provider === 'aureoncrm' || config.provider === 'salesforce') && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">API URL *</label>
              <input
                type="url"
                value={config.apiUrl || ''}
                onChange={(e) => setConfig({ ...config, apiUrl: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={config.provider === 'aureoncrm' ? 'https://your-account.aureoncrm.com' : 'https://your-instance.salesforce.com'}
              />
            </div>
          )}

          {/* Webhook URL (for Custom) */}
          {config.provider === 'custom' && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Webhook URL *</label>
              <input
                type="url"
                value={config.webhookUrl || ''}
                onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-crm.com/webhook/leads"
              />
              {config.apiKey && (
                <div className="mt-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Authorization Header (Optional)</label>
                  <input
                    type="password"
                    value={config.apiKey || ''}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bearer token or API key for webhook auth"
                  />
                </div>
              )}
            </div>
          )}

          {/* Test Connection */}
          <div className="flex gap-4">
            <button
              onClick={testConnection}
              disabled={testing || !config.enabled}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {testing ? "Testing..." : "Test Connection"}
            </button>
            <button
              onClick={saveConfig}
              disabled={saving}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving..." : "Save Configuration"}
            </button>
          </div>

          {testResult && (
            <div className={`p-4 rounded-xl ${
              testResult.includes('✅') ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {testResult}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-2">💡 How It Works</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Leads are automatically synced to your CRM when captured</li>
              <li>Sync happens in real-time (within seconds)</li>
              <li>All lead data (name, email, phone, location, score) is included</li>
              <li>Failed syncs are logged but don't block lead capture</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

