import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { locationLog } from "./location-log";

export const locationLogImage = sqliteTable("locationLogImage", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  locationLogId: int()
    .notNull()
    .references(() => locationLog.id, { onDelete: "cascade" }),
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
