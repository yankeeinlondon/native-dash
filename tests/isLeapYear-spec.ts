import { suite } from "uvu";
import * as assert from "uvu/assert";
import { isLeapYear } from "../src/isLeapYear";

const t = suite("isLeapYear => ");
const leapYears = [1980, 2020, 2024, 2028, 2032, 2036];
const nonLeapYears = [1981, 2021, 2022, 2023, 2025];

leapYears.forEach((y) => t(`"${y}" is a leap year`, () => assert.ok(isLeapYear(y))));
nonLeapYears.forEach((y) =>
  t(`"${y}" is not a leap year`, () => assert.not.ok(isLeapYear(y)))
);

t.run();
