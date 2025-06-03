import { vi, describe, it, expect } from 'vitest'

vi.mock('@/db', () => {
  return {
    db: {
      select: () => ({
        from: () => ({
          orderBy: () => [
            { id: 1, name: 'Pizzeria Mario' },
            { id: 2, name: 'Sushi Place' },
          ],
        }),
      }),
    },
  }
})

import { getAll } from '@/db/queries/restaurants'

describe('getAll restaurants', () => {
  it('should return a list of restaurants ordered by name', async () => {
    const result = await getAll()
    expect(result).toEqual([
      { id: 1, name: 'Pizzeria Mario' },
      { id: 2, name: 'Sushi Place' },
    ])
  })
})
