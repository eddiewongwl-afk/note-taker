import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4',
        className
      )}
      style={{
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--color-shadow-card)',
      }}
      {...props}
    >
      {children}
    </div>
  )
}