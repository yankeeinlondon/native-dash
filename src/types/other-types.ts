export enum DataType {
  null = "null",
  string = "string",
  number = "number",
  bigint = "bigint",
  symbol = "symbol",
  boolean = "boolean",
  function = "function",
  undefined = "undefined",
  /** an object with key-value pairs */
  dictionary = "dictionary",
  /** an object of unknown type */
  object = "object",
  /** an array of unknown type */
  array = "array",

  /** an array of just strings */
  stringArray = "string[]",
  /** an array of just numbers */
  numberArray = "number[]",
  /** an array of just boolean flags */
  booleanArray = "boolean[]",
  /** an array of just symbols */
  symbolArray = "symbol[]",
  /** an array of just functions */
  functionArray = "function[]",
  /** an array of just `undefined` values */
  undefinedArray = "undefined[]",
  /** an array of just `null` values */
  nullArray = "null[]",

  /** an array of empty objects */
  objectArray = "object[]",

  /**
   * An array of the _same_ type of dictionary
   */
  dictionaryArray = "dictionary[]",
}

export interface IDictionaryDescriptor {
  // eslint-disable-next-line no-use-before-define
  [key: string]: DataType | IDataDescriptor;
}

/**
 * A description of the type of a data structure or scalar value
 */
export type IDataDescriptor = IDictionaryDescriptor | Array<DataType | IDataDescriptor> | DataType;

/**
 * A type-guard to check whether a given variable is a non-null based object
 */
export function isNonNullObject<T extends object>(thingy: unknown): thingy is T {
  return typeof thingy === "object" && thingy !== null;
}
