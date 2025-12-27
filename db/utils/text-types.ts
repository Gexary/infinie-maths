import { customType } from "drizzle-orm/pg-core";

// CREATE EXTENSION IF NOT EXISTS citext;

export const lowercaseText = customType<{ data: string; driverData: string }>({
  dataType() {
    return "citext";
  },

  // Convert string to lowercase when writing to database
  toDriver(value: string): string {
    return value.toLowerCase();
  },
});

export const slugType = (name: string = "slug") => lowercaseText(name).notNull();
