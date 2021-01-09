/**
 * Joins a set of paths together into a single path.
 *
 * **Note:** trailing path never includes a `/` so add this at the end if
 * you need it.
 *
 * **Note:** the ".." characters are allowed in starting string but in no
 * other.
 *
 * **Note:** any use of the Windows "\\" will be converted to the Posix "/"
 */
export function pathJoin(...args: string[]) {
  const leadingSlash = args[0] && (args[0].startsWith("/") || args[0].startsWith("\\"));
  const parts = args
    .filter((i) => i)
    .map((i) => removeSlashAtFrontAndBack(makeForwardSlashBeBackward(i)));
  if (parts.slice(1).some((i) => i.includes(".."))) {
    throw new Error(
      `pathJoin() only accepts the ".." notation at the beginning of the first string and no where else. Input was invalid: ${JSON.stringify(
        args
      )}`
    );
  }

  return `${leadingSlash ? "/" : ""}${parts.join("/")}`;
}

function removeSlashAtFrontAndBack(input: string) {
  input = input.startsWith("/") ? input.slice(1) : input;
  input = input.endsWith("/") ? input.slice(0, input.length - 1) : input;
  return input;
}

function makeForwardSlashBeBackward(input: string) {
  return input.replace(/\\/gs, "/");
}
