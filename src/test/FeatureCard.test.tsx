import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeatureCard } from '@/components/ui/FeatureCard'

describe('FeatureCard', () => {
  it('renders title from props', () => {
    render(
      <FeatureCard
        icon={<span>icon</span>}
        title="Feature Title"
        description="Feature description"
      />,
    )
    expect(screen.getByText('Feature Title')).toBeInTheDocument()
  })

  it('renders description from props', () => {
    render(
      <FeatureCard
        icon={<span>icon</span>}
        title="Title"
        description="This is the description"
      />,
    )
    expect(screen.getByText('This is the description')).toBeInTheDocument()
  })

  it('renders icon content', () => {
    render(
      <FeatureCard
        icon={<span data-testid="test-icon">★</span>}
        title="Title"
        description="Desc"
      />,
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })
})
