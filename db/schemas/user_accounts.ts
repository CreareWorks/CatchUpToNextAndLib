import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

// アプリケーションで一意を特定するためのID
export const userAccounts = pgTable("user_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull()
});