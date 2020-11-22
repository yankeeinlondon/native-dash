import { COLOR } from "./private";

export type IColor =
  | "black"
  | "red"
  | "magenta"
  | "yellow"
  | "green"
  | "brightRed"
  | "brightGreen"
  | "brightYellow";

export type Color = keyof typeof COLOR;
export type ColorConfigurator = (color: typeof COLOR) => [fg: number, bg: number];

export type ColorFormatter = (text?: string, bg?: ColorConfigurator) => string;

export interface IFormattingOptions {
  color?: ColorConfigurator;
  bg?: ColorConfigurator;
  italics?: true;
  underline?: true;
  strikeThrough?: true;
}

export type FluentOneUse<
  TApi extends Record<string, any>,
  TOneUse extends string
> = TOneUse extends string ? Omit<TApi, TOneUse> : TApi;

/**
 * Defines a Fluent API, types are (in order):
 *
 * - `TFluent`: the _fns_ on the API which return the Fluent API after modifying state
 * - `TExits`: the _functions_ on the API which _exit_ the Fluent interface
 * - `TProps`: the read-only _properties_ on the API; default is _false_ indicating none
 * - `TOneUse`: the prop names of the Fluent API which should be removed from the API once used once; default is _false_ indicating none
 */
export type FluentApi<
  TFluent extends Record<string, (...args: any[]) => unknown>,
  TExits extends Record<string, (...args: any[]) => any>,
  TProps extends Record<string, Readonly<any>> | false = false,
  TOneUse extends string & keyof TFluent = "",
  TExclude extends string = ""
> = FluentOneUse<Pick<TFluent, TOneUse>, TExclude> &
  Omit<TFluent, TOneUse> &
  TExits &
  Readonly<TProps>;

/**
 * A fluent API design to replace a text block with a _formatted_ version
 */
export type IFormattingApi<X extends string = ""> = FluentApi<
  {
    /** Add a _foreground_ color for the text that matches */
    withColor: X extends "withColor"
      ? never
      : (fg: ColorConfigurator) => IFormattingApi<X | "withColor">;
    withItalics: () => IFormattingApi<X | "withItalics">;
    withUnderline: () => IFormattingApi<X | "withUnderline">;
    withStrikethrough: () => IFormattingApi<X | "withStrikethrough">;

    /** Add a _background_ color for the text that matches */
    withBackground: (bg: ColorConfigurator) => unknown;
  },
  {
    /** provide the _corpus_ of text to search through */
    in: (corpus: string) => string;
  },
  {
    config: IFormattingOptions;
  },
  "withColor" | "withItalics" | "withBackground" | "withStrikethrough" | "withUnderline"
>;
