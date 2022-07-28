import { suite } from "uvu";
import * as assert from "uvu/assert";
import { groupBy } from "../src/groupBy";

const t = suite("groupBy() function");

t("works when there grouping prop is unique", () => {
  const grouped = groupBy("name", [
    { name: "foo", value: 1 },
    { name: "bar", value: 2 },
    { name: "baz", value: 3 },
  ]);
  assert.equal(grouped.foo.length, 1);
  assert.equal(grouped.bar.length, 1);
  assert.equal(grouped.baz.length, 1);
});

t("works when there grouping prop is non-unique", () => {
  const grouped = groupBy("name", [
    { name: "foo", value: 1 },
    { name: "bar", value: 2 },
    { name: "foo", value: 3 },
  ]);

  assert.equal(grouped.foo.length, 2);
  assert.equal(grouped.bar.length, 1);

  assert.equal(
    grouped.foo.every((i) => Object.keys(i).length === 1 && "value" in i),
    true
  );
});

t("can group a numeric property", () => {
  const grouped = groupBy("value", [
    { name: "foo", value: 1 },
    { name: "bar", value: 10 },
    { name: "foo", value: 10 },
  ]);

  assert.ok(Object.keys(grouped).includes("1"));
  assert.ok(Object.keys(grouped).includes("10"));
  assert.equal(grouped["1"].length, 1);
  assert.equal(grouped["10"].length, 2);
});

t("works when all items are of the same group", () => {
  const grouped = groupBy("name", [
    { name: "foo", value: 1 },
    { name: "foo", value: 2 },
    { name: "foo", value: 3 },
  ]);

  assert.equal(grouped.foo.length, 3);
  assert.equal(grouped.bar?.length || 0, 0);

  assert.equal(
    grouped.foo.every((i) => Object.keys(i).length === 1 && "value" in i),
    true
  );
});

t("works with a function groupers instead of a property name", () => {
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

  assert.equal(grouped["blue-4"].length, 2);
  assert.equal(grouped["red-4"].length, 1);
  assert.equal(grouped["blue-12"].length, 1);

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

  assert.equal(grouped2["child"].length, 3);
  assert.equal(grouped2["adult"].length, 2);
  for (const i of grouped2["child"]) {
    assert.ok("name" in i);
    assert.ok("color" in i);
    assert.ok("age" in i);
  }
});

t.run();
