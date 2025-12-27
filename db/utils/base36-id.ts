import { base36ToUuid, uuidToBase36 } from "@/lib/base36-converter";
import { customType, type PgColumn } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const base36UUID = customType<{
  data: string;
  driverData: string;
}>({
  dataType() {
    return "uuid";
  },

  // Convert base36 string to UUID when writing to database
  toDriver(value: string): string {
    return base36ToUuid(value);
  },

  // Convert UUID from database to base36 string
  fromDriver(value: string): string {
    return uuidToBase36(value);
  },
});

export const base36Id = (name: string = "id") =>
  base36UUID(name)
    .notNull()
    .$default(() => /* @__PURE__ */ uuidToBase36(uuidv7()))
    .primaryKey();

export const base36IdRef = (name: string, ref: PgColumn, notNull = true) => {
  const col = base36UUID(name).references(() => ref);
  if (notNull) col.notNull();
  return col;
};
