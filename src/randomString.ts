/**
 * Provides a dependency-free method of generating
 * a useful 4 character random string.
 *
 * > **Note:** if you want a GUID then use the `guid()`
 * function instead which leverages this function but
 * puts it into the proper GUID format
 */
export function randomString() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
