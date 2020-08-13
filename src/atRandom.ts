export function atRandom<T = any>(things: T[], excluding: T[] | ((item: T) => T[]) = []) {
  things = things.filter((i) =>
    typeof excluding === "function" ? !excluding(i).includes(i) : !excluding.includes(i)
  );
  const random = Math.floor(Math.random() * things.length);
  return things[random];
}
