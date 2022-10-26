import { suite } from "uvu";
import * as assert from "uvu/assert";
import { asArray } from "../src";
import { Equal, Expect } from "@type-challenges/utils";

const a = suite("asArray function");

a("non-array is returned as an array", () => {
  const i = "a";
  const o = asArray(i);
  type O = typeof o;

  // run-time
  assert.equal(o, ["a"]);
  // design-time
  type cases = [Expect<Equal<O, string[]>>];
});

a("array is returned as an array", () => {
  const i = ["a"];
  const o = asArray(i);
  type O = typeof o;

  // run-time
  assert.equal(o, ["a"]);
  // design-time
  type cases = [Expect<Equal<O, string[]>>];
});

a("non-array literal is returned as an array", () => {
  const i = "a" as const;
  const o = asArray(i, false);
  const o2 = asArray(i, true);

  type O = typeof o;
  type O2 = typeof o2;

  // run-time
  assert.equal(o, ["a"]);
  // design-time
  type cases = [
    Expect<Equal<O, "a"[]>>, //
    Expect<Equal<O2, string[]>>
  ];
});

a("handling non-array element which presents as undefined", () => {
  type T = string | undefined;
  const i = undefined;
  const i2: T = undefined;
  const o = asArray(i);
  const o2 = asArray(i2 as T);
  const o3 = asArray(i2 as T, false);
  type O = typeof o;
  type O2 = typeof o2;
  type O3 = typeof o3;

  // run-time
  assert.equal(o, []);
  assert.equal(o2, []);
  // design-time
  type cases = [
    Expect<Equal<O, unknown[]>>, //
    // TODO: would be nice to extract the unknown[] part of the union
    Expect<Equal<O2, unknown[] | string[]>>,
    Expect<Equal<O3, unknown[] | string[]>>
  ];
});

a("handling array element which contains undefined is unaffected", () => {
  type T = string | undefined;
  const i = [undefined, "foobar"];
  const i2: T[] = [undefined, "foobar"];
  const o = asArray(i);
  const o2 = asArray(i2 as T[]);
  type O = typeof o;
  type O2 = typeof o2;

  // run-time
  assert.equal(o, []);
  assert.equal(o2, []);
  // design-time
  type cases = [
    Expect<Equal<O, (string | undefined)[]>>, //
    Expect<Equal<O2, T[]>>
  ];
});

a.run();
