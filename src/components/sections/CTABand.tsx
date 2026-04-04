import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function CTABand() {
  return (
    <section id="book" className="w-full bg-primary py-24">
      <motion.div
        className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Stop reconstructing your day. Start capturing it.
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl">
          See how Billby works for your firm. Book a 20-minute call with our team.
        </p>
        <Button variant="white" size="lg" href="#book">
          Book a Call
        </Button>
      </motion.div>
    </section>
  )
}
