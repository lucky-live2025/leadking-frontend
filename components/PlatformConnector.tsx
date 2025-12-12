'use client'

import { useState } from 'react'

const platforms = [
  { id: 'meta', name: 'Meta (Facebook/Instagram)' },
  { id: 'tiktok', name: 'TikTok Ads' },
  { id: 'google', name: 'Google Ads' },
  { id: 'yandex', name: 'Yandex Direct' },
]

export default function PlatformConnector() {
  const [connected, setConnected] = useState<string[]>([])

  const handleConnect = (platformId: string) => {
    // TODO: Implement OAuth flow
    console.log(`Connecting to ${platformId}...`)
    // Placeholder: Add to connected list
    if (!connected.includes(platformId)) {
      setConnected([...connected, platformId])
    }
  }

  const handleDisconnect = (platformId: string) => {
    setConnected(connected.filter((id) => id !== platformId))
  }

  return (
    <div className="space-y-4">
      {platforms.map((platform) => {
        const isConnected = connected.includes(platform.id)
        return (
          <div
            key={platform.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{platform.name}</h3>
              <p className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Not connected'}
              </p>
            </div>
            <button
              onClick={() =>
                isConnected
                  ? handleDisconnect(platform.id)
                  : handleConnect(platform.id)
              }
              className={`px-4 py-2 rounded ${
                isConnected
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

