import { suite } from "uvu";
import * as assert from "uvu/assert";
import { pascalize } from "../src/pascalize";

const t = suite("pascalize() function");

t("camelCase is converted correctly", () => {
  assert.equal(pascalize("camelCase"), "CamelCase");
  assert.equal(pascalize(" camelCase ", true), " CamelCase ");
  assert.equal(pascalize(" camelCase "), "CamelCase");
  assert.equal(pascalize("onceUponATime"), "OnceUponATime");
  assert.equal(pascalize("78camelCaseIsNotGreat9"), "78CamelCaseIsNotGreat9");
});

t("snake_case is converted correctly", () => {
  assert.equal(pascalize("snake_case"), "SnakeCase");
  assert.equal(pascalize("snake_case_in_rust"), "SnakeCaseInRust");
  assert.equal(pascalize(" snake_case ", true), " SnakeCase ");
});

t("PascalCase is converted correctly", () => {
  assert.equal(pascalize("dash-me"), "DashMe");
  assert.equal(pascalize("dash_me"), "DashMe");
  assert.equal(pascalize("dash-for-css"), "DashForCss");
  assert.equal(pascalize(" dash-me ", true), " DashMe ");
});

t("Bastar*d Case is converted correctly", () => {
  assert.equal(
    pascalize(" camelCase is not PascalCase ", true),
    " CamelCaseIsNotPascalCase "
  );
  assert.equal(pascalize(" --fooBar--batShit--Crazy-", true), " FooBarBatShitCrazy");
  assert.equal(pascalize(" --fooBar--batShit--Crazy-", false), "FooBarBatShitCrazy");
});

t.run();
