/**
 * Capitalizes the first character of the string passed in
 */
export function capitalize(input: string) {
  return input.slice(0, 1).toUpperCase() + input.slice(1);
}
