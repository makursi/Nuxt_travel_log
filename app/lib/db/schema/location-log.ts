import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { location } from "./location";

export const locationLog = sqliteTable("locationLog", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  lat: real().notNull(),
  long: real().notNull(),
  locationId: int()
    .notNull()
    .references(() => location.id, { onDelete: "cascade" }),
  userId: int("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: int("created_at")
    .notNull()
    .$default(() => Date.now()),
  updatedAt: int("updated_at")
    .notNull()
    .$default(() => Date.now())
    .$onUpdate(() => Date.now()),
});
