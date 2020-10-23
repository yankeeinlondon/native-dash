import { randomString } from "./randomString";

export function guid() {
  return (
    randomString() +
    randomString() +
    "-" +
    randomString() +
    "-" +
    randomString() +
    "-" +
    randomString() +
    "-" +
    randomString() +
    randomString() +
    randomString()
  );
}
