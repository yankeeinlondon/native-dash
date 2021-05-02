import { IDictionary } from "./IDictionary";
/**
 * **firstKey**
 *
 * returns the _first_ key in a dictionary or `false` if there are no
 * keys in the object passed in.
 */
export function firstKey<T extends {} = {}>(dict: T): keyof T | false {
  const key = Object.keys(dict).slice(0, 1).pop() as keyof T | undefined;
  return key ? key : false;
}
