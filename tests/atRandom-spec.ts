import { suite } from "uvu";
import * as assert from "uvu/assert";
import { atRandom, between } from "../src";

const random = suite("atRandom function");

random("atRandom chooses from list", () => {
  const choices = ["foo", "bar", "baz"];
  for (const [i] of Array(25).entries()) {
    const result = atRandom(choices);
    assert.ok(choices.includes(result));
  }
});

random("atRandom chooses from list but not explicit exception", () => {
  const choices = ["foo", "bar", "baz"];
  for (const [i] of Array(25).entries()) {
    const result = atRandom(choices, ["foo"]);
    assert.ok(choices.includes(result) && result !== "foo");
  }
});

random("atRandom chooses from list but not multiple explicit exceptions", () => {
  const choices = ["foo", "bar", "baz"];
  for (const [i] of Array(25).entries()) {
    const result = atRandom(choices, ["foo", "bar"]);
    assert.ok(result === "baz");
  }
});

random("atRandom chooses from list but not multiple explicit exceptions", () => {
  const choices = ["foo", "bar", "baz"];
  const selected: string[] = [];
  for (const [i] of Array(3).entries()) {
    const result = atRandom(choices, (c) => !selected.includes(c));
    selected.push(result);
    assert.ok(choices.includes(result));
  }

  assert.equal(selected.length, 3);
});

random.run();
