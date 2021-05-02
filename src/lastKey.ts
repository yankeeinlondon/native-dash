import { IDictionary } from "./IDictionary";
/**
 * **lastKey**
 *
 * returns the _last_ key in a dictionary or `false` if there are no
 * keys in object passed in.
 */
export function lastKey<T extends {}>(dict: T): keyof T | false {
  const key = Object.keys(dict).slice(-1).pop() as keyof T | undefined;
  return key ? key : false;
}
