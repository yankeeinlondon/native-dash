import { ColorConfigurator } from "./fluent-types";
import { paint } from "./private/index";

/**
 * Colorize text in the console.
 *
 * Choose a foreground color and optionally a background color.
 */
export const color = {
  red: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, (c) => c.red, bg);
  },
  magenta: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, (c) => c.magenta, bg);
  },
  black: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, (c) => c.black, bg);
  },
  yellow: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, (c) => c.yellow, bg);
  },
  green: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, (c) => c.green, bg);
  },

  brightRed: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, (c) => c.brightRed, bg);
  },
};
