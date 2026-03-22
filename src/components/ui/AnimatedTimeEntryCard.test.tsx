import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { AnimatedTimeEntryCard } from './AnimatedTimeEntryCard'

// Timing constants (must match component)
// Signals: 4 items × 400ms = 1600ms to reveal all, then wait (2000 - 1600)=400ms
// Processing: 800ms
// Typewriter: ~280 chars × 18ms = ~5040ms
// Total to end of narrative: ~7840ms
// Done pause: 2000ms before loop

describe('AnimatedTimeEntryCard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders without errors', () => {
    render(<AnimatedTimeEntryCard />)
    // The card header with matter name should always be visible
    expect(screen.getByText('Smith v Jones')).toBeInTheDocument()
  })

  it('has the matter name visible in the card header', () => {
    render(<AnimatedTimeEntryCard />)
    expect(screen.getByText('Smith v Jones')).toBeInTheDocument()
    expect(screen.getByText('Clayton & Associates')).toBeInTheDocument()
    expect(screen.getByText('1h 22m')).toBeInTheDocument()
  })

  it('initially shows signal activity items', async () => {
    render(<AnimatedTimeEntryCard />)

    // Advance past the first signal reveal delay (400ms)
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText(/Microsoft Word/)).toBeInTheDocument()
  })

  it('shows multiple signals during signal phase', async () => {
    render(<AnimatedTimeEntryCard />)

    await act(async () => {
      // Advance enough time for all 4 signals to appear (4 * 400ms = 1600ms)
      vi.advanceTimersByTime(1800)
    })

    // Two signals mention Microsoft Word, so use getAllByText
    const wordItems = screen.getAllByText(/Microsoft Word/)
    expect(wordItems.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Adobe Acrobat — Smith_v_Jones_Brief\.pdf/)).toBeInTheDocument()
    expect(screen.getByText(/Outlook — Re: Settlement Offer/)).toBeInTheDocument()
  })

  it('eventually renders the narrative text after animations complete', async () => {
    render(<AnimatedTimeEntryCard />)

    // Advance through signals (2000ms) + processing (800ms) + typewriter
    // Stop before done-pause triggers loop (stop at 8500ms, loop is at ~9840ms)
    await act(async () => {
      vi.advanceTimersByTime(8500)
    })

    // Use querySelector since aria-label on pre doesn't work with getByLabelText
    const pre = document.querySelector('pre')
    expect(pre).toBeInTheDocument()
    expect(pre?.textContent).toContain('Smith v Jones')
  }, 15000)

  it('shows the AI narrative with matter and duration after full animation', async () => {
    render(<AnimatedTimeEntryCard />)

    // Advance through signals (2000ms) + processing (800ms) + typewriter (~5040ms)
    // but stop before the 2000ms done-pause that would trigger a loop
    await act(async () => {
      vi.advanceTimersByTime(8500)
    })

    const pre = document.querySelector('pre')
    expect(pre).toBeInTheDocument()
    expect(pre?.textContent).toContain('interlocutory')
    expect(pre?.textContent).toContain('Smith v Jones')
  }, 15000)
})
