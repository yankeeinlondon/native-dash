import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";

import { Trim } from "../../src/types/other-types";

const t = suite("Trim<T> type utility");

t("Trim<T> works as expected", () => {
  const left = "  hello";
  const right = "hello   ";
  const both = "  hello  ";

  type Left = Trim<typeof left>;
  type Right = Trim<typeof right>;
  type Both = Trim<typeof both>;

  type cases = [
    Expect<Equal<Left, "hello">>,
    Expect<Equal<Right, "hello">>,
    Expect<Equal<Both, "hello">>,
  ];

  const c: cases = [true, true, true];
  assert.equal(c, c);
});

t.run();