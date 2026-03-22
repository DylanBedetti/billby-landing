import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

const steps = [
  {
    number: 1,
    title: 'Runs silently in the background',
    description:
      'Billby installs on Windows and tracks active applications, documents, and context throughout your day. No manual input. No browser extensions. No integrations to configure before you start.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10"
        aria-hidden="true"
      >
        {/* Monitor screen */}
        <rect x="6" y="8" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
        {/* Screen content lines */}
        <line x1="13" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="21" x2="24" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Stand */}
        <line x1="24" y1="32" x2="24" y2="39" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="39" x2="32" y2="39" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'AI stitches your day together',
    description:
      'Agentic AI correlates all your signals into coherent, accurate time narratives that are detailed enough to bill and specific enough to defend.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10"
        aria-hidden="true"
      >
        {/* Central node */}
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2.5" />
        {/* Outer nodes */}
        <circle cx="10" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="34" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="34" r="3" stroke="currentColor" strokeWidth="2" />
        {/* Connecting lines */}
        <line x1="13" y1="16" x2="20" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="35" y1="16" x2="28" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="13" y1="32" x2="20" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="35" y1="32" x2="28" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        {/* Sparkle dots */}
        <circle cx="24" cy="9" r="1.5" fill="currentColor" />
        <circle cx="24" cy="39" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Review and submit',
    description:
      'At the end of the day, your complete timesheet is ready. Review, adjust if needed, and submit directly to Clio, LEAP, or your practice management platform.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10"
        aria-hidden="true"
      >
        {/* Circle background */}
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
        {/* Checkmark */}
        <polyline
          points="15,24 21,30 33,18"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="bg-background py-20 md:py-28 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="How it works"
          heading="From activity to invoice — automatically"
          subtext="Billby works in the background so you don't have to think about timekeeping at all."
          align="center"
          className="mb-16"
        />

        {/* Steps container */}
        <div className="relative flex flex-col gap-10 md:flex-row md:gap-0 md:items-start">

          {/* Desktop connector line — sits behind the cards */}
          <div
            className="hidden md:block absolute top-4 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-primary/30"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center flex-1 px-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.15 }}
            >
              {/* Step number badge */}
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold leading-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                {step.description}
              </p>

              {/* Mobile connector (vertical dashed line below, except last) */}
              {i < steps.length - 1 && (
                <div
                  className="md:hidden mt-8 h-8 w-px border-l-2 border-dashed border-primary/30"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
