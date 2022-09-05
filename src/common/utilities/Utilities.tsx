/* eslint no-param-reassign: "error" */

import { QuestionData, QuestionSprintData } from '../types/QuestionData';

export function getRandom0toMax(max: number) {
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomTrueOrFalse() {
  return Math.random() > 0.5;
}

export function shuffle(array: string[]) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleQustions(array: QuestionData[]) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleSprintQuestions(array: QuestionSprintData[]) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getPercentage(partialValue: number, totalValue: number) {
  return (partialValue / totalValue) * 100;
}
