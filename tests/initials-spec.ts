import { suite } from "uvu";
import * as assert from "uvu/assert";
import { initials } from "../src";

const t = suite("initials => ");

t("using 'all' strategy, hybrid string works as expected", () => {
  assert.equal(initials("ken Brian-snyder3rd"), "KBS3");
  assert.equal(initials("ken BrianSnyde3rd"), "KBS3");
});

t("all uppercase is translated one-for-one as initials", () => {
  assert.equal(initials("KBS"), "KBS");
});

t("an uppercase word is translated to a single initial", () => {
  assert.equal(initials("Wrapper"), "W");
  assert.equal(initials("wrapper"), "W");
});

t("a camelCase word is translated into appropriate initials", () => {
  assert.equal(initials("floatRight"), "FR");
  assert.equal(initials("floatRightNow"), "FRN");
});

t.run();
