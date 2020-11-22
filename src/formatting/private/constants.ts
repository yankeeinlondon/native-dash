export const RESET_FG = `\u001b[39m`;
export const RESET_BG = `\u001b[49m`;

export const COLOR: Record<string, [fg: number, bg: number]> = {
  black: [30, 40],
  red: [31, 41],
  magenta: [35, 45],
  yellow: [33, 43],
  green: [32, 42],

  brightRed: [91, 40],
  brightGreen: [92, 42],
  brightYellow: [93, 43],
};
