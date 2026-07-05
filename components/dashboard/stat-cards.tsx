"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/dashboard/primitives";
import { cn } from "@/lib/utils";

export function StatCards() {
  const [stats, setStats] = useState([
    {
      label: "Documents Processed",
      value: "0",
      delta: "+0%",
      trend: "up",
      hint: "Real Data",
    },
    {
      label: "AI Queries",
      value: "0",
      delta: "+0%",
      trend: "up",
      hint: "Real Data",
    },
    {
      label: "Accuracy",
      value: "0%",
      delta: "+0%",
      trend: "up",
      hint: "Real Data",
    },
    {
      label: "Response Time",
      value: "0s",
      delta: "0s",
      trend: "down",
      hint: "Real Data",
    },
  ]);
  const loadDashboard = async () => {
    const res = await fetch("http://localhost:8000/dashboard");
    const data = await res.json();

    setStats([
      {
        label: "Documents Processed",
        value: String(data.documents),
        delta: "+0%",
        trend: "up",
        hint: "Uploaded PDFs",
      },
      {
        label: "AI Queries",
        value: String(data.questions),
        delta: "+0%",
        trend: "up",
        hint: "Questions Asked",
      },
      {
        label: "Accuracy",
        value: `${data.accuracy}%`,
        delta: "+0%",
        trend: "up",
        hint: "AI Accuracy",
      },
      {
        label: "Response Time",
        value: `${data.response_time}s`,
        delta: "-0.1s",
        trend: "down",
        hint: "Average",
      },
    ]);
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats([
          {
            label: "Documents Processed",
            value: String(data.documents),
            delta: "+0%",
            trend: "up",
            hint: "Uploaded PDFs",
          },
          {
            label: "AI Queries",
            value: String(data.questions),
            delta: "+0%",
            trend: "up",
            hint: "Questions Asked",
          },
          {
            label: "Accuracy",
            value: `${data.accuracy}%`,
            delta: "+0%",
            trend: "up",
            hint: "AI Accuracy",
          },
          {
            label: "Response Time",
            value: `${data.response_time}s`,
            delta: "-0.1s",
            trend: "down",
            hint: "Average",
          },
        ]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s, i) => {
        const positive = s.trend === "up";

        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>

              <div className="mt-3 flex items-end justify-between">
                <span className="text-3xl font-bold">{s.value}</span>

                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs",
                    positive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700",
                  )}
                >
                  {positive ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}

                  {s.delta}
                </span>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">{s.hint}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
