import { suite } from "uvu";
import * as assert from "uvu/assert";
import { equal } from "../src/index";

const t = suite("equal() function");

t("scalar values show equality", () => {
  assert.ok(equal(5, 5));
  assert.ok(equal(0, 0));
  assert.ok(equal(-1, -1));

  assert.ok(equal("foo", "foo"));
  assert.ok(equal("bar2", "bar2"));

  assert.ok(equal(true, true));
  assert.ok(equal(false, false));

  const sym = Symbol("test");
  const sym2 = sym;
  assert.ok(equal(sym, sym2));
});

t("scalar dictionaries show equality", () => {
  const o1 = { foo: 5, bar: "test", baz: true };
  const o2 = { foo: 5, bar: "test", baz: true };
  assert.ok(equal(o1, o2));
});

t("dictionary with sub-dictionary shows equality", () => {
  const o1 = { foo: 5, bar: "test", baz: { something: "level1" } };
  const o2 = { foo: 5, bar: "test", baz: { something: "level1" } };
  assert.ok(equal(o1, o2));
});

t("dictionary with different sub-dictionary shows inequality", () => {
  const o1 = { foo: 5, bar: "test", baz: { something: "level1" } };
  const o2 = { foo: 5, bar: "test", baz: { something: "not-level1" } };
  assert.not.ok(equal(o1, o2));
});

t("dictionary with deep nesting shows inequality with default depth", () => {
  const o1 = { foo: { bar: { baz: 42 } } };
  const o2 = { foo: { bar: { baz: 42 } } };
  assert.not.ok(equal(o1, o2));
});

t("dictionary with deep nesting shows equality with depth of 2", () => {
  const o1 = { foo: { bar: { baz: 42 } } };
  const o2 = { foo: { bar: { baz: 42 } } };
  assert.ok(equal(o1, o2, 2));
});

t.run();
