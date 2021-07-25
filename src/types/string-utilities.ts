export type Capitalize<T> = intrinsic;

export type LowerAlpha = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

/** Uppercase alphabetic character */
export type UpperAlpha = Uppercase<LowerAlpha>;

export type KvDefn<T extends {} = {}, K extends keyof T = keyof T> = {
  key: K;
  value: T[K];
};

type VariableDelimiter = "_" | "-";
type Whitespace = " " | "\n" | "\t";

/**
 * Type utility which takes a string `S` and replaces the substring `W` with `P`.
 * ```ts
 * const fooy = "fooy";
 * // "Foo"
 * type Foo = Replace<typeof fooy, "y", "">;
 * ```
 * 
 * Note: _the first match is replaced and all subsequent matches are ignored_
 */
export type Replace<S extends string, W extends string, P extends string> =
  S extends '' ? '' : W extends '' ? S :
  S extends `${infer F}${W}${infer E}` ? `${F}${P}${E}` : S


/**
 * Type utility that provides the _length_ of a given string type
 * ```ts
 * const foo = "foo";
 * // 3
 * type Three = StringLength<typeof foo>;
 * ```
 */
export type StringLength<S extends string, A extends any[] = []> = S extends '' ? A['length'] : S extends `${infer First}${infer Rest}` ? StringLength<Rest, [First, ...A]> : never


/**
 * Trims off blank spaces, `\n` and `\t` characters from both sides of a _string literal_.
 */
export type Trim<S extends string> = S extends `${Whitespace}${infer Right}` ?
  Trim<Right> : S extends `${infer Left}${Whitespace}` ? Trim<Left> : S;

/**
 * Trims off blank spaces, `\n` and `\t` characters from left side of a _string literal_.
 */
export type TrimLeft<S extends string> = S extends `${infer First}${infer Rest}` ? First extends Whitespace ? TrimLeft<Rest> : S : never

/**
 * Provides the left-hand whitespace of a string literal as literal
 */
export type LeftWhitespace<S extends string, Acc extends string = ""> = Replace<S, TrimLeft<S>, "">

export type CamelCase<S extends string> = S extends `${infer B}${VariableDelimiter}${infer A}${infer R}`
  ? `${Lowercase<B>}${Capitalize<A>}${CamelCase<R>}`
  : Lowercase<S>;


/** Converts a string literal type to a **PascalCase** representation */
export type PascalCase<S extends string> = S extends `${infer B}${VariableDelimiter}${infer A}${infer R}`
  ? `${Capitalize<B>}${Capitalize<A>}${CamelCase<R>}`
  : Lowercase<S>;

