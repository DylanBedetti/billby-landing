import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  children: React.ReactNode
  className?: string
  href?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:opacity-90',
  secondary:
    'border border-primary text-primary bg-transparent hover:bg-primary/5',
  ghost:
    'border-transparent text-primary bg-transparent hover:bg-primary/5',
  white:
    'bg-white text-primary hover:bg-white/90',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className,
  href,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={disabled ? (e) => e.preventDefault() : (onClick as React.MouseEventHandler<HTMLAnchorElement>)}
        aria-disabled={disabled}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  )
}
