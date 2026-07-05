'use client'

import Link from 'next/link'
import { Menu, Search, Bell, Plus } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-border">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground lg:hidden"
        >
          <Menu className="size-[18px]" />
        </button>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search documents, entities, insights…"
            className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-16 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:block">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/upload"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Upload</span>
          </Link>

          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
          </button>

          <ThemeToggle />

          <Link
            href="/profile"
            className="ml-1 flex items-center gap-2.5 rounded-xl border border-border bg-card py-1 pl-1 pr-3 text-left transition-colors hover:bg-accent/5"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
              AC
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xs font-semibold">Amara Chen</span>
              <span className="block text-[11px] text-muted-foreground">
                Admin
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
