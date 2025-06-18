import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const threads = sqliteTable("threads", {
  id: text("id").notNull().primaryKey(),
  title: text("title"),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  last_message_at: int("last_message_at"),
  parent_thread_id: text("parent_thread_id"),
  status: text("status").notNull().default("ready"), // 'ready', 'streaming', 'error'
  deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  pinned: int("pinned", { mode: "boolean" }).notNull().default(false),
  clock: int("clock").notNull(),
});

export const messages = sqliteTable("messages", {
  id: text("id").notNull().primaryKey(),
  data: text("data", { mode: "json" }),
  role: text("role").notNull(), // 'user', 'assistant', 'system'
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  error: text("error"),
  deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  thread_id: text("thread_id").notNull(),
  index: int("index").notNull(),
  clock: int("clock").notNull(),
  stream_id: text(),
});

export const kv = sqliteTable("kv", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull().unique(),
  value: text("value"),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  clock: int("clock").notNull(),
});

export const attachments = sqliteTable("attachments", {
  id: text("id").notNull().primaryKey(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  created_at: int("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: int("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
  deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  clock: int("clock").notNull(),
});
