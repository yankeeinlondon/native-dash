export type Include<T, U> = T extends U ? T : never;
export type Retain<T, K extends keyof T> = Pick<T, Include<keyof T, K>>;

/**
 * **retain**
 *
 * Retains an explicit set of key/value pairs on a dictionary and ensures both
 * runtime value and type system remove the other properties.
 *
 * @param obj the starting state object
 * @param retainedProps an array of properties to be _retained_ on the object
 */
export function retain<T extends {}, K extends Array<keyof T>>(obj: T, ...retainedProps: K) {
  const untyped = retainedProps as Array<unknown>;
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => untyped.includes(key))
  ) as Retain<T, K[number]>;
}
