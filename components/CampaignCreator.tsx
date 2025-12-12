'use client'

import { useState } from 'react'
import { apiPost } from '@/lib/api'
import LocationAutocomplete from './LocationAutocomplete'

interface CampaignCreatorProps {
  onSuccess: () => void
}

export default function CampaignCreator({ onSuccess }: CampaignCreatorProps) {
  const [formData, setFormData] = useState({
    businessType: '',
    country: '',
    city: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiPost("/campaigns", formData);
      onSuccess()
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Business Type
        </label>
        <input
          type="text"
          value={formData.businessType}
          onChange={(e) =>
            setFormData({ ...formData, businessType: e.target.value })
          }
          className="w-full px-3 py-2 border rounded bg-white text-black placeholder:text-[#777777]"
          style={{ backgroundColor: '#ffffff', color: '#000000' }}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <LocationAutocomplete
          onChange={(location) => {
            setFormData({
              ...formData,
              country: location.country,
              city: location.city,
            });
          }}
          placeholder="Start typing a location..."
          className="w-full px-3 py-2 border rounded bg-white text-black placeholder:text-[#777777]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Campaign'}
      </button>
    </form>
  )
}

