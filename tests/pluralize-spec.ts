import { suite } from "uvu";
import * as assert from "uvu/assert";
import { IExplicitPluralization, PluralExceptionTuple, pluralize } from "../src";

const t = suite("pluralize function");

t("consonants then Y", () => {
  assert.equal(pluralize("city"), "cities");
  assert.equal(pluralize("puppy"), "puppies");
});

t("ends with f or fe", () => {
  assert.equal(pluralize("wife"), "wives");
  assert.equal(pluralize("wolf"), "wolves");
});

t("ends with o, s, ss, sh, ch, x, or z", () => {
  assert.equal(pluralize("truss"), "trusses");
  assert.equal(pluralize("bus"), "buses");
  assert.equal(pluralize("marsh"), "marshes");
  assert.equal(pluralize("lunch"), "lunches");
  assert.equal(pluralize("tax"), "taxes");
  assert.equal(pluralize("blitz"), "blitzes");
  assert.equal(pluralize("potato"), "potatoes");
  assert.equal(pluralize("tomato"), "tomatoes");
});

t("exceptions to ending in O", () => {
  assert.equal(pluralize("photo"), "photos");
  assert.equal(pluralize("piano"), "pianos");
  assert.equal(pluralize("halo"), "halos");
});

t("ending in 'us' replaced with 'i'", () => {
  assert.equal(pluralize("cactus"), "cacti");
  assert.equal(pluralize("focus"), "foci");
  assert.equal(pluralize("us"), "uses");
});

t("ending in 'is' converted to 'es'", () => {
  assert.equal(pluralize("analysis"), "analyses");
  assert.equal(pluralize("ellipsis"), "ellipses");
});

const defaultExceptions: PluralExceptionTuple[] = [
  [/(.*)photo$/s, "$1photos"],
  [/(.*)piano$/s, "$1pianos"],
  [/(.*)halo$/s, "$1halos"],
  [/(.*)foot$/s, "$1feet"],
  [/(.*)man$/s, "$1man"],
  [/(.*)person$/s, "person"],
  [/(.*)mouse$/s, "mice"],
  [/(.*)series$/s, "$1series"],
  [/(.*)sheep$/s, "$1sheep"],
  [/(.*)deer$/s, "$1deer"],
];

t("happy-path exceptions are processed correctly", () => {
  const tests = [
    ["photo", "photos"],
    ["piano", "pianos"],
    ["halo", "halos"],
    ["foot", "feet"],
    ["man", "men"],
    ["person", "people"],
    ["mouse", "mice"],
    ["series", "series"],
    ["sheep", "sheep"]
  ];

  tests.forEach(([singular, plural]) =>
    assert.equal(pluralize(singular), plural)
  );
});

t("adding text before regex pattern still results in correct pluralization", () => {
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
    ["woman", "women"]
  ];

  tests.forEach(([singular, plural]) =>
    assert.equal(pluralize(singular), plural)
  );
});

t("Uppercasing anywhere has no effect on matching; result will maintain caps where it can but use lowercase otherwise", () => {
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

  tests.forEach(([singular, plural]) =>
    assert.equal(pluralize(singular), plural)
  );
});

t("additional exceptions are used without interfering with default exceptions", () => {
  const bespokeExceptions: PluralExceptionTuple[] = [
    [/^foo$/i, "foey"],
    [/^bar$/i, "barred"]
  ];
  // explicit mappings passed in work
  assert.equal(pluralize("foo", { bespokeExceptions }), "foey");
  assert.equal(pluralize("bar", { bespokeExceptions }), "barred");
});

t.run();
