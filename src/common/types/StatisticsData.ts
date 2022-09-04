export interface StatisticData {
  [x: string]: string | number;
  gameName: "audiochallenge" | "sprint";
  bestSeries: number;
  correctAnswers: number;
  wrongAnswers: number;
  newLearnedWordsCount: number;
  newHardWordsCount: number;
  newEasyWordsCount: number;
  newWordsCount: number;
}

export interface StatisticResponse {
  id: string;
  learnedWords?: string;
  optional?: {
    log: string;
  };
}