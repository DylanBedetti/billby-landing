import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders without errors', () => {
    render(<App />)
    // The app renders a div with min-h-screen class
    const root = document.querySelector('.min-h-screen')
    expect(root).toBeInTheDocument()
  })
})
