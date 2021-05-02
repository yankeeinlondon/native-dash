/**
 * **last**
 *
 * returns the last item in an array
 */
export function last<T = any>(arr: T[]): T {
  return arr.slice(-1)[0];
}
