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
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-700 border border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            {showForm ? "Cancel" : "New Ticket"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 shadow-md">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Support Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={5}
                  placeholder="Enter your message"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-600 shadow-md border border-gray-200">
              No support tickets yet
            </div>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{ticket.message}</p>
                {ticket.adminResponse && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                    <p className="text-sm text-blue-900 font-semibold mb-2">Admin Response:</p>
                    <p className="text-gray-700">{ticket.adminResponse}</p>
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
