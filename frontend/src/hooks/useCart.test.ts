import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCart } from '@/hooks/useCart'

describe('useCart Hook', () => {
  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart())
    expect(result.current.items).toEqual([])
    expect(result.current.total).toBe(0)
    expect(result.current.itemCount).toBe(0)
  })

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart())
    const mockProduct = {
      id: '1',
      name: 'Tomate',
      description: 'Tomate rojo',
      price: 10,
      quantity: 100,
      category: 'vegetables',
      unit: 'kg',
    }

    act(() => {
      result.current.addToCart(mockProduct, 2)
    })

    expect(result.current.items.length).toBe(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart())
    const mockProduct = {
      id: '1',
      name: 'Tomate',
      description: 'Tomate rojo',
      price: 10,
      quantity: 100,
      category: 'vegetables',
      unit: 'kg',
    }

    act(() => {
      result.current.addToCart(mockProduct, 2)
      result.current.removeFromCart('1')
    })

    expect(result.current.items.length).toBe(0)
  })

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart())
    const mockProduct = {
      id: '1',
      name: 'Tomate',
      description: 'Tomate rojo',
      price: 10,
      quantity: 100,
      category: 'vegetables',
      unit: 'kg',
    }

    act(() => {
      result.current.addToCart(mockProduct, 2)
      result.current.updateItemQuantity('1', 5)
    })

    expect(result.current.items[0].quantity).toBe(5)
  })

  it('clears cart', () => {
    const { result } = renderHook(() => useCart())
    const mockProduct = {
      id: '1',
      name: 'Tomate',
      description: 'Tomate rojo',
      price: 10,
      quantity: 100,
      category: 'vegetables',
      unit: 'kg',
    }

    act(() => {
      result.current.addToCart(mockProduct, 2)
      result.current.clearCart()
    })

    expect(result.current.items.length).toBe(0)
  })
})
