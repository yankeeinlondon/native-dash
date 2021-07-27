import type { Dasherize, LeftWhitespace, RightWhitespace } from "inferred-types";

/**
 * Produces a _dasherized_ version of a passed in string by:
 *
 * 1. Replacing all interior whitespace with a dash
 * 2. Replacing capitalized letters with a dash followed by the lowercase variant.
 * 3. Replace underscores with dashes
 * 4. Ensuring that duplicate dashes are removed and that non-whitespaced
 * characters are not dashes
 *
 * Note: does not impact exterior whitespace, e.g., `  myDash  ` is translated to `  my-dash  ` and leading and closing white space is not transformed.
 */
export function dasherize<S extends string, P extends boolean | undefined = undefined>(input: S, preserveWhitespace?: P) {
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(input) as RegExpExecArray;

  const replaceWhitespace = (i: string) => i.replace(/\s/gs, "-");
  const replaceUppercase = (i: string) => i.replace(/[A-Z]/g, (c) => `-${c[0].toLowerCase()}`);
  const replaceLeadingDash = (i: string) => i.replace(/^-/s, "");
  const replaceTrailingDash = (i: string) => i.replace(/-$/s, "");
  const replaceUnderscore = (i: string) => i.replace(/_/g, "-");
  const removeDupDashes = (i: string) => i.replace(/-+/g, "-");

  return `${preWhite}${replaceUnderscore(
    replaceTrailingDash(
      replaceLeadingDash(removeDupDashes(replaceWhitespace(replaceUppercase(focus))))
    )
  )}${postWhite}` as true extends P
    ? `${LeftWhitespace<S>}${Dasherize<S>}${RightWhitespace<S>}`
    : Dasherize<S>;
}
