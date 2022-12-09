import { describe, it, expect } from "vitest";
import { uuid } from "../src/uuid";

describe("uuid() function", () => {
  it("twenty rapidly requested IDs are unique", () => {
    const testIds: string[] = [];
    for (const [_i] of Array(20).entries()) {
      testIds.push(uuid());
    }
    const unique = new Set<string>(testIds);
    expect(testIds.length).toEqual(unique.size);
  });
  
  it("uuid is correct format: ", () => {
    const testIds: string[] = [];
    for (const [_i] of Array(20).entries()) {
      testIds.push(uuid());
    }
    testIds.forEach((uuid) => {
      const isValid =
        /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
      expect(isValid.test(uuid), `The value "${uuid}" is not considered a valid uuid`).toBeTruthy();
    });
  });
});
