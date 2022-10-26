import { IsStringLiteral } from "inferred-types";
/**
 * Capitalizes the first character of the string passed in.
 *
 * **Note:** if input is a string literal than the typing
 * for the literal will be capitalized too
 */
export function capitalize<T extends Readonly<string>>(
  input: T
): IsStringLiteral<T> extends true ? Capitalize<T> : string {
  return (input.slice(0, 1).toUpperCase() + input.slice(1)) as IsStringLiteral<T> extends true
    ? Capitalize<T>
    : string;
}
