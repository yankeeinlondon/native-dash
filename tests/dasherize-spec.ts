import { suite } from "uvu";
import * as assert from "uvu/assert";
import { dasherize } from "../src/dasherize";

const t = suite("dasherize() function");

t("camelCase is converted correctly", () => {
  assert.equal(dasherize("camelCase"), "camel-case");
  assert.equal(dasherize(" camelCase "), " camel-case ");
  assert.equal(dasherize("onceUponATime"), "once-upon-a-time");
  assert.equal(dasherize("78camelCaseIsNotGreat9"), "78camel-case-is-not-great9");
});

t("snake_case is converted correctly", () => {
  assert.equal(dasherize("snake_case"), "snake-case");
  assert.equal(dasherize("snake_case_in_rust"), "snake-case-in-rust");
  assert.equal(dasherize(" snake_case "), " snake-case ");
});

t("PascalCase is converted correctly", () => {
  assert.equal(dasherize("PascalCase"), "pascal-case");
  assert.equal(dasherize("PascalCaseForClasses"), "pascal-case-for-classes");
  assert.equal(dasherize(" PascalCase "), " pascal-case ");
});

t("Bastar*d Case is converted correctly", () => {
  assert.equal(dasherize(" PascalCase is not camelCase "), " pascal-case-is-not-camel-case ");
  assert.equal(dasherize(" --fooBar--batShit--Crazy-"), " foo-bar-bat-shit-crazy");
});

t.run();
