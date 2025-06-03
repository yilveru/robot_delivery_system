import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import OrderItemsModal from '@/components/orders/OrderItemsModal'

describe('OrderItemsModal', () => {
  const mockItems = [
    { name: 'Pizza', quantity: 1, description: 'Delicious cheese pizza', unitPrice: 12.99 },
    { name: 'Soda', quantity: 2, description: 'Refreshing soda drink', unitPrice: 2.5 },
  ]

  const mockOnClose = vi.fn()

  it('should render modal with order items and close button', () => {
    render(<OrderItemsModal itemsData={mockItems} orderId={123} onClose={mockOnClose} />)

    // validate modal title
    expect(screen.getByText('Order Items')).toBeInTheDocument()

    // validate id of the order
    expect(screen.getByText(/Items in this order 123/)).toBeInTheDocument()

    // "Close" button should be present
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('should call onClose when the button is clicked', () => {
    render(<OrderItemsModal itemsData={mockItems} orderId={123} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
