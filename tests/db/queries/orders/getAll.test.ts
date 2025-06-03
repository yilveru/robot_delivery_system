import { describe, it, expect, vi } from 'vitest'

// Mock de '@/db'
vi.mock('@/db', () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        innerJoin: vi.fn(() => ({
          innerJoin: vi.fn(() => ({
            leftJoin: vi.fn(() => ({
              orderBy: vi.fn(() => [
                {
                  id: 1,
                  status: 'delivered',
                  completedAt: '2024-06-01T12:00:00Z',
                  clientId: 100,
                  clientName: 'Juan Pérez',
                  restaurantId: 200,
                  restaurantName: 'Pizzería Mario',
                  robotId: 300,
                  robotInternalId: 'R-001',
                  items: ['Pizza', 'Refresco'],
                },
              ]),
            })),
          })),
        })),
      })),
    })),
  },
}))

import { getAll } from '@/db/queries/orders/getAll'

describe('getAll orders', () => {
  it('should return a list of orders with joined data', async () => {
    const result = await getAll()

    expect(result).toEqual([
      {
        id: 1,
        status: 'delivered',
        completedAt: '2024-06-01T12:00:00Z',
        clientId: 100,
        clientName: 'Juan Pérez',
        restaurantId: 200,
        restaurantName: 'Pizzería Mario',
        robotId: 300,
        robotInternalId: 'R-001',
        items: ['Pizza', 'Refresco'],
      },
    ])
  })
})
