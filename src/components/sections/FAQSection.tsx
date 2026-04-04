import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    question: "Where is our data stored?",
    answer: "Billby provides data residency configuration, allowing your firm to control which region your data is stored in. We do not transfer or replicate data outside your configured region."
  },
  {
    question: "What data leaves the device?",
    answer: "Activity signals and time narratives are synced to the cloud within your configured data residency region. Contextual captures are processed to extract relevant information and are never shared with anyone outside your firm. All captures are permanently deleted after your timesheet is submitted."
  },
  {
    question: "Can we deploy Billby via MDM?",
    answer: "Yes. Billby supports MDM deployment on Windows, making firm-wide rollout straightforward for IT teams. We provide configuration profiles and documentation to support your rollout."
  },
  {
    question: "What AI model processes our data?",
    answer: "We use enterprise-grade AI infrastructure with data processing agreements in place. Your firm's data is never used to train external models, and all processing occurs within our secured, sovereignty-compliant environment."
  },
  {
    question: "What compliance certifications does Billby hold?",
    answer: "We are actively pursuing SOC 2 Type II certification. We are happy to walk through our current security posture, controls, and roadmap in detail on a call."
  },
  {
    question: "Can lawyers control when tracking is active?",
    answer: "Yes. Tracking is entirely in each lawyer's control. They can pause or stop at any time from the menu bar icon. Firms cannot force tracking on — lawyer consent is built into the product."
  },
  {
    question: "What happens to captures after the timesheet is submitted?",
    answer: "All contextual captures are permanently and automatically deleted after the lawyer submits their timesheet. Nothing is retained. This is enforced at the infrastructure level, not just policy."
  },
  {
    question: "Is Billby available for on-premises deployment?",
    answer: "Billby is currently a cloud-hosted product. On-premises deployment is not available. Data residency configuration is available to ensure your data stays in your required region."
  }
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center"
        >
          <SectionHeader
            eyebrow="Security & IT"
            heading="Questions your IT team will ask"
            subtext="We've designed Billby with enterprise security requirements in mind. Here are the answers to the questions we hear most."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-[800px]"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
