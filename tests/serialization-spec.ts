import { suite } from "uvu";
import * as assert from "uvu/assert";
import { deserialize, serialize } from "../src";

const s = suite("serialization/deserialization");

s("serialization => deserialization of object array", () => {
  const data = [
    { id: 1, text: "foo" },
    { id: 2, text: "bar" },
  ];
  const backAndForth = deserialize(serialize(data));
  assert.equal(backAndForth.find((i) => i.id === 1).text, "foo");
  assert.equal(backAndForth.find((i) => i.id === 2).text, "bar");
});

s.run();
