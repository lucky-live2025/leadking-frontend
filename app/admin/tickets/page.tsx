"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      const data = await apiGet("/support/admin/tickets", { auth: true });
      if (Array.isArray(data)) {
        setTickets(data);
      } else if (data?.tickets) {
        setTickets(data.tickets);
      } else {
        setTickets([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleReply() {
    if (!selectedTicket || !response) {
      setError("Please enter a response");
      return;
    }

    try {
      await apiPost(`/support/admin/tickets/${selectedTicket.id}/reply`, { adminResponse: response }, { auth: true });
      setResponse("");
      setSelectedTicket(null);
      await loadTickets();
    } catch (err: any) {
      setError(err.message || "Failed to reply");
    }
  }

  async function handleClose(ticketId: number) {
    try {
      await apiPost(`/support/admin/tickets/${ticketId}/close`, {}, { auth: true });
      await loadTickets();
    } catch (err: any) {
      setError(err.message || "Failed to close ticket");
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-200";
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-200";
      case "resolved":
        return "bg-green-500/20 text-green-200";
      case "closed":
        return "bg-gray-500/20 text-gray-200";
      default:
        return "bg-gray-500/20 text-gray-200";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <div className="text-lg text-white">Loading tickets...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Support Tickets</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[#111827] rounded-lg p-6 cursor-pointer hover:bg-[#0A1628]"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{ticket.user.email}</p>
                <p className="text-gray-300 text-sm line-clamp-2">{ticket.message}</p>
                {ticket.adminResponse && (
                  <p className="text-blue-300 text-sm mt-2">✓ Replied</p>
                )}
              </div>
            ))}
          </div>

          {selectedTicket && (
            <div className="bg-[#111827] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">{selectedTicket.subject}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">From: {selectedTicket.user.email}</p>
                  <p className="text-gray-300">{selectedTicket.message}</p>
                </div>

                {selectedTicket.adminResponse && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-blue-200 font-semibold mb-2">Admin Response:</p>
                    <p className="text-gray-300">{selectedTicket.adminResponse}</p>
                  </div>
                )}

                {selectedTicket.status !== "closed" && (
                  <div>
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0A1628] border border-gray-700 rounded-lg text-white mb-4"
                      rows={4}
                      placeholder="Enter your response"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleReply}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => handleClose(selectedTicket.id)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Close Ticket
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

