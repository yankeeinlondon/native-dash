import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { PascalCase } from "~/types";

const t = suite("PascalCase<T> type utility");

t("PascalCase<T> transform dasherized type", () => {
  const before = "one-two-three";

  type After = PascalCase<typeof before>;

  type cases = [
    Expect<Equal<After, "OneTwoThree">>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("PascalCase<T> transform snake_case type", () => {
  const before = "one_two_three";

  type After = PascalCase<typeof before>;

  type cases = [
    Expect<Equal<After, "OneTwoThree">>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("PascalCase<T> transforms camelCase type", () => {
  const before = "oneTwoThree";

  type After = PascalCase<typeof before>;

  type cases = [
    Expect<Equal<After, "OneTwoThree">>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t.run();