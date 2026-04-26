'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronDown, Search, SquarePen, FileText, BookOpen, Users, Target, Bookmark, Calendar, Plus, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Note {
  id: string
  title: string
  content: string
  updated_at: string
}

interface SidebarProps {
  notes: Note[]
  userEmail: string
  userDisplayName?: string
  onCreateNote?: () => Promise<void>
}

export function Sidebar({ notes, userEmail, userDisplayName, onCreateNote }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleNewPage = async () => {
    if (onCreateNote) {
      await onCreateNote()
    }
  }

  const getInitials = (email: string) => {
    const name = userDisplayName || email
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return email.slice(0, 2).toUpperCase()
  }

  const getIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('meeting')) return Users
    if (t.includes('roadmap') || t.includes('planning')) return BookOpen
    if (t.includes('goal')) return Target
    if (t.includes('journal') || t.includes('daily')) return Calendar
    if (t.includes('bookmark') || t.includes('reading')) return Bookmark
    return FileText
  }

  return (
    <aside className="sidebar p-3 gap-1">
      <div className="flex flex-col gap-1">
        <Link
          href="#"
          className="sidebar-item flex items-center gap-2"
        >
          <div
            className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: 'var(--color-accent)' }}
          >
            {getInitials(userEmail)[0]}
          </div>
          <span className="flex-1 text-sm font-medium truncate" style={{ color: 'var(--color-ink-primary)' }}>
            {userDisplayName || 'My Workspace'}
          </span>
          <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--color-ink-tertiary)' }} />
        </Link>

        <div className="sidebar-item">
          <Search className="w-4 h-4" style={{ color: 'var(--color-ink-secondary)' }} />
          <span className="flex-1 text-sm" style={{ color: 'var(--color-ink-secondary)' }}>Search</span>
          <span className="kbd">⌘K</span>
        </div>

        <button
          onClick={handleNewPage}
          className="sidebar-item w-full text-left"
        >
          <SquarePen className="w-4 h-4" style={{ color: 'var(--color-ink-secondary)' }} />
          <span className="flex-1 text-sm" style={{ color: 'var(--color-ink-secondary)' }}>New page</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto mt-4">
        <div className="text-[10px] font-semibold tracking-[0.8px] px-2 py-1.5" style={{ color: 'var(--color-ink-tertiary)' }}>
          PRIVATE
        </div>

        <div className="flex flex-col gap-0.5">
          {notes.map((note) => {
            const Icon = getIcon(note.title)
            const isActive = pathname === `/app/${note.id}`
            return (
              <Link
                key={note.id}
                href={`/app/${note.id}`}
                className={`sidebar-item h-8 ${isActive ? 'active' : ''}`}
                style={isActive ? {
                  background: 'var(--color-hover-surface)',
                  borderLeft: '3px solid var(--color-accent)',
                  paddingLeft: '5px'
                } : {}}
              >
                <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-ink-tertiary)' }} />
                <Icon className="w-[18px] h-[18px]" style={{ color: 'var(--color-ink-secondary)' }} />
                <span className="flex-1 text-sm truncate" style={{ color: 'var(--color-ink-primary)' }}>
                  {note.title || 'Untitled'}
                </span>
              </Link>
            )
          })}

          {notes.length === 0 && (
            <div className="sidebar-item h-8">
              <span className="text-sm" style={{ color: 'var(--color-ink-tertiary)' }}>No pages yet</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-auto pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <button className="sidebar-item w-full">
          <Settings className="w-4 h-4" style={{ color: 'var(--color-ink-secondary)' }} />
          <span className="flex-1 text-sm text-left" style={{ color: 'var(--color-ink-secondary)' }}>Settings</span>
        </button>

        <div className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-[var(--color-hover-surface)]">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: 'var(--color-accent)' }}
          >
            {getInitials(userEmail)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--color-ink-primary)' }}>
              {userDisplayName || userEmail}
            </p>
            {userDisplayName && (
              <p className="text-xs truncate" style={{ color: 'var(--color-ink-secondary)' }}>
                {userEmail}
              </p>
            )}
          </div>
        </div>

        <button onClick={handleLogout} className="sidebar-item w-full">
          <LogOut className="w-4 h-4" style={{ color: 'var(--color-ink-secondary)' }} />
          <span className="flex-1 text-sm text-left" style={{ color: 'var(--color-ink-secondary)' }}>Log out</span>
        </button>
      </div>
    </aside>
  )
}