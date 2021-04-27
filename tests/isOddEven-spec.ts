import { suite } from "uvu";
import * as assert from "uvu/assert";
import { isOdd, isEven } from "../src";

const t = suite("isEven/isOdd functions");

const odds = [1, 3, 5, 101];
const evens = [2, 4, 6, 100];

t("isEven() correctly identifies even numbers", () => {
  evens.forEach((num) => assert.ok(isEven(num)));
});

t("isEven() correctly identifies odd numbers", () => {
  odds.forEach((num) => assert.not.ok(isEven(num)));
});

t("isOdd() correctly identifies even numbers", () => {
  evens.forEach((num) => assert.not.ok(isOdd(num)));
});

t("isOdd() correctly identifies odd numbers", () => {
  odds.forEach((num) => assert.ok(isOdd(num)));
});

t.run();
