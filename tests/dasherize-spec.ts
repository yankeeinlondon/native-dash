
import { Equal, Expect } from "@type-challenges/utils";
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

t("Using string type, the types remain as string", () => {
  const snake: string = "one_two_three";
  const aSnake = dasherize(snake);
  type Snake = typeof aSnake;

  type cases = [
    Expect<Equal<Snake, string>>
  ];
  const c: cases = [true];
  assert.equal(c, c);
})

t(`Using "string literal", type is modified appropriately`, () => {
  const dash = "one-two-three";
  const snake = "one_two_three";
  const pascal = "OneTwoThree";
  const camel = "oneTwoThree";

  const white = "  one-two-three  ";
  const whiteHybrid = "\n  one-two-three \t";
  // runtime vars after being tranformed
  const aDash = dasherize(dash);
  const aSnake = dasherize(snake);
  const aCamel = dasherize(camel);
  const aPascal = dasherize(pascal);

  const aWhiteTrimmed = dasherize(white);
  const aWhite = dasherize(white, true);
  const aWhiteHybridTrimmed = dasherize(whiteHybrid);
  const aWhiteHybrid = dasherize(whiteHybrid, true);

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
    Expect<Equal<AWhiteHybrid, "\n  oneTwoThree \t">>,
  ];

  const c: cases = [true, true, true, true, true, true, true, true];
  assert.equal(c, c);
});


t.run();
