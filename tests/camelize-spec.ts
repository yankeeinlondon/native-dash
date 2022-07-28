import { Equal, Expect } from "@type-challenges/utils";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { camelize } from "../src/camelize";

const t = suite("camelize() function");

t("camelCase is converted correctly", () => {
  assert.equal(camelize("PascalCase"), "pascalCase");
  assert.equal(camelize(" PascalCase ", false), "pascalCase");
  assert.equal(camelize(" PascalCase ", true), " pascalCase ");
  assert.equal(camelize("OnceUponATime"), "onceUponATime");
  assert.equal(camelize("78CamelCaseIsNotGreat9"), "78camelCaseIsNotGreat9");
});

t("snake_case is converted correctly", () => {
  assert.equal(camelize("snake_case"), "snakeCase");
  assert.equal(camelize(" snake_case ", true), " snakeCase ");
  assert.equal(camelize("snake_case_in_rust"), "snakeCaseInRust");
});

t("PascalCase is converted correctly", () => {
  assert.equal(camelize("dash-me"), "dashMe");
  assert.equal(camelize("dash_me"), "dashMe");
  assert.equal(camelize("dash-for-css"), "dashForCss");
  assert.equal(camelize(" dash-me ", true), " dashMe ");
});

t("Bastar*d Case is converted correctly", () => {
  assert.equal(camelize(" CamelCase is not PascalCase ", true), " camelCaseIsNotPascalCase ");
  assert.equal(camelize(" --fooBar--batShit--Crazy-", true), " fooBarBatShitCrazy");
});

t(`Using "string literal", type is modified appropriately`, () => {
  const dash = "one-two-three";
  const snake = "one_two_three";
  const pascal = "OneTwoThree";
  const camel = "oneTwoThree";

  const white = "  one-two-three  ";
  const whiteHybrid = "\n  one-two-three \t";
  // runtime vars after being tranformed
  const aDash = camelize(dash);
  const aSnake = camelize(snake);
  const aCamel = camelize(camel);
  const aPascal = camelize(pascal);

  const aWhiteTrimmed = camelize(white);
  const aWhite = camelize(white, true);
  const aWhiteHybridTrimmed = camelize(whiteHybrid);
  const aWhiteHybrid = camelize(whiteHybrid, true);

  // target type
  type TARGET = "oneTwoThree";
  // types of transformed strings
  type ADash = typeof aDash;
  type ASnake = typeof aSnake;
  type ACamel = typeof aCamel;
  type APascal = typeof aPascal;
  type AWhiteTrimmed = typeof aWhiteTrimmed;
  type AWhiteHybridTrimmed = typeof aWhiteHybridTrimmed;
  type AWhite = typeof aWhite;
  type AWhiteHybrid = typeof aWhiteHybrid;

  type cases = [
    // All non-whitespaced versions of a string are converted to correct string literal
    Expect<Equal<ADash, TARGET>>,
    Expect<Equal<ASnake, TARGET>>,
    Expect<Equal<APascal, TARGET>>,
    // that includes those which need no transformation
    Expect<Equal<ACamel, TARGET>>,
    // with a whitespaced input, the default is to trim it
    Expect<Equal<AWhiteTrimmed, TARGET>>,
    Expect<Equal<AWhiteHybridTrimmed, TARGET>>,
    // but whitespace can be preserved too
    Expect<Equal<AWhite, "  oneTwoThree  ">>,
    Expect<Equal<AWhiteHybrid, "\n  oneTwoThree \t">>
  ];

  const c: cases = [true, true, true, true, true, true, true, true];
  assert.equal(c, c);
});

t.run();
