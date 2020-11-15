import { pascalize } from "./pascalize";

/**
 * Camelize
 *
 * converts string representations in PascalCase, snake_case, or space
 * separated into a camelCase representation.
 */
export function camelize(input: string): string {
  const pascal = pascalize(input);
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(pascal) as RegExpExecArray;

  return (
    preWhite + focus.replace(/^.*?([0-9]*?[a-z|A-Z]{1})/s, (_, p1) => p1.toLowerCase()) + postWhite
  );
}
