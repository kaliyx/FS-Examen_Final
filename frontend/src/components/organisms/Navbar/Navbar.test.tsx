import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

beforeEach(() => {
  localStorage.removeItem('cart-storage')
})

describe('Navbar', () => {
  it('renders main links and logo', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    expect(screen.getByText(/HuertoHogar/i)).toBeInTheDocument()
  })
})
