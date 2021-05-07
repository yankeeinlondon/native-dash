import { DataType } from "./@types";
import { describe } from "./describe";
import { kv } from "./kv";

/** simple type of a variable */
function type(v: unknown) {
  return Array.isArray(v) ? DataType.array : v === null ? DataType.null : typeof v;
}

/**
 * Compare two variables for equality, and optionally specify a _depth_ for dictionaries.
 */
export function equal(a: unknown, b: unknown, depth: number = 1): boolean {
  const ta = type(a);
  const tb = type(b);
  if (ta !== tb) {
    return false;
  }

  // note: ta == tb
  switch (ta) {
    case DataType.null:
    case undefined:
      return true;
    case "boolean":
    case "string":
    case "symbol":
    case "number":
    case "bigint":
      return a === b;
    case DataType.array:
      if ((a as unknown[]).length !== (b as unknown[]).length) {
        return false;
      }
      return (a as unknown[]).every((v, idx) => equal(v, (b as unknown[])[idx]));
    case "object":
      const ka = kv(a as Record<string, any>);
      const kb = kv(b as Record<string, any>);
      if (ka.length !== kb.length) {
        return false;
      }

      return ka.every((i) =>
        type(i.value) === "object"
          ? depth > 0
            ? equal(i.value, (b as Record<string, any>)[i.key], depth - 1)
            : false
          : i.value === (b as Record<string, any>)[i.key]
      );

    default:
      return a === b;
  }
}
