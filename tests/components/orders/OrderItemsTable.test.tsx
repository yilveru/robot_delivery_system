import React from 'react'
import { render, screen } from '@testing-library/react'
import OrderItemsTable from '@/components/orders/OrderItemsTable'

describe('OrderItemsTable', () => {
  const mockItems = [
    { quantity: 2, description: 'Pizza', unitPrice: 10 },
    { quantity: 1, description: 'Soda', unitPrice: 5 },
  ]

  it('should render table headers', () => {
    render(<OrderItemsTable items={mockItems} />)

    expect(screen.getByText('Quantity')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('unitPrice')).toBeInTheDocument()
  })

  it('should render table rows with items', () => {
    render(<OrderItemsTable items={mockItems} />)

    expect(screen.getByText('Pizza')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()

    expect(screen.getByText('Soda')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should calculate and render total', () => {
    render(<OrderItemsTable items={mockItems} />)

    const total = (2 * 10 + 1 * 5).toFixed(2)
    expect(screen.getByText(`$${total}`)).toBeInTheDocument()
  })

  it('should show $0.00 when no items are passed', () => {
    render(<OrderItemsTable items={[]} />)
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })
})

it('should match snapshot', () => {
  const { asFragment } = render(
    <OrderItemsTable
      items={[
        { quantity: 1, description: 'Burger', unitPrice: 8 },
        { quantity: 2, description: 'Fries', unitPrice: 3 },
      ]}
    />
  )

  expect(asFragment()).toMatchSnapshot()
})