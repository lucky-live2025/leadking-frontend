"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/lib/api-admin";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    try {
      const data = await adminGet("/admin/payments");
      if (Array.isArray(data)) {
        setPayments(data);
      } else if (data?.payments) {
        setPayments(data.payments);
      } else {
        setPayments([]);
      }
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Authentication failed. Redirecting to login...");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } else {
        setError(err.message || "Failed to load payments");
      }
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading payments...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Payment Transactions</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-[#111827] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0A1628]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Wallet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">TX Hash</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-[#0A1628]">
                    <td className="px-6 py-4 text-white">{payment.user?.email || payment.email || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">{payment.walletAddress || payment.wallet || "N/A"}</td>
                    <td className="px-6 py-4 text-white">Tier {payment.tier || "N/A"}</td>
                    <td className="px-6 py-4 text-white">{payment.amount || 0} USDT</td>
                    <td className="px-6 py-4">
                      {payment.txHash ? (
                        <a
                          href={`https://etherscan.io/tx/${payment.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline font-mono text-sm"
                        >
                          {payment.txHash.substring(0, 10)}...
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        payment.status === "confirmed" || payment.status === "APPROVED"
                          ? "bg-green-500/20 text-green-200"
                          : "bg-yellow-500/20 text-yellow-200"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {payment.timestamp ? new Date(payment.timestamp).toLocaleDateString() : payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "N/A"}
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
