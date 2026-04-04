import { useEffect, useRef, useState } from 'react'

type Phase = 'signals' | 'processing' | 'narrative' | 'done'

interface AnimationCycleConfig {
  signals: string[]
  narrative: string
  signalItemDelay?: number
  signalsDisplay?: number
  processingDuration?: number
  typewriterDelay?: number
  donePause?: number
}

interface AnimationCycleState {
  phase: Phase
  visibleSignals: number
  narrative: string
  dotCount: number
}

export function useAnimationCycle({
  signals,
  narrative: fullNarrative,
  signalItemDelay = 400,
  signalsDisplay = 2000,
  processingDuration = 800,
  typewriterDelay = 18,
  donePause = 2000,
}: AnimationCycleConfig): AnimationCycleState {
  const [phase, setPhase] = useState<Phase>('signals')
  const [visibleSignals, setVisibleSignals] = useState(0)
  const [narrative, setNarrative] = useState('')
  const [dotCount, setDotCount] = useState(1)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const clearAll = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const runCycle = () => {
      setPhase('signals')
      setVisibleSignals(0)
      setNarrative('')
      setDotCount(1)

      let signalIndex = 0
      const revealNextSignal = () => {
        signalIndex++
        setVisibleSignals(signalIndex)
        if (signalIndex < signals.length) {
          timeoutRef.current = setTimeout(revealNextSignal, signalItemDelay)
        } else {
          timeoutRef.current = setTimeout(() => {
            setPhase('processing')

            let dots = 1
            intervalRef.current = setInterval(() => {
              dots = (dots % 3) + 1
              setDotCount(dots)
            }, 300)

            timeoutRef.current = setTimeout(() => {
              if (intervalRef.current) clearInterval(intervalRef.current)
              setPhase('narrative')

              let charIndex = 0
              const typeNext = () => {
                charIndex++
                setNarrative(fullNarrative.slice(0, charIndex))
                if (charIndex < fullNarrative.length) {
                  timeoutRef.current = setTimeout(typeNext, typewriterDelay)
                } else {
                  setPhase('done')
                  timeoutRef.current = setTimeout(runCycle, donePause)
                }
              }
              timeoutRef.current = setTimeout(typeNext, typewriterDelay)
            }, processingDuration)
          }, signalsDisplay - signals.length * signalItemDelay)
        }
      }

      timeoutRef.current = setTimeout(revealNextSignal, signalItemDelay)
    }

    runCycle()
    return clearAll
  }, [signals, fullNarrative, signalItemDelay, signalsDisplay, processingDuration, typewriterDelay, donePause])

  return { phase, visibleSignals, narrative, dotCount }
}
