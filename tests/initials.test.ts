import { describe, it, expect } from "vitest";
import { initials } from "../src";

describe("initials => ", () => {


  it("using 'all' strategy, hybrid string works as expected", () => {
    expect(initials("ken Brian-snyder3rd")).toEqual("KBS3");
    expect(initials("ken BrianSnyde3rd")).toEqual("KBS3");
  });
  
  it("all uppercase is translated one-for-one as initials", () => {
    expect(initials("KBS")).toEqual("KBS");
  });
  
  it("an uppercase word is translated to a single initial", () => {
    expect(initials("Wrapper")).toEqual("W");
    expect(initials("wrapper")).toEqual("W");
  });
  
  it("a camelCase word is translated into appropriate initials", () => {
    expect(initials("floatRight")).toEqual("FR");
    expect(initials("floatRightNow")).toEqual("FRN");
  });
  

});


