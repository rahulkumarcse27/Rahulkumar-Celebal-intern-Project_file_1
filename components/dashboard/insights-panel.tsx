import { AlertTriangle, TrendingUp, Sparkles, FileText } from 'lucide-react'
import { insights } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const toneMap = {
  brand: { icon: Sparkles, cls: 'bg-primary/12 text-primary' },
  success: { icon: TrendingUp, cls: 'bg-success/12 text-success' },
  warning: { icon: AlertTriangle, cls: 'bg-warning/15 text-warning' },
}

export function InsightsPanel() {
  return (
    <div className="flex flex-col gap-3">
      {insights.map((ins) => {
        const tone = toneMap[ins.tone]
        const Icon = tone.icon
        return (
          <div
            key={ins.id}
            className="group flex gap-3 rounded-xl border border-border bg-background/40 p-3.5 transition-colors hover:bg-accent/5"
          >
            <span
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-lg',
                tone.cls,
              )}
            >
              <Icon className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">{ins.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {ins.detail}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/80">
                <FileText className="size-3" />
                <span className="truncate">{ins.source}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
