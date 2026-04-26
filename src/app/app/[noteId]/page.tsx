'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button, Input, Textarea } from '@/components/ui'
import { Save, Trash2 } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'

interface Note {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export default function NoteEditorPage() {
  const params = useParams()
  const router = useRouter()
  const [note, setNote] = useState<Note | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [userEmail, setUserEmail] = useState('')
  const [userDisplayName, setUserDisplayName] = useState('')
  const supabase = createClient()

  const noteId = params.noteId as string

  useEffect(() => {
    const getUserAndData = async () => {
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

      await fetchNotes(user.id)
      await fetchNote(user.id)
    }

    getUserAndData()
  }, [noteId])

  const fetchNote = async (userId: string) => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .eq('user_id', userId)
      .single()

    if (error || !data) {
      router.push('/app')
      return
    }

    setNote(data)
    setTitle(data.title)
    setContent(data.content)
    setLoading(false)
  }

  const fetchNotes = async (userId: string) => {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (data) {
      setNotes(data)
    }
  }

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

  const handleSave = useCallback(async () => {
    setSaving(true)
    await supabase
      .from('notes')
      .update({
        title,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', noteId)

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await fetchNotes(user.id)
    }
    setSaving(false)
  }, [title, content, noteId])

  useEffect(() => {
    if (!loading && title !== note?.title || content !== note?.content) {
      const timer = setTimeout(handleSave, 1000)
      return () => clearTimeout(timer)
    }
  }, [title, content])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) return

    await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)

    router.push('/app')
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
      <div className="p-8 max-w-3xl mx-auto">
        <div className="space-y-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="text-2xl font-semibold border-0 bg-transparent px-0 focus:ring-0 shadow-none placeholder:text-[var(--color-ink-tertiary)]"
            style={{ color: 'var(--color-ink-primary)' }}
          />

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="min-h-[500px] text-base border-0 bg-transparent px-0 focus:ring-0 resize-none shadow-none"
            style={{ color: 'var(--color-ink-primary)' }}
          />

          <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}