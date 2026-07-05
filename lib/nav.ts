import {
  LayoutDashboard,
  Upload,
  Sparkles,
  FileText,
  Search,
  BarChart3,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
  disabled?: boolean
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Upload Documents', href: '/upload', icon: Upload },
      { label: 'AI Chat', href: '/assistant', icon: Sparkles, badge: 'New' },
      { label: 'Document Library', href: '/documents', icon: FileText },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Search History', href: '/history', icon: Search },
      { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    ],
  },
]

export const bottomNav: NavItem[] = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
]
