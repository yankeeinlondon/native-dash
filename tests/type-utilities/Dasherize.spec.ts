import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { Dasherize, DashUppercase } from "~/types";

const t = suite("Dasherize<T> type utility");
type TARGET = "one-two-three";

t("Dasherize<T> transform dasherized type", () => {
  const before = "one-two-three";

  type After = Dasherize<typeof before>;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("Dasherize<T> transform snake_case type", () => {
  type After = Dasherize<"one_two_three">;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("Dasherize<T> transforms PascalCase type", () => {
  type After = Dasherize<"OneTwoThree">;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("Dasherize<T> transforms camelCase type", () => {
  type After = Dasherize<"oneTwoThree">;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("Dasherize<T> transforms interior space to dasherized type", () => {
  type After = Dasherize<"one two three">;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("Dasherize<T> retains leading and trailing whitespace but still converts", () => {
  type After = Dasherize<"  one two three ">;

  type cases = [
    Expect<Equal<After, "  one-two-three ">>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("Dasherize<T> maintains a Dasherized input", () => {
  type After = Dasherize<"one-two-three">;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t.run();