import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FeatureCard } from '@/components/ui/FeatureCard'

const features: { title: string; description: string; iconClassName: string; icon: ReactNode }[] = [
  {
    title: 'Automatic capture',
    iconClassName: 'bg-orange-100 text-orange-700',
    description:
      'Tracks every application, document, and context switch across your day. Works from day one with no plugins or browser extensions. Optional integrations can improve accuracy further, but Billby works out of the box.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  },
  {
    title: 'Understands your work',
    iconClassName: 'bg-sky-100 text-sky-700',
    description:
      'Billby captures your workflow across the tools you use, enabling highly accurate time entries without manual input.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Ready-to-bill entries',
    iconClassName: 'bg-indigo-100 text-indigo-700',
    description:
      'Billby writes detailed, accurate time entries that reflect your work and demonstrate its value to clients, linked to the right matter and ready to bill.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Timesheets done in minutes',
    iconClassName: 'bg-amber-100 text-amber-700',
    description:
      'At the end of your day, your complete timesheet is ready. Review, edit if needed, and submit in minutes, with no end-of-day scramble.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Works with your systems',
    iconClassName: 'bg-emerald-100 text-emerald-700',
    description:
      'Billby integrates with your existing billing and practice management tools, so time entries flow straight into your current workflow.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
  {
    title: 'Enterprise-ready security',
    iconClassName: 'bg-stone-100 text-stone-600',
    description:
      'Designed for legal confidentiality. Data is siloed and encrypted, not used to train models, and handled in line with firm and client requirements.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-orange-50/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center"
        >
          <SectionHeader
            eyebrow="Features"
            heading="Billby handles time recording, so lawyers can focus on the work"
            subtext="No timers, no reconstruction, no behaviour change required. Just your work, captured automatically, accurately and ready to bill."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconClassName={feature.iconClassName}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
