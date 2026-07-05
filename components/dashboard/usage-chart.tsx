"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";

const W = 720;
const H = 260;
const PAD = { top: 20, right: 16, bottom: 32, left: 16 };

function buildPath(values: number[], max: number) {
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const step = innerW / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = PAD.left + i * step;
    const y = PAD.top + innerH - (v / max) * innerH;
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - PAD.bottom} L${pts[0][0].toFixed(1)},${H - PAD.bottom} Z`;
  return { line, area, pts };
}

export function UsageChart() {
  const gid = useId().replace(/:/g, "");
  const [active, setActive] = useState<number | null>(null);
  const [usageData, setUsageData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/analytics")
      .then((res) => res.json())
      .then((data) => {
        setUsageData(
          data.upload_trend.map((item: any) => ({
            month: item.month,
            documents: item.uploads,
            queries: item.uploads,
          })),
        );
      })
      .catch(console.error);
  }, []);

  const max = Math.max(...usageData.map((d) => d.queries)) * 1.15;
  if (usageData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        Loading analytics...
      </div>
    );
  }
  const queries = buildPath(
    usageData.map((d) => d.queries),
    max,
  );
  const docs = buildPath(
    usageData.map((d) => d.documents),
    max,
  );
  const step = (W - PAD.left - PAD.right) / (usageData.length - 1);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-64 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Documents processed and AI queries over time"
        onMouseLeave={() => setActive(null)}
      >
        <defs>
          <linearGradient id={`area-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + (H - PAD.top - PAD.bottom) * (1 - g)}
            y2={PAD.top + (H - PAD.top - PAD.bottom) * (1 - g)}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        ))}

        <motion.path
          d={queries.area}
          fill={`url(#area-${gid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d={queries.line}
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
          d={docs.line}
          fill="none"
          stroke="var(--chart-2)"
          strokeWidth="2.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeInOut" }}
        />

        {active !== null && (
          <line
            x1={queries.pts[active][0]}
            x2={queries.pts[active][0]}
            y1={PAD.top}
            y2={H - PAD.bottom}
            stroke="var(--primary)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        )}

        {usageData.map((d, i) => (
          <g key={d.month}>
            {active === i && (
              <>
                <circle
                  cx={queries.pts[i][0]}
                  cy={queries.pts[i][1]}
                  r="5"
                  fill="var(--chart-1)"
                  stroke="var(--card)"
                  strokeWidth="2"
                />
                <circle
                  cx={docs.pts[i][0]}
                  cy={docs.pts[i][1]}
                  r="5"
                  fill="var(--chart-2)"
                  stroke="var(--card)"
                  strokeWidth="2"
                />
              </>
            )}
            <rect
              x={PAD.left + i * step - step / 2}
              y={0}
              width={step}
              height={H}
              fill="transparent"
              onMouseEnter={() => setActive(i)}
            />
            <text
              x={queries.pts[i][0]}
              y={H - 10}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {d.month}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-2 flex items-center gap-5 px-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-full bg-[var(--chart-1)]" />
          AI queries
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-full border-t-2 border-dashed border-[var(--chart-2)]" />
          Documents
        </span>
        {active !== null && (
          <span className="ml-auto font-medium text-foreground">
            {usageData[active].month}:{" "}
            {usageData[active].queries.toLocaleString()} queries ·{" "}
            {usageData[active].documents.toLocaleString()} docs
          </span>
        )}
      </div>
    </div>
  );
}
