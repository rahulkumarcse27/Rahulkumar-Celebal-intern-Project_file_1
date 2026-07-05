"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
interface HistoryItem {
  question: string;
  answer: string;
  time: string;
  response_time: number;
  document: string;
}

export default function SearchHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => {
        console.log("HISTORY RESPONSE =", data);

        setHistory(Array.isArray(data) ? data : []);
      });
  }, []);
  const deleteHistory = async (index: number) => {
    await fetch(`http://127.0.0.1:8000/history/${index}`, {
      method: "DELETE",
    });

    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const clearHistory = async () => {
    await fetch("http://127.0.0.1:8000/history", {
      method: "DELETE",
    });

    setHistory([]);
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-bold">Search History</h1>

      <p className="mt-2 text-muted-foreground">
        Your previous AI conversations
      </p>

      <div className="mt-5 mb-6">
        <button
          onClick={clearHistory}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Clear All History
        </button>
      </div>
      <div className="mt-8 space-y-5">
        {history.map((item, index) => (
          <div key={index} className="rounded-xl border p-5 relative">
            <button
              onClick={() => deleteHistory(index)}
              className="absolute top-4 right-4 rounded-lg p-2 hover:bg-red-500/10"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
            <h2 className="font-semibold text-lg">{item.question}</h2>

            <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>

            <div className="mt-4 flex flex-wrap gap-5 text-xs text-gray-500">
              <span>📄 {item.document}</span>

              <span>⏱ {item.response_time}s</span>

              <span>🕒 {item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
