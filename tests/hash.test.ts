import { describe, it, expect } from "vitest";
import { hash } from "../src/hash";

const text = "this is my test block";

describe("hash => ", () => {

  it("hash is idempotent", async () => {
    const h1 = hash(text);
    const h2 = hash(text);
  
    expect(h1).toEqual(h2);
    const h3 = hash(text);
    expect(h1).toEqual(h3);
  });
  
  it("hash produces different results from same length but mildly variant text", () => {
    const h1 = hash(text);
    const h2 = hash(text.slice(0, text.length - 1) + "X");
    const h3 = hash("X" + text.slice(1, text.length - 1));
  
    expect(h1).not.equal(h2);
    expect(h1).not.equal(h3);
  });
  

});

