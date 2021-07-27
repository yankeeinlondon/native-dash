import { CamelCase, LeftWhitespace, RightWhitespace } from "inferred-types";
import { pascalize } from "./pascalize";

/**
 * **Camelize**
 *
 * Converts a string into _camelCase_ string and transforms **type** of a _string literal_ to match
 * (a _string_ type remains a _string_).
 *
 * Note: _by default whitespace on both left and right side is removed, but you can change this
 * behavior by setting the optional "preserveWhitespace" parameter to `false`_
 */
export function camelize<S extends string, P extends boolean | undefined = undefined>(input: S, preserveWhitespace?: P) {
  const pascal = preserveWhitespace ? pascalize(input, preserveWhitespace) : pascalize(input);
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(
    pascal
  ) as RegExpExecArray;

  const camel = (preserveWhitespace ? preWhite : "") +
    focus.replace(/^.*?([0-9]*?[a-z|A-Z]{1})/s, (_, p1) => p1.toLowerCase()) +
    (preserveWhitespace ? postWhite : "");

  return camel as true extends P
    ? `${LeftWhitespace<S>}${CamelCase<S>}${RightWhitespace<S>}`
    : CamelCase<S>;;
}
