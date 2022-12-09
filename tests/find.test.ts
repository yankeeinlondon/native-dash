import { describe, it, expect } from "vitest";
import { find, FindExpression } from "../src/index";
import { Expect, Equal } from "@type-challenges/utils";

const pattern = ".*DNS:(.*),IP:(.*)" as const;
type Pattern = typeof pattern;

describe("find() utility function", () => {
it(
  "find expression with named values can be built before executing on content and type is known",
  () => {
    const getDns = find(pattern, "dns", "ip");
    expect(typeof getDns, "function");

    type Actual = typeof getDns;
    type Expected = FindExpression<Pattern, ["dns", "ip"]>;
    type cases = [Expect<Equal<Actual, Expected>>];
    const cases: cases = [true];
    expect(cases).toBeTruthy();
  }
);

it(
  "find expression without named values can be built before executing on content and type is known",
  () => {
    const getDns = find(pattern);
    expect(typeof getDns, "function");

    type Actual = typeof getDns;
    type Expected = FindExpression<Pattern, []>;
    type cases = [Expect<Equal<Actual, Expected>>];
    const cases: cases = [true];
    expect(cases).toBeTruthy();
  }
);

it("find without names passed in returns an array of results", () => {
  const getDns = find(".*DNS:(.*),IP:(.*)");
  console.log("typeof", typeof getDns);

  const results = getDns(`subjectAltName=DNS:pve.local,IP:192.168.55.5
subjectAltName=DNS:antsle.local,IP:192.168.55.6
subjectAltName=DNS:dns1.local,IP:192.168.55.128`);
  expect(results).toBeTruthy();
  if (results) {
    const [all, dns, ip] = results;

    expect(all, "subjectAltName=DNS:pve.local,IP:192.168.55.5");
    expect(dns, "pve.local");
    expect(ip, "192.168.55.5");
  }
});

it("find with names passed in returns a dict of results", () => {
  const getDns = find(".*DNS:(.*),IP:(.*)", "dns", "ip");
  const { found, dns, ip } = getDns(`subjectAltName=DNS:pve.local,IP:192.168.55.5
subjectAltName=DNS:antsle.local,IP:192.168.55.6
subjectAltName=DNS:dns1.local,IP:192.168.55.128`);

  expect(found, "result was not found!").toBeTruthy();
  expect(dns, "pve.local");
  expect(ip, "192.168.55.5");
});

it("find() finds nothing", () => {
  const getDns1 = find(".*DNS:(.*),IP:(.*)");
  const results = getDns1("foobar");
  expect(results).toBe(false);

  const getDns2 = find(".*DNS:(.*),IP:(.*)", "ip", "dns");
  const results2 = getDns2("foobar");
  expect(results2.found).toBe(false);
});


});

