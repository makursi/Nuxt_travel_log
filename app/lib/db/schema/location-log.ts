import { defineRelations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { location } from "./location";
import { locationLogImage } from "./location-log-image";

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

export const locationLogRelations = defineRelations(
  locationLog,
  ({ one, many }) => ({
    location: one(location, {
      fields: [locationLog.locationId],
      references: [location.id],
    }),
    images: many(locationLogImage),
  }),
);
