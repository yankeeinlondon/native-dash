import { suite } from "uvu";
import * as assert from "uvu/assert";
import { filter } from "../src";
import { Equal, Expect } from "@type-challenges/utils";

const t = suite("filter utility");

t("string filter built and gives proper types", () => {
  const f = filter({ startsWith: "." });
  type P = Parameters<typeof f>;
  type R = ReturnType<typeof f>;
  // runtime
  assert.equal(typeof f, Function);
  // design time
  type cases = [
    Expect<Equal<P[0], string | undefined>>, //
    Expect<Equal<R, boolean>>
  ];
});

t("numeric filter built and gives proper types", () => {
  const f = filter({ equals: 42 });
  type P = Parameters<typeof f>;
  type R = ReturnType<typeof f>;
  // runtime
  assert.equal(typeof f, Function);
  // design time
  type cases = [
    Expect<Equal<P[0], number | undefined>>, //
    Expect<Equal<R, boolean>>
  ];
});

t("string filter's startsWith", () => {
  const f = filter({ startsWith: "." });
  const remaining = ["foo", "bar", ".baz"].filter(f);

  assert.equal(remaining, [".baz"]);
});

t.run();
