import { describe, it, expect } from "vitest";
import { toBase64, fromBase64 } from "../src";

const foobar = { foo: 15, bar: "testing" };
const json = JSON.stringify(foobar);

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const lorem64 =
  "TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLgpVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4=";

describe("Base64 encoding/decoding", () => {

  describe("encoding and decoding of set string is idempotent", () => {
    const tests = ["abcd", "dfadf45345354\ndfde", "&&&&34234134adfdasdfasdfasdf"];
    tests.forEach((testString) => {
      const encoded = toBase64(testString);
      const decoded = fromBase64(encoded);
      it(`The string "" can be encoded and decoded back to the same value`, () => {
        expect(testString).toEqual(decoded);
      });
    });
  });  

  it("known text encoding works as expected", () => {
    expect(lorem64).toEqual( toBase64(lorem));
  });

  it("known text decoding works as expected", () => {
    expect(lorem).toEqual(fromBase64(lorem64));
  });

  it("decoding to JSON results in an object being returned", () => {
    const b64 = toBase64(json);
    const data = fromBase64<typeof foobar>(b64, true);
    expect(typeof data).toBe("object");
    expect(data.foo).toEqual(15);
  });
});