/* eslint no-param-reassign: "error" */

export function getRandomPage() {
  const min = 0;
  const max = 29;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomWordNumber() {
  const min = 0;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandom0toMax(max: number) {
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
