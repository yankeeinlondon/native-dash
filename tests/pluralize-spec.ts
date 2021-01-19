import { suite } from "uvu";
import * as assert from "uvu/assert";
import { IExplicitPluralization, pluralize } from "../src";

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

const defaultExceptions = {
  photo: "photos",
  piano: "pianos",
  halo: "halos",
  foot: "feet",
  man: "men",
  woman: "women",
  person: "people",
  mouse: "mice",
  series: "series",
  sheep: "sheep",
  deer: "deer",
};

t("exceptions are processed correctly", () => {
  Object.keys(defaultExceptions).forEach((key) =>
    assert.equal(pluralize(key), defaultExceptions[key as keyof typeof defaultExceptions])
  );
});

t("additional exceptions are used without interfering with default exceptions", () => {
  const explictPluralizations = { foo: "foey", bar: "barred" };
  // existing rules are not interfered with
  Object.keys(defaultExceptions).forEach((key) =>
    assert.equal(
      pluralize(key, { explictPluralizations }),
      defaultExceptions[key as keyof typeof defaultExceptions]
    )
  );
  // explicit mappings passed in work
  assert.equal(pluralize("foo", { explictPluralizations }), "foey");
  assert.equal(pluralize("bar", { explictPluralizations }), "barred");
});

t.run();
