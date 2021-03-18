import { suite } from "uvu";
import * as assert from "uvu/assert";
import { pathJoin } from "../src/pathJoin";

const t = suite("pathJoin() function");

t("plain text joins", () => {
  assert.equal(pathJoin("test"), "test");
  assert.equal(pathJoin("test", "foo", "bar"), "test/foo/bar");
  assert.equal(pathJoin("test", "", "foo", "bar"), "test/foo/bar");
});

t("empty string is ignored", () => {
  assert.equal(pathJoin("test", ""), "test");
  assert.equal(pathJoin("test", "foo", "bar", ""), "test/foo/bar");
  assert.equal(pathJoin("test", "", "foo", "bar", ""), "test/foo/bar");
});

t("use of forward slash", () => {
  assert.equal(pathJoin("test", "foo", "/bar"), "test/foo/bar");
  assert.equal(pathJoin("test", "/foo", "/bar"), "test/foo/bar");
  assert.equal(pathJoin("/test", "/foo", "/bar"), "/test/foo/bar");
});

t("use of backslach slash", () => {
  assert.equal(pathJoin("test", "foo", "\\bar"), "test/foo/bar");
  assert.equal(pathJoin("test", "\\foo", "\\bar"), "test/foo/bar");
  assert.equal(pathJoin("\\test", "\\foo", "\\bar"), "/test/foo/bar");
});

t("valid '..' use", () => {
  assert.equal(pathJoin("../test", "foo", "bar"), "../test/foo/bar");
  assert.equal(pathJoin("..\\test", "foo", "bar"), "../test/foo/bar");
});

t("invalid '..' use", () => {
  assert.throws(() => pathJoin("test", "../foo", "bar"), /Input was invalid/);
  assert.throws(() => pathJoin("test", "../foo", "../bar"), /Input was invalid/);
  assert.ok(() => pathJoin("../test", "foo", "bar"));
});

t.run();
