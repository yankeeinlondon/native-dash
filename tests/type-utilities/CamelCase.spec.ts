import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { CamelCase } from "~/types";

const t = suite("CamelCase<T> type utility");
type TARGET = "oneTwoThree";

t("CamelCase<T> transform dasherized type", () => {
  const before = "one-two-three";

  type After = CamelCase<typeof before>;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("CamelCase<T> transform snake_case type", () => {
  const before = "one_two_three";

  type After = CamelCase<typeof before>;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("CamelCase<T> transforms camelCase type", () => {

  type After = CamelCase<TARGET>;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t.run();