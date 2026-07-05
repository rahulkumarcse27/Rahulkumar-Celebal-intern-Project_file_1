import { cn } from '@/lib/utils'

export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-sm shadow-black/[0.03]',
        className,
      )}
    >
      {children}
    </div>
  )
}

const statusStyles: Record<string, string> = {
  processed: 'bg-success/12 text-success',
  processing: 'bg-accent/12 text-accent',
  queued: 'bg-warning/15 text-warning',
  failed: 'bg-destructive/12 text-destructive',
}

const statusLabels: Record<string, string> = {
  processed: 'Processed',
  processing: 'Processing',
  queued: 'Queued',
  failed: 'Failed',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        statusStyles[status] ?? 'bg-muted text-muted-foreground',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full bg-current',
          status === 'processing' && 'animate-pulse',
        )}
      />
      {statusLabels[status] ?? status}
    </span>
  )
}

const typeStyles: Record<string, string> = {
  PDF: 'bg-destructive/12 text-destructive',
  DOCX: 'bg-accent/12 text-accent',
  XLSX: 'bg-success/12 text-success',
  IMG: 'bg-warning/15 text-warning',
  TXT: 'bg-primary/12 text-primary',
}

export function FileTypeChip({ type }: { type: string }) {
  return (
    <span
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold',
        typeStyles[type] ?? 'bg-muted text-muted-foreground',
      )}
    >
      {type}
    </span>
  )
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-balance md:text-[28px]">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
