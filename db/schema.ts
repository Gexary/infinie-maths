

import { sql } from "drizzle-orm";
import { user } from "./auth-schema";
import { bigint, boolean, char, check, doublePrecision, integer, numeric, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { integerId } from "@/db/schema/global-schema";
import { filterRarities, filterTags } from "@/db/schema/filter-schema";

export const chapters = pgTable(
  "chapters",
  {
    id: idType("id"),
    slug: text("name").notNull(),
    title: text("name").notNull(),
    description: text("slug").notNull().unique("unique_game_slug"),
    levelId: text("levelId")
      .notNull()
      .references(() => levels.id),

    isPublic: boolean("is_public").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    position: doublePrecision().unique().notNull(),
  },
  (t) => [check("check_game_position", sql`position >= 0`)]
);

export const levels = pgTable(
  "levels",
  {
    id: idType("id"),
    slug: text("name").notNull(),
    title: text("name").notNull(),
    description: text("slug").notNull().unique("unique_game_slug"),
    annotation: text("annotation"),

    isPublic: boolean("is_public").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    position: doublePrecision().unique().notNull(),
  },
  (t) => [check("check_game_position", sql`position >= 0`)]
);
