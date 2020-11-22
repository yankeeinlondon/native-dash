import { ColorConfigurator, IFormattingApi, IFormattingOptions } from "../fluent-types";
import { replace } from "./index";

export const formattingApi = <X extends string>(
  find: string,
  global: boolean,
  config: IFormattingOptions
): IFormattingApi<X> => {
  const api = (({
    withColor: (fg: ColorConfigurator) => {
      return formattingApi<X | "withColor">(find, global, { ...config, color: fg });
    },
    withItalics: () => {
      return formattingApi<X | "withItalics">(find, global, { ...config, italics: true });
    },
    withUnderline: () => {
      return formattingApi<X | "withUnderline">(find, global, { ...config, underline: true });
    },
    withStrikethrough: () => {
      return formattingApi<X | "withStrikethrough">(find, global, {
        ...config,
        strikeThrough: true,
      });
    },
    withBackground: (bg: ColorConfigurator) => {
      return formattingApi<X | "withBackground">(find, global, { ...config, bg });
    },
    in: (corpus: string) => {
      return replace(find, corpus, config, global);
    },
    config,
  } as IFormattingApi<any>) as unknown) as IFormattingApi<X>;

  return api;
};
