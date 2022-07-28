import { suite } from "uvu";
import * as assert from "uvu/assert";
import { uuid } from "../src/uuid";

const t = suite("uuid() function");

t("twenty rapidly requested IDs are unique", () => {
  const testIds: string[] = [];
  for (const [_i] of Array(20).entries()) {
    testIds.push(uuid());
  }
  const unique = new Set<string>(testIds);
  assert.equal(testIds.length, unique.size, "all ids generated must be unique");
});

t("uuid is correct format: ", () => {
  const testIds: string[] = [];
  for (const [_i] of Array(20).entries()) {
    testIds.push(uuid());
  }
  testIds.forEach((uuid) => {
    const isValid =
      /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
    assert.ok(isValid.test(uuid), `The value "${uuid}" is not considered a valid uuid`);
  });
});

t.run();
