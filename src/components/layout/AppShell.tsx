'use client'

import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface Note {
  id: string
  title: string
  content: string
  updated_at: string
}

interface AppShellProps {
  children: ReactNode
  notes: Note[]
  userEmail: string
  userDisplayName?: string
  onCreateNote?: () => Promise<void>
}

export function AppShell({ children, notes, userEmail, userDisplayName, onCreateNote }: AppShellProps) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-canvas)' }}>
      <Sidebar notes={notes} userEmail={userEmail} userDisplayName={userDisplayName} onCreateNote={onCreateNote} />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}