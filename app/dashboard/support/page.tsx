"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost } from "@/lib/api";

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      const data = await apiGet("/support/tickets", { auth: true });
      setTickets(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tickets");
    }
  }

  async function handleSubmit() {
    if (!subject || !message) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiPost("/support/tickets", { subject, message }, { auth: true });
      setSubject("");
      setMessage("");
      setShowForm(false);
      await loadTickets();
    } catch (err: any) {
      setError(err.message || "Failed to create ticket");
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Support Tickets</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "New Ticket"}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-[#111827] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Create Support Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
                  rows={5}
                  placeholder="Enter your message"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="bg-[#111827] rounded-lg p-6 text-center text-gray-400">
              No support tickets yet
            </div>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="bg-[#111827] rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{ticket.message}</p>
                {ticket.adminResponse && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-200 font-semibold mb-2">Admin Response:</p>
                    <p className="text-gray-300">{ticket.adminResponse}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

