import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";

import { TrimLeft } from "~/types";

const t = suite("TrimLeft<T> type utility");

t("TrimLeft<T> isolates the white space on a string literal", () => {
  const space = " result ";
  const tabbed = "\tresult";
  const newLine = "\nresult ";
  const hybrid1 = " \n\t result";
  const hybrid2 = " \n\t result\t ";

  type Space = TrimLeft<typeof space>;
  type Tabbed = TrimLeft<typeof tabbed>;
  type NewLine = TrimLeft<typeof newLine>;
  type Hybrid1 = TrimLeft<typeof hybrid1>;
  type Hybrid2 = TrimLeft<typeof hybrid2>;

  type cases = [
    Expect<Equal<Space, "result ">>,
    Expect<Equal<Tabbed, "result">>,
    Expect<Equal<NewLine, "result ">>,
    Expect<Equal<Hybrid1, "result">>,
    Expect<Equal<Hybrid2, "result\t ">>,
  ];

  const c: cases = [true, true, true, true, true];
  assert.equal(c, c);

});

t.run();