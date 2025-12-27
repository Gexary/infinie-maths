import { bigint } from "drizzle-orm/pg-core";

export const positionType = () => bigint({ mode: "bigint" });
