import { describe, it, expect } from "vitest";
import { snakerize } from "../src/snakerize";

describe("snakerize() function", () => {

  it("camelCase is converted correctly", () => {
    expect(snakerize("snakeCase")).toEqual("snake_case");
    expect(snakerize(" snakeCase ")).toEqual("snake_case");
    expect(snakerize(" snakeCase ", true)).toEqual(" snake_case ");
    expect(snakerize("onceUponATime")).toEqual("once_upon_a_time");
    expect(snakerize("78snakeCaseIsNotGreat9")).toEqual("78snake_case_is_not_great9");
  });
  
  it("PascalCase is converted correctly", () => {
    expect(snakerize("PascalCase")).toEqual("pascal_case");
    expect(snakerize(" PascalCase ")).toEqual("pascal_case");
    expect(snakerize(" PascalCase ", true)).toEqual(" pascal_case ");
  });
  
  it("kebob-case is converted correctly", () => {
    expect(snakerize("kebob-case")).toEqual("kebob_case");
    expect(snakerize(" kebob-case ")).toEqual("kebob_case");
    expect(snakerize(" kebob-case ", true)).toEqual(" kebob_case ");
  });
  
  it("spaced words are converted correctly", () => {
    expect(snakerize("space case")).toEqual("space_case");
    expect(snakerize("Space Case")).toEqual("space_case");
    expect(snakerize("Real Person")).toEqual("real_person");
    expect(snakerize("Space case")).toEqual("space_case");
    expect(snakerize(" space  case ")).toEqual("space_case");
    expect(snakerize(" space case ", true)).toEqual(" space_case ");
  });

});

