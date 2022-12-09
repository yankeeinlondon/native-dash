import { describe, it, expect } from "vitest";
import { isOdd, isEven } from "../src";

const odds = [1, 3, 5, 101];
const evens = [2, 4, 6, 100];

describe("isEven/isOdd functions", () => {

  it("isEven() correctly identifies even numbers", () => {
    evens.forEach((num) => expect(isEven(num)).toBeTruthy());
  });
  
  it("isEven() correctly identifies odd numbers", () => {
    odds.forEach((num) => expect(isEven(num)).toBeFalsy());
  });
  
  it("isOdd() correctly identifies even numbers", () => {
    evens.forEach((num) => expect(isOdd(num)).toBeFalsy());
  });
  
  it("isOdd() correctly identifies odd numbers", () => {
    odds.forEach((num) => expect(isOdd(num)).toBeTruthy());
  });

});
