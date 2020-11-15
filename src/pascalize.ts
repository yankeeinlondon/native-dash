import { capitalize } from "./capitalize";

/**
 * Pascalize
 *
 * converts string representations in camelCase, snake_case, or space separated
 * into a PascalCase representation.
 */
export function pascalize(input: string): string {
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(input) as RegExpExecArray;

  const convertInteriorToCap = (i: string) =>
    i.replace(/[ |_|-]+([0-9]*?[a-z|A-Z]{1})/gs, (_, p1) => p1.toUpperCase());
  const startingToCap = (i: string) =>
    i.replace(/^[_|-]*?([0-9]*?[a-z]{1})/gs, (_, p1) => p1.toUpperCase());

  const replaceLeadingTrash = (i: string) => i.replace(/^[-_]/s, "");
  const replaceTrailingTrash = (i: string) => i.replace(/[-_]$/s, "");

  return `${preWhite}${capitalize(
    replaceTrailingTrash(replaceLeadingTrash(convertInteriorToCap(startingToCap(focus))))
  )}${postWhite}`;
}
