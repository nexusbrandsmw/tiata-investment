"use client";

import { useState } from "react";

interface Props {
  onUpload: (urls: string[]) => void;
}

export default function ImageUploader({ onUpload }: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleUpload = async () => {
    setLoading(true);

    const uploadedUrls: string[] = [];

    for (const file of images) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      uploadedUrls.push(data.url);
    }

    onUpload(uploadedUrls);
    setLoading(false);
    setImages([]);
  };

  return (
    <div className="space-y-4">

      {/* DROP AREA */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#000f22]/20 rounded-2xl p-10 text-center bg-white"
      >
        <p className="text-[#000f22]/60">
          Drag & drop images here
        </p>
      </div>

      {/* PREVIEW */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="text-xs text-[#000f22] bg-[#f8f9fb] p-2 rounded-xl"
            >
              {img.name}
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD BUTTON */}
      {images.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-[#e01e41] text-white px-5 py-3 rounded-xl"
        >
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      )}

    </div>
  );
}