import { suite } from "uvu";
import * as assert from "uvu/assert";
import { capitalize } from "../src/capitalize";
import { Equal, Expect } from "@type-challenges/utils";

const t = suite("capitalize() function");

t("string passed in is capitalized", () => {
  assert.equal(capitalize("test"), "Test");
  assert.equal(capitalize("Test"), "Test");
});

t(
  "blank leading space is considered first character, in effect making capitalize() do nothing",
  () => {
    assert.equal(capitalize(" test"), " test");
  }
);

t("empty string creates no change", () => {
  assert.equal(capitalize(""), "");
});

t(`typing of a "string" is retained when passed through capitalize()`, () => {
  const before: string = "bob";
  const after = capitalize(before);
  type cases = [Expect<Equal<typeof after, string>>];
  const c: cases = [true];
  assert.equal(c, c);
});

t(`typing of a string literal is modified appropriately when passed through capitalize()`, () => {
  const before = "bob" as const;
  const after = capitalize(before);
  type cases = [Expect<Equal<typeof after, "Bob">>];
  const c: cases = [true];
  assert.equal(c, c);
});

t.run();
