import Link from 'next/link'
import { Button } from '@/components/ui'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">NoteTaker</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-600 mb-8">
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          New — Capture your first note today
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Your thoughts, organized.
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          A clean and simple space to capture, organize, and revisit your notes — without friction.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg">Log In</Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Free forever. No credit card required.
        </p>

        {/* Hero Preview - Simple representation */}
        <div className="mt-16 mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
            </div>
          </div>
          <div className="p-8 text-left">
            <div className="space-y-4">
              <div className="h-8 w-64 rounded bg-gray-100"></div>
              <div className="h-4 w-96 rounded bg-gray-50"></div>
              <div className="h-4 w-80 rounded bg-gray-50"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between text-sm text-gray-400">
          <span>© 2026 NoteTaker. Crafted with care.</span>
          <span>All systems normal</span>
        </div>
      </footer>
    </div>
  )
}