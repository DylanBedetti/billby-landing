import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionHeader } from '@/components/ui/SectionHeader'

describe('SectionHeader', () => {
  it('renders heading text', () => {
    render(<SectionHeader heading="My Heading" />)
    expect(screen.getByRole('heading', { name: 'My Heading' })).toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(<SectionHeader heading="Heading" eyebrow="Eyebrow Label" />)
    expect(screen.getByText('Eyebrow Label')).toBeInTheDocument()
  })

  it('omits eyebrow when not provided', () => {
    render(<SectionHeader heading="Heading" />)
    // No eyebrow span should be present
    const spans = document.querySelectorAll('span')
    expect(spans.length).toBe(0)
  })

  it('renders subtext when provided', () => {
    render(<SectionHeader heading="Heading" subtext="Some subtext here" />)
    expect(screen.getByText('Some subtext here')).toBeInTheDocument()
  })

  it('omits subtext when not provided', () => {
    render(<SectionHeader heading="Heading" />)
    const paragraphs = document.querySelectorAll('p')
    expect(paragraphs.length).toBe(0)
  })

  it('applies center alignment by default', () => {
    render(<SectionHeader heading="Heading" />)
    const container = screen.getByRole('heading').parentElement
    expect(container?.className).toContain('text-center')
  })

  it('applies left alignment when specified', () => {
    render(<SectionHeader heading="Heading" align="left" />)
    const container = screen.getByRole('heading').parentElement
    expect(container?.className).toContain('text-left')
  })
})
