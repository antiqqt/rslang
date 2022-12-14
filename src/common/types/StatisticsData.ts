export interface StatisticData {
  [gameName: string]: {
    bestSeries: number;
    correctAnswers: number;
    wrongAnswers: number;
    newLearnedWordsCount: number;
    newHardWordsCount: number;
    newEasyWordsCount: number;
    newWordsCount: number;
  };
}

export interface StatisticResponse {
  learnedWords: number;
  optional: {
    [date: string]: StatisticData;
  };
}
