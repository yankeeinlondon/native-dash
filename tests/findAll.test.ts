import { describe, it, expect } from "vitest";
import { findAll } from "../src/index";

const pattern = ".*DNS:(.*),IP:(.*)" as const;

describe("findAll() utility function", () => {

  it("findAll() with names returns appropriate results", () => {
    const getDns = findAll(pattern, "dns", "ip");
    const results = getDns(`subjectAltName=DNS:pve.local,IP:192.168.55.5
  subjectAltName=DNS:antsle.local,IP:192.168.55.6
  subjectAltName=DNS:dns1.local,IP:192.168.55.128`);
    console.log(results);
  
    expect(results.length).toEqual(3);
    for (const r of results) {
      expect(typeof r).toEqual("object");
      expect("all" in r).toBeTruthy();
      expect("dns" in r).toBeTruthy();
      expect(r.dns === "antsle.local" || "dns1.local").toBeTruthy();
      expect("ip" in r).toBeTruthy();
    }
  });

});


