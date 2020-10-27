import { uuid } from "./uuid";

/**
 * Produces a dasherized random ID
 *
 * @deprecated please use `uuid` instead
 */
export function guid() {
  return uuid();
}
