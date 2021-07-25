import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";

import { LeftWhitespace } from "~/types";

const t = suite("LeftWhiteSpace<T> type utility");

t("LeftWhiteSpace<T> isolates the white space on a string literal", () => {
  const space = " result";
  const doubleSpace = "  result";
  const tabbed = "\tresult";
  const newLine = "\nresult";
  const hybrid1 = "\n\tresult";
  const hybrid2 = " \n\t result\t  ";

  type Space = LeftWhitespace<typeof space>;
  type DoubleSpace = LeftWhitespace<typeof doubleSpace>;
  type Tabbed = LeftWhitespace<typeof tabbed>;
  type NewLine = LeftWhitespace<typeof newLine>;
  type Hybrid1 = LeftWhitespace<typeof hybrid1>;
  type Hybrid2 = LeftWhitespace<typeof hybrid2>;

  type cases = [
    Expect<Equal<Space, " ">>,
    Expect<Equal<DoubleSpace, "  ">>,
    Expect<Equal<Tabbed, "\t">>,
    Expect<Equal<NewLine, "\n">>,
    Expect<Equal<Hybrid1, "\n\t">>,
    Expect<Equal<Hybrid2, " \n\t ">>,
  ];

  const c: cases = [true, true, true, true, true, true];
  assert.equal(c, c);
});

t.run();