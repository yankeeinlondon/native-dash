import { describe, it, expect } from "vitest";
import { randomString } from "../src/randomString";

describe("randomString() function", () => {

  it("twenty rapidly requested IDs are unique", () => {
    const testIds: string[] = [];
    for (const [_i] of Array(20).entries()) {
      testIds.push(randomString());
    }
    const unique = new Set<string>(testIds);
    expect(testIds.length).toEqual(unique.size);
  });

});
