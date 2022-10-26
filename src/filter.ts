import { asArray } from "./asArray";

// string filters
export type FilterStarts = {
  /** one or more string which the value is allowed to start with */
  startsWith: string | string[];
};
export type FilterIs = {
  /** whether a string _**is**_ of a particular value */
  is: string | string[];
};
export type FilterEnds = { endsWith: string | string[] };
export type FilterContains = {
  /** whether any of the strings specified are _contained_ in the value */
  contains: string | string[];
};
// numeric filters
export type FilterEquals = {
  /** one or more values which _equal_ the value passed in */
  equals: number | number[];
};
export type FilterNotEqual = {
  /** one or more values which ALL _do not equal_ the value passed in */
  notEqual: number | number[];
};
export type FilterGreaterThan = {
  /** the incoming value is greater than this value */
  greaterThan: number;
};
export type FilterLessThan = {
  /** the incoming value is less than this value */
  lessThan: number;
};

export type StringFilter =
  | FilterIs
  | FilterStarts
  | FilterEnds
  | FilterContains
  | (FilterStarts & FilterEnds)
  | (FilterStarts & FilterContains)
  | (FilterEnds & FilterContains)
  | (FilterStarts & FilterEnds & FilterContains);

export type NumericFilter =
  | FilterEquals
  | FilterNotEqual
  | FilterGreaterThan
  | FilterLessThan
  | (FilterEquals & FilterNotEqual)
  | (FilterEquals & FilterGreaterThan)
  | (FilterEquals & FilterLessThan)
  | (FilterNotEqual & FilterGreaterThan)
  | (FilterNotEqual & FilterLessThan)
  | (FilterGreaterThan & FilterLessThan)
  | (FilterEquals & FilterGreaterThan & FilterLessThan)
  | (FilterNotEqual & FilterGreaterThan & FilterLessThan)
  | (FilterEquals & FilterNotEqual & FilterGreaterThan & FilterLessThan);

export type FilterDefn = StringFilter | NumericFilter;

export function isNumericFilter(filter: FilterDefn): filter is NumericFilter {
  return "equals" in filter ||
    "notEqual" in filter ||
    "greaterThan" in filter ||
    "lessThan" in filter
    ? true
    : false;
}

export type UndefinedValue<U extends boolean> = true extends U
  ? "undefined treated as 'true'"
  : "undefined treated as 'false'";

export type UndefinedTreatment = "undefined treated as 'true'" | "undefined treated as 'false'";

export type LogicalCombinator = "AND" | "OR";

/**
 * **FilterFn**
 *
 * A filter function derived from the `filter()` configurator. This function is intended to provide a type-strong _filter_ function which can be used like so:
 * be used like:
 * ```ts
 * const onlyPrivate = filter({ startsWith: "_" });
 * const privateFiles = files.filter(onlyPrivate);
 * ```
 *
 */
export type FilterFn<
  T extends StringFilter | NumericFilter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  U extends UndefinedTreatment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  C extends LogicalCombinator
> = T extends StringFilter
  ? <V extends string | undefined>(input: V) => boolean
  : <V extends number | undefined>(input: V) => boolean;

/**
 * Defines a logical function for each condition type
 */
export type ConditionFilter<T extends StringFilter | NumericFilter> = T extends StringFilter
  ? (input: string) => boolean
  : (input: number) => boolean;

/**
 * Wraps numeric filter's configuration into a logic filter
 */
const numericOps = <L extends LogicalCombinator>(config: NumericFilter, boolLogic: L) => {
  const equals = (n: number | number[]): [ConditionFilter<NumericFilter>] | [] => {
    const f = asArray(n);
    return f.length === 0 ? [] : [(input?: number) => f.some((i) => i === input)];
  };
  const notEqual = (n: number | number[]): [ConditionFilter<NumericFilter>] | [] => {
    const f = asArray(n);
    return f.length === 0 ? [] : [(input?: number) => f.every((i) => i !== input)];
  };

  /** returns 1 FilterFn's */
  const greaterThan = <V extends number>(n: V) => {
    const val = [(input?: V) => input !== undefined && input > n] as [(input: V) => boolean];
    return val as [ConditionFilter<NumericFilter>];
  };

  /** returns 0 or 1 FilterFn's */
  const lessThan = <V extends number>(n: V) => {
    const val = [(input: V) => input !== undefined && input < n];
    return val as [ConditionFilter<NumericFilter>] | [];
  };

  const conditions = [
    //
    ...("equals" in config ? equals(config.equals) : []),
    ...("notEqual" in config ? notEqual(config.notEqual) : []),
    ...("greaterThan" in config ? greaterThan(config.greaterThan) : []),
    ...("lessThan" in config ? lessThan(config.lessThan) : []),
  ];

  const combined =
    boolLogic === "AND"
      ? <N extends number>(input: N) => conditions.every((c) => c(input))
      : <N extends number>(input: N) => conditions.some((c) => c(input));

  return combined;
};

/** wraps configuration along with boolean logic  */
const stringOps = <L extends LogicalCombinator>(
  config: StringFilter,
  boolLogic: L
): ConditionFilter<StringFilter> => {
  const startsWith = (n: string | string[]): [ConditionFilter<StringFilter>] | [] => {
    const f = asArray(n);
    return f.length === 0 ? [] : [(input?: string) => f.some((i) => input?.startsWith(i))];
  };
  const endsWith = (n: string | string[]): [ConditionFilter<StringFilter>] | [] => {
    const f = asArray(n);
    return f.length === 0 ? [] : [(input?: string) => f.some((i) => input?.endsWith(i))];
  };
  const contains = (n: string | string[]): [ConditionFilter<StringFilter>] | [] => {
    const f = asArray(n);
    return f.length === 0 ? [] : [(input: string) => f.some((i) => input?.includes(i))];
  };

  const conditions = [
    ...("startsWith" in config ? startsWith(config.startsWith) : []),
    ...("endsWith" in config ? endsWith(config.endsWith) : []),
    ...("contains" in config ? contains(config.contains) : []),
  ];

  const combined =
    boolLogic === "AND"
      ? (input: string) => conditions.every((c) => c(input))
      : (input: string) => conditions.some((c) => c(input));

  return combined as ConditionFilter<StringFilter>;
};

const filterFn = <F extends FilterDefn, U extends boolean, C extends LogicalCombinator>(
  config: F,
  ifUndefined: U,
  logicCombinator: C
) => {
  const filter: FilterFn<F, UndefinedValue<U>, C> = (
    //
    input: Parameters<FilterFn<F, UndefinedValue<U>, C>>[0]
  ) => {
    let flag: boolean;

    if (typeof input === "undefined") {
      flag = ifUndefined;
    } else if (isNumericFilter(config)) {
      const fn = numericOps(config, logicCombinator);
      flag = fn(input as number);
    } else {
      const fn = stringOps(config, logicCombinator);
      flag = fn(input as string);
    }

    return flag;
  };

  return filter;
};

/**
 * **filter**
 *
 * A higher order helper utility which builds a boolean _filter_ function based on a simple
 * configuration object. Support either _string_ or _numeric_ filters.
 *
 * ```ts
 * const str = filter({startsWith: ["_", "."], endsWith: ".md"});
 * const num = filter({ greaterThan: 55, notEqual: [66, 77]});
 * ```
 */
export const filter = <F extends FilterDefn, U extends boolean, C extends LogicalCombinator>(
  config: F,
  ifUndefined: U = true as U,
  logicCombinator: C = "AND" as C
) => {
  return filterFn(config, ifUndefined, logicCombinator);
};
