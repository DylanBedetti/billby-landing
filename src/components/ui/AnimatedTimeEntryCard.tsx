import { useEffect, useRef, useState } from 'react'

type Phase = 'signals' | 'processing' | 'narrative' | 'done'

const SIGNALS = [
  '09:02 — Microsoft Word — Affidavit_Smith_v_Jones_FINAL.docx',
  '09:31 — Adobe Acrobat — Smith_v_Jones_Brief.pdf',
  '10:14 — Outlook — Re: Settlement Offer — Smith v Jones',
  '10:22 — Microsoft Word — Affidavit_Smith_v_Jones_FINAL.docx',
]

const NARRATIVE = `Matter: Smith v Jones
Client: Clayton & Associates
Duration: 1h 22m

Reviewed and revised affidavit in support of interlocutory injunction. Analysed settlement correspondence from opposing counsel. Prepared response strategy and updated client brief with recommended next steps.`

// Delays (ms)
const SIGNAL_ITEM_DELAY = 400   // time between each signal item appearing
const SIGNALS_DISPLAY = 2000    // how long to show signals phase total
const PROCESSING_DURATION = 800 // how long to show processing phase
const TYPEWRITER_DELAY = 18     // ms per character
const DONE_PAUSE = 2000         // pause after narrative completes before loop

export function AnimatedTimeEntryCard() {
  const [phase, setPhase] = useState<Phase>('signals')
  const [visibleSignals, setVisibleSignals] = useState(0)
  const [narrative, setNarrative] = useState('')
  const [dotCount, setDotCount] = useState(1)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const runCycle = () => {
    // Reset state
    setPhase('signals')
    setVisibleSignals(0)
    setNarrative('')
    setDotCount(1)

    // Phase 1: reveal signals one by one
    let signalIndex = 0
    const revealNextSignal = () => {
      signalIndex++
      setVisibleSignals(signalIndex)
      if (signalIndex < SIGNALS.length) {
        timeoutRef.current = setTimeout(revealNextSignal, SIGNAL_ITEM_DELAY)
      } else {
        // All signals shown, wait remaining time then move to processing
        timeoutRef.current = setTimeout(() => {
          setPhase('processing')

          // Phase 2: processing — dot animation
          let dots = 1
          intervalRef.current = setInterval(() => {
            dots = (dots % 3) + 1
            setDotCount(dots)
          }, 300)

          timeoutRef.current = setTimeout(() => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setPhase('narrative')

            // Phase 3: typewriter
            let charIndex = 0
            const typeNext = () => {
              charIndex++
              setNarrative(NARRATIVE.slice(0, charIndex))
              if (charIndex < NARRATIVE.length) {
                timeoutRef.current = setTimeout(typeNext, TYPEWRITER_DELAY)
              } else {
                setPhase('done')
                timeoutRef.current = setTimeout(runCycle, DONE_PAUSE)
              }
            }
            timeoutRef.current = setTimeout(typeNext, TYPEWRITER_DELAY)
          }, PROCESSING_DURATION)
        }, SIGNALS_DISPLAY - SIGNALS.length * SIGNAL_ITEM_DELAY)
      }
    }

    timeoutRef.current = setTimeout(revealNextSignal, SIGNAL_ITEM_DELAY)
  }

  useEffect(() => {
    runCycle()
    return clearAll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Matter</p>
          <p className="text-sm font-semibold text-foreground">Smith v Jones</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</p>
          <p className="text-sm font-semibold text-foreground">Clayton &amp; Associates</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration</p>
          <p className="text-sm font-semibold text-primary">1h 22m</p>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 min-h-[160px]">
        {(phase === 'signals') && (
          <ul className="space-y-1.5" aria-label="activity signals">
            {SIGNALS.slice(0, visibleSignals).map((signal, i) => (
              <li
                key={i}
                className="font-mono text-xs text-muted-foreground animate-in fade-in duration-300"
              >
                {signal}
              </li>
            ))}
          </ul>
        )}

        {phase === 'processing' && (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <span
              className="inline-block w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin"
              aria-hidden="true"
            />
            <span>Analysing activity{'.'.repeat(dotCount)}</span>
          </div>
        )}

        {(phase === 'narrative' || phase === 'done') && (
          <pre
            className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed"
            aria-label="AI narrative"
          >
            {narrative}
            {phase === 'narrative' && (
              <span className="inline-block w-0.5 h-4 bg-primary ml-px align-middle animate-pulse" aria-hidden="true" />
            )}
          </pre>
        )}
      </div>

      {/* Footer badge */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-xs text-muted-foreground">Generated · ready for review</span>
      </div>
    </div>
  )
}
