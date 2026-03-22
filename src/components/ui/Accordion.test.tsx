import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Accordion } from './Accordion'

const items = [
  { question: 'Question one', answer: 'Answer one' },
  { question: 'Question two', answer: 'Answer two' },
  { question: 'Question three', answer: 'Answer three' },
]

describe('Accordion', () => {
  it('renders all questions from props', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('Question one')).toBeInTheDocument()
    expect(screen.getByText('Question two')).toBeInTheDocument()
    expect(screen.getByText('Question three')).toBeInTheDocument()
  })

  it('answer is not visible initially', () => {
    render(<Accordion items={items} />)
    // All buttons should start collapsed
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
    // No answers rendered in DOM
    expect(screen.queryByTestId('answer-0')).not.toBeInTheDocument()
    expect(screen.queryByTestId('answer-1')).not.toBeInTheDocument()
  })

  it('clicking a question shows its answer', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button = screen.getByText('Question one').closest('button')!
    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('answer-0')).toBeInTheDocument()
    expect(screen.getByText('Answer one')).toBeInTheDocument()
  })

  it('clicking the same question again hides its answer', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button = screen.getByText('Question one').closest('button')!

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)
    // aria-expanded reflects closed state; Framer Motion may keep DOM during exit animation
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking a second question closes the first and opens the second', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button1 = screen.getByText('Question one').closest('button')!
    const button2 = screen.getByText('Question two').closest('button')!

    await user.click(button1)
    expect(button1).toHaveAttribute('aria-expanded', 'true')

    await user.click(button2)
    // First question is now closed, second is open
    expect(button1).toHaveAttribute('aria-expanded', 'false')
    expect(button2).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('answer-1')).toBeInTheDocument()
    expect(screen.getByText('Answer two')).toBeInTheDocument()
  })
})
