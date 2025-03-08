import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  description: text("description").notNull().default(""),
  isAllDay: boolean("is_all_day").notNull().default(false),
  startTime: text("start_time"),
  endTime: text("end_time"),
  notifyUser: boolean("notify_user").notNull().default(true),
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  date: true,
  description: true,
  isAllDay: true,
  startTime: true,
  endTime: true,
  notifyUser: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export const WeatherCondition = {
  Clear: "Clear",
  Clouds: "Clouds",
  Rain: "Rain",
  Snow: "Snow",
  Thunderstorm: "Thunderstorm",
  Drizzle: "Drizzle",
  Mist: "Mist",
} as const;

export type WeatherCondition = keyof typeof WeatherCondition;

export const TimeOfDay = {
  Morning: "morning",
  Evening: "evening",
  Night: "night",
} as const;

export type TimeOfDay = keyof typeof TimeOfDay;