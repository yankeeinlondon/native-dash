import { suite } from "uvu";
import * as assert from "uvu/assert";
import { createLookup } from "../src/createLookup";
import { Equal, Expect } from "@type-challenges/utils";

const t = suite("createLookup() utility");

type Color = "red" | "blue";
type RGB = [number, number, number];

const color = createLookup<Color, RGB>({ red: [255, 0, 0], blue: [137, 207, 240] });
const c2 = createLookup<string, RGB>({ red: [255, 0, 0], blue: [137, 207, 240] }, (v) => [
  128, 128, 128,
]);

const c3 = createLookup<string, RGB>({
  red: [255, 0, 0],
  blue: [137, 207, 240],
});

t("createLookup() returns correctly typed lookup function", () => {
  type Color = "red" | "blue";
  type RGB = [number, number, number];

  const color = createLookup<Color, RGB>({ red: [255, 0, 0], blue: [137, 207, 240] });
  type Params = Parameters<typeof color>[0];
  type Return = ReturnType<typeof color>;

  type cases = [Expect<Equal<Color, Params>>, Expect<Equal<Return, RGB>>];
  const c: cases = [true, true];
  assert.equal(c, c);
});

t("createLookup() lookup function works for valid values", () => {
  assert.equal(color("red"), [255, 0, 0]);
  assert.equal(color("blue"), [137, 207, 240]);
});

t("createLookup() lookup recovers with 'misses' using callback", () => {
  assert.equal(c2("green"), [128, 128, 128]);
  assert.equal(c2("nonsense"), [128, 128, 128]);
});

t(
  "createLookup() lookup throws error when key is missing and no callback is present",
  () => {
    try {
      assert.equal(c3("green"), [128, 128, 128]);
      throw new Error("should have already failed due to unknown lookup value");
    } catch (err) {
      assert.match(err.message, "Failure in lookup");
    }
  }
);

t.run();
