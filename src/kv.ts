import { KvDefn } from "./@types";
import { keys } from "./keys";

/**
 * Converts a dictionary object into a key-value array
 */
export function kv<T extends {}, K extends keyof T = keyof T>(obj: T): KvDefn<T>[] {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Value passed into kv() must be an object");
  }

  return keys(obj).reduce((acc, key) => {
    const value = obj[key];
    return [...acc, { key, value }];
  }, [] as KvDefn<T>[]);
}
