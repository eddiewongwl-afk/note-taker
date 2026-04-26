import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ className, label, error, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-ink-primary)' }}>{label}</label>
      )}
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-md px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus-visible:ring-red-500' : '',
          className
        )}
        style={{
          background: 'var(--color-canvas)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-ink-primary)',
        }}
        {...props}
      />
      {error && <p className="text-xs" style={{ color: 'var(--color-danger)' }}>{error}</p>}
    </div>
  )
}