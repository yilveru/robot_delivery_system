import "dotenv/config";
import { Pool } from "pg";
import { dbCredentials } from "@/db/dbCredentials";

export const client = new Pool(dbCredentials);