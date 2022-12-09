import { describe as desc, it, expect } from "vitest";
import { describe } from "src";

desc("describe()", () => {
  it("non-object types are described", () => {
    expect(describe(45)).toEqual("number");
    expect(describe("foobar")).toEqual("string");
    expect(describe(true)).toEqual("boolean");
    expect(describe(null)).toEqual("null");
    expect(describe(undefined)).toEqual("undefined");
    expect(describe(Symbol("test"))).toEqual("symbol");
    expect(describe(BigInt(9007199254740991))).toEqual("bigint");
  });
  
  it("empty object is described as object", () => {
    expect(describe({})).toEqual("object");
  });
  
  it("empty array is described as an array", () => {
    expect(describe([])).toEqual("array");
  });
  
  it("dictionary object of scalars is described correctly", () => {
    expect(describe({ foo: 5, bar: "bar" })).toEqual({ foo: "number", bar: "string" });
    expect(describe({ foo: 5, bar: false })).toEqual({ foo: "number", bar: "boolean" });
    expect(
      describe({
        foo: 5,
        bar: Symbol("test"),
        baz: BigInt(9007199254740991),
        nothing: undefined,
        empty: {},
        arr: [],
      })).toEqual(
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
  
  it("an array of scalars are described correctly", () => {
    const arr1 = ["foo", "bar", "baz"];
    const arr2 = [1, 2, 3];
  
    expect(describe(arr1)).toEqual(["string", "string", "string"]);
    expect(describe(arr2)).toEqual(["number", "number", "number"]);
  });
  
  it("an array of scalars and dictionaries are described correctly", () => {
    const mixed = ["foo", 14, { foobar: "foobar" }, true, { baz: Symbol("test") }];
  
    expect(describe(mixed)).toEqual([
      "string",
      "number",
      { foobar: "string" },
      "boolean",
      { baz: "symbol" },
    ]);
  });
  
  it("a nested dictionary is described correctly", () => {
    const nested = { dict: { foo: 5, bar: { value: 123 } } };
    expect(describe(nested)).toEqual({ dict: { foo: "number", bar: { value: "number" } } });
  });
  

});


