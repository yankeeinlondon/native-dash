import { IFormattingOptions } from "../fluent-types";
import { italicize, strikethrough, underline } from "../format";
import { paint } from "./paint";

export function replace(
  find: string,
  corpus: string,
  formatting: IFormattingOptions,
  global: boolean = true
) {
  const re = new RegExp(find, global ? "gs" : "s");
  let replacement = find;
  if (formatting.color) replacement = paint(replacement, formatting.color, formatting.bg);

  if (formatting.italics) replacement = italicize(replacement);
  if (formatting.underline) replacement = underline(replacement);
  if (formatting.strikeThrough) replacement = strikethrough(replacement);

  return corpus.replace(re, replacement);
}
