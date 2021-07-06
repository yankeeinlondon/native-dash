import { suite } from "uvu";
import * as assert from "uvu/assert";
import { retain } from "../src/retain";
import { Expect, Equal, ExpectExtends, NotAny } from "@type-challenges/utils";

const t = suite("retain");

t("runtime object is reduced by stated props", () => {
  const begin = { foo: 1, bar: 2, baz: 3 };
  const end = retain(begin, "foo", "bar");
  assert.equal(Object.keys(end).length, 2);
  assert.equal(Object.keys(end).includes("foo"), true);
  assert.equal(Object.keys(end).includes("bar"), true);
  assert.equal(Object.keys(end).includes("baz"), false);

  const end2 = retain(begin, "bar");
  assert.equal(Object.keys(end2).includes("foo"), false);
  assert.equal(Object.keys(end2).includes("bar"), true);
  assert.equal(Object.keys(end2).includes("baz"), false);

  const end3 = retain(begin);
  assert.equal(Object.keys(end3).includes("foo"), false);
  assert.equal(Object.keys(end3).includes("bar"), false);
  assert.equal(Object.keys(end3).includes("baz"), false);

  const end4 = retain(begin, "foo", "bar", "baz");
  assert.equal(Object.keys(end4).includes("foo"), true);
  assert.equal(Object.keys(end4).includes("bar"), true);
  assert.equal(Object.keys(end4).includes("baz"), true);
});

t("type system is reduced to stated props", () => {
  const begin = { foo: 1, bar: 2, baz: 3 };
  const end = retain(begin, "baz");
  type End = typeof end;
  type cases = [
    Expect<Equal<End["baz"], number>>,
    Expect<ExpectExtends<End, { baz: number }>>,
    Expect<NotAny<ExpectExtends<End, { foo: number }>>>,
    Expect<NotAny<ExpectExtends<End, { bar: number }>>>
  ];
  const results: cases = [true, true, true, true];
  assert.equal(results, results);

  const end2 = retain(begin, "baz", "foo");
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