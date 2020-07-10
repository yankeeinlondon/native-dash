import { IDictionary } from "./IDictionary";
/**
 * **lastKey**
 *
 * returns the _last_ key in a dictionary
 */
export function lastKey<T = any>(dict: IDictionary<T>) {
  return Object.keys(dict).slice(-1);
}
