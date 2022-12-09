import { describe, it, expect } from "vitest";
import { deserialize, serialize } from "../src";

describe("serialization/deserialization", () => {

  it("serialization => deserialization of object array", () => {
    const data = [
      { id: 1, text: "foo" },
      { id: 2, text: "bar" },
    ];
    const backAndForth = deserialize(serialize(data));
    expect(backAndForth.find((i) => i.id === 1).text).toEqual("foo");
    expect(backAndForth.find((i) => i.id === 2).text).toEqual("bar");
  });
  
});
