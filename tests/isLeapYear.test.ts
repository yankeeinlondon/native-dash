import { describe, it, expect } from "vitest";
import { isLeapYear } from "../src/isLeapYear";

const leapYears = [1980, 2020, 2024, 2028, 2032, 2036];
const nonLeapYears = [1981, 2021, 2022, 2023, 2025];

describe("isLeapYear => ", () => {

  leapYears.forEach((y) => it(
    `"${y}" is a leap year`, 
    () => expect(isLeapYear(y)).toBeTruthy())
  );
  //
  nonLeapYears.forEach((y) => it(
      `"${y}" is not a leap year`, 
      () => expect(isLeapYear(y)).toBeFalsy()
  ));

});




