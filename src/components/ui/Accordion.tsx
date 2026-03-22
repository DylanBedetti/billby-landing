import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function handleToggle(index: number) {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <div className={cn('w-full', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="border-b border-border">
            <button
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left font-medium text-foreground"
            >
              <span>{item.question}</span>
              <span
                className={cn(
                  'ml-4 shrink-0 transition-transform duration-200 text-primary text-xl leading-none',
                  isOpen ? 'rotate-45' : 'rotate-0'
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="pb-4 text-muted-foreground"
                    data-testid={`answer-${index}`}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
