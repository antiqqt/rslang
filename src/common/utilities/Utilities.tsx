export function getRandomPage() {
  const min = 0;
  const max = 29;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomWordNumber() {
  const min = 0;
  const max = 19;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
