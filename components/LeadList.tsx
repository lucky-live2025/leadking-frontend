'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiGet } from '@/lib/api'

interface Lead {
  id: string
  name: string
  surname: string
  phone: string
  email?: string
  country: string
  platform: string
  score: number
  createdAt: string
}

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const data = await apiGet("/leads");
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading leads...</div>
  }

  return (
    <div className="space-y-4">
      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        leads.map((lead) => (
          <div key={lead.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">
                  {lead.name} {lead.surname}
                </h3>
                <p className="text-gray-600">{lead.phone}</p>
                {lead.email && <p className="text-gray-600">{lead.email}</p>}
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {lead.platform}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    Score: {lead.score}
                  </span>
                </div>
              </div>
              <Link
                href={`/leads/${lead.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

