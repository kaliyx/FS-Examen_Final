import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/atoms'

describe('Button Component', () => {
  it('renders button with label', () => {
    render(<Button label="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders button with children', () => {
    render(<Button>Children</Button>)
    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  it('handles click event', () => {
    const handleClick = vi.fn()
    render(<Button label="Click" onClick={handleClick} />)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalled()
  })

  it('shows loading state', () => {
    render(<Button label="Loading" loading />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })
})
