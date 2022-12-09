import { describe, it, expect } from "vitest";
import { atRandom } from "../src";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("atRandom", () => {

  it("atRandom chooses from list", () => {
    const choices = ["foo", "bar", "baz"];
    for (const [_i] of Array(25).entries()) {
      const result = atRandom(choices);
      expect(choices.includes(result)).toBeTruthy();
    }
  });

  
  it("atRandom chooses from list but not explicit exception", () => {
    const choices = ["foo", "bar", "baz"];
    for (const [_i] of Array(25).entries()) {
      const result = atRandom(choices, ["foo"]);
      expect(choices.includes(result) && result !== "foo").toBeTruthy();
    }
  });
  
  
  it("atRandom chooses from list but not multiple explicit exceptions", () => {
    const choices = ["foo", "bar", "baz"];
    for (const [_i] of Array(25).entries()) {
      const result = atRandom(choices, ["foo", "bar"]);
      expect(result === "baz").toBeTruthy();
    }
  });

  
  it("atRandom chooses from list but not multiple explicit exceptions", () => {
    const choices = ["foo", "bar", "baz"];
    const selected: string[] = [];
    for (const [_i] of Array(3).entries()) {
      const result = atRandom(choices, (c) => !selected.includes(c));
      selected.push(result);
      expect(choices.includes(result)).toBeTruthy();
    }
  
    expect(selected).toHaveLength(3);
  });
  
  
});

