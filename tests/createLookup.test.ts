import { describe, it, expect } from "vitest";
import { createLookup } from "../src/createLookup";
import { Equal, Expect } from "@type-challenges/utils";

type Color = "red" | "blue";
type RGB = [number, number, number];

const color = createLookup<Color, RGB>({ red: [255, 0, 0], blue: [137, 207, 240] });
const c2 = createLookup<string, RGB>({ red: [255, 0, 0], blue: [137, 207, 240] }, () => [
  128, 128, 128,
]);

const c3 = createLookup<string, RGB>({
  red: [255, 0, 0],
  blue: [137, 207, 240],
});

const c4 = createLookup<boolean, Color>({
  true: "red",
  false: "blue",
});

describe("createLookup() utility", () => {

  it("createLookup() returns correctly typed lookup function", () => {
    type Color = "red" | "blue";
    type RGB = [number, number, number];
  
    const color = createLookup<Color, RGB>({ red: [255, 0, 0], blue: [137, 207, 240] });
    type Params = Parameters<typeof color>[0];
    type Return = ReturnType<typeof color>;
  
    type cases = [Expect<Equal<boolean | Color, Params>>, Expect<Equal<Return, RGB>>];
    const c: cases = [true, true];
    expect(c).toEqual(c);
  });
  
  it("createLookup() lookup function works for valid values", () => {
    expect(color("red")).toEqual([255, 0, 0]);
    expect(color("blue")).toEqual([137, 207, 240]);
  });
  
  it("createLookup() lookup recovers with 'misses' using callback", () => {
    expect(c2("green")).toEqual([128, 128, 128]);
    expect(c2("nonsense")).toEqual([128, 128, 128]);
  });
  
  it("createLookup() lookup throws error when key is missing and no callback is present", () => {
    try {
      expect(c3("green")).toEqual([128, 128, 128]);
      throw new Error("should have already failed due to unknown lookup value");
    } catch (err) {
      expect((err as Error).message).toContain("Failure in lookup");
    }
  });
  
  it("boolean values are converted to string keys in map", () => {
    expect(c4(true)).toEqual("red");
    expect(c4(false)).toEqual("blue");
  });

});




