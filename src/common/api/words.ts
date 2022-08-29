import environment from '../environments/environment';
import WordData from '../types/WordData';
import apiPaths from './api-paths';

const getWords = async (group: number, page: number) =>
  fetch(
    `${environment.baseUrl}${apiPaths.Words}?group=${group}&page=${page}`
  ).then((res) => res.json() as Promise<WordData[]>);

const getUserWords = (userId: string, token: string) =>
  fetch(`${environment.baseUrl}${apiPaths.Users}/${userId}${apiPaths.Words}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  }).then((res) => res.json());

export { getWords, getUserWords };
