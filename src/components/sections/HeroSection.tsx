import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { AnimatedTimeEntryCard } from '@/components/ui/AnimatedTimeEntryCard'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-4 sm:px-6 pt-24 md:pt-32 pb-20 bg-background"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column: copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          {/* Eyebrow */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Billing Intelligence
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
            Every billable minute.{' '}
            <span className="text-primary">Captured.</span>{' '}
            Automatically.
          </h1>

          {/* Subtext */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Billby captures work as it happens and creates complete, client-ready
            time entries with detailed narratives. Reduce write-offs. Bill
            faster. Recover lost revenue.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-3 items-start">
            <Button variant="primary" size="lg" href="#book">
              Book a Call
            </Button>
            <p className="text-sm text-muted-foreground">
              Free 20-minute demo · No commitment
            </p>
          </div>
        </motion.div>

        {/* Right column: animated card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="flex justify-center items-center relative"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, #7C3AED 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative w-full">
            <AnimatedTimeEntryCard />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
