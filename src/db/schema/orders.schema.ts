import {
  pgTable,
  serial,
  integer,
  timestamp,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core'

import { clients } from "@/db/schema/clients.schema";
import { restaurants } from "@/db/schema/restaurants.schema";
import { robots } from "@/db/schema/robots.schema";

export const enumOrderStatus = pgEnum("enumOrderStatus", [
  "pending",
  "assigned",
  "picked_up",
  "delivered",
  "completed",
]);

// Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id')
    .notNull()
    .references(() => clients.id),
  restaurantId: integer('restaurant_id')
    .notNull()
    .references(() => restaurants.id),
  robotId: integer('robot_id')
    .references(() => robots.id),
  items: jsonb('items').notNull(), // array of { quantity, description, unitPrice }
  status: enumOrderStatus('status').notNull(), // pending, assigned, picked_up, delivered, completed
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
})
