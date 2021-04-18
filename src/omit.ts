export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * **omit**
 *
 * Removes/omits properties of an object and returns a shallow copy with props
 * removed and with typescript types updated to reflect this removal.
 *
 * @param obj the starting state object
 * @param removals an array of properties to be removed from the object
 */
export function omit<T extends {}, K extends Array<keyof T>>(obj: T, ...removals: K) {
  const untyped = removals as Array<unknown>;
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !untyped.includes(key))
  ) as Omit<T, K[number]>;
}
