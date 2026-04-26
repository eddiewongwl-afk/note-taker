'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui'
import { AppShell } from '@/components/layout/AppShell'

interface Note {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export default function AppPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [userDisplayName, setUserDisplayName] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const getUserAndNotes = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUserEmail(user.email || '')

      const { data: profileData } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single()

      if (profileData?.display_name) {
        setUserDisplayName(profileData.display_name)
      }

      const { data: notesData, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (!error && notesData) {
        setNotes(notesData)
      }
      setLoading(false)
    }

    getUserAndNotes()
  }, [])

  const handleCreateNote = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: user.id,
        title: 'Untitled',
        content: '',
      })
      .select()
      .single()

    if (!error && data) {
      router.push(`/app/${data.id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
        <p style={{ color: 'var(--color-ink-secondary)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <AppShell notes={notes} userEmail={userEmail} userDisplayName={userDisplayName} onCreateNote={handleCreateNote}>
      <div className="p-8">
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-ink-primary)' }}>
              My Notes
            </h1>
            <Button onClick={handleCreateNote}>
              <Plus className="w-4 h-4" />
              New Note
            </Button>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-ink-tertiary)' }} />
              <p className="mb-4" style={{ color: 'var(--color-ink-secondary)' }}>No notes yet</p>
              <Button onClick={handleCreateNote}>
                <Plus className="w-4 h-4" />
                Create your first note
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {notes.map((note) => (
                <Link key={note.id} href={`/app/${note.id}`}>
                  <div
                    className="p-4 rounded-lg cursor-pointer transition-colors"
                    style={{
                      background: 'var(--color-canvas)',
                      border: '1px solid var(--color-border)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  >
                    <h2 className="font-medium mb-1" style={{ color: 'var(--color-ink-primary)' }}>
                      {note.title || 'Untitled'}
                    </h2>
                    <p className="text-sm line-clamp-2 mb-2" style={{ color: 'var(--color-ink-secondary)' }}>
                      {note.content || 'No content'}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
                      {new Date(note.updated_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}