import { suite } from "uvu";
import * as assert from "uvu/assert";
import { find, FindExpression } from "../src/index";
import { Expect, Equal } from "@type-challenges/utils";

const t = suite("find() utility function");
const pattern = ".*DNS:(.*),IP:(.*)" as const;
type Pattern = typeof pattern;

t(
  "find expression with named values can be built before executing on content and type is known",
  () => {
    const getDns = find(pattern, "dns", "ip");
    assert.equal(typeof getDns, "function");

    type Actual = typeof getDns;
    type Expected = FindExpression<Pattern, ["dns", "ip"]>;
    type cases = [Expect<Equal<Actual, Expected>>];
    const cases: cases = [true];
    assert.ok(cases);
  }
);

t(
  "find expression without named values can be built before executing on content and type is known",
  () => {
    const getDns = find(pattern);
    assert.equal(typeof getDns, "function");

    type Actual = typeof getDns;
    type Expected = FindExpression<Pattern, []>;
    type cases = [Expect<Equal<Actual, Expected>>];
    const cases: cases = [true];
    assert.ok(cases);
  }
);

t("find without names passed in returns an array of results", () => {
  const getDns = find(".*DNS:(.*),IP:(.*)");
  console.log("typeof", typeof getDns);

  const results = getDns(`subjectAltName=DNS:pve.local,IP:192.168.55.5
subjectAltName=DNS:antsle.local,IP:192.168.55.6
subjectAltName=DNS:dns1.local,IP:192.168.55.128`);
  assert.ok(results);
  if (results) {
    const [all, dns, ip] = results;

    assert.equal(all, "subjectAltName=DNS:pve.local,IP:192.168.55.5");
    assert.equal(dns, "pve.local");
    assert.equal(ip, "192.168.55.5");
  }
});

t("find with names passed in returns a dict of results", () => {
  const getDns = find(".*DNS:(.*),IP:(.*)", "dns", "ip");
  const { found, dns, ip } = getDns(`subjectAltName=DNS:pve.local,IP:192.168.55.5
subjectAltName=DNS:antsle.local,IP:192.168.55.6
subjectAltName=DNS:dns1.local,IP:192.168.55.128`);

  assert.ok(found, "result was not found!");
  assert.equal(dns, "pve.local");
  assert.equal(ip, "192.168.55.5");
});

t("find() finds nothing", () => {
  const getDns1 = find(".*DNS:(.*),IP:(.*)");
  const results = getDns1("foobar");
  assert.equal(results, false);

  const getDns2 = find(".*DNS:(.*),IP:(.*)", "ip", "dns");
  const results2 = getDns2("foobar");
  assert.equal(results2.found, false);
});

t.run();
