import environment from '../environments/environment';
import WordData from '../types/WordData';
import apiPaths from './api-paths';

const getWords = async (group: number, page: number) =>
  fetch(
    `${environment.baseUrl}${apiPaths.Words}?group=${group}&page=${page}`
  ).then((res) => res.json() as Promise<WordData[]>);

export default getWords;
