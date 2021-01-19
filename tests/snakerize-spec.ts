import { suite } from "uvu";
import * as assert from "uvu/assert";
import { snakerize } from "../src/snakerize";

const t = suite("snakerize() function");

t("camelCase is converted correctly", () => {
  assert.equal(snakerize("snakeCase"), "snake_case");
  assert.equal(snakerize(" snakeCase "), "snake_case");
  assert.equal(snakerize(" snakeCase ", true), " snake_case ");
  assert.equal(snakerize("onceUponATime"), "once_upon_a_time");
  assert.equal(snakerize("78snakeCaseIsNotGreat9"), "78snake_case_is_not_great9");
});

t("PascalCase is converted correctly", () => {
  assert.equal(snakerize("PascalCase"), "pascal_case");
  assert.equal(snakerize(" PascalCase "), "pascal_case");
  assert.equal(snakerize(" PascalCase ", true), " pascal_case ");
});

t("kebob-case is converted correctly", () => {
  assert.equal(snakerize("kebob-case"), "kebob_case");
  assert.equal(snakerize(" kebob-case "), "kebob_case");
  assert.equal(snakerize(" kebob-case ", true), " kebob_case ");
});

t.run();
