import { suite } from "uvu";
import * as assert from "uvu/assert";
import { capitalize } from "../src/capitalize";

const t = suite("capitalize() function");

t("string passed in is capitalized", () => {
  assert.equal(capitalize("test"), "Test");
  assert.equal(capitalize("Test"), "Test");
});

t(
  "blank leading space is considered first character, in effect making capitalize() do nothing",
  () => {
    assert.equal(capitalize(" test"), " test");
  }
);

t("empty string creates no change", () => {
  assert.equal(capitalize(""), "");
});

t.run();
