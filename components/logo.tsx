import { cn } from '@/lib/utils'

export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string
  withWordmark?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <path
            d="M12 2.5 4 6.5v11L12 21.5l8-4v-11L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 7.5 8 9.5v5L12 16.5l4-2v-5L12 7.5Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      </div>
      {withWordmark && (
        <span className="text-[17px] font-semibold tracking-tight">
          Lumen
        </span>
      )}
    </div>
  )
}
