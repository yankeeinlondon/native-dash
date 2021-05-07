import { suite } from "uvu";
import * as assert from "uvu/assert";
import { kv } from "../src/index";

const t = suite("kv() function");

t("converts simple object to kv array", () => {
  const o1 = { foo: 1, bar: 2, baz: "test" };
  const e1 = [
    { key: "foo", value: 1 },
    { key: "bar", value: 2 },
    { key: "baz", value: "test" },
  ];
  assert.equal(kv(o1), e1);
});

t("converts nested object to kv array", () => {
  const o1 = { foo: { bar: { baz: 42 } }, bar: 45 };
  const e1 = [
    { key: "foo", value: { bar: { baz: 42 } } },
    { key: "bar", value: 45 },
  ];
  assert.equal(kv(o1), e1);
});

t.run();
