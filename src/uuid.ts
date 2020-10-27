import { randomString } from "./randomString";

/**
 * Produces a UUID with 32 random string characters.
 *
 * By default this will use the dasherized convention of **uuid** but you can
 * turn this off and just output the random string characters.
 */
export function uuid(dasherized: boolean = true) {
  return dasherized
    ? randomString() +
        randomString() +
        "-" +
        randomString() +
        "-" +
        randomString() +
        "-" +
        randomString() +
        "-" +
        randomString() +
        randomString() +
        randomString()
    : randomString() +
        randomString() +
        randomString() +
        randomString() +
        randomString() +
        randomString() +
        randomString() +
        randomString();
}
