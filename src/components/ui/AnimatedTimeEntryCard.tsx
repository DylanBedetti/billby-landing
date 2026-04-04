import { useAnimationCycle } from '@/hooks/useAnimationCycle'

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

export function AnimatedTimeEntryCard() {
  const { phase, visibleSignals, narrative, dotCount } = useAnimationCycle({
    signals: SIGNALS,
    narrative: NARRATIVE,
  })

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
            {SIGNALS.slice(0, visibleSignals).map((signal) => (
              <li
                key={signal}
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
