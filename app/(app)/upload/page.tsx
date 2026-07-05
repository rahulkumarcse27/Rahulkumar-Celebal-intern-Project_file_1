"use client";

import { useRef, useState } from "react";

export default function UploadPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      alert(data.message || "Uploaded Successfully");
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Upload Document</h1>

      <button
        onClick={() => fileRef.current?.click()}
        className="bg-violet-600 px-6 py-3 rounded text-white"
      >
        {loading ? "Uploading..." : "Select PDF"}
      </button>

      <input
        ref={fileRef}
        hidden
        type="file"
        accept=".pdf"
        onChange={uploadFile}
      />
    </div>
  );
}
