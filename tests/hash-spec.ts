import { suite } from "uvu";
import { hash } from "../src/hash";
import * as assert from "uvu/assert";
import { wait } from "common-types";

const t = suite("hash => ");
const text = "this is my test block";

t("hash is idempotent", async () => {
  const h1 = hash(text);
  const h2 = hash(text);

  assert.equal(
    h1,
    h2,
    `The two hash results -- from the same originating string -- should be the same`
  );

  await wait(50);
  const h3 = hash(text);
  assert.equal(h1, h3, `The two hash results -- even after small time delay -- are the same`);
});

t("hash produces different results from same length but mildly variant text", () => {
  const h1 = hash(text);
  const h2 = hash(text.slice(0, text.length - 1) + "X");
  const h3 = hash("X" + text.slice(1, text.length - 1));

  assert.not.equal(
    h1,
    h2,
    "same length digests with only one character diff result in diff hashes"
  );
  assert.not.equal(
    h1,
    h3,
    "same length digests with only one character diff result in diff hashes"
  );
});

t.run();
