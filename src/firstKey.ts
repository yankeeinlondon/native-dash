import { IDictionary } from "./IDictionary";
/**
 * **firstKey**
 *
 * returns the _first_ key in a dictionary
 */
export function firstKey(dict: IDictionary): undefined | (string & keyof typeof dict) {
  return Object.keys(dict).slice(0, 1).pop();
}
