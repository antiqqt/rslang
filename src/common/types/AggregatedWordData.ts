import WordData from './WordData';

export type AggregatedWords = [
  {
    paginatedResults: WordData[];
  },
  {
    totalCount: { count: number };
  }
];
