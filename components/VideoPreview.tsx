'use client'

interface Video {
  id: string
  videoType: string
  status: string
  s3Url?: string
  createdAt: string
}

interface VideoPreviewProps {
  video: Video
}

export default function VideoPreview({ video }: VideoPreviewProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="aspect-video bg-gray-200 rounded mb-4 flex items-center justify-center">
        {video.status === 'completed' && video.s3Url ? (
          <video src={video.s3Url} controls className="w-full h-full rounded" />
        ) : (
          <div className="text-gray-500">
            {video.status === 'processing' ? 'Processing...' : 'Pending'}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{video.videoType.toUpperCase()} Video</p>
          <p className="text-sm text-gray-600">
            {new Date(video.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded text-sm ${
            video.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : video.status === 'processing'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {video.status}
        </span>
      </div>
    </div>
  )
}

