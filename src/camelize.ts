import { pascalize } from "./pascalize";

/**
 * **Camelize**
 *
 * converts a string into _camelCase_.
 *
 * Note: _by default it also removes surrounding white space (if it exists) but it
 * can be preserved if you change the `preserveWhitespace` flag._
 */
export function camelize(input: string, preserveWhitespace: boolean = false): string {
  const pascal = pascalize(input, preserveWhitespace);
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(
    pascal
  ) as RegExpExecArray;

  return (
    (preserveWhitespace ? preWhite : "") +
    focus.replace(/^.*?([0-9]*?[a-z|A-Z]{1})/s, (_, p1) => p1.toLowerCase()) +
    (preserveWhitespace ? postWhite : "")
  );
}
