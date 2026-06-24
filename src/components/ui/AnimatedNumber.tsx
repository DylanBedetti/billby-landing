import { useEffect, useRef, useState } from 'react'

export interface AnimatedNumberProps {
  /** The target value to display. */
  value: number
  /** Formats the (interpolated) numeric value into the displayed string. */
  format: (value: number) => string
  /** Tween duration in ms. */
  duration?: number
  className?: string
}

/**
 * Displays a number that smoothly tweens to its target whenever `value`
 * changes — used for the calculator outputs so the figures count up/down as the
 * user drags a slider. Renders the exact target on first paint (no entrance
 * animation), which keeps it deterministic in tests and correct without JS.
 */
export function AnimatedNumber({
  value,
  format,
  duration = 500,
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef = useRef<number | null>(null)
  const isFirst = useRef(true)

  useEffect(() => {
    // Skip animating the initial mount — show the real value straight away.
    if (isFirst.current) {
      isFirst.current = false
      fromRef.current = value
      setDisplay(value)
      return
    }

    const from = fromRef.current
    const to = value
    if (from === to) return

    // No rAF (e.g. jsdom/tests) or reduced motion: jump straight to target.
    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (typeof requestAnimationFrame !== 'function' || prefersReduced) {
      fromRef.current = to
      setDisplay(to)
      return
    }

    let startTime: number | null = null
    const step = (now: number) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      const current = from + (to - from) * eased
      setDisplay(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        fromRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      // Preserve where we got to so the next change tweens from here.
      fromRef.current = display
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return <span className={className}>{format(display)}</span>
}
