import { pgTable, serial, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  source: varchar("source", { length: 50 }).default("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: varchar("image", { length: 500 }),
  proStatus: boolean("pro_status").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const palettes = pgTable("palettes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  keyword: varchar("keyword", { length: 255 }),
  tags: varchar("tags", { length: 500 }),
  colors: jsonb("colors").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
