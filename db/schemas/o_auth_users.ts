import { integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userAccounts } from "./user_accounts";

// 各Provider毎の情報を扱う
export const o_auth_users = pgTable("o_auth_users", {
  id: serial("id").primaryKey(),
  user_account_id: uuid("user_account_id").notNull().references(() => userAccounts.id, { onDelete: "cascade" }),
  provider_id: text("provider_id").unique().notNull(),
  provider_type: integer("provider_type").notNull(),
  name: text("name"),
  image: text("image"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull()
});