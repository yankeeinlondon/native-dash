export type InitialsStrategy = "all" | "kabab" | "words" | "camelCase";
export function initials<S extends InitialsStrategy>(
  input: string,
  strategy: S = "all" as S
) {
  let re: RegExp;
  let takeFirst: boolean = false;
  switch (strategy) {
    case "all":
      re = /(\s+|[A-Z]{1}|-[a-zA-Z]{1}|_[a-zA-Z]{1}|\.[a-zA-Z]{1}|[0-9]+)/g;
      takeFirst = true;
      break;
    default:
      throw new Error("only the 'all' strategy is implemented currently");
  }

  const trimmed = input.trim();
  const first = takeFirst ? trimmed.slice(0, 1).toUpperCase() : "";
  const rest = takeFirst ? trimmed.slice(1) : trimmed;
  const parts = rest.split(re).filter((i) => i.trim() && i.match(re));

  const breakChars = ["_", "-"];
  const remaining = parts.map((i) => {
    const atBreak = i.slice(0, 1);

    return breakChars.includes(atBreak)
      ? i.slice(1).toUpperCase()
      : atBreak.toUpperCase();
  });

  return [first, ...remaining].join("");
}
