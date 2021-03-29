/**
 * Converts a utf-8 string into Base64
 *
 * @param input any string based input
 */
export function toBase64(input: string) {
  const buffer = Buffer.from(input, "utf-8");
  return buffer.toString("base64");
}

/** a string encoded as Base64 */
export type base64 = string;

/**
 * Converts a base64 string to utf-8.
 *
 * @param input a base64 string
 * @param isJson flag to indicate that the converted payload should be treated as JSON
 * and converted to a javascript object
 */
export function fromBase64<T extends string | object>(
  input: base64,
  isJson: boolean = false
) {
  const buffer = Buffer.from(input, "base64");
  return isJson
    ? (JSON.parse(buffer.toString("utf-8")) as T)
    : (buffer.toString("utf-8") as T);
}
