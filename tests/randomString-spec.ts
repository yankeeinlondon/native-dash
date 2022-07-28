import { suite } from "uvu";
import * as assert from "uvu/assert";
import { randomString } from "../src/randomString";

const t = suite("randomString() function");

t("twenty rapidly requested IDs are unique", () => {
  const testIds: string[] = [];
  for (const [_i] of Array(20).entries()) {
    testIds.push(randomString());
  }
  const unique = new Set<string>(testIds);
  assert.equal(testIds.length, unique.size, "all ids generated must be unique");
});

t.run();
