/**
 * **Snakerize**
 *
 * Converts a string to snake_case notation.
 *
 * Note: _by default it also removes surrounding white space (if it exists) but it
 * can be preserved if you change the `preserveWhitespace` flag._
 */
export function snakerize(input: string, preserveWhitespace: boolean = false): string {
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(
    input
  ) as RegExpExecArray;

  const convertInteriorSpace = (input: string) => input.replace(/\s+/gs, "_");
  const convertDashes = (input: string) => input.replace(/-/gs, "_");
  const injectUnderscoreBeforeCaps = (input: string) => input.replace(/([A-Z])/gs, "_$1");
  const removeLeadingUnderscore = (input: string) =>
    input.startsWith("_") ? input.slice(1) : input;

  return (
    (preserveWhitespace ? preWhite : "") +
    removeLeadingUnderscore(
      injectUnderscoreBeforeCaps(convertDashes(convertInteriorSpace(focus)))
    ).toLowerCase() +
    (preserveWhitespace ? postWhite : "")
  );
}
