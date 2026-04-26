import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ className, label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-ink-primary)' }}>{label}</label>
      )}
      <input
        className={cn(
          'flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus-visible:ring-red-500' : '',
          className
        )}
        style={{
          background: 'var(--color-canvas)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-ink-primary)',
        }}
        placeholder={props.placeholder || ''}
        {...props}
      />
      {error && <p className="text-xs" style={{ color: 'var(--color-danger)' }}>{error}</p>}
    </div>
  )
}