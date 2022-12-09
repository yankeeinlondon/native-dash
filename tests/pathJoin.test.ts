import { describe, it, expect } from "vitest";
import { pathJoin } from "../src/pathJoin";

describe("pathJoin() function", () => {
  it("plain text joins", () => {
    expect(pathJoin("test")).toEqual("test");
    expect(pathJoin("test", "foo", "bar")).toEqual("test/foo/bar");
    expect(pathJoin("test", "", "foo", "bar")).toEqual("test/foo/bar");
  });
  
  it("empty string is ignored", () => {
    expect(pathJoin("test", "")).toEqual("test");
    expect(pathJoin("test", "foo", "bar", "")).toEqual("test/foo/bar");
    expect(pathJoin("test", "", "foo", "bar", "")).toEqual("test/foo/bar");
  });
  
  it("use of forward slash", () => {
    expect(pathJoin("test", "foo", "/bar")).toEqual("test/foo/bar");
    expect(pathJoin("test", "/foo", "/bar")).toEqual("test/foo/bar");
    expect(pathJoin("/test", "/foo", "/bar")).toEqual("/test/foo/bar");
  });
  
  it("use of backslash slash", () => {
    expect(pathJoin("test", "foo", "\\bar")).toEqual("test/foo/bar");
    expect(pathJoin("test", "\\foo", "\\bar")).toEqual("test/foo/bar");
    expect(pathJoin("\\test", "\\foo", "\\bar")).toEqual("/test/foo/bar");
  });
  
  it("valid '..' use", () => {
    expect(pathJoin("../test", "foo", "bar")).toEqual("../test/foo/bar");
    expect(pathJoin("..\\test", "foo", "bar")).toEqual("../test/foo/bar");
  });
  
  
});
