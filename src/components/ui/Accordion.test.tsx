import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion'

function TestAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Question one</AccordionTrigger>
        <AccordionContent>Answer one</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question two</AccordionTrigger>
        <AccordionContent>Answer two</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Question three</AccordionTrigger>
        <AccordionContent>Answer three</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('renders all questions', () => {
    render(<TestAccordion />)
    expect(screen.getByText('Question one')).toBeInTheDocument()
    expect(screen.getByText('Question two')).toBeInTheDocument()
    expect(screen.getByText('Question three')).toBeInTheDocument()
  })

  it('answers are hidden initially', () => {
    render(<TestAccordion />)
    const triggers = screen.getAllByRole('button')
    triggers.forEach(trigger => {
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })
  })

  it('clicking a question shows its answer', async () => {
    const user = userEvent.setup()
    render(<TestAccordion />)

    await user.click(screen.getByText('Question one'))

    expect(screen.getByText('Answer one')).toBeVisible()
  })

  it('clicking the same question again hides its answer', async () => {
    const user = userEvent.setup()
    render(<TestAccordion />)

    const trigger = screen.getByText('Question one')
    await user.click(trigger)
    expect(trigger.closest('button')).toHaveAttribute('data-state', 'open')

    await user.click(trigger)
    expect(trigger.closest('button')).toHaveAttribute('data-state', 'closed')
  })

  it('clicking a second question closes the first', async () => {
    const user = userEvent.setup()
    render(<TestAccordion />)

    await user.click(screen.getByText('Question one'))
    await user.click(screen.getByText('Question two'))

    const trigger1 = screen.getByText('Question one').closest('button')
    const trigger2 = screen.getByText('Question two').closest('button')
    expect(trigger1).toHaveAttribute('data-state', 'closed')
    expect(trigger2).toHaveAttribute('data-state', 'open')
  })
})
