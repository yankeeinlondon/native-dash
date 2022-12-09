import { describe, it, expect } from "vitest";
import { groupBy } from "../src/groupBy";

describe("groupBy() function", () => {


  it("works when there grouping prop is unique", () => {
    const grouped = groupBy("name", [
      { name: "foo", value: 1 },
      { name: "bar", value: 2 },
      { name: "baz", value: 3 },
    ]);
    expect(grouped.foo.length).toEqual(1);
    expect(grouped.bar.length).toEqual(1);
    expect(grouped.baz.length).toEqual(1);
  });
  
  it("works when there grouping prop is non-unique", () => {
    const grouped = groupBy("name", [
      { name: "foo", value: 1 },
      { name: "bar", value: 2 },
      { name: "foo", value: 3 },
    ]);
  
    expect(grouped.foo.length).toEqual(2);
    expect(grouped.bar.length).toEqual(1);
  
    expect(grouped.foo.every((i) => Object.keys(i).length === 1 && "value" in i))
      .toEqual(true);
  });
  
  it("can group a numeric property", () => {
    const grouped = groupBy("value", [
      { name: "foo", value: 1 },
      { name: "bar", value: 10 },
      { name: "foo", value: 10 },
    ]);
  
    expect(Object.keys(grouped).includes("1")).toBeTruthy();
    expect(Object.keys(grouped).includes("10")).toBeTruthy();
    expect(grouped["1"].length).toEqual(1);
    expect(grouped["10"].length).toEqual(2);
  });
  
  it("works when all items are of the same group", () => {
    const grouped = groupBy("name", [
      { name: "foo", value: 1 },
      { name: "foo", value: 2 },
      { name: "foo", value: 3 },
    ]);
  
    expect(grouped.foo.length).toEqual(3);
    expect(grouped.bar?.length || 0).toEqual(0);
  
    expect(grouped.foo.every((i) => Object.keys(i).length === 1 && "value" in i))
      .toEqual(true);
  });
  
  it("works with a function groupers instead of a property name", () => {
    const grouped = groupBy(
      (v: { name: string; color: string; age: number }) => {
        return [`${v.color}-${v.age}`, v.name];
      },
      [
        { name: "foo", color: "red", age: 4 },
        { name: "foo", color: "blue", age: 4 },
        { name: "bar", color: "blue", age: 4 },
        { name: "foo", color: "blue", age: 12 },
      ]
    );
  
    expect(grouped["blue-4"].length).toEqual(2);
    expect(grouped["red-4"].length).toEqual(1);
    expect(grouped["blue-12"].length).toEqual(1);
  
    type Person = { name: string; color: string; age: number };
    const fn = (v: Person): ["child" | "adult", Person] => {
      return [v.age < 18 ? "child" : "adult", v];
    };
    type _T = Record<ReturnType<typeof fn>[0], ReturnType<typeof fn>[1]>;
    const grouped2 = groupBy(fn, [
      { name: "bob", color: "red", age: 4 },
      { name: "mary", color: "blue", age: 5 },
      { name: "chris", color: "blue", age: 4 },
      { name: "sandy", color: "blue", age: 43 },
      { name: "sandy", color: "blue", age: 48 },
    ]);
  
    expect(grouped2["child"].length).toEqual(3);
    expect(grouped2["adult"].length).toEqual(2);
    for (const i of grouped2["child"]) {
      expect("name" in i).toBeTruthy();
      expect("color" in i).toBeTruthy();
      expect("age" in i).toBeTruthy();
    }
  });
  
  

});

