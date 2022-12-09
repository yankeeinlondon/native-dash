import { describe, it, expect } from "vitest";
import { first, last } from "../src/index";
import { Expect, Equal, ExpectExtends } from "@type-challenges/utils";


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

describe("first() utility fn", () => {


it("All happy paths, pass in runtime", () => {
  for (const happy of numericArrays) {
    expect(first(happy)).toEqual(happy[0]);
  }
  for (const happy of stringArrays) {
    expect(first(happy)).toEqual(happy[0]);
  }
  for (const happy of boolArrays) {
    expect(first(happy)).toEqual(happy[0]);
  }
  for (const happy of foobarArrays) {
    expect(first(happy)).toEqual(happy[0]);
    expect(first(happy).foo).toEqual(happy[0].foo);
  }
});

it("All types for happy paths are good", () => {
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
  const c: cases = [true, true, true];
  expect(c).toEqual(c);
});

});


describe("last() utility fn", () => {

  it("All happy paths, pass in runtime", () => {
    for (const happy of numericArrays) {
      expect(last(happy)).toEqual(happy[happy.length - 1]);
    }
    for (const happy of stringArrays) {
      expect(last(happy)).toEqual(happy[happy.length - 1]);
    }
    for (const happy of boolArrays) {
      expect(last(happy)).toEqual(happy[happy.length - 1]);
    }
    for (const happy of foobarArrays) {
      expect(last(happy)).toEqual(happy[happy.length - 1]);
      expect(last(happy).foo).toEqual(happy[happy.length - 1].foo);
    }
  });
  
  it("All types for happy paths are good", () => {
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
    const c: cases = [true, true, true, true];
    expect(c).toEqual(c);
  });
  

});
