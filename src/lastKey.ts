import { IDictionary } from "./IDictionary";
/**
 * **lastKey**
 *
 * returns the _last_ key in a dictionary
 */
export function lastKey(dict: IDictionary): undefined | (string & keyof typeof dict) {
  return Object.keys(dict).slice(-1).pop();
}
