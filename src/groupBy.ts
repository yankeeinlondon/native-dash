import { Keys } from "inferred-types";
import { omit } from "./omit";

function isFunction<K extends GroupByFunction<any>>(thingy: unknown): thingy is K {
  return typeof thingy === "function";
}

export type GroupByFunction<T extends {}> = (v: T) => any;

/**
 * Groups an array of dictionary items into dictionary of arrays _grouped_
 * by either a property in the array or a function that provides the key.
 *
 * ```ts
 * const data = [
 *  {name: "foo", value: 1}, {name: "bar", value: 2}, {name: "foo", value: 3}
 * ];
 * // { foo: [ {value: 1}, {value: 3}], bar: [{value: 2}] }
 * const grouped = groupBy("name", data);
 * ```
 */
export function groupBy<T extends {}, K extends keyof T | GroupByFunction<T>>(
  propOrFn: K,
  data: readonly T[]
) {
  return data.reduce((acc, i) => {
    if (isFunction(propOrFn)) {
      // type KK = K extends GroupByFunction<T> ? ReturnType<K> : never;
      const [key, val] = propOrFn(i);
      const current = acc[key] || [];
      return {
        ...acc,
        [key]: current.concat(val),
      } as K extends GroupByFunction<T>
        ? Record<ReturnType<K>[0], ReturnType<K>[1][]>
        : never;
    } else {
      const key = i[propOrFn as keyof T] as unknown as string | number;
      const current = acc[key] || [];
      if (Array.isArray(current)) {
        return { ...acc, [key]: current.concat(omit(i, propOrFn as keyof T)) };
      }
    }
  }, {} as any) as unknown as K extends GroupByFunction<T>
    ? Record<ReturnType<K>[0], ReturnType<K>[1][]>
    : K extends keyof T
    ? T[K] extends string | number
      ? Record<string, Omit<T, K>[]>
      : never
    : never;
}
