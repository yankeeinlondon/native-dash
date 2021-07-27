import { Equal, Expect, ExpectExtends } from "@type-challenges/utils";
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

// type checks

t(`Using wide "string" type, type is preserved`, () => {
  const bDash: string = "one-two-three";
  const bSnake: string = "one_two_three";
  const bWhite: string = "  one-two-three  ";
  const aDash = pascalize(bDash);
  const aSnake = pascalize(bSnake);
  const aWhiteTrimmed = pascalize(bWhite);
  const aWhite = pascalize(bWhite, true);

  type ADash = typeof aDash;
  type ASnake = typeof aSnake;
  type AWhiteTrimmed = typeof aWhiteTrimmed;
  type AWhite = typeof aWhite;

  type cases = [
    Expect<Equal<ADash, string>>,
    Expect<Equal<ASnake, string>>,
    Expect<Equal<AWhiteTrimmed, string>>,
    Expect<Equal<AWhite, string>>,
  ];

  const c: cases = [true, true, true, true];
  assert.equal(c, c);
});

t(`Using "string literal", type is modified appropriately`, () => {
  const dash = "one-two-three";
  const snake = "one_two_three";
  const pascal = "OneTwoThree";
  const white = "  one-two-three  ";
  const white2 = "\n  one-two-three  \t";

  const aDash = pascalize(dash);
  const aSnake = pascalize(snake);
  const aPascal = pascalize(pascal);

  const aWhiteTrimmed = pascalize(white);
  const aWhitePreserved = pascalize(white, true);

  const aWhiteTrimmed2 = pascalize(white2, false);
  const aWhite2Preserved = pascalize(white2, true);


  type ADash = typeof aDash;
  type ASnake = typeof aSnake;
  type APascal = typeof aPascal;
  type AWhiteTrimmed = typeof aWhiteTrimmed;
  type AWhitePreserved = typeof aWhitePreserved;

  type AWhiteTrimmed2 = typeof aWhiteTrimmed2;
  type AWhitePreserved2 = typeof aWhite2Preserved;

  type cases = [
    // All non-whitespaced versions of a string are converted to correct string literal
    Expect<Equal<ADash, "OneTwoThree">>,
    Expect<Equal<ASnake, "OneTwoThree">>,
    // that includes those which need no transformation
    Expect<Equal<APascal, "OneTwoThree">>,
    // with a whitespaced input, the default is to trim it
    Expect<Equal<AWhiteTrimmed, "OneTwoThree">>,
    Expect<Equal<AWhiteTrimmed2, "OneTwoThree">>,
    // but whitespace can be preserved too
    Expect<Equal<AWhitePreserved, "  OneTwoThree  ">>,
    Expect<Equal<AWhitePreserved2, "\n  OneTwoThree  \t">>,
  ];

  const c: cases = [true, true, true, true, true, true, true];
  assert.equal(c, c);
});

t.run();
