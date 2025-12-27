import slugify from "slugify";

export function convertToSlug(value: string) {
  return slugify(value, { lower: true, strict: true });
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
