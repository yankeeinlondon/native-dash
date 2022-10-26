import { suite } from "uvu";
import * as assert from "uvu/assert";
import { findAll } from "../src/index";

const t = suite("findAll() utility function");
const pattern = ".*DNS:(.*),IP:(.*)" as const;

t("findAll() with names returns appropriate results", () => {
  const getDns = findAll(pattern, "dns", "ip");
  const results = getDns(`subjectAltName=DNS:pve.local,IP:192.168.55.5
subjectAltName=DNS:antsle.local,IP:192.168.55.6
subjectAltName=DNS:dns1.local,IP:192.168.55.128`);
  console.log(results);

  assert.equal(results.length, 3);
  for (const r of results) {
    assert.equal(typeof r, "object");
    assert.ok("all" in r);
    assert.ok("dns" in r);
    assert.ok(r.dns === "antsle.local" || "dns1.local");
    assert.ok("ip" in r);
  }
});

t.run();
