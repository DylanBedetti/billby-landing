import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatCounter } from './StatCounter'

// IntersectionObserver is mocked in src/test/setup.ts (MockIntersectionObserver never fires
// callbacks, so the animation never starts and the display value stays at 0)

describe('StatCounter', () => {
  it('renders without errors', () => {
    render(<StatCounter value={42} label="Test label" />)
    expect(screen.getByText('Test label')).toBeInTheDocument()
  })

  it('displays the correct label', () => {
    render(<StatCounter value={31} suffix="%" label="Share of work time" />)
    expect(screen.getByText('Share of work time')).toBeInTheDocument()
  })

  it('displays the correct suffix', () => {
    render(<StatCounter value={50} suffix="%" label="Some label" />)
    const span = document.querySelector('span')
    expect(span?.textContent).toContain('%')
  })

  it('displays the correct prefix', () => {
    render(<StatCounter value={80} prefix="$" label="Some label" />)
    const span = document.querySelector('span')
    expect(span?.textContent).toContain('$')
  })

  it('starts at or near 0 initially (before intersection fires)', () => {
    render(<StatCounter value={100} label="Test label" />)
    // IntersectionObserver mock never fires, so value stays at 0
    const span = document.querySelector('span')
    const numericText = span?.textContent?.replace(/[^0-9.]/g, '') ?? ''
    const numericValue = parseFloat(numericText)
    expect(numericValue).toBeLessThanOrEqual(5)
  })

  it('renders decimal values correctly when decimals prop is set', () => {
    render(<StatCounter value={2.9} decimals={1} suffix="hrs" label="Hours logged" />)
    const span = document.querySelector('span')
    // Before animation fires, shows 0.0
    expect(span?.textContent).toContain('0.0')
    expect(span?.textContent).toContain('hrs')
  })
})
