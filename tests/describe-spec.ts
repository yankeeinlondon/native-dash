import { suite } from "uvu";
import * as assert from "uvu/assert";
import { describe } from "../src/index";

const t = suite("describe() function");

t("non-object types are described", () => {
  assert.equal(describe(45), "number");
  assert.equal(describe("foobar"), "string");
  assert.equal(describe(true), "boolean");
  assert.equal(describe(null), "null");
  assert.equal(describe(undefined), "undefined");
  assert.equal(describe(Symbol("test")), "symbol");
  assert.equal(describe(BigInt(9007199254740991)), "bigint");
});

t("empty object is described as object", () => {
  assert.equal(describe({}), "object");
});

t("empty array is described as an array", () => {
  assert.equal(describe([]), "array");
});

t("dictionary object of scalars is described correctly", () => {
  assert.equal(describe({ foo: 5, bar: "bar" }), { foo: "number", bar: "string" });
  assert.equal(describe({ foo: 5, bar: false }), { foo: "number", bar: "boolean" });
  assert.equal(
    describe({
      foo: 5,
      bar: Symbol("test"),
      baz: BigInt(9007199254740991),
      nothing: undefined,
      empty: {},
      arr: [],
    }),
    {
      foo: "number",
      bar: "symbol",
      baz: "bigint",
      nothing: "undefined",
      empty: "object",
      arr: "array",
    }
  );
});

t("an array of scalars are described correctly", () => {
  const arr1 = ["foo", "bar", "baz"];
  const arr2 = [1, 2, 3];

  assert.equal(describe(arr1), ["string", "string", "string"]);
  assert.equal(describe(arr2), ["number", "number", "number"]);
});

t("an array of scalars and dictionaries are described correctly", () => {
  const mixed = ["foo", 14, { foobar: "foobar" }, true, { baz: Symbol("test") }];

  assert.equal(describe(mixed), [
    "string",
    "number",
    { foobar: "string" },
    "boolean",
    { baz: "symbol" },
  ]);
});

t("a nested dictionary is described correctly", () => {
  const nested = { dict: { foo: 5, bar: { value: 123 } } };
  assert.equal(describe(nested), { dict: { foo: "number", bar: { value: "number" } } });
});

t.run();
