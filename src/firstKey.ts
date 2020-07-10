import { IDictionary } from "./IDictionary";
/**
 * **firstKey**
 *
 * returns the _first_ key in a dictionary
 */
export function firstKey<T = any>(dict: IDictionary<T>) {
  return Object.keys(dict).slice(0, 1);
}
