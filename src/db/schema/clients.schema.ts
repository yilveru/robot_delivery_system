import {
  pgTable,
  serial,
  varchar,
  text,
} from 'drizzle-orm/pg-core'

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  address: text('address'),
})