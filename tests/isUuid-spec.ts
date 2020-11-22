import { suite } from "uvu";
import * as assert from "uvu/assert";
import { isUuid } from "../src/isUuid";

const t = suite("isGuid() function");

const valid = [
  "C56A4180-65AA-42EC-A945-5FD21DEC0538",
  "c56a4180-65aa-42ec-a945-5fd21dec0538",
  "C56a418065aa426ca9455fd21deC0538",
  "{c56a4180-65aa-42ec-a945-5fd21dec0538}",
  "{C56a418065aa426ca9455fd21deC0538}",
];

t("correctly validates valid GUIDs", () => {
  valid.forEach((guid) =>
    assert.ok(isUuid(guid, true), `The valid GUID "${guid}" was reported as invalid`)
  );
});

t("correctly validates dashed GUIDs while rejecting non dashed", () => {
  valid.forEach((guid) =>
    guid.includes("-") ? assert.ok(isUuid(guid)) : assert.not(isUuid(guid))
  );
});

const invalid = [
  "C56A418$-65AA-42EC-A945-5FD21DEC0538",
  "c56a418065aa-42ec-a945-5fd21dec0538",
  "C56a418065aa426ca945fd21deC0538",
  "{c56a4180-65aa-42ec-a!45-5fd21dec0538}",
  "{C56418065aa426ca9455fd21deC0538}",
];

t("correctly invalidates invalid GUIDs", () => {
  invalid.forEach((guid) =>
    assert.not(isUuid(guid, true), `The invalid GUID "${guid}" was reported as valid!`)
  );
});

t.run();
