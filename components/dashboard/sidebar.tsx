'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { X, Zap } from 'lucide-react'
import { Logo } from '@/components/logo'
import { navGroups, bottomNav } from '@/lib/nav'
import { cn } from '@/lib/utils'

function NavLink({
  href,
  icon: Icon,
  label,
  badge,
  disabled,
  active,
  onNavigate,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: string
  disabled?: boolean
  active: boolean
  onNavigate?: () => void
}) {
  const content = (
    <>
      <Icon className="size-[18px] shrink-0" />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          {badge}
        </span>
      )}
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-y-1.5 left-0 w-1 rounded-full bg-primary"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
    </>
  )

  const base =
    'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors'

  if (disabled) {
    return (
      <span
        className={cn(base, 'cursor-not-allowed text-muted-foreground/50')}
        aria-disabled
      >
        {content}
      </span>
    )
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        base,
        active
          ? 'bg-accent/10 text-foreground'
          : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground',
      )}
    >
      {content}
    </Link>
  )
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-2 pt-2">
        <Link href="/dashboard" onClick={onNavigate} aria-label="Lumen home">
          <Logo />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.title}
            </p>
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                active={pathname === item.href}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-3">
        {bottomNav.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={pathname === item.href}
            onNavigate={onNavigate}
          />
        ))}

        <div className="rounded-2xl border border-border bg-gradient-to-b from-primary/10 to-transparent p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Zap className="size-4 text-primary" />
            Pro plan
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            8,420 / 20,000 pages used this month.
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full w-[42%] rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="absolute left-0 top-0 h-full w-72 border-r border-sidebar-border bg-sidebar"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-3 top-4 z-10 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={onClose} />
          </motion.aside>
        </div>
      )}
    </>
  )
}
