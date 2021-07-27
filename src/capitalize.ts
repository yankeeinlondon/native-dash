/**
 * Capitalizes the first character of the string passed in.
 * 
 * **Note:** if input is a string literal than the typing 
 * for the literal will be capitalized too
 */
export function capitalize<T extends string>(input: T): Capitalize<T> {
  return input.slice(0, 1).toUpperCase() + input.slice(1) as Capitalize<T>;
}
