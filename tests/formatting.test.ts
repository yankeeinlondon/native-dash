import { describe, it, expect } from "vitest";

import { COLOR, RESET_FG } from "../src/formatting/private";

describe("color formatting", () => {



it("color dictionary available from entry index file", async () => {
  const symbols = await import("../src/index");
  expect(symbols.color).toBeTruthy();
  expect(symbols.color, "object");
});

it(
  "italicize(), underline(), strikethrough() available from entry index file",
  async () => {
    const symbols = await import("../src/index");
    expect(symbols.italicize).toBeTruthy();
    expect(symbols.italicize).toBeTypeOf("function");
    expect(symbols.underline).toBeTruthy();
    expect(symbols.underline).toBeTypeOf("function");
    expect(symbols.strikethrough).toBeTruthy();
    expect(symbols.strikethrough).toBeTypeOf("function");
  }
);


it("color foreground colors set", async () => {
  const { color } = await import("../src/index");
  const input = "foobar";
  expect(color.red(input).includes(input)).toBeTruthy();
  expect(color.red(input).includes(String(COLOR.red[0]))).toBeTruthy();
  expect(color.magenta(input).includes(String(COLOR.magenta[0]))).toBeTruthy();
});

it("foreground reset included when setting colors", async () => {
  const { color } = await import("../src/index");
  const input = "foobar";
  expect(color.red(input).includes(String(RESET_FG))).toBeTruthy();
});

it("background reset included when setting background", async () => {
  const { color } = await import("../src/index");
  const input = "foobar";
  expect(color.red(input).includes(String(RESET_FG))).toBeTruthy();
});


});

