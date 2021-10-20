const defaultMiss = <V>(missed: any): V => {
  throw new Error(`Failure in lookup searching for "${missed}"`);
};

/**
 * Creates a type-strong lookup function which ensures strong typing conversions from one
 * type `K` to another `V`.
 * ```ts
 * const color = createLookup<Color,RGB>(
 *   { red: [255,0.0], blue: [137,207,240] },
 *   [128,128,128]
 * );
 * const red = color("red");
 * const other = color("foobar"); // [137,207,240]
 * ```
 */
export function createLookup<
  K extends string | number,
  V extends {},
  M extends (m: any) => V = (m: any) => V
>(known: Record<K, V>, miss: M = defaultMiss as M) {
  /**
   * Lookup a value
   */
  return (v: K) => {
    return v in known ? known[v] : miss(v);
  };
}
