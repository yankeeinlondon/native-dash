import { Keys, Length } from "inferred-types";
import { KnownError } from "./errors";

export type FindResult<P extends string, N extends readonly string[]> = {
  all: string;
  next: () => FindResult<P, N>;
  found: true;
} & Record<Keys<N>, string>;

export type NotFound = { found: false } & Record<string, undefined>;

export type FindExpression<P extends string, N extends readonly string[]> = (
  content: string
) => Length<N> extends 0 ? string[] | false : FindResult<P, N> | NotFound;

/**
 * Finds the first instance of the given RegExp and reports on it.
 *
 * The key to understand the return type is that if no _names_ were provided then
 * it will just return an array where the first value is the entire match expression
 * and each one afterwards is a sub-expression match. If you _do_ provide names you'll
 * not only get back a named dictionary but also a `.next()` function which can let you
 * move to the next match.
 *
 * ```ts
 * const getDnsAndIp = find(".*DNS:(.*),IP:(.*)", "dns", "ip");
 * const { dns, ip } = getDnsAndIp(content);
 * ```
 * @param pattern a RegExp expression in string form
 * @param names optionally specify the names of sub-expressions in your RegExp
 */
export const find =
  <P extends string, N extends readonly string[]>(pattern: P, ...names: N): FindExpression<P, N> =>
  (content: string) => {
    let re: RegExp;
    try {
      re = new RegExp(pattern);
    } catch {
      throw new KnownError(
        `Invalid RegExp pattern passed into find(): ${pattern}`,
        "invalid-type/RegExp"
      );
    }

    if (names && names.includes("all")) {
      throw new KnownError(
        `The name "all" can not be used in find() because an "all" value will always be passed back!`,
        "not-allowed/named-property"
      );
    }

    const found = content.match(re);
    const arr: string[] = [];
    const obj: Record<string, string> = {};
    if (found) {
      for (let idx = 0; idx < found.length; idx++) {
        arr.push(found[idx]);
        if (names.length > 0) {
          const key =
            idx === 0 ? "all" : idx - 1 < names.length ? names[idx - 1] : `unknown_${idx}`;
          obj[key] = found[idx];
        }
      }
    }

    return (
      found
        ? names.length > 0
          ? {
              ...obj,
              found: true,
              next: () => {
                const nextContent = content.replace(obj.all, "");
                return find(pattern, ...names)(nextContent);
              },
            }
          : arr
        : names.length > 0
        ? { found: false }
        : false
    ) as Length<N> extends 0 ? string[] | false : FindResult<P, N> | NotFound;
  };
