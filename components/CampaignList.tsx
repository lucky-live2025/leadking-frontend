'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiGet } from '@/lib/api'

interface Campaign {
  id: string
  businessType: string
  country: string
  city: string
  status: string
  createdAt: string
}

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const data = await apiGet("/campaigns");
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading campaigns...</div>
  }

  return (
    <div className="space-y-4">
      {campaigns.length === 0 ? (
        <p>No campaigns found. Create your first campaign to get started.</p>
      ) : (
        campaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{campaign.businessType}</h3>
                <p className="text-gray-600">
                  {campaign.city}, {campaign.country}
                </p>
                <span className={`inline-block mt-2 px-2 py-1 rounded text-sm ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <Link
                href={`/campaigns/${campaign.id}`}
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

