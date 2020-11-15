/**
 * Capitalizes the first character of the string passed in
 */
export function capitalize(input: string) {
  if (typeof input !== "string") {
    throw new Error(
      `Failed to capitalize "${input}" as it was not of type "string" [${typeof input}]`
    );
  }
  return input.slice(0, 1).toUpperCase() + input.slice(1);
}
