/**
 * **first**
 *
 * returns the first item in an array
 */
export function first<T = any>(arr: T[]) {
  return arr.slice(0, 1);
}
