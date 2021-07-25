import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { Replace } from "~/types";

const t = suite("Replace<T> type utility");

t("Replace<T> isolates the white space on a string literal", () => {
  const space = " result  ";
  const tabbed = "\tresult";

  type LeadingSpace = Replace<typeof space, " ", "">;
  type TrailingSpace = Replace<typeof space, "  ", "">;
  type Tabbed = Replace<typeof tabbed, "\t", "">;

  type cases = [
    // the first match is processed; futher matches skipped
    Expect<Equal<LeadingSpace, "result  ">>,
    Expect<Equal<TrailingSpace, " result">>,
    Expect<Equal<Tabbed, "result">>
  ];

  const c: cases = [true, true, true];
  assert.equal(c, c);

});

t.run();