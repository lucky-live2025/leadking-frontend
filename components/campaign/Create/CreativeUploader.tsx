"use client";

import { useState, useRef } from "react";

interface CreativeUploaderProps {
  onFilesChange: (files: { images: File[]; videos: File[] }) => void;
  maxSizeMB?: number;
}

export default function CreativeUploader({ onFilesChange, maxSizeMB = 100 }: CreativeUploaderProps) {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const acceptedVideoTypes = ["video/mp4", "video/quicktime", "video/mov"];

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File ${file.name} exceeds ${maxSizeMB}MB limit`;
    }
    const isImage = acceptedImageTypes.includes(file.type);
    const isVideo = acceptedVideoTypes.includes(file.type);
    if (!isImage && !isVideo) {
      return `File ${file.name} is not a supported format (jpg, png, webp, mp4, mov)`;
    }
    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages: File[] = [];
    const newVideos: File[] = [];

    Array.from(files).forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (acceptedImageTypes.includes(file.type)) {
        newImages.push(file);
      } else if (acceptedVideoTypes.includes(file.type)) {
        newVideos.push(file);
      }
    });

    if (newImages.length > 0 || newVideos.length > 0) {
      const updatedImages = [...images, ...newImages];
      const updatedVideos = [...videos, ...newVideos];
      setImages(updatedImages);
      setVideos(updatedVideos);
      onFilesChange({ images: updatedImages, videos: updatedVideos });
      setError(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onFilesChange({ images: updated, videos });
  };

  const removeVideo = (index: number) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
    onFilesChange({ images, videos: updated });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 font-semibold mb-3">Upload Creative Assets</label>
        
        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragActive
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-700 bg-[#0A1628]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp,video/mp4,video/quicktime,video/mov"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="space-y-4">
            <div className="text-4xl">📁</div>
            <div>
              <p className="text-white font-semibold mb-2">Drag & drop files here</p>
              <p className="text-gray-400 text-sm">or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse Files
              </button>
            </div>
            <p className="text-gray-500 text-xs">
              Supported: JPG, PNG, WebP (images) | MP4, MOV (videos) | Max {maxSizeMB}MB per file
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-3 bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Images Preview */}
      {images.length > 0 && (
        <div>
          <h3 className="text-gray-300 font-semibold mb-3">Images ({images.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-700"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
                <div className="mt-1 text-xs text-gray-400 truncate">{image.name}</div>
                <div className="text-xs text-gray-500">{formatFileSize(image.size)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Preview */}
      {videos.length > 0 && (
        <div>
          <h3 className="text-gray-300 font-semibold mb-3">Videos ({videos.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <div key={index} className="relative group">
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  className="w-full h-48 object-cover rounded-lg border border-gray-700"
                />
                <button
                  onClick={() => removeVideo(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
                <div className="mt-1 text-xs text-gray-400 truncate">{video.name}</div>
                <div className="text-xs text-gray-500">{formatFileSize(video.size)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

