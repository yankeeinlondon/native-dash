/**
 * Provides the _keys_ of an object with the keys returned explicitly
 * as `keyof T`.
 */
export function keys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}
