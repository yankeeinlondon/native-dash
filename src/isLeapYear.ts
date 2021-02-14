/**
 * Tests whether the passed in year is a leap year or not
 */
export function isLeapYear(year: number | Date) {
  const y = typeof year === "number" ? year : year.getFullYear();
  return new Date(y, 1, 29).getDate() === 29;
}
