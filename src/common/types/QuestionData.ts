import WordData from "./WordData";

export interface QuestionData {
  question: string;
  answer: string;
  image: string;
  audio: string;
  variants: string[];
  wordData: WordData
}

export interface QuestionSprintData {
  word: string;
  answer: boolean;
  question: string;
  wordData: WordData;
}