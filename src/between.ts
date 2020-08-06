export function between(start: number, end: number) {
  const diff = Math.abs(end - start) + 1;
  const random = Math.floor(Math.random() * diff);
  return start + random;
}
