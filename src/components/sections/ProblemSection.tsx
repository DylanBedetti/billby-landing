import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatCounter } from '@/components/ui/StatCounter'

const stats = [
  {
    value: 2.9,
    decimals: 1,
    suffix: 'hrs',
    label: 'Average billable hours logged per day — despite working far longer',
  },
  {
    value: 31,
    suffix: '%',
    label: 'Share of work time that converts to collected revenue',
  },
  {
    value: 50,
    suffix: '%',
    label: 'Of billable time lost when entries are reconstructed from memory',
  },
]

export function ProblemSection() {
  return (
    <motion.section
      id="problem"
      className="bg-background py-20 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="The hidden cost"
          heading="How much are you leaving on the table?"
          subtext="Lawyers work long hours. But manual timekeeping means a significant portion of that work never makes it onto an invoice."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl bg-card p-8 shadow-md"
            >
              <StatCounter
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>

        <p className="mt-6 text-right text-xs text-muted-foreground">
          Source: Clio Legal Trends Report
        </p>

        <p className="mt-8 text-center text-base text-muted-foreground max-w-2xl mx-auto">
          For a lawyer billing at $450/hr, that's over $80,000 in unrealised revenue every year —
          silently lost to the end-of-day struggle to remember what you did.
        </p>
      </div>
    </motion.section>
  )
}
