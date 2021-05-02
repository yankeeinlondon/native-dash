/**
 * **first**
 *
 * returns the first item in an array
 */
export function first<T = any>(arr: T[]): T {
  return arr.slice(0, 1)[0];
}
