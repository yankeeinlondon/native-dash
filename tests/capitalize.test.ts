import { capitalize } from "../src/capitalize";
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

describe("capitalize()", () => {


  it("string passed in is capitalized", () => {
    expect(capitalize("test")).toEqual("Test");
    expect(capitalize("Test")).toEqual("Test");
  });
  
  it(
    "blank leading space is considered first character, in effect making capitalize() do nothing",
    () => {
      expect(capitalize(" test")).toEqual(" test");
    }
  );
  
  it("empty string creates no change", () => {
    expect(capitalize("")).toEqual("");
  });
  
  it(`typing of a "string" is retained when passed through capitalize()`, () => {
    const before: string = "bob";
    const after = capitalize(before);
    type cases = [Expect<Equal<typeof after, string>>];
    const c: cases = [true];
    expect(c).toEqual(c);
  });
  
  it(`typing of a string literal is modified appropriately when passed through capitalize()`, () => {
    const before = "bob" as const;
    const after = capitalize(before);
    type cases = [Expect<Equal<typeof after, "Bob">>];
    const c: cases = [true];
    expect(c).toEqual(c);
  });

});

