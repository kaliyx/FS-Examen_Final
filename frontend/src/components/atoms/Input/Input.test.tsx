import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/atoms'

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input placeholder="Test input" />)
    const input = screen.getByDisplayValue('') as HTMLInputElement
    expect(input).toBeInTheDocument()
  })

  it('displays label when provided', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows error message when error prop is provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('handles input change', () => {
    const { container } = render(<Input />)
    const input = container.querySelector('input')
    if (input) {
      fireEvent.change(input, { target: { value: 'test value' } })
      expect(input.value).toBe('test value')
    }
  })
})
