import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { PascalCase } from "~/types";

const t = suite("PascalCase<T> type utility");
type TARGET = "OneTwoThree";

t("PascalCase<T> transform dasherized type", () => {
  type After = PascalCase<"one-two-three">;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("PascalCase<T> transform snake_case type", () => {
  const before = "one_two_three";

  type After = PascalCase<typeof before>;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("PascalCase<T> transforms camelCase type", () => {
  type After = PascalCase<Uncapitalize<TARGET>>;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("PascalCase<T> remains unchanged when getting PascalCase", () => {
  type After = PascalCase<TARGET>;

  type cases = [
    Expect<Equal<After, TARGET>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
});

t("PascalCase<T> converts to PascalCase even with leading whitespace", () => {
  type T1 = PascalCase<`  one-two-three`>;
  type T2 = PascalCase<`\n\t  one-two-three`>;

  type cases = [
    Expect<Equal<T1, "  OneTwoThree">>,
    Expect<Equal<T2, "\n\t  OneTwoThree">>
  ];
  const c: cases = [true, true];
  assert.equal(c, c);
});

t.run();