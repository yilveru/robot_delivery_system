import {
  pgTable,
  serial,
  varchar,
  text,
} from 'drizzle-orm/pg-core'

export const restaurants = pgTable('restaurants', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  address: text('address'),
})
