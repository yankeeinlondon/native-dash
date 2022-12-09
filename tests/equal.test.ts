import { describe, it, expect } from "vitest";
import { equal } from "../src/index";

describe("equal() function", () => {


it("scalar values show equality", () => {
 expect(equal(5, 5)).toBeTruthy();
 expect(equal(0, 0)).toBeTruthy();
 expect(equal(-1, -1)).toBeTruthy();

 expect(equal("foo", "foo")).toBeTruthy();
 expect(equal("bar2", "bar2")).toBeTruthy();

 expect(equal(true, true)).toBeTruthy();
 expect(equal(false, false)).toBeTruthy();

  const sym = Symbol("test");
  const sym2 = sym;
 expect(equal(sym, sym2)).toBeTruthy();
});

it("scalar dictionaries show equality", () => {
  const o1 = { foo: 5, bar: "test", baz: true };
  const o2 = { foo: 5, bar: "test", baz: true };
 expect(equal(o1, o2)).toBeTruthy();
});

it("dictionary with sub-dictionary shows equality", () => {
  const o1 = { foo: 5, bar: "test", baz: { something: "level1" } };
  const o2 = { foo: 5, bar: "test", baz: { something: "level1" } };
 expect(equal(o1, o2)).toBeTruthy();
});

it("dictionary with different sub-dictionary shows inequality", () => {
  const o1 = { foo: 5, bar: "test", baz: { something: "level1" } };
  const o2 = { foo: 5, bar: "test", baz: { something: "not-level1" } };
  expect(equal(o1, o2)).toBeFalsy();
});

it("dictionary with deep nesting shows inequality with default depth", () => {
  const o1 = { foo: { bar: { baz: 42 } } };
  const o2 = { foo: { bar: { baz: 42 } } };
  expect(equal(o1, o2)).toBeFalsy();
});

it("dictionary with deep nesting shows equality with depth of 2", () => {
  const o1 = { foo: { bar: { baz: 42 } } };
  const o2 = { foo: { bar: { baz: 42 } } };
 expect(equal(o1, o2, 2)).toBeTruthy();
});


});

