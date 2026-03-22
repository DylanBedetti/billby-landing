import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
  decimals?: number
  className?: string
}

export function StatCounter({
  value,
  prefix = '',
  suffix = '',
  label,
  decimals = 0,
  className,
}: StatCounterProps) {
  const [current, setCurrent] = useState(0)
  const hasAnimated = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          const duration = 1500
          const startTime = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // ease-out: decelerate as progress approaches 1
            const eased = 1 - Math.pow(1 - progress, 3)
            setCurrent(eased * value)

            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setCurrent(value)
            }
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  const display = current.toFixed(decimals)

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-2', className)}>
      <span className="text-5xl font-bold tracking-tight text-foreground">
        {prefix}
        {display}
        {suffix}
      </span>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
