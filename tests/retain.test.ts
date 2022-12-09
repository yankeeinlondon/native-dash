import { describe, it, expect } from "vitest";
import { retain } from "../src";
import { Expect, Equal, ExpectExtends, NotAny } from "@type-challenges/utils";

describe("retain()", () => {

  it("runtime object is reduced by stated props", () => {
    const begin = { foo: 1, bar: 2, baz: 3 };
    const end = retain(begin, "foo", "bar");
    expect(Object.keys(end).length).toEqual(2);
    expect(Object.keys(end).includes("foo")).toEqual(true);
    expect(Object.keys(end).includes("bar")).toEqual(true);
    expect(Object.keys(end).includes("baz")).toEqual(false);
  
    const end2 = retain(begin, "bar");
    expect(Object.keys(end2).includes("foo")).toEqual(false);
    expect(Object.keys(end2).includes("bar")).toEqual(true);
    expect(Object.keys(end2).includes("baz")).toEqual(false);
  
    const end3 = retain(begin);
    expect(Object.keys(end3).includes("foo")).toEqual(false);
    expect(Object.keys(end3).includes("bar")).toEqual(false);
    expect(Object.keys(end3).includes("baz")).toEqual(false);
  
    const end4 = retain(begin, "foo", "bar", "baz");
    expect(Object.keys(end4).includes("foo")).toEqual(true);
    expect(Object.keys(end4).includes("bar")).toEqual(true);
    expect(Object.keys(end4).includes("baz")).toEqual(true);
  });
  
  it("type system is reduced to stated props", () => {
    const begin = { foo: 1, bar: 2, baz: 3 };
    const end = retain(begin, "baz");
    type End = typeof end;
    type cases = [
      Expect<Equal<End["baz"], number>>,
      Expect<ExpectExtends<End, { baz: number }>>,
      Expect<NotAny<ExpectExtends<End, { foo: number }>>>,
      Expect<NotAny<ExpectExtends<End, { bar: number }>>>
    ];
    const c: cases = [true, true, true, true];
    expect(c).toEqual(c);
  
    const end2 = retain(begin, "baz", "foo");
    type End2 = typeof end2;
    type cases2 = [
      Expect<Equal<End2["baz"], number>>,
      Expect<Equal<End2["foo"], number>>,
      Expect<NotAny<ExpectExtends<End2, { bar: number }>>>
    ];
    const c2: cases2 = [true, true, true];
    expect(c2).toEqual(c2);
  });
  
});

