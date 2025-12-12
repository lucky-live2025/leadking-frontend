"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost } from "@/lib/api-admin";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  name: string | null;
  status: string;
  role: string;
  createdAt: string;
  subscription?: {
    planTier: string;
    status: string;
    plan?: {
      name: string;
      price: number;
    };
  };
  subscriptionStatus?: string;
}

interface WalletData {
  internal?: {
    id: number;
    balance_usd: number;
    balance_btc: number;
    balance_eth: number;
  };
  external?: {
    address: string;
    network: string;
    verified: boolean;
  };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingWallet, setEditingWallet] = useState<number | null>(null);
  const [walletData, setWalletData] = useState<Record<number, WalletData>>({});
  const [walletForm, setWalletForm] = useState({
    externalAddress: "",
    balance_usd: "",
    balance_btc: "",
    balance_eth: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminGet("/admin/users");
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data?.users) {
        setUsers(data.users);
      } else {
        setUsers([]);
        setError("Invalid response format");
      }
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Authentication failed. Redirecting to login...");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } else {
        setError(err.message || "Failed to fetch users");
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId: number, newStatus: string) => {
    try {
      if (newStatus === "APPROVED") {
        await adminPost(`/admin/users/${userId}/approve`, {});
      } else {
        await adminPost(`/admin/users/${userId}/status`, { status: newStatus });
      }
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to update user status:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } else {
        alert(`Failed to update status: ${err.message}`);
      }
    }
  };

  const loadUserWallet = async (userId: number) => {
    try {
      const data = await adminGet(`/wallet/admin/users/${userId}`);
      setWalletData(prev => ({ ...prev, [userId]: data }));
    } catch (err: any) {
      console.error("Failed to load wallet:", err);
    }
  };

  const handleEditWallet = async (userId: number) => {
    // Load wallet data if not already loaded
    if (!walletData[userId]) {
      await loadUserWallet(userId);
    }
    
    const wallet = walletData[userId];
    setWalletForm({
      externalAddress: wallet?.external?.address || "",
      balance_usd: wallet?.internal?.balance_usd?.toString() || "0",
      balance_btc: wallet?.internal?.balance_btc?.toString() || "0",
      balance_eth: wallet?.internal?.balance_eth?.toString() || "0",
    });
    setEditingWallet(userId);
  };

  const handleSaveWallet = async (userId: number) => {
    try {
      // Update external wallet if address provided
      if (walletForm.externalAddress.trim()) {
        await adminPatch(`/wallet/admin/users/${userId}/wallet/external`, {
          walletAddress: walletForm.externalAddress.trim(),
        });
      }

      // Update internal wallet balances
      await adminPatch(`/wallet/admin/users/${userId}/wallet/internal`, {
        balance_usd: parseFloat(walletForm.balance_usd) || 0,
        balance_btc: parseFloat(walletForm.balance_btc) || 0,
        balance_eth: parseFloat(walletForm.balance_eth) || 0,
      });

      // Reload wallet data
      await loadUserWallet(userId);
      setEditingWallet(null);
      alert("Wallet updated successfully!");
    } catch (err: any) {
      console.error("Failed to update wallet:", err);
      alert(`Failed to update wallet: ${err.message || err.response?.data?.message || "Unknown error"}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingWallet(null);
    setWalletForm({
      externalAddress: "",
      balance_usd: "",
      balance_btc: "",
      balance_eth: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading users...</div>
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
          <h1 className="text-3xl font-bold mb-2 text-white">Manage Users</h1>
          <p className="text-gray-300">View and manage all users</p>
        </div>
        <div className="bg-[#111827] rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#0A1628]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Wallet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#0A1628]">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.subscription?.planTier ||
                        user.subscriptionStatus ||
                        "N/A"}
                      {user.subscription?.plan && (
                        <span className="ml-2 text-xs text-gray-400">
                          (${user.subscription.plan.price}/mo)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "APPROVED"
                            ? "bg-green-500/20 text-green-400"
                            : user.status === "PENDING"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {editingWallet === user.id ? (
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs text-gray-400">External Address</label>
                            <input
                              type="text"
                              value={walletForm.externalAddress}
                              onChange={(e) => setWalletForm(prev => ({ ...prev, externalAddress: e.target.value }))}
                              className="w-full px-2 py-1 bg-[#0A1628] border border-gray-600 rounded text-white text-xs"
                              placeholder="0x..."
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            <div>
                              <label className="text-xs text-gray-400">USD</label>
                              <input
                                type="number"
                                step="0.01"
                                value={walletForm.balance_usd}
                                onChange={(e) => setWalletForm(prev => ({ ...prev, balance_usd: e.target.value }))}
                                className="w-full px-2 py-1 bg-[#0A1628] border border-gray-600 rounded text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400">BTC</label>
                              <input
                                type="number"
                                step="0.00000001"
                                value={walletForm.balance_btc}
                                onChange={(e) => setWalletForm(prev => ({ ...prev, balance_btc: e.target.value }))}
                                className="w-full px-2 py-1 bg-[#0A1628] border border-gray-600 rounded text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400">ETH</label>
                              <input
                                type="number"
                                step="0.000001"
                                value={walletForm.balance_eth}
                                onChange={(e) => setWalletForm(prev => ({ ...prev, balance_eth: e.target.value }))}
                                className="w-full px-2 py-1 bg-[#0A1628] border border-gray-600 rounded text-white text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleSaveWallet(user.id)}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {walletData[user.id] ? (
                            <div className="text-xs space-y-1">
                              {walletData[user.id].external && (
                                <div className="text-gray-400">
                                  Ext: {walletData[user.id].external?.address?.substring(0, 10)}...
                                </div>
                              )}
                              {walletData[user.id].internal && (
                                <div className="text-gray-400">
                                  USD: ${walletData[user.id].internal?.balance_usd?.toFixed(2) || "0.00"}
                                </div>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditWallet(user.id)}
                              className="text-blue-400 hover:text-blue-300 text-xs"
                            >
                              Edit Wallet
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingWallet !== user.id && (
                        <>
                          <button
                            onClick={() => handleEditWallet(user.id)}
                            className="text-purple-400 hover:text-purple-300 mr-2 text-xs"
                          >
                            Wallet
                          </button>
                          {user.status === "PENDING" && (
                            <button
                              onClick={() => handleUpdateStatus(user.id, "APPROVED")}
                              className="text-blue-400 hover:text-blue-300 mr-2 text-xs"
                            >
                              Approve
                            </button>
                          )}
                          {user.status !== "SUSPENDED" && (
                            <button
                              onClick={() => handleUpdateStatus(user.id, "SUSPENDED")}
                              className="text-red-400 hover:text-red-300 text-xs"
                            >
                              Suspend
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
