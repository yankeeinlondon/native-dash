import { suite } from "uvu";
import * as assert from "uvu/assert";
import { camelize } from "../src/camelize";

const t = suite("camelize() function");

t("camelCase is converted correctly", () => {
  assert.equal(camelize("PascalCase"), "pascalCase");
  assert.equal(camelize(" PascalCase "), " pascalCase ");
  assert.equal(camelize("OnceUponATime"), "onceUponATime");
  assert.equal(camelize("78CamelCaseIsNotGreat9"), "78camelCaseIsNotGreat9");
});

t("snake_case is converted correctly", () => {
  assert.equal(camelize("snake_case"), "snakeCase");
  assert.equal(camelize(" snake_case "), " snakeCase ");
  assert.equal(camelize("snake_case_in_rust"), "snakeCaseInRust");
});

t("PascalCase is converted correctly", () => {
  assert.equal(camelize("dash-me"), "dashMe");
  assert.equal(camelize("dash_me"), "dashMe");
  assert.equal(camelize("dash-for-css"), "dashForCss");
  assert.equal(camelize(" dash-me "), " dashMe ");
});

t("Bastar*d Case is converted correctly", () => {
  assert.equal(camelize(" CamelCase is not PascalCase "), " camelCaseIsNotPascalCase ");
  assert.equal(camelize(" --fooBar--batShit--Crazy-"), " fooBarBatShitCrazy");
});

t.run();
