import {
  pgTable,
  serial,
  varchar,
  text,
  pgEnum,
} from 'drizzle-orm/pg-core'

export const enumRobotStatus = pgEnum("enumRobotStatus", [
  "available",
  "busy",
  "offline",
]);

export const robots = pgTable('robots', {
  id: serial('id').primaryKey(),
  robotId: varchar('robot_id', { length: 100 }).notNull().unique(), // external/internal ID
  status: enumRobotStatus('status').notNull(), // 'available', 'busy', 'offline'
  lastKnownLocation: text('last_known_location'), // optional string or coordinates
})
