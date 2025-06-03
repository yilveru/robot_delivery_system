import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import OrderModal from '@/components/orders/OrderModal'

beforeEach(() => {
    global.fetch = vi.fn((url) => {
        if (url === '/api/clients') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { id: '1', firstName: 'John', lastName: 'Doe', address: '123 St' },
                ]),
            })
        }

        if (url === '/api/restaurants') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { id: '1', name: 'Pizzeria' },
                ]),
            })
        }

        if (url === '/api/orders') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        }

        return Promise.reject(new Error('Unknown URL'))
    }) as any
})

afterEach(() => {
    vi.clearAllMocks()
})

describe('OrderModal', () => {
    const mockOnClose = vi.fn()
    const mockOnSave = vi.fn()

    it('should render and submit valid form', async () => {
        render(<OrderModal onClose={mockOnClose} onSave={mockOnSave} />)

        await waitFor(() => {
            expect(screen.getByText('Create order')).toBeInTheDocument()
        })

        fireEvent.mouseDown(screen.getByText('Select Client'))
        fireEvent.click(await screen.findByText('John Doe / 123 St'))

        fireEvent.mouseDown(screen.getByText('Select Restaurant'))
        fireEvent.click(await screen.findByText('Pizzeria'))

        fireEvent.change(screen.getByPlaceholderText('Quantity'), {
            target: { value: '2' },
        })
        fireEvent.change(screen.getByPlaceholderText('Description'), {
            target: { value: 'Pizza' },
        })
        fireEvent.change(screen.getByPlaceholderText('Unit Price'), {
            target: { value: '10' },
        })

        fireEvent.click(screen.getByText('Create'))

        await waitFor(() => {
            expect(screen.getByText('Order saved successfully!')).toBeInTheDocument()
        })
    })

    it('should show error if item fields are empty', async () => {
        render(<OrderModal onClose={mockOnClose} onSave={mockOnSave} />)

        await waitFor(() => {
            expect(screen.getByText('Create order')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Create'))

        await waitFor(() => {
            expect(screen.getByText('All item fields are required.')).toBeInTheDocument()
        })
    })

    it('should add and remove items', async () => {
        render(<OrderModal onClose={mockOnClose} onSave={mockOnSave} />)

        await waitFor(() => {
            expect(screen.getByText('Add item')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Add item'))
        const inputs = screen.getAllByPlaceholderText('Quantity')
        expect(inputs.length).toBe(2)

        // Eliminar ítem
        fireEvent.click(screen.getAllByText('Remove')[0])
        const inputsAfterDelete = screen.getAllByPlaceholderText('Quantity')
        expect(inputsAfterDelete.length).toBe(1)
    })
})
