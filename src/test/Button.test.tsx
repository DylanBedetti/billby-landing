import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies primary variant classes', () => {
    render(<Button variant="primary">Primary</Button>)
    const btn = screen.getByText('Primary')
    expect(btn.className).toContain('bg-primary')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByText('Secondary')
    expect(btn.className).toContain('border-primary')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByText('Ghost')
    expect(btn.className).toContain('text-primary')
    // ghost uses border-transparent, not a solid bg-primary fill
    expect(btn.className).toContain('border-transparent')
  })

  it('fires onClick when clicked', () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does NOT fire onClick when disabled', () => {
    const handler = vi.fn()
    render(<Button disabled onClick={handler}>Disabled</Button>)
    // The button element has disabled attribute so click won't fire
    fireEvent.click(screen.getByText('Disabled'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('renders as an anchor tag when href is provided', () => {
    render(<Button href="https://example.com">Link</Button>)
    const anchor = screen.getByText('Link')
    expect(anchor.tagName).toBe('A')
    expect(anchor).toHaveAttribute('href', 'https://example.com')
  })
})
