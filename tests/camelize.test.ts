import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import { camelize } from "../src/camelize";

describe("camelize()", () => {

it("camelCase is converted correctly", () => {
  expect(camelize("PascalCase")).toEqual("pascalCase");
  expect(camelize(" PascalCase ", false)).toEqual("pascalCase");
  expect(camelize(" PascalCase ", true)).toEqual(" pascalCase ");
  expect(camelize("OnceUponATime")).toEqual("onceUponATime");
  expect(camelize("78CamelCaseIsNotGreat9")).toEqual("78camelCaseIsNotGreat9");
});

it("snake_case is converted correctly", () => {
  expect(camelize("snake_case")).toEqual("snakeCase");
  expect(camelize(" snake_case ", true)).toEqual(" snakeCase ");
  expect(camelize("snake_case_in_rust")).toEqual("snakeCaseInRust");
});

it("PascalCase is converted correctly", () => {
  expect(camelize("dash-me")).toEqual("dashMe");
  expect(camelize("dash_me")).toEqual("dashMe");
  expect(camelize("dash-for-css")).toEqual("dashForCss");
  expect(camelize(" dash-me ", true)).toEqual(" dashMe ");
});

it("Bastar*d Case is converted correctly", () => {
  expect(camelize(" CamelCase is not PascalCase ", true)).toEqual(" camelCaseIsNotPascalCase ");
  expect(camelize(" --fooBar--batShit--Crazy-", true)).toEqual(" fooBarBatShitCrazy");
});

it(`Using "string literal", type is modified appropriately`, () => {
  const dash = "one-two-three";
  const snake = "one_two_three";
  const pascal = "OneTwoThree";
  const camel = "oneTwoThree";

  const white = "  one-two-three  ";
  const whiteHybrid = "\n  one-two-three \t";
  // runtime vars after being transformed
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
    // All non-white spaced versions of a string are converted to correct string literal
    Expect<Equal<ADash, TARGET>>,
    Expect<Equal<ASnake, TARGET>>,
    Expect<Equal<APascal, TARGET>>,
    // that includes those which need no transformation
    Expect<Equal<ACamel, TARGET>>,
    // with a white spaced input, the default is to trim it
    Expect<Equal<AWhiteTrimmed, TARGET>>,
    Expect<Equal<AWhiteHybridTrimmed, TARGET>>,
    // but whitespace can be preserved too
    Expect<Equal<AWhite, "  oneTwoThree  ">>,
    Expect<Equal<AWhiteHybrid, "\n  oneTwoThree \t">>
  ];

  const c: cases = [true, true, true, true, true, true, true, true];
  expect(c).toEqual(c);
});

});