"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";
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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet("/admin/users", { auth: true });
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
      setError(err.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId: number, newStatus: string) => {
    try {
      if (newStatus === "APPROVED") {
        await apiPost(`/admin/users/${userId}/approve`, {}, { auth: true });
      } else {
        await apiPost(`/admin/users/${userId}/status`, { status: newStatus }, { auth: true });
      }
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to update user status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.status === "PENDING" && (
                        <button
                          onClick={() => handleUpdateStatus(user.id, "APPROVED")}
                          className="text-blue-400 hover:text-blue-300 mr-2"
                        >
                          Approve
                        </button>
                      )}
                      {user.status !== "SUSPENDED" && (
                        <button
                          onClick={() => handleUpdateStatus(user.id, "SUSPENDED")}
                          className="text-red-400 hover:text-red-300"
                        >
                          Suspend
                        </button>
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
