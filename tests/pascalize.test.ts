import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import { pascalize } from "../src/pascalize";

describe("pascalize() function", () => {
  it("camelCase is converted correctly", () => {
    expect(pascalize("camelCase")).toEqual("CamelCase");
    expect(pascalize(" camelCase ", true)).toEqual(" CamelCase ");
    expect(pascalize(" camelCase ")).toEqual("CamelCase");
    expect(pascalize("onceUponATime")).toEqual("OnceUponATime");
    expect(pascalize("78camelCaseIsNotGreat9")).toEqual("78CamelCaseIsNotGreat9");
  });
  
  it("snake_case is converted correctly", () => {
    expect(pascalize("snake_case")).toEqual("SnakeCase");
    expect(pascalize("snake_case_in_rust")).toEqual("SnakeCaseInRust");
    expect(pascalize(" snake_case ", true)).toEqual(" SnakeCase ");
  });
  
  it("PascalCase is converted correctly", () => {
    expect(pascalize("dash-me")).toEqual("DashMe");
    expect(pascalize("dash_me")).toEqual("DashMe");
    expect(pascalize("dash-for-css")).toEqual("DashForCss");
    expect(pascalize(" dash-me ", true)).toEqual(" DashMe ");
  });
  
  it("Bastar*d Case is converted correctly", () => {
    expect(pascalize(" camelCase is not PascalCase ", true)).toEqual(" CamelCaseIsNotPascalCase ");
    expect(pascalize(" --fooBar--batShit--Crazy-", true)).toEqual(" FooBarBatShitCrazy");
    expect(pascalize(" --fooBar--batShit--Crazy-", false)).toEqual("FooBarBatShitCrazy");
  });
  
  // type checks
  
  it(`Using wide "string" type, type is preserved`, () => {
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
      Expect<Equal<AWhite, string>>
    ];
  
    const c: cases = [true, true, true, true];
    expect(c).toEqual(c);
  });
  
  it(`Using "string literal", type is modified appropriately`, () => {
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
      // All non-white spaced versions of a string are converted to correct string literal
      Expect<Equal<ADash, "OneTwoThree">>,
      Expect<Equal<ASnake, "OneTwoThree">>,
      // that includes those which need no transformation
      Expect<Equal<APascal, "OneTwoThree">>,
      // with a white spaced input, the default is to trim it
      Expect<Equal<AWhiteTrimmed, "OneTwoThree">>,
      Expect<Equal<AWhiteTrimmed2, "OneTwoThree">>,
      // but whitespace can be preserved too
      Expect<Equal<AWhitePreserved, "  OneTwoThree  ">>,
      Expect<Equal<AWhitePreserved2, "\n  OneTwoThree  \t">>
    ];
  
    const c: cases = [true, true, true, true, true, true, true];
    expect(c).toEqual(c);
  });
  
});


