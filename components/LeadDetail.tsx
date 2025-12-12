'use client'

import { useState, useEffect } from 'react'
import { apiGet } from '@/lib/api'

interface Lead {
  id: string
  name: string
  surname: string
  phone: string
  email?: string
  interest?: string
  country: string
  platform: string
  score: number
  createdAt: string
  messages?: Message[]
}

interface Message {
  id: string
  direction: string
  message: string
  createdAt: string
}

interface LeadDetailProps {
  leadId: string
}

export default function LeadDetail({ leadId }: LeadDetailProps) {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLead()
  }, [leadId])

  const fetchLead = async () => {
    try {
      const data = await apiGet(`/leads/${leadId}`);
      setLead(data);
    } catch (error) {
      console.error('Error fetching lead:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading lead details...</div>
  }

  if (!lead) {
    return <div>Lead not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">
          {lead.name} {lead.surname}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-semibold">{lead.phone}</p>
          </div>
          {lead.email && (
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{lead.email}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600">Country</p>
            <p className="font-semibold">{lead.country}</p>
          </div>
          <div>
            <p className="text-gray-600">Platform</p>
            <p className="font-semibold">{lead.platform}</p>
          </div>
          <div>
            <p className="text-gray-600">Score</p>
            <p className="font-semibold">{lead.score}</p>
          </div>
        </div>
      </div>

      {lead.messages && lead.messages.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Message History</h3>
          <div className="space-y-2">
            {lead.messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded ${
                  message.direction === 'inbound'
                    ? 'bg-blue-50'
                    : 'bg-gray-50'
                }`}
              >
                <p className="text-sm text-gray-600 mb-1">
                  {message.direction === 'inbound' ? 'From Lead' : 'To Lead'}
                </p>
                <p>{message.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

