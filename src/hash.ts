/**
 * Provides a hashing function which produces a 32-bit integer
 * hash which provides idempotency.
 *
 * This function is not intended to be used in situations where
 * there is need for strong cryptographic assurances but rather
 * where a _very_ lightweight hasher is desired.
 *
 * For more information on this hash function refer to the discussion
 * on stackoverflow: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 *
 * @param digest the text digest to be hashed
 */
export function hash(digest: string): number {
  let hash = 0,
    i,
    chr;
  for (i = 0; i < digest.length; i++) {
    chr = digest.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
