import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnimatedNumber } from './AnimatedNumber'

describe('AnimatedNumber', () => {
  it('renders the target value on first paint via the formatter', () => {
    render(<AnimatedNumber value={1234} format={(v) => `$${Math.round(v)}`} />)
    expect(screen.getByText('$1234')).toBeInTheDocument()
  })

  it('applies the provided className', () => {
    render(
      <AnimatedNumber
        value={5}
        format={(v) => `${Math.round(v)}`}
        className="text-primary"
      />,
    )
    expect(screen.getByText('5')).toHaveClass('text-primary')
  })
})
