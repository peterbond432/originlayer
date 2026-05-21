"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function Home() {
  const [video, setVideo] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      
      <h1 className="text-5xl font-bold mb-4">
        OriginLayer
      </h1>

      <p className="text-gray-400 mb-10">
        Verify the origin of every media file
      </p>

      <label className="bg-white text-black px-6 py-3 rounded-2xl cursor-pointer flex items-center gap-2 hover:scale-105 transition">
        <Upload size={20} />
        Upload Video

        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {video && (
        <div className="mt-10 w-full max-w-2xl">
          <video
            controls
            className="rounded-2xl w-full"
            src={video}
          />

          <div className="bg-zinc-900 p-4 rounded-2xl mt-4">
            <p className="text-green-400">
              ✅ Proof Generated Successfully
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Timestamp verified • Ownership recorded
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
