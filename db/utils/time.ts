import { timestamp } from "drizzle-orm/pg-core";

export const updateTimestamp = (name: string = "updated_at") =>
  timestamp(name)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull();

export const createdTimestamp = (name: string = "created_at") => timestamp(name).defaultNow().notNull();
