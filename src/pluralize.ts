import { IDictionary } from "./IDictionary";
import { keys } from "./keys";

export type PluralExceptionTuple = [pattern: RegExp, plural: string];

export type IPluralizeRuleEngine = (
  input: string,
  rule: RegExp,
  exceptions: string[]
) => string;

export type IPluralizeRule = [
  pattern: RegExp,
  fn: IPluralizeRuleEngine,
  exceptions?: string[]
];

export type IExplicitPluralization = [singular: string, plural: string];

export interface IPluralizeOptions {
  /** you can manually put a string at the end and if done the default rules will not be run */
  postfix?: string;
  /** you can put in your own rules engine where you'd like */
  rules?: IPluralizeRuleEngine;

  /**
   * You can also extend or override the default "explicit rules" by sending in your
   * own dictionary mapping:
   *
   * ```ts
   * const explictPluralizations = [
   *    /^foo$/: 'foey',
   *    /(.*)bar$/: '$1barred',
   * ]
   * const plural = pluralize(something, { explictPluralizations });
   * ```
   */
  bespokeExceptions?: PluralExceptionTuple[];

  additionalRules?: IPluralizeRule[];

  /**
   * By default an error is thrown when passed in an empty string but setting
   * this to `true` will pass back an empty string and just ignore.
   */
  ignoreEmptyStrings?: boolean;
}

/** Rules were derived from [Grammarly](https://www.grammarly.com/blog/plural-nouns/) */
const defaultRules: IPluralizeRule[] = [
  // ending in "us"
  [/(us)$/i, (i) => `${i.replace(/us$/, "")}i`, ["bus", "us"]],
  // "is" to "es"
  [/(is)$/i, (i, r) => `${i.replace(r, "")}es`],
  // singular noun endings that have "es" added
  [/(s|sh|ch|x|z|o)$/, (i) => `${i}es`],
  // ending in "f" or "fe"
  [/fe{0,1}$/i, (i, r) => `${i.replace(r, "")}ves`],
  // end in Y, with consonant before it
  [
    /[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|z|y]y$/i,
    (i) => `${i.slice(0, i.length - 1)}ies`,
  ],
];

enum Rule {
  regex,
  fn,
  exceptions,
}
enum ExplicitRule {
  singular,
  plural,
}

/**
 * A simple and light weight pluralizer utility.
 */
export function pluralize(input: string, options: IPluralizeOptions = {}) {
  if (input === "") {
    if (options.ignoreEmptyStrings) return "";
    throw new Error("Attempt to pluralize an empty string");
  }

  const defaultExceptions: PluralExceptionTuple[] = [
    [/(.*)(photo)$/i, "$1$2s"],
    [/(.*)(piano)$/i, "$1$2s"],
    [/(.*)(halo)$/i, "$1$2s"],
    [/(.*)(foot)$/i, "$1feet"],
    [/(.*)(man)$/i, "$1men"],
    [/(.*)(person)$/i, "$1people"],
    [/(.*)(mouse)$/i, "$1mice"],
    [/(.*)(series)$/i, "$1series"],
    [/(.*)(sheep)$/i, "$1sheep"],
    [/(.*)(deer)$/i, "$1deer"],
    [/^(fun)$/i, "$1"]
  ];

  const exceptions = [
    ...defaultExceptions,
    ...(options.bespokeExceptions ? options.bespokeExceptions : []),
  ].filter(e => {
    const [re, _] = e;
    return re.test(input.toLowerCase());
  });


  if (exceptions.length > 0) {
    const [re, result] = exceptions[0];

    return input.replace(re, result);
  }

  const pRules =
    options.rules || options.additionalRules
      ? defaultRules.concat(...(options.additionalRules as IPluralizeRule[]))
      : defaultRules;

  let index = 0;

  const rules = pRules.filter(
    (r) => r[Rule.regex].test(input.toLowerCase()) && !(r[Rule.exceptions] || []).includes(input)
  );

  if (rules.length > 0) {
    const [r, fn, exceptions] = rules[0];
    return fn(input, r, exceptions || []);
  } else {
    return `${input}s`;
  }
}
