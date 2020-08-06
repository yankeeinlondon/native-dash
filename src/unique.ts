import { IDictionary } from "./index";

/**
 * Provides the unique values for a given property in an array of
 * commonly typed objects.
 *
 * @param list the list of objects
 * @param property the property to evaluate
 */
export function unique<T extends IDictionary = any>(list: T[], property: keyof T & string) {
  return Array.from(new Set<T>(list.map((i) => i[property])));
}
