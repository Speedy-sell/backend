export function getRandomString(): string {
  return Math.random()
    .toString(36)
    .substring(7);
}
