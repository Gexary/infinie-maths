const CHARS = "0123456789abcdefghijklmnopqrstuvwxyz";

function base36ToBigInt(base36: string): bigint {
  let result = 0n;
  for (const char of base36.toLowerCase()) result = result * 36n + BigInt(CHARS.indexOf(char));
  return result;
}

/**
 * Convert a UUID to a base36 string
 * @param uuid - The UUID to convert
 * @returns The base36 string representation of the UUID
 */
export const uuidToBase36 = (uuid: string) =>
  BigInt("0x" + uuid.replace(/-/g, ""))
    .toString(36)
    .toUpperCase();

/**
 * Convert a base36 string to a UUID
 * @param base36 - The base36 string to convert
 * @returns The UUID representation of the base36 string
 */
export const base36ToUuid = (base36: string) => {
  const hex = base36ToBigInt(base36).toString(16).padStart(32, "0");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};
