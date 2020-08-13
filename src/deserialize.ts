export function deserialize(arr: string) {
  return arr.split("\n").map((i) => JSON.parse(i));
}
