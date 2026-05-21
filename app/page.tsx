"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  Upload,
  FileText,
  Music,
  Video,
  ImageIcon,
  Wallet,
} from "lucide-react";

import { ethers } from "ethers";

type UploadedFile = {
  id: string;
  name: string;
  type: string;
  url: string;
};

export default function Home() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );

      const accounts = await provider.send(
        "eth_requestAccounts",
        []
      );

      setWalletAddress(accounts[0]);

    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const renderPreview = (file: UploadedFile) => {
    if (file.type.startsWith("video/")) {
      return (
        <video
          controls
          className="w-full rounded-xl"
          src={file.url}
        />
      );
    }

    if (file.type.startsWith("audio/")) {
      return (
        <audio
          controls
          className="w-full"
          src={file.url}
        />
      );
    }

    if (file.type.startsWith("image/")) {
      return (
        <img
          src={file.url}
          alt={file.name}
          className="w-full rounded-xl"
        />
      );
    }

    return (
      <div className="bg-zinc-800 p-6 rounded-xl flex flex-col items-center">
        <FileText size={40} />
        <p className="mt-2 text-sm">
          Document Uploaded
        </p>
      </div>
    );
  };

  const getIcon = (type: string) => {
    if (type.startsWith("video/")) {
      return <Video className="text-blue-400" />;
    }

    if (type.startsWith("audio/")) {
      return <Music className="text-green-400" />;
    }

    if (type.startsWith("image/")) {
      return <ImageIcon className="text-pink-400" />;
    }

    return <FileText className="text-yellow-400" />;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-6xl font-extrabold mb-3">
              OriginLayer
            </h1>

            <p className="text-zinc-400 text-lg">
              Decentralized media & file storage
            </p>
          </div>

          <button
            onClick={connectWallet}
            className="bg-white text-black px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold hover:scale-105 transition"
          >

            <Wallet size={20} />

            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}

          </button>

        </div>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-zinc-700 rounded-3xl p-16 text-center cursor-pointer hover:border-white transition bg-zinc-900/40"
        >

          <input {...getInputProps()} />

          <Upload size={50} className="mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-2">
            Drag & Drop Files
          </h2>

          <p className="text-zinc-400">
            Upload videos, music, images, PDFs and more
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {files.map((file) => (
            <div
              key={file.id}
              className="bg-black/40 border border-zinc-800 rounded-3xl p-5"
            >

              <div className="flex items-center gap-3 mb-4">

                {getIcon(file.type)}

                <h2 className="font-semibold truncate">
                  {file.name}
                </h2>

              </div>

              {renderPreview(file)}

              <a
                href={`/file/${file.id}`}
                target="_blank"
                className="mt-4 inline-block text-sm text-blue-400 hover:underline"
              >
                Open Share Link →
              </a>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}
