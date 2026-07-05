"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MoreHorizontal } from "lucide-react";
import {
  Card,
  PageHeader,
  StatusBadge,
  FileTypeChip,
} from "@/components/dashboard/primitives";
import { StatCards } from "@/components/dashboard/stat-cards";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { documents } from "@/lib/mock-data";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    documents: 0,
    questions: 0,
    accuracy: 0,
    response_time: 0,
    storage_mb: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);
  const recent = documents.slice(0, 5);
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title={`${greeting}, Rahul Kumar`}
        description="Welcome back to Lumen AI Document Intelligence Platform."
      >
        <Link
          href="/assistant"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-accent/5"
        >
          <Sparkles className="size-4 text-primary" />
          Ask AI
        </Link>
      </PageHeader>

      <StatCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between gap-4 p-5 pb-0">
            <div>
              <h2 className="text-base font-semibold">Processing activity</h2>
              <p className="text-sm text-muted-foreground">
                Documents ingested and questions answered
              </p>
            </div>
            <select className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground outline-none">
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <div className="p-3 pt-2">
            <UsageChart />
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
            {[
              { label: "Peak day", value: "1,204 docs" },
              { label: "Avg. per day", value: "612 docs" },
              { label: "Answer rate", value: "99.2%" },
            ].map((m) => (
              <div key={m.label} className="px-5 py-4">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="text-base font-semibold">AI insights</h2>
            </div>
            <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary">
              Live
            </span>
          </div>
          <div className="px-4 pb-4">
            <InsightsPanel />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between gap-4 border-b border-border p-5">
          <div>
            <h2 className="text-base font-semibold">Recent documents</h2>
            <p className="text-sm text-muted-foreground">
              Latest files processed by Lumen
            </p>
          </div>
          <Link
            href="/documents"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ul className="divide-y divide-border">
          {recent.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-accent/5"
            >
              <FileTypeChip type={doc.type} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {doc.pages} pages · {doc.size} · {doc.owner}
                </p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {doc.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="hidden w-28 md:block">
                <StatusBadge status={doc.status} />
              </div>
              <span className="hidden w-20 text-right text-xs text-muted-foreground lg:block">
                {doc.updated}
              </span>
              <button
                type="button"
                aria-label="More actions"
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
