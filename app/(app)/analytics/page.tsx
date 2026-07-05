"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/primitives";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
export default function AnalyticsPage() {
  const COLORS = ["#6366F1", "#10B981", "#F59E0B"];
  const [stats, setStats] = useState({
    documents: 0,
    storage_mb: 0,
    file_types: {},
    upload_trend: [],
  });
  const fileTypeData = Object.entries(stats.file_types).map(
    ([name, value]) => ({
      name,
      value: Number(value),
    }),
  );

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      });
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Analytics"
        description="Monitor AI performance and document statistics."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-6">
          <h3 className="text-sm text-muted-foreground">Total Documents</h3>

          <h1 className="mt-2 text-4xl font-bold">{stats.documents}</h1>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-sm text-muted-foreground">Storage Used</h3>

          <h1 className="mt-2 text-4xl font-bold">{stats.storage_mb} MB</h1>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-sm text-muted-foreground">File Types</h3>

          {Object.entries(stats.file_types).map(([key, value]) => (
            <p key={key} className="mt-2">
              {key}: {String(value)}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-8 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-bold">Upload Trend</h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <LineChart data={stats.upload_trend}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="uploads"
                stroke="#6366F1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-bold">File Type Distribution</h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={fileTypeData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {fileTypeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
