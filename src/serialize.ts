
/**
 * converts an array of _things_ into a `\n` delimited
 * string of stringified objects.
 *
 * FUTURE: If a **source** is passed in
 * -- either a _file_ or _url_ then it will stream to that
 * source.
 *
 */
export function serialize(arr: any[] /** , source?: url | filename **/) {
  return arr.map((i) => JSON.stringify(i)).join("\n");
}
