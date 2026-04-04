import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:opacity-90',
        secondary: 'border border-primary text-primary bg-transparent hover:bg-primary/5',
        ghost: 'border-transparent text-primary bg-transparent hover:bg-primary/5',
        white: 'bg-white text-foreground hover:bg-white/90',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
  children: React.ReactNode
  className?: string
  href?: string
}

function Button({
  variant,
  size,
  disabled = false,
  onClick,
  children,
  className,
  href,
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
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
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { Button, buttonVariants }
