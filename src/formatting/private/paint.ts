import { COLOR, RESET_BG, RESET_FG } from "./constants";
import { ColorConfigurator } from "../fluent-types";

export function paint(text: string = "", fg: ColorConfigurator, bg?: ColorConfigurator) {
  const foreground = "\u001b[" + fg(COLOR)[0] + "m";
  const bgc = bg ? bg(COLOR)[1] : null;
  const background = bgc ? "\u001b[" + bgc + "m" : "";
  const reset = background ? `${RESET_FG}${RESET_BG}` : `${RESET_FG}`;
  return `${RESET_FG}${foreground}${background}${text}${reset}`;
}
