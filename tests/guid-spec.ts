import { suite } from "uvu";
import * as assert from "uvu/assert";
import { guid } from "../src/guid";

const t = suite("guid() function");

t("twenty rapidly requested IDs are unique", () => {
  const testIds: string[] = [];
  for (const [i] of Array(20).entries()) {
    testIds.push(guid());
  }
  const unique = new Set<string>(testIds);
  assert.equal(testIds.length, unique.size, "all ids generated must be unique");
});

t("guid is correct format: ", () => {
  const testIds: string[] = [];
  for (const [i] of Array(20).entries()) {
    testIds.push(guid());
  }
  testIds.forEach((guid) => {
    const isValid = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
    assert.ok(isValid.test(guid), `The value "${guid}" is not considered a valid GUID`);
  });
});

t.run();
