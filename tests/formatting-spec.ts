import { suite } from "uvu";
import * as assert from "uvu/assert";
import { COLOR, RESET_FG } from "../src/formatting/private";

const t = suite("console formatting");

t("color dictionary available from entry index file", async () => {
  const symbols = await import("../src/index");
  assert.ok(symbols.color);
  assert.type(symbols.color, "object");
});

t("italicize(), underline(), strikethrough() available from entry index file", async () => {
  const symbols = await import("../src/index");
  assert.ok(symbols.italicize);
  assert.type(symbols.italicize, "function");
  assert.ok(symbols.underline);
  assert.type(symbols.underline, "function");
  assert.ok(symbols.strikethrough);
  assert.type(symbols.strikethrough, "function");
});

t("format() available from entry index file", async () => {
  const symbols = await import("../src/index");
  assert.ok(symbols.format);
  assert.type(symbols.format, "function");
  assert.type(symbols.format("foo"), "object");
});

t("color foreground colors set", async () => {
  const { color } = await import("../src/index");
  const input = "foobar";
  assert.ok(color.red(input).includes(input));
  assert.ok(color.red(input).includes(String(COLOR.red[0])));
  assert.ok(color.magenta(input).includes(String(COLOR.magenta[0])));
});

t("foreground reset included when setting colors", async () => {
  const { color } = await import("../src/index");
  const input = "foobar";
  assert.ok(color.red(input).includes(String(RESET_FG)));
});

t.run();
