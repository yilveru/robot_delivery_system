import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { client } from "@/db/client";

export const db = drizzle(client, { schema });