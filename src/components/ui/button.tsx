import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children: React.ReactNode
}

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'h-10 px-4 py-2 text-sm': size === 'default',
          'h-8 px-3 text-sm': size === 'sm',
          'h-12 px-6 text-base': size === 'lg',
          'h-10 w-10 p-0': size === 'icon',
        },
        className
      )}
      style={{
        background: variant === 'primary' ? 'var(--color-ink-primary)' :
                    variant === 'danger' ? 'var(--color-danger)' : 'transparent',
        border: variant === 'secondary' ? '1px solid var(--color-border)' : 'none',
        color: variant === 'primary' || variant === 'danger' ? '#ffffff' :
               variant === 'secondary' ? 'var(--color-ink-primary)' :
               variant === 'ghost' ? 'var(--color-ink-secondary)' : 'inherit',
      }}
      {...props}
    >
      {children}
    </button>
  )
}