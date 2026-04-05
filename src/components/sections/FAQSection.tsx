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
    answer: "Billby stores data in Australia. Data is not transferred or stored outside Australia."
  },
  {
    question: "What data leaves the device?",
    answer: "Activity data and generated time entries are synced to the cloud. Contextual captures are processed to extract relevant information and are never shared with anyone outside your firm. All captures and activity data are permanently deleted after your timesheet is submitted, or at end of day (whichever comes earlier). Data is never used to train models or accessible by third parties."
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
    question: "How does Billby approach security and compliance?",
    answer: "We're actively working towards SOC 2 Type II. Billby is already designed to meet the same security standards, with data isolation, encryption, and strict controls around how data is used."
  },
  {
    question: "Can lawyers control when tracking is active?",
    answer: "Yes. Tracking is always under the lawyer's control. It can be paused or stopped at any time."
  },
  {
    question: "What happens to captures after the timesheet is submitted?",
    answer: "All contextual captures are automatically deleted after the timesheet is submitted. Nothing is retained, and deletion is enforced at the infrastructure level."
  },
  {
    question: "Is Billby available for on-premises deployment?",
    answer: "Billby is a cloud-hosted product and is not available for on-premises deployment. Data is stored in Australia and not transferred outside the region."
  },
  {
    question: "How long is data retained?",
    answer: "Contextual captures are not retained and are deleted after processing. Generated time entries are retained as part of your firm's records."
  },
  {
    question: "Who can access our data?",
    answer: "Access to data is restricted and tightly controlled. It is not accessible to other customers or third parties, and is not used for model training. Any access by Billby is limited to what's required to operate and support the service."
  },
  {
    question: "Does Billby access or store client documents?",
    answer: "Billby does not store client documents. Content is processed only where needed to generate time entries, and captures are not retained."
  },
  {
    question: "Can certain matters or applications be excluded?",
    answer: "Yes. Billby can be configured to exclude specific applications or workflows, giving firms control over what is captured, and lawyers can turn Billby off at any time."
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
            subtext="We've designed Billby with enterprise security requirements in mind. Here are the answers on how Billby handles data, security, and deployment."
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
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
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
