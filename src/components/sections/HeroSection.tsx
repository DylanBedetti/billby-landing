import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { BOOK_A_CALL_URL } from '@/lib/links'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="px-4 sm:px-6 pt-24 md:pt-32 pb-20 bg-background"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center gap-12 md:gap-16">
        {/* Headline + subtext + CTA */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 items-center text-center max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-foreground">
            Capture more time. Generate more revenue.
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Billby captures work as it happens and creates complete, client-ready
            time entries with detailed narratives. Reduce write-offs. Bill
            faster. Recover lost revenue.
          </p>

          <Button variant="primary" size="lg" href={BOOK_A_CALL_URL} target="_blank">
            Book a Call
          </Button>
        </motion.div>

        {/* Product demo */}
        {/* Desktop / tablet: embedded demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="relative w-full hidden md:block"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, hsl(24.6, 95%, 53.1%) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-card">
            <iframe
              src="https://capture.navattic.com/cmonxpklo000a04jv4mg084qk"
              data-navattic-demo-id="cmonxpklo000a04jv4mg084qk"
              allow="fullscreen"
              title="Billby product demo"
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>

        {/* Mobile: link to interactive demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="md:hidden"
        >
          <Button
            variant="secondary"
            size="lg"
            href="https://billby.navattic.com/7at0v35?g=cmonxqd11000a04jofbgb626p&s=0"
            target="_blank"
          >
            View interactive demo
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
