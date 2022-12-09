import { describe, it, expect } from "vitest";
import { PluralExceptionTuple, pluralize } from "../src";

describe("pluralize function", () => {
  it("consonants then Y", () => {
    expect(pluralize("city")).toEqual("cities");
    expect(pluralize("puppy")).toEqual("puppies");
  });
  
  it("ends with f or fe", () => {
    expect(pluralize("wife")).toEqual("wives");
    expect(pluralize("wolf")).toEqual("wolves");
  });
  
  it("ends with o, s, ss, sh, ch, x, or z", () => {
    expect(pluralize("truss")).toEqual("trusses");
    expect(pluralize("bus")).toEqual("buses");
    expect(pluralize("marsh")).toEqual("marshes");
    expect(pluralize("lunch")).toEqual("lunches");
    expect(pluralize("tax")).toEqual("taxes");
    expect(pluralize("blitz")).toEqual("blitzes");
    expect(pluralize("potato")).toEqual("potatoes");
    expect(pluralize("tomato")).toEqual("tomatoes");
  });
  
  it("exceptions to ending in O", () => {
    expect(pluralize("photo")).toEqual("photos");
    expect(pluralize("piano")).toEqual("pianos");
    expect(pluralize("halo")).toEqual("halos");
  });
  
  it("ending in 'us' replaced with 'i'", () => {
    expect(pluralize("cactus")).toEqual("cacti");
    expect(pluralize("focus")).toEqual("foci");
    expect(pluralize("us")).toEqual("uses");
  });
  
  it("ending in 'is' converted to 'es'", () => {
    expect(pluralize("analysis")).toEqual("analyses");
    expect(pluralize("ellipsis")).toEqual("ellipses");
  });
  
  
  it("happy-path exceptions are processed correctly", () => {
    const tests = [
      ["photo", "photos"],
      ["piano", "pianos"],
      ["halo", "halos"],
      ["foot", "feet"],
      ["man", "men"],
      ["person", "people"],
      ["mouse", "mice"],
      ["series", "series"],
      ["sheep", "sheep"],
    ];
  
    tests.forEach(([singular, plural]) => expect(pluralize(singular)).toEqual(plural));
  });
  
  it("adding text before regex pattern still results in correct pluralization", () => {
    const tests = [
      ["MYphoto", "MYphotos"],
      ["MYpiano", "MYpianos"],
      ["MYhalo", "MYhalos"],
      ["MYfoot", "MYfeet"],
      ["MYman", "MYmen"],
      ["MYperson", "MYpeople"],
      ["MYmouse", "MYmice"],
      ["MYseries", "MYseries"],
      ["MYsheep", "MYsheep"],
      ["woman", "women"],
      ["DeeperPerson", "DeeperPeople"],
    ];
  
    tests.forEach(([singular, plural]) => expect(pluralize(singular)).toEqual(plural));
  });
  
  it(
    "Uppercasing anywhere has no effect on matching; result will maintain caps where it can but use lowercase otherwise",
    () => {
      const tests = [
        // NORMAL RULES
        ["CAR", "CARs"],
        ["PUsh", "PUshes"],
        ["LIFE", "LIves"],
        // EXCEPTION CASES
        ["fUn", "fUn"],
        ["phOTo", "phOTos"],
        ["piANo", "piANos"],
        ["HALO", "HALOs"],
      ];
  
      tests.forEach(([singular, plural]) => expect(pluralize(singular)).toEqual(plural));
    }
  );
  
  it("additional exceptions are used without interfering with default exceptions", () => {
    const bespokeExceptions: PluralExceptionTuple[] = [
      [/^foo$/i, "foey"],
      [/^bar$/i, "barred"],
    ];
    // explicit mappings passed in work
    expect(pluralize("foo", { bespokeExceptions })).toEqual("foey");
    expect(pluralize("bar", { bespokeExceptions })).toEqual("barred");
  });
  
});

