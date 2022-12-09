import { describe, it, expect } from "vitest";
import { isUuid } from "../src/isUuid";


const valid = [
  "C56A4180-65AA-42EC-A945-5FD21DEC0538",
  "c56a4180-65aa-42ec-a945-5fd21dec0538",
  "C56a418065aa426ca9455fd21deC0538",
  "{c56a4180-65aa-42ec-a945-5fd21dec0538}",
  "{C56a418065aa426ca9455fd21deC0538}",
];

const invalid = [
  "C56A418$-65AA-42EC-A945-5FD21DEC0538",
  "c56a418065aa-42ec-a945-5fd21dec0538",
  "C56a418065aa426ca945fd21deC0538",
  "{c56a4180-65aa-42ec-a!45-5fd21dec0538}",
  "{C56418065aa426ca9455fd21deC0538}",
];


describe("isGuid() function", () => {
  it("correctly validates valid GUIDs", () => {
    valid.forEach((guid) =>
      expect(isUuid(guid, true)).toBeTruthy()
    );
  });
  
  it("correctly validates dashed GUIDs while rejecting non dashed", () => {
    valid.forEach((guid) =>
      guid.includes("-") ? expect(isUuid(guid)).toBeTruthy() : expect(isUuid(guid)).toBeFalsy()
    );
  });

  it("correctly invalidates invalid GUIDs", () => {
    invalid.forEach((guid) =>
      expect(isUuid(guid, true)).toBeFalsy()
    );
  });

});








