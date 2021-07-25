import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { StripLeftNonAlpha, CapFirstAlpha, LeadingNonAlpha } from "~/types";

const t = suite("CapFirstAlpha<T> type utility");

t("works when first character is alpha", () => {
  type T1 = CapFirstAlpha<"test">;
  type T2 = CapFirstAlpha<"Test">;

  type cases = [
    Expect<Equal<T1, "Test">>,
    Expect<Equal<T2, "Test">>,
  ]
  const c: cases = [true, true];
  assert.equal(c, c);
});

t("works when first character is not alpha", () => {
  type T1 = CapFirstAlpha<" test">;
  type T2 = CapFirstAlpha<" Test">;
  type T3 = CapFirstAlpha<"123 Test">;
  type T4 = CapFirstAlpha<"123 test">;

  type cases = [
    Expect<Equal<T1, " Test">>,
    Expect<Equal<T2, " Test">>,
    Expect<Equal<T3, "123 Test">>,
    Expect<Equal<T4, "123 Test">>,
  ]
  const c: cases = [true, true, true, true];
  assert.equal(c, c);
});

t.run();