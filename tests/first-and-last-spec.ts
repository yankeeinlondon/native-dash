import { suite } from "uvu";
import * as assert from "uvu/assert";
import { first, last } from "../src/index";
import { Expect, Equal, ExpectExtends, NotAny, NotEqual } from "@type-challenges/utils";

const f = suite("first() utility fn");
const l = suite("last() utility fn");

const numericArrays = [
  [1, 2, 3, 4, 5],
  [23, 55, 99, 456],
];

const stringArrays = [
  ["foo", "bar", "baz"],
  ["foo", "bar", "", "baz", ""],
];

const boolArrays = [
  [true, true, false, true],
  [false, false, false, false],
  [true, false, true, false],
];

type Foobar = { foo: number; bar?: number };

const foobarArrays = [
  [{ foo: 1 }, { foo: 10, bar: 56 }, { foo: 3 }],
  [{ foo: 0 }, { foo: 10 }, { foo: -33 }],
  [{ foo: 1, bar: 77 }, { foo: 10 }, { foo: 3, bar: 88 }],
];

f("All happy paths, pass in runtime", () => {
  for (const happy of numericArrays) {
    assert.equal(first(happy), happy[0]);
  }
  for (const happy of stringArrays) {
    assert.equal(first(happy), happy[0]);
  }
  for (const happy of boolArrays) {
    assert.equal(first(happy), happy[0]);
  }
  for (const happy of foobarArrays) {
    assert.equal(first(happy), happy[0]);
    assert.equal(first(happy).foo, happy[0].foo);
  }
});

f("All types for happy paths are good", () => {
  const str = first(stringArrays[0]);
  type Str = typeof str;
  const num = first(numericArrays[0]);
  type Num = typeof num;
  const bool = first(boolArrays[0]);
  type Bool = typeof bool;

  type cases = [
    Expect<Equal<Str, string>>,
    Expect<Equal<Num, number>>,
    Expect<Equal<Bool, boolean>>
  ];
  const result: cases = [true, true, true];
  assert.equal(result, result);
});

f.run();

l("All happy paths, pass in runtime", () => {
  for (const happy of numericArrays) {
    assert.equal(last(happy), happy[happy.length - 1]);
  }
  for (const happy of stringArrays) {
    assert.equal(last(happy), happy[happy.length - 1]);
  }
  for (const happy of boolArrays) {
    assert.equal(last(happy), happy[happy.length - 1]);
  }
  for (const happy of foobarArrays) {
    assert.equal(last(happy), happy[happy.length - 1]);
    assert.equal(last(happy).foo, happy[happy.length - 1].foo);
  }
});

l("All types for happy paths are good", () => {
  const str = last(stringArrays[0]);
  type Str = typeof str;
  const num = last(numericArrays[0]);
  type Num = typeof num;
  const bool = last(boolArrays[0]);
  type Bool = typeof bool;
  const fooBar = last(foobarArrays[0]);

  type cases = [
    Expect<Equal<Str, string>>,
    Expect<Equal<Num, number>>,
    Expect<Equal<Bool, boolean>>,
    ExpectExtends<Foobar, typeof fooBar>
  ];
  const result: cases = [true, true, true, true];
  assert.equal(result, result);
});

l.run();
