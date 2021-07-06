import { suite } from "uvu";
import * as assert from "uvu/assert";
import { omit } from "../src/omit";
import { Expect, Equal, ExpectExtends, NotAny } from "@type-challenges/utils";

const t = suite("omit");

t("runtime object is reduced by stated props", () => {
  const begin = { foo: 1, bar: 2, baz: 3 };
  const end = omit(begin, "foo", "bar");
  assert.equal(Object.keys(end).length, 1);
  assert.equal(Object.keys(end).includes("foo"), false);
  assert.equal(Object.keys(end).includes("bar"), false);
  assert.equal(Object.keys(end).includes("baz"), true);

  const end2 = omit(begin, "bar");
  assert.equal(Object.keys(end2).includes("foo"), true);
  assert.equal(Object.keys(end2).includes("bar"), false);
  assert.equal(Object.keys(end2).includes("baz"), true);

  const end3 = omit(begin);
  assert.equal(Object.keys(end3).includes("foo"), true);
  assert.equal(Object.keys(end3).includes("bar"), true);
  assert.equal(Object.keys(end3).includes("baz"), true);

  const end4 = omit(begin, "foo", "bar", "baz");
  assert.equal(Object.keys(end4).includes("foo"), false);
  assert.equal(Object.keys(end4).includes("bar"), false);
  assert.equal(Object.keys(end4).includes("baz"), false);
});

t("type system is reduced by stated props", () => {
  const begin = { foo: 1, bar: 2, baz: 3 };
  const end = omit(begin, "foo", "bar");
  type End = typeof end;
  type cases = [
    Expect<Equal<End["baz"], number>>,
    Expect<ExpectExtends<End, { baz: number }>>,
    Expect<NotAny<ExpectExtends<End, { foo: number }>>>,
    Expect<NotAny<ExpectExtends<End, { bar: number }>>>
  ];
  const results: cases = [true, true, true, true];
  assert.equal(results, results);

  const end2 = omit(begin, "bar");
  type End2 = typeof end2;
  type cases2 = [
    Expect<Equal<End2["baz"], number>>,
    Expect<Equal<End2["foo"], number>>,
    Expect<NotAny<ExpectExtends<End2, { bar: number }>>>
  ];
  const results2: cases2 = [true, true, true];
  assert.equal(results2, results2);
});

t.run();
