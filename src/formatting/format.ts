import { IFormattingOptions } from "./fluent-types";

/** _italicize_ a block of text */
export function italicize(text: string = "") {
  return `\u001b[3m${text}\u001b[0m`;
}

/** _underline_ a block of text */
export function underline(text: string = "") {
  return `\u001b[4m${text}\u001b[0m`;
}

/** ~strikethrough~ a block of text (not supported on many terminals) */
export function strikethrough(text: string = "") {
  return `\u001b[9m${text}\u001b[0m`;
}

/**
 * Look through a _corpus_ of text for a particular string and
 * then format for the console.
 */
// export function format(find: string, global: boolean = true) {
//   let config: IFormattingOptions = {};

//   return formattingApi<"in">(find, global, config);
// }
