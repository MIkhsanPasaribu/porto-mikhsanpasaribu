import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Koneksi ke Neon PostgreSQL via HTTP (serverless-compatible)
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

export type DB = typeof db;
