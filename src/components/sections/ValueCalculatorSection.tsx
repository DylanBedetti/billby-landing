import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { BOOK_A_CALL_URL } from '@/lib/links'
import {
  calculateRoi,
  formatCurrency,
  formatCompactCurrency,
  DEFAULT_ROI_INPUTS,
  type RoiInputs,
} from '@/lib/roi'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  format: (value: number) => string
  hint?: string
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-semibold tabular-nums text-primary">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

const DRIVERS = [
  {
    key: 'recoveredBillableValue' as const,
    label: 'Recovered billable hours',
    swatch: 'bg-primary',
    blurb: 'Work that slips through today, now captured and billed.',
  },
  {
    key: 'reclaimedAdminValue' as const,
    label: 'Reclaimed admin time',
    swatch: 'bg-orange-400',
    blurb: 'Minutes a day off timesheets, back into billable work.',
  },
  {
    key: 'reducedWriteOffValue' as const,
    label: 'Revenue protected',
    swatch: 'bg-amber-300',
    blurb: 'Detailed, compliant narratives mean fewer disputes.',
  },
]

export function ValueCalculatorSection() {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_ROI_INPUTS)
  const [showAssumptions, setShowAssumptions] = useState(false)

  const set = (patch: Partial<RoiInputs>) =>
    setInputs((prev) => ({ ...prev, ...patch }))

  const result = calculateRoi(inputs)
  const total = result.totalAnnualValue || 1 // avoid divide-by-zero for bar widths

  return (
    <motion.section
      id="value-calculator"
      className="bg-orange-50/30 py-20 md:py-28 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="What Billby is worth"
          heading="See what Billby could add to your firm"
          subtext="Drag the sliders to match your firm. Every figure is an estimate you can tune, so adjust the assumptions to be as conservative as you like."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
          {/* ---------------- Inputs ---------------- */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-base font-semibold text-foreground">
              Your firm
            </h3>

            <div className="flex flex-col gap-6">
              <Slider
                label="Number of Fee Earners"
                value={inputs.feeEarners}
                min={5}
                max={200}
                step={1}
                onChange={(v) => set({ feeEarners: v })}
                format={(v) => `${v}`}
              />
              <Slider
                label="Average billable rate"
                value={inputs.billableRate}
                min={150}
                max={1200}
                step={10}
                onChange={(v) => set({ billableRate: v })}
                format={(v) => `$${v}/hr`}
              />
              <Slider
                label="Billable hours logged per day"
                value={inputs.billableHoursPerDay}
                min={1}
                max={12}
                step={0.5}
                onChange={(v) => set({ billableHoursPerDay: v })}
                format={(v) => `${v.toFixed(1)} hrs`}
                hint="Per fee earner, on an average working day."
              />
            </div>

            {/* Advanced assumptions */}
            <div className="mt-6 border-t border-border pt-5">
              <button
                type="button"
                onClick={() => setShowAssumptions((s) => !s)}
                aria-expanded={showAssumptions}
                className="flex w-full items-center justify-between text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>Adjust assumptions</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 transition-transform ${
                    showAssumptions ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {showAssumptions && (
                <div className="mt-5 flex flex-col gap-6">
                  <Slider
                    label="Daily Average Minutes spent on timesheets"
                    value={inputs.adminMinutesPerDay}
                    min={0}
                    max={60}
                    step={5}
                    onChange={(v) => set({ adminMinutesPerDay: v })}
                    format={(v) => `${v} min`}
                  />
                  <Slider
                    label="Extra billable time Billby captures"
                    value={inputs.captureUpliftRate}
                    min={0}
                    max={0.25}
                    step={0.01}
                    onChange={(v) => set({ captureUpliftRate: v })}
                    format={(v) => `${Math.round(v * 100)}%`}
                    hint="Uplift on hours billed. Work already done that today goes unrecorded."
                  />
                  <Slider
                    label="Revenue written off today"
                    value={inputs.currentWriteOffRate}
                    min={0}
                    max={0.25}
                    step={0.01}
                    onChange={(v) => set({ currentWriteOffRate: v })}
                    format={(v) => `${Math.round(v * 100)}%`}
                    hint="Work that gets recorded and invoiced, but is written down by the partner due to poor narration, or disputed by a client."
                  />
                  <Slider
                    label="Share Billby recovers"
                    value={inputs.writeOffReductionRate}
                    min={0}
                    max={0.6}
                    step={0.05}
                    onChange={(v) => set({ writeOffReductionRate: v })}
                    format={(v) => `${Math.round(v * 100)}%`}
                    hint="This is how much of that loss Billby claws back, because detailed, contemporaneous, guideline-compliant narratives survive partner review and client scrutiny."
                  />
                </div>
              )}
            </div>
          </div>

          {/* ---------------- Results ---------------- */}
          <div className="flex flex-col rounded-2xl bg-foreground p-6 text-white shadow-lg sm:p-8">
            <p className="text-sm font-medium text-white/70">
              Estimated additional revenue per year
            </p>
            <AnimatedNumber
              value={result.totalAnnualValue}
              format={formatCurrency}
              className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl"
            />

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <AnimatedNumber
                  value={result.perFeeEarnerValue}
                  format={formatCompactCurrency}
                  className="block text-2xl font-bold text-primary"
                />
                <p className="mt-1 text-xs text-white/60">per fee earner / year</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <AnimatedNumber
                  value={result.hoursReclaimedPerYear}
                  format={(v) => `${Math.round(v).toLocaleString('en-AU')}`}
                  className="block text-2xl font-bold text-primary"
                />
                <p className="mt-1 text-xs text-white/60">
                  admin hours given back / year
                </p>
              </div>
            </div>

            {/* Stacked breakdown bar */}
            <div className="mt-7">
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
                {DRIVERS.map((d) => (
                  <div
                    key={d.key}
                    className={`${d.swatch} h-full transition-all duration-500 ease-out`}
                    style={{ width: `${(result[d.key] / total) * 100}%` }}
                  />
                ))}
              </div>

              <ul className="mt-5 flex flex-col gap-4">
                {DRIVERS.map((d) => (
                  <li key={d.key} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${d.swatch}`}
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-white">
                          {d.label}
                        </span>
                        <AnimatedNumber
                          value={result[d.key]}
                          format={formatCurrency}
                          className="text-sm font-semibold tabular-nums text-white"
                        />
                      </div>
                      <p className="text-xs text-white/55">{d.blurb}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-7">
              <p className="text-sm font-medium text-white/70">
                Estimated Billby cost per year
              </p>
              <AnimatedNumber
                value={result.annualCost}
                format={formatCurrency}
                className="mt-1 block text-3xl font-bold tracking-tight sm:text-4xl"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/50">
                Estimate only for illustrative purposes based on your inputs.
                <br />
                Not a guarantee.
              </p>
              <Button
                variant="primary"
                size="md"
                href={BOOK_A_CALL_URL}
                target="_blank"
                className="w-full justify-center sm:w-auto"
              >
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
