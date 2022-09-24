import apiPaths from '../api/api-paths';
import environment from '../environment/environment';
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
  if (totalValue <= 0 || partialValue <= 0) return 0;

  return (partialValue / totalValue) * 100;
}

export const createWordURL = (userId: string, wordId: string) =>
  `${environment.baseUrl}${apiPaths.Users}/${userId}${apiPaths.Words}/${wordId}`;

export const createStatsURL = (userId: string) =>
  `${environment.baseUrl}${apiPaths.Users}/${userId}${apiPaths.Statistics}`;

export const createSettingsURL = (userId: string) =>
  `${environment.baseUrl}${apiPaths.Users}/${userId}${apiPaths.Settings}`;

export const createFilteredURL = (userId: string, query: string) =>
  `${environment.baseUrl}${apiPaths.Users}/${userId}${apiPaths.AggregatedWords}?filter=${query}&wordsPerPage=3600`;

export const reduceObjByField = (
  obj: Record<string, Record<string, number>>,
  fieldName: string
) => Object.values(obj).reduce((acc, sum) => sum[fieldName] + acc, 0);
